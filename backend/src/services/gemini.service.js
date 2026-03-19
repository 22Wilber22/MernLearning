const { GoogleGenerativeAI } = require('@google/generative-ai');

let _genAI = null;

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  if (!_genAI) {
    _genAI = new GoogleGenerativeAI(apiKey);
  }
  return _genAI;
};

exports.reviewCode = async (code, description, language = 'html') => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert ${language.toUpperCase()} code reviewer for a learning platform.

Exercise description: ${description}

Student's code:
\`\`\`${language}
${code}
\`\`\`

Please review this code and provide:
1. A score from 0-100
2. What the student did well
3. What needs improvement
4. Specific suggestions to improve the code
5. Whether it meets the exercise requirements

Respond in JSON format:
{
  "score": <number 0-100>,
  "passed": <boolean>,
  "feedback": "<detailed feedback>",
  "positives": ["<thing done well>"],
  "improvements": ["<improvement needed>"],
  "suggestions": ["<specific suggestion>"]
}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return {
      score: 50,
      passed: false,
      feedback: response,
      positives: [],
      improvements: [],
      suggestions: []
    };
  } catch (error) {
    console.error('Gemini API error:', error.message);
    return {
      score: 0,
      passed: false,
      feedback: 'AI review temporarily unavailable. Please check your GEMINI_API_KEY.',
      positives: [],
      improvements: [],
      suggestions: []
    };
  }
};

exports.getHint = async (exerciseDescription, currentCode, language = 'html') => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a helpful programming tutor. The student is working on this exercise:
${exerciseDescription}

Their current code:
\`\`\`${language}
${currentCode}
\`\`\`

Provide a helpful hint without giving away the complete solution. Keep it concise (2-3 sentences).`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return 'Hint service temporarily unavailable.';
  }
};

exports.explainConcept = async (concept, language = 'html') => {
  try {
    const genAI = getGeminiClient();
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Explain the concept of "${concept}" in ${language} for a beginner learning web development. Use simple language and a practical example. Keep it under 200 words.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return 'Explanation service temporarily unavailable.';
  }
};
