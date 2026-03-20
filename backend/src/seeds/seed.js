require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Exercise = require('../models/Exercise');

const seedData = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB for seeding...');

  await Module.deleteMany({});
  await Lesson.deleteMany({});
  await Exercise.deleteMany({});

  const htmlModule = await Module.create({
    title: 'HTML & CSS',
    slug: 'html-css',
    description: 'Aprende los fundamentos de HTML y CSS para crear páginas web estructuradas y estilizadas.',
    icon: '🌐',
    color: '#F97316',
    order: 1,
    isLocked: false,
    unlockPercentage: 70,
    estimatedHours: 8,
    tags: ['html', 'css', 'web', 'beginner']
  });

  const lesson1 = await Lesson.create({
    moduleId: htmlModule._id,
    title: 'Introducción a HTML',
    slug: 'intro-html',
    content: `# Introducción a HTML\n\nHTML (HyperText Markup Language) es el lenguaje de marcado estándar para crear páginas web.\n\n## Estructura básica\n\n\`\`\`html\n<!DOCTYPE html>\n<html lang="es">\n  <head>\n    <meta charset="UTF-8">\n    <title>Mi Primera Página</title>\n  </head>\n  <body>\n    <h1>¡Hola Mundo!</h1>\n    <p>Esta es mi primera página web.</p>\n  </body>\n</html>\n\`\`\`\n\n## Etiquetas principales\n\n- **\`<h1>\` a \`<h6>\`**: Encabezados\n- **\`<p>\`**: Párrafos\n- **\`<a>\`**: Enlaces\n- **\`<img>\`**: Imágenes\n- **\`<div>\`**: Contenedor genérico\n- **\`<span>\`**: Contenedor en línea`,
    order: 1,
    type: 'theory',
    xpReward: 50,
    estimatedMinutes: 15
  });

  const ex1 = await Exercise.create({
    lessonId: lesson1._id,
    moduleId: htmlModule._id,
    title: 'Tu primera página HTML',
    description: 'Crea una página HTML básica con un título y un párrafo de presentación',
    instructions: 'Crea una página HTML completa que incluya: DOCTYPE, html, head con meta charset y title, y body con un h1 que diga tu nombre y un párrafo describiendo quién eres.',
    starterCode: '<!-- Escribe tu HTML aquí -->\n',
    solutionCode: '<!DOCTYPE html>\n<html lang="es">\n  <head>\n    <meta charset="UTF-8">\n    <title>Mi Perfil</title>\n  </head>\n  <body>\n    <h1>Mi Nombre</h1>\n    <p>Soy un estudiante aprendiendo HTML y CSS.</p>\n  </body>\n</html>',
    language: 'html',
    difficulty: 'beginner',
    xpReward: 100,
    hints: ['Recuerda incluir el DOCTYPE al inicio', 'El head contiene metadatos, el body el contenido visible'],
    order: 1
  });

  const ex2 = await Exercise.create({
    lessonId: lesson1._id,
    moduleId: htmlModule._id,
    title: 'Estructura semántica HTML5',
    description: 'Usa etiquetas semánticas de HTML5 para estructurar una página',
    instructions: 'Crea una página usando header, nav, main, article, aside y footer correctamente.',
    starterCode: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Página Semántica</title>\n</head>\n<body>\n  <!-- Agrega las etiquetas semánticas aquí -->\n</body>\n</html>',
    language: 'html',
    difficulty: 'beginner',
    xpReward: 150,
    hints: ['header va al inicio de la página', 'nav contiene la navegación', 'main es el contenido principal'],
    order: 2
  });

  const lesson2 = await Lesson.create({
    moduleId: htmlModule._id,
    title: 'Introducción a CSS',
    slug: 'intro-css',
    content: `# Introducción a CSS\n\nCSS (Cascading Style Sheets) es el lenguaje de estilos para páginas web.\n\n## Selectores CSS\n\n\`\`\`css\n/* Selector de elemento */\nh1 {\n  color: blue;\n  font-size: 2rem;\n}\n\n/* Selector de clase */\n.container {\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n/* Selector de ID */\n#header {\n  background-color: #333;\n  padding: 1rem;\n}\n\`\`\`\n\n## El Box Model\n\nCada elemento HTML es una caja con:\n- **content**: El contenido\n- **padding**: Espacio interior\n- **border**: El borde\n- **margin**: Espacio exterior`,
    order: 2,
    type: 'theory',
    xpReward: 50,
    estimatedMinutes: 20
  });

  const ex3 = await Exercise.create({
    lessonId: lesson2._id,
    moduleId: htmlModule._id,
    title: 'Estiliza tu primera página',
    description: 'Aplica estilos CSS básicos a una página HTML',
    instructions: 'Dale estilos a una página: cambia el color de fondo del body, el color del h1, agrega padding y un font-family personalizado.',
    starterCode: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>CSS Básico</title>\n  <style>\n    /* Escribe tu CSS aquí */\n  </style>\n</head>\n<body>\n  <h1>Mi Página Estilizada</h1>\n  <p>Usando CSS para hacer mi página bonita.</p>\n</body>\n</html>',
    language: 'css',
    difficulty: 'beginner',
    xpReward: 100,
    hints: ['Usa body { background-color: ... }', 'font-family: Arial, sans-serif; para la fuente'],
    order: 1
  });

  const lesson3 = await Lesson.create({
    moduleId: htmlModule._id,
    title: 'Flexbox y Grid',
    slug: 'flexbox-grid',
    content: `# Flexbox y CSS Grid\n\n## Flexbox\n\nFlexbox es un sistema de layout unidimensional.\n\n\`\`\`css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 1rem;\n}\n\`\`\`\n\n## CSS Grid\n\nCSS Grid es un sistema de layout bidimensional.\n\n\`\`\`css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 1rem;\n}\n\`\`\``,
    order: 3,
    type: 'practice',
    xpReward: 75,
    estimatedMinutes: 30
  });

  const ex4 = await Exercise.create({
    lessonId: lesson3._id,
    moduleId: htmlModule._id,
    title: 'Layout con Flexbox',
    description: 'Crea un layout de navegación usando Flexbox',
    instructions: 'Crea una barra de navegación horizontal usando flexbox con un logo a la izquierda y links a la derecha.',
    starterCode: '<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>Navbar Flexbox</title>\n  <style>\n    /* Usa flexbox para la navbar */\n    nav {\n      /* tu código aquí */\n    }\n  </style>\n</head>\n<body>\n  <nav>\n    <div class="logo">Logo</div>\n    <ul>\n      <li><a href="#">Inicio</a></li>\n      <li><a href="#">Sobre</a></li>\n      <li><a href="#">Contacto</a></li>\n    </ul>\n  </nav>\n</body>\n</html>',
    language: 'css',
    difficulty: 'intermediate',
    xpReward: 200,
    hints: ['display: flex en el nav', 'justify-content: space-between para separar logo y links'],
    order: 1
  });

  await Module.findByIdAndUpdate(htmlModule._id, {
    lessons: [lesson1._id, lesson2._id, lesson3._id],
    totalXP: 725
  });

  await Lesson.findByIdAndUpdate(lesson1._id, { exercises: [ex1._id, ex2._id] });
  await Lesson.findByIdAndUpdate(lesson2._id, { exercises: [ex3._id] });
  await Lesson.findByIdAndUpdate(lesson3._id, { exercises: [ex4._id] });

  const jsModule = await Module.create({
    title: 'JavaScript Fundamentals',
    slug: 'javascript',
    description: 'Aprende JavaScript desde cero: variables, funciones, arrays, objetos y más.',
    icon: '⚡',
    color: '#EAB308',
    order: 2,
    isLocked: true,
    unlockPercentage: 70,
    prerequisites: [htmlModule._id],
    estimatedHours: 12,
    tags: ['javascript', 'programming', 'beginner']
  });

  await Module.create({
    title: 'React',
    slug: 'react',
    description: 'Construye interfaces de usuario modernas con React, hooks, y state management.',
    icon: '⚛️',
    color: '#06B6D4',
    order: 3,
    isLocked: true,
    unlockPercentage: 70,
    prerequisites: [jsModule._id],
    estimatedHours: 15,
    tags: ['react', 'frontend', 'intermediate']
  });

  await Module.create({
    title: 'Node.js & Express',
    slug: 'nodejs',
    description: 'Desarrolla servidores backend con Node.js, Express y APIs REST.',
    icon: '🟢',
    color: '#22C55E',
    order: 4,
    isLocked: true,
    estimatedHours: 12,
    tags: ['nodejs', 'backend', 'intermediate']
  });

  await Module.create({
    title: 'MongoDB',
    slug: 'mongodb',
    description: 'Aprende bases de datos NoSQL con MongoDB y Mongoose.',
    icon: '🍃',
    color: '#16A34A',
    order: 5,
    isLocked: true,
    estimatedHours: 10,
    tags: ['mongodb', 'database', 'intermediate']
  });

  console.log('✅ Seed completed successfully!');
  await mongoose.connection.close();
};

seedData().catch(console.error);
