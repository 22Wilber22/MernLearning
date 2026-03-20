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

  // ─── JavaScript Fundamentals ───────────────────────────────────────────────
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

  const jsLesson1 = await Lesson.create({
    moduleId: jsModule._id,
    title: 'Variables y Tipos de Datos',
    slug: 'js-variables',
    content: `# Variables y Tipos de Datos en JavaScript\n\nJavaScript es un lenguaje de tipado dinámico. Puedes declarar variables con \`let\`, \`const\` o \`var\`.\n\n## Declaración de Variables\n\n\`\`\`javascript\nlet nombre = 'Ana';      // cadena de texto\nconst edad = 25;         // número entero\nlet activo = true;       // booleano\nlet puntos = 9.5;        // número decimal\nlet nulo = null;         // nulo\nlet indefinido;          // undefined\n\`\`\`\n\n## Tipos Primitivos\n\n- **string**: texto entre comillas simples, dobles o backticks\n- **number**: enteros y decimales\n- **boolean**: true o false\n- **null**: ausencia intencional de valor\n- **undefined**: variable declarada pero no asignada\n- **symbol**: valor único e inmutable\n- **bigint**: enteros muy grandes\n\n## Template Literals\n\n\`\`\`javascript\nconst saludo = \`Hola, \${nombre}! Tienes \${edad} años.\`;\nconsole.log(saludo); // Hola, Ana! Tienes 25 años.\n\`\`\``,
    order: 1,
    type: 'theory',
    xpReward: 50,
    estimatedMinutes: 15
  });

  const jsEx1 = await Exercise.create({
    lessonId: jsLesson1._id,
    moduleId: jsModule._id,
    title: 'Declara tus primeras variables',
    description: 'Practica la declaración de variables con distintos tipos de datos',
    instructions: 'Declara las siguientes variables: tu nombre (string), tu edad (number), si eres estudiante (boolean) y tu lenguaje favorito (string). Luego imprime un mensaje usando template literals.',
    starterCode: '// Declara tus variables aquí\n\n// Imprime un mensaje usando template literals\n',
    solutionCode: "const nombre = 'Juan';\nconst edad = 20;\nconst esEstudiante = true;\nconst lenguajeFavorito = 'JavaScript';\n\nconsole.log(`Me llamo ${nombre}, tengo ${edad} años, soy estudiante: ${esEstudiante} y mi lenguaje favorito es ${lenguajeFavorito}.`);",
    language: 'javascript',
    difficulty: 'beginner',
    xpReward: 100,
    hints: ['Usa const para valores que no cambiarán', 'Los template literals usan backticks (`) y ${variable}'],
    order: 1
  });

  const jsLesson2 = await Lesson.create({
    moduleId: jsModule._id,
    title: 'Funciones y Arrow Functions',
    slug: 'js-funciones',
    content: `# Funciones en JavaScript\n\nLas funciones son bloques de código reutilizables que realizan una tarea específica.\n\n## Función Tradicional\n\n\`\`\`javascript\nfunction sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(3, 4)); // 7\n\`\`\`\n\n## Arrow Function\n\n\`\`\`javascript\nconst multiplicar = (a, b) => a * b;\nconsole.log(multiplicar(3, 4)); // 12\n\`\`\`\n\n## Funciones con Valor por Defecto\n\n\`\`\`javascript\nconst saludar = (nombre = 'Mundo') => {\n  return \`¡Hola, \${nombre}!\`;\n};\nconsole.log(saludar());         // ¡Hola, Mundo!\nconsole.log(saludar('María'));  // ¡Hola, María!\n\`\`\`\n\n## Funciones de Orden Superior\n\n\`\`\`javascript\nconst numeros = [1, 2, 3, 4, 5];\nconst dobles = numeros.map(n => n * 2);\nconsole.log(dobles); // [2, 4, 6, 8, 10]\n\`\`\``,
    order: 2,
    type: 'theory',
    xpReward: 60,
    estimatedMinutes: 20
  });

  const jsEx2 = await Exercise.create({
    lessonId: jsLesson2._id,
    moduleId: jsModule._id,
    title: 'Calculadora con funciones',
    description: 'Crea funciones para operaciones matemáticas básicas',
    instructions: 'Crea cuatro arrow functions: sumar, restar, multiplicar y dividir, cada una con dos parámetros. Luego crea una función "calcular" que reciba dos números y un operador (+, -, *, /) y retorne el resultado usando las funciones anteriores.',
    starterCode: "// Crea las arrow functions aquí\n\n// Función calcular\n\nconsole.log(calcular(10, 5, '+')); // 15\nconsole.log(calcular(10, 5, '-')); // 5\nconsole.log(calcular(10, 5, '*')); // 50\nconsole.log(calcular(10, 5, '/')); // 2\n",
    solutionCode: "const sumar = (a, b) => a + b;\nconst restar = (a, b) => a - b;\nconst multiplicar = (a, b) => a * b;\nconst dividir = (a, b) => a / b;\n\nconst calcular = (a, b, operador) => {\n  if (operador === '+') return sumar(a, b);\n  if (operador === '-') return restar(a, b);\n  if (operador === '*') return multiplicar(a, b);\n  if (operador === '/') return dividir(a, b);\n};\n\nconsole.log(calcular(10, 5, '+'));\nconsole.log(calcular(10, 5, '-'));\nconsole.log(calcular(10, 5, '*'));\nconsole.log(calcular(10, 5, '/'));",
    language: 'javascript',
    difficulty: 'beginner',
    xpReward: 150,
    hints: ['Usa una estructura if/else o switch para el operador', 'Las arrow functions de una sola línea pueden omitir return y llaves'],
    order: 1
  });

  const jsLesson3 = await Lesson.create({
    moduleId: jsModule._id,
    title: 'Arrays y Objetos',
    slug: 'js-arrays-objetos',
    content: `# Arrays y Objetos\n\n## Arrays\n\nLos arrays almacenan listas ordenadas de valores.\n\n\`\`\`javascript\nconst frutas = ['manzana', 'banana', 'naranja'];\nconsole.log(frutas[0]); // 'manzana'\nconsole.log(frutas.length); // 3\n\n// Métodos útiles\nfrutas.push('uva');           // añadir al final\nfrutas.pop();                 // eliminar el último\nconst mayusculas = frutas.map(f => f.toUpperCase());\nconst largas = frutas.filter(f => f.length > 6);\nconst total = [1,2,3].reduce((acc, n) => acc + n, 0); // 6\n\`\`\`\n\n## Objetos\n\nLos objetos agrupan datos relacionados con pares clave-valor.\n\n\`\`\`javascript\nconst persona = {\n  nombre: 'Carlos',\n  edad: 30,\n  saludar() {\n    return \`Hola, soy \${this.nombre}\`;\n  }\n};\n\nconsole.log(persona.nombre);    // 'Carlos'\nconsole.log(persona['edad']);   // 30\nconsole.log(persona.saludar()); // 'Hola, soy Carlos'\n\`\`\`\n\n## Destructuring\n\n\`\`\`javascript\nconst { nombre, edad } = persona;\nconst [primera, segunda] = frutas;\n\`\`\``,
    order: 3,
    type: 'practice',
    xpReward: 75,
    estimatedMinutes: 25
  });

  const jsEx3 = await Exercise.create({
    lessonId: jsLesson3._id,
    moduleId: jsModule._id,
    title: 'Gestión de estudiantes',
    description: 'Trabaja con arrays de objetos usando métodos de array',
    instructions: 'Tienes un array de estudiantes con nombre y nota. Usa métodos de array para: 1) filtrar los que aprobaron (nota >= 60), 2) calcular el promedio de todos, 3) obtener solo los nombres de los aprobados.',
    starterCode: "const estudiantes = [\n  { nombre: 'Ana', nota: 85 },\n  { nombre: 'Luis', nota: 42 },\n  { nombre: 'María', nota: 90 },\n  { nombre: 'Pedro', nota: 55 },\n  { nombre: 'Sofía', nota: 78 }\n];\n\n// 1. Filtra los aprobados (nota >= 60)\nconst aprobados = ;\n\n// 2. Calcula el promedio de todos\nconst promedio = ;\n\n// 3. Nombres de los aprobados\nconst nombresAprobados = ;\n\nconsole.log('Aprobados:', aprobados);\nconsole.log('Promedio:', promedio);\nconsole.log('Nombres aprobados:', nombresAprobados);\n",
    solutionCode: "const estudiantes = [\n  { nombre: 'Ana', nota: 85 },\n  { nombre: 'Luis', nota: 42 },\n  { nombre: 'María', nota: 90 },\n  { nombre: 'Pedro', nota: 55 },\n  { nombre: 'Sofía', nota: 78 }\n];\n\nconst aprobados = estudiantes.filter(e => e.nota >= 60);\nconst promedio = estudiantes.reduce((acc, e) => acc + e.nota, 0) / estudiantes.length;\nconst nombresAprobados = aprobados.map(e => e.nombre);\n\nconsole.log('Aprobados:', aprobados);\nconsole.log('Promedio:', promedio.toFixed(2));\nconsole.log('Nombres aprobados:', nombresAprobados);",
    language: 'javascript',
    difficulty: 'intermediate',
    xpReward: 200,
    hints: ['Usa .filter() para filtrar', 'Usa .reduce() para sumar las notas y divide entre el total', 'Usa .map() sobre los aprobados para obtener solo los nombres'],
    order: 1
  });

  await Module.findByIdAndUpdate(jsModule._id, {
    lessons: [jsLesson1._id, jsLesson2._id, jsLesson3._id],
    totalXP: 635
  });
  await Lesson.findByIdAndUpdate(jsLesson1._id, { exercises: [jsEx1._id] });
  await Lesson.findByIdAndUpdate(jsLesson2._id, { exercises: [jsEx2._id] });
  await Lesson.findByIdAndUpdate(jsLesson3._id, { exercises: [jsEx3._id] });

  // ─── React ─────────────────────────────────────────────────────────────────
  const reactModule = await Module.create({
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

  const reactLesson1 = await Lesson.create({
    moduleId: reactModule._id,
    title: 'Componentes y JSX',
    slug: 'react-componentes-jsx',
    content: `# Componentes y JSX\n\nReact es una librería para construir interfaces de usuario basadas en **componentes** reutilizables.\n\n## Tu Primer Componente\n\n\`\`\`jsx\nfunction Saludo({ nombre }) {\n  return <h1>¡Hola, {nombre}!</h1>;\n}\n\nexport default Saludo;\n\`\`\`\n\n## JSX\n\nJSX es una extensión de JavaScript que permite escribir HTML dentro del código JS.\n\n\`\`\`jsx\nconst elemento = (\n  <div className="tarjeta">\n    <h2>Título</h2>\n    <p>Descripción del componente</p>\n  </div>\n);\n\`\`\`\n\n## Reglas de JSX\n\n- **Un solo elemento raíz**: usa un \`<div>\` o un fragmento \`<></>\`\n- **className** en lugar de class\n- **camelCase** para atributos: \`onClick\`, \`onChange\`\n- **Expresiones JS** dentro de llaves \`{}\`\n\n## Props\n\n\`\`\`jsx\nfunction Tarjeta({ titulo, descripcion, color = 'blue' }) {\n  return (\n    <div style={{ borderTop: \`4px solid \${color}\` }}>\n      <h3>{titulo}</h3>\n      <p>{descripcion}</p>\n    </div>\n  );\n}\n\`\`\``,
    order: 1,
    type: 'theory',
    xpReward: 60,
    estimatedMinutes: 20
  });

  const reactEx1 = await Exercise.create({
    lessonId: reactLesson1._id,
    moduleId: reactModule._id,
    title: 'Componente de Perfil',
    description: 'Crea un componente React que muestre un perfil de usuario',
    instructions: 'Crea un componente funcional llamado "PerfilUsuario" que reciba las props: nombre, rol y avatar (emoji). El componente debe mostrar un círculo con el avatar, el nombre en un h2 y el rol en un párrafo con color gris.',
    starterCode: "function PerfilUsuario({ nombre, rol, avatar }) {\n  // Tu componente aquí\n}\n\n// Prueba tu componente\nconst App = () => (\n  <PerfilUsuario\n    nombre=\"Ana García\"\n    rol=\"Desarrolladora Frontend\"\n    avatar=\"👩‍💻\"\n  />\n);\n",
    solutionCode: "function PerfilUsuario({ nombre, rol, avatar }) {\n  return (\n    <div style={{ textAlign: 'center', padding: '2rem' }}>\n      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{avatar}</div>\n      <h2 style={{ marginBottom: '0.5rem' }}>{nombre}</h2>\n      <p style={{ color: 'gray' }}>{rol}</p>\n    </div>\n  );\n}\n\nconst App = () => (\n  <PerfilUsuario\n    nombre=\"Ana García\"\n    rol=\"Desarrolladora Frontend\"\n    avatar=\"👩‍💻\"\n  />\n);",
    language: 'javascript',
    difficulty: 'beginner',
    xpReward: 120,
    hints: ['Usa destructuring en los parámetros: ({ nombre, rol, avatar })', 'Aplica estilos inline con style={{ propiedad: valor }}'],
    order: 1
  });

  const reactLesson2 = await Lesson.create({
    moduleId: reactModule._id,
    title: 'useState y useEffect',
    slug: 'react-hooks',
    content: `# Hooks: useState y useEffect\n\nLos hooks permiten usar estado y ciclo de vida en componentes funcionales.\n\n## useState\n\n\`\`\`jsx\nimport { useState } from 'react';\n\nfunction Contador() {\n  const [cuenta, setCuenta] = useState(0);\n\n  return (\n    <div>\n      <p>Cuenta: {cuenta}</p>\n      <button onClick={() => setCuenta(cuenta + 1)}>+1</button>\n      <button onClick={() => setCuenta(0)}>Reset</button>\n    </div>\n  );\n}\n\`\`\`\n\n## useEffect\n\n\`\`\`jsx\nimport { useState, useEffect } from 'react';\n\nfunction TituloDelDia() {\n  const [hora, setHora] = useState('');\n\n  useEffect(() => {\n    const ahora = new Date().toLocaleTimeString();\n    setHora(ahora);\n  }, []); // [] = solo se ejecuta una vez al montar\n\n  return <p>Hora actual: {hora}</p>;\n}\n\`\`\`\n\n## Dependencias de useEffect\n\n- \`[]\` – Ejecutar solo al montar\n- \`[valor]\` – Ejecutar cada vez que \`valor\` cambia\n- Sin array – Ejecutar en cada render`,
    order: 2,
    type: 'practice',
    xpReward: 80,
    estimatedMinutes: 30
  });

  const reactEx2 = await Exercise.create({
    lessonId: reactLesson2._id,
    moduleId: reactModule._id,
    title: 'Lista de tareas interactiva',
    description: 'Crea una lista de tareas con useState',
    instructions: 'Construye un componente "ListaTareas" que: 1) Muestre una lista de tareas, 2) Permita agregar nuevas tareas con un input y botón, 3) Permita marcar tareas como completadas haciendo clic en ellas. Las tareas completadas deben tener text-decoration: line-through.',
    starterCode: "import { useState } from 'react';\n\nfunction ListaTareas() {\n  const [tareas, setTareas] = useState([\n    { id: 1, texto: 'Aprender React', completada: false },\n    { id: 2, texto: 'Crear un proyecto', completada: false },\n  ]);\n  const [nuevaTarea, setNuevaTarea] = useState('');\n\n  const agregarTarea = () => {\n    // Tu código aquí\n  };\n\n  const toggleTarea = (id) => {\n    // Tu código aquí\n  };\n\n  return (\n    <div>\n      <h2>Mis Tareas</h2>\n      {/* Renderiza la lista y el formulario */}\n    </div>\n  );\n}\n",
    solutionCode: "import { useState } from 'react';\n\nfunction ListaTareas() {\n  const [tareas, setTareas] = useState([\n    { id: 1, texto: 'Aprender React', completada: false },\n    { id: 2, texto: 'Crear un proyecto', completada: false },\n  ]);\n  const [nuevaTarea, setNuevaTarea] = useState('');\n\n  const agregarTarea = () => {\n    if (!nuevaTarea.trim()) return;\n    setTareas([...tareas, { id: Date.now(), texto: nuevaTarea, completada: false }]);\n    setNuevaTarea('');\n  };\n\n  const toggleTarea = (id) => {\n    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));\n  };\n\n  return (\n    <div>\n      <h2>Mis Tareas</h2>\n      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>\n        <input value={nuevaTarea} onChange={e => setNuevaTarea(e.target.value)} placeholder=\"Nueva tarea...\" />\n        <button onClick={agregarTarea}>Agregar</button>\n      </div>\n      <ul style={{ listStyle: 'none', padding: 0 }}>\n        {tareas.map(t => (\n          <li key={t.id} onClick={() => toggleTarea(t.id)}\n            style={{ cursor: 'pointer', textDecoration: t.completada ? 'line-through' : 'none', padding: '0.5rem' }}>\n            {t.completada ? '✅' : '⬜'} {t.texto}\n          </li>\n        ))}\n      </ul>\n    </div>\n  );\n}",
    language: 'javascript',
    difficulty: 'intermediate',
    xpReward: 200,
    hints: ['Usa spread operator [...tareas, nuevaTarea] para agregar sin mutar el array', 'Para togglear usa .map() y el operador spread: { ...t, completada: !t.completada }'],
    order: 1
  });

  const reactLesson3 = await Lesson.create({
    moduleId: reactModule._id,
    title: 'Consumir APIs con fetch y useEffect',
    slug: 'react-api-fetch',
    content: `# Consumir APIs con React\n\nEn React, el lugar ideal para hacer peticiones HTTP es dentro de \`useEffect\`.\n\n## Ejemplo con fetch\n\n\`\`\`jsx\nimport { useState, useEffect } from 'react';\n\nfunction ListaUsuarios() {\n  const [usuarios, setUsuarios] = useState([]);\n  const [cargando, setCargando] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/users')\n      .then(res => res.json())\n      .then(data => {\n        setUsuarios(data);\n        setCargando(false);\n      })\n      .catch(err => {\n        setError(err.message);\n        setCargando(false);\n      });\n  }, []);\n\n  if (cargando) return <p>Cargando...</p>;\n  if (error) return <p>Error: {error}</p>;\n\n  return (\n    <ul>\n      {usuarios.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}\n\`\`\`\n\n## Buenas Prácticas\n\n- Siempre maneja los estados de **cargando** y **error**\n- Usa la función de limpieza de useEffect para cancelar peticiones\n- Considera librerías como **axios** o **react-query** para casos complejos`,
    order: 3,
    type: 'practice',
    xpReward: 90,
    estimatedMinutes: 35
  });

  const reactEx3 = await Exercise.create({
    lessonId: reactLesson3._id,
    moduleId: reactModule._id,
    title: 'Galería de posts de una API',
    description: 'Consume una API pública y muestra los datos en tarjetas',
    instructions: 'Crea un componente "GaleriaPosts" que: 1) Obtenga los primeros 6 posts de https://jsonplaceholder.typicode.com/posts?_limit=6, 2) Muestre un spinner mientras carga, 3) Muestre cada post en una tarjeta con su título y cuerpo truncado a 80 caracteres.',
    starterCode: "import { useState, useEffect } from 'react';\n\nfunction GaleriaPosts() {\n  const [posts, setPosts] = useState([]);\n  const [cargando, setCargando] = useState(true);\n\n  useEffect(() => {\n    // Fetch los posts aquí\n  }, []);\n\n  if (cargando) return <p>⏳ Cargando posts...</p>;\n\n  return (\n    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>\n      {/* Renderiza las tarjetas */}\n    </div>\n  );\n}\n",
    solutionCode: "import { useState, useEffect } from 'react';\n\nfunction GaleriaPosts() {\n  const [posts, setPosts] = useState([]);\n  const [cargando, setCargando] = useState(true);\n\n  useEffect(() => {\n    fetch('https://jsonplaceholder.typicode.com/posts?_limit=6')\n      .then(res => res.json())\n      .then(data => { setPosts(data); setCargando(false); })\n      .catch(() => setCargando(false));\n  }, []);\n\n  if (cargando) return <p>⏳ Cargando posts...</p>;\n\n  return (\n    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>\n      {posts.map(post => (\n        <div key={post.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>\n          <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>{post.title}</h3>\n          <p style={{ color: 'gray', fontSize: '0.9rem' }}>{post.body.slice(0, 80)}...</p>\n        </div>\n      ))}\n    </div>\n  );\n}",
    language: 'javascript',
    difficulty: 'intermediate',
    xpReward: 220,
    hints: ['Usa fetch(...).then(res => res.json()).then(data => setPosts(data))', 'Para truncar texto: texto.slice(0, 80) + "..."'],
    order: 1
  });

  await Module.findByIdAndUpdate(reactModule._id, {
    lessons: [reactLesson1._id, reactLesson2._id, reactLesson3._id],
    totalXP: 770
  });
  await Lesson.findByIdAndUpdate(reactLesson1._id, { exercises: [reactEx1._id] });
  await Lesson.findByIdAndUpdate(reactLesson2._id, { exercises: [reactEx2._id] });
  await Lesson.findByIdAndUpdate(reactLesson3._id, { exercises: [reactEx3._id] });

  // ─── Node.js & Express ─────────────────────────────────────────────────────
  const nodeModule = await Module.create({
    title: 'Node.js & Express',
    slug: 'nodejs',
    description: 'Desarrolla servidores backend con Node.js, Express y APIs REST.',
    icon: '🟢',
    color: '#22C55E',
    order: 4,
    isLocked: true,
    unlockPercentage: 70,
    prerequisites: [reactModule._id],
    estimatedHours: 12,
    tags: ['nodejs', 'backend', 'intermediate']
  });

  const nodeLesson1 = await Lesson.create({
    moduleId: nodeModule._id,
    title: 'Introducción a Node.js',
    slug: 'node-introduccion',
    content: `# Introducción a Node.js\n\nNode.js es un entorno de ejecución de JavaScript del lado del servidor, construido sobre el motor V8 de Chrome.\n\n## ¿Por qué Node.js?\n\n- **Mismo lenguaje** en frontend y backend\n- **No bloqueante**: E/S asíncrona y orientada a eventos\n- **npm**: el mayor ecosistema de paquetes del mundo\n- **Alto rendimiento** para APIs y aplicaciones en tiempo real\n\n## Módulos en Node.js\n\n\`\`\`javascript\n// CommonJS (tradicional)\nconst fs = require('fs');\nconst path = require('path');\n\n// ES Modules (moderno)\nimport fs from 'fs';\nimport path from 'path';\n\`\`\`\n\n## Tu primer servidor HTTP\n\n\`\`\`javascript\nconst http = require('http');\n\nconst servidor = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('¡Hola desde Node.js!');\n});\n\nservidor.listen(3000, () => {\n  console.log('Servidor en http://localhost:3000');\n});\n\`\`\`\n\n## Módulo fs (Sistema de Archivos)\n\n\`\`\`javascript\nconst fs = require('fs');\n\n// Leer archivo\nfs.readFile('datos.txt', 'utf8', (err, data) => {\n  if (err) throw err;\n  console.log(data);\n});\n\n// Escribir archivo\nfs.writeFile('salida.txt', 'Hola Node!', err => {\n  if (err) throw err;\n  console.log('Archivo guardado');\n});\n\`\`\``,
    order: 1,
    type: 'theory',
    xpReward: 60,
    estimatedMinutes: 20
  });

  const nodeEx1 = await Exercise.create({
    lessonId: nodeLesson1._id,
    moduleId: nodeModule._id,
    title: 'Servidor HTTP básico',
    description: 'Crea un servidor HTTP con Node.js que responda a distintas rutas',
    instructions: 'Crea un servidor HTTP con el módulo nativo "http" que: 1) Responda con "¡Bienvenido!" en la ruta "/", 2) Responda con "Sobre mí: [tu nombre]" en la ruta "/sobre", 3) Responda con status 404 y "Página no encontrada" en cualquier otra ruta.',
    starterCode: "const http = require('http');\n\nconst servidor = http.createServer((req, res) => {\n  // Maneja las rutas aquí\n});\n\nservidor.listen(3000, () => {\n  console.log('Servidor en http://localhost:3000');\n});\n",
    solutionCode: "const http = require('http');\n\nconst servidor = http.createServer((req, res) => {\n  res.setHeader('Content-Type', 'text/plain; charset=utf-8');\n\n  if (req.url === '/') {\n    res.writeHead(200);\n    res.end('¡Bienvenido!');\n  } else if (req.url === '/sobre') {\n    res.writeHead(200);\n    res.end('Sobre mí: Juan Developer');\n  } else {\n    res.writeHead(404);\n    res.end('Página no encontrada');\n  }\n});\n\nservidor.listen(3000, () => {\n  console.log('Servidor en http://localhost:3000');\n});",
    language: 'nodejs',
    difficulty: 'beginner',
    xpReward: 120,
    hints: ['Usa req.url para obtener la ruta solicitada', 'res.writeHead(statusCode) establece el código de estado'],
    order: 1
  });

  const nodeLesson2 = await Lesson.create({
    moduleId: nodeModule._id,
    title: 'Express.js y Rutas',
    slug: 'express-rutas',
    content: `# Express.js\n\nExpress es el framework web más popular para Node.js. Simplifica la creación de servidores y APIs.\n\n## Instalación\n\n\`\`\`bash\nnpm init -y\nnpm install express\n\`\`\`\n\n## Servidor básico con Express\n\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\napp.use(express.json()); // parsear JSON en el body\n\napp.get('/', (req, res) => {\n  res.send('¡Hola desde Express!');\n});\n\napp.listen(3000, () => console.log('Puerto 3000'));\n\`\`\`\n\n## Métodos HTTP\n\n\`\`\`javascript\napp.get('/usuarios', (req, res) => { /* leer */ });\napp.post('/usuarios', (req, res) => { /* crear */ });\napp.put('/usuarios/:id', (req, res) => { /* actualizar */ });\napp.delete('/usuarios/:id', (req, res) => { /* eliminar */ });\n\`\`\`\n\n## Parámetros y Query Strings\n\n\`\`\`javascript\n// Ruta: GET /productos/42\napp.get('/productos/:id', (req, res) => {\n  const { id } = req.params; // '42'\n  res.json({ id });\n});\n\n// Ruta: GET /buscar?nombre=manzana\napp.get('/buscar', (req, res) => {\n  const { nombre } = req.query; // 'manzana'\n  res.json({ busqueda: nombre });\n});\n\`\`\``,
    order: 2,
    type: 'theory',
    xpReward: 70,
    estimatedMinutes: 25
  });

  const nodeEx2 = await Exercise.create({
    lessonId: nodeLesson2._id,
    moduleId: nodeModule._id,
    title: 'API REST de productos',
    description: 'Crea una API REST básica para gestionar productos en memoria',
    instructions: 'Usando Express, crea una API con los siguientes endpoints: GET /productos (lista todos), GET /productos/:id (obtiene uno), POST /productos (crea nuevo con { nombre, precio }), DELETE /productos/:id (elimina por id). Los datos se almacenan en un array en memoria.',
    starterCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nlet productos = [\n  { id: 1, nombre: 'Laptop', precio: 999 },\n  { id: 2, nombre: 'Mouse', precio: 25 }\n];\n\n// GET /productos - listar todos\n\n// GET /productos/:id - obtener uno\n\n// POST /productos - crear nuevo\n\n// DELETE /productos/:id - eliminar\n\napp.listen(3000, () => console.log('API en puerto 3000'));\n",
    solutionCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nlet productos = [\n  { id: 1, nombre: 'Laptop', precio: 999 },\n  { id: 2, nombre: 'Mouse', precio: 25 }\n];\n\napp.get('/productos', (req, res) => {\n  res.json(productos);\n});\n\napp.get('/productos/:id', (req, res) => {\n  const producto = productos.find(p => p.id === parseInt(req.params.id));\n  if (!producto) return res.status(404).json({ error: 'No encontrado' });\n  res.json(producto);\n});\n\napp.post('/productos', (req, res) => {\n  const { nombre, precio } = req.body;\n  const nuevo = { id: Date.now(), nombre, precio };\n  productos.push(nuevo);\n  res.status(201).json(nuevo);\n});\n\napp.delete('/productos/:id', (req, res) => {\n  const id = parseInt(req.params.id);\n  productos = productos.filter(p => p.id !== id);\n  res.json({ mensaje: 'Producto eliminado' });\n});\n\napp.listen(3000, () => console.log('API en puerto 3000'));",
    language: 'nodejs',
    difficulty: 'intermediate',
    xpReward: 200,
    hints: ['Usa res.json() para responder con JSON', 'Para encontrar un elemento usa .find(), para filtrar usa .filter()', 'parseInt(req.params.id) convierte el string del ID a número'],
    order: 1
  });

  const nodeLesson3 = await Lesson.create({
    moduleId: nodeModule._id,
    title: 'Middleware y Manejo de Errores',
    slug: 'express-middleware',
    content: `# Middleware en Express\n\nEl middleware son funciones que tienen acceso al objeto \`req\`, \`res\` y la función \`next\`.\n\n## ¿Qué es el Middleware?\n\n\`\`\`javascript\n// Middleware de logging\nconst logger = (req, res, next) => {\n  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);\n  next(); // pasar al siguiente middleware\n};\n\napp.use(logger);\n\`\`\`\n\n## Middleware de Autenticación\n\n\`\`\`javascript\nconst autenticar = (req, res, next) => {\n  const token = req.headers.authorization;\n  if (!token) {\n    return res.status(401).json({ error: 'Sin autorización' });\n  }\n  // verificar token...\n  next();\n};\n\n// Aplicar solo a rutas protegidas\napp.get('/perfil', autenticar, (req, res) => {\n  res.json({ mensaje: 'Perfil privado' });\n});\n\`\`\`\n\n## Manejo Global de Errores\n\n\`\`\`javascript\n// Siempre al final, con 4 parámetros\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    error: 'Error interno del servidor',\n    message: err.message\n  });\n});\n\`\`\``,
    order: 3,
    type: 'practice',
    xpReward: 80,
    estimatedMinutes: 30
  });

  const nodeEx3 = await Exercise.create({
    lessonId: nodeLesson3._id,
    moduleId: nodeModule._id,
    title: 'Middleware de validación',
    description: 'Crea middleware para validar datos de entrada',
    instructions: 'Crea un middleware "validarProducto" que verifique que el body de la petición tenga "nombre" (string no vacío) y "precio" (número mayor que 0). Si la validación falla, responde con status 400 y un mensaje de error descriptivo. Aplícalo a la ruta POST /productos.',
    starterCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\n// Middleware de validación\nconst validarProducto = (req, res, next) => {\n  // Tu código aquí\n};\n\napp.post('/productos', validarProducto, (req, res) => {\n  const { nombre, precio } = req.body;\n  res.status(201).json({ id: Date.now(), nombre, precio });\n});\n\napp.listen(3000);\n",
    solutionCode: "const express = require('express');\nconst app = express();\napp.use(express.json());\n\nconst validarProducto = (req, res, next) => {\n  const { nombre, precio } = req.body;\n  const errores = [];\n\n  if (!nombre || typeof nombre !== 'string' || nombre.trim() === '') {\n    errores.push('El nombre es obligatorio y debe ser un texto no vacío');\n  }\n  if (precio === undefined || typeof precio !== 'number' || precio <= 0) {\n    errores.push('El precio debe ser un número mayor que 0');\n  }\n\n  if (errores.length > 0) {\n    return res.status(400).json({ errores });\n  }\n\n  next();\n};\n\napp.post('/productos', validarProducto, (req, res) => {\n  const { nombre, precio } = req.body;\n  res.status(201).json({ id: Date.now(), nombre, precio });\n});\n\napp.listen(3000);",
    language: 'nodejs',
    difficulty: 'intermediate',
    xpReward: 180,
    hints: ['Usa un array "errores" para acumular mensajes de error', 'Si hay errores, usa return para evitar llamar a next()', 'Verifica el tipo con typeof nombre !== "string"'],
    order: 1
  });

  await Module.findByIdAndUpdate(nodeModule._id, {
    lessons: [nodeLesson1._id, nodeLesson2._id, nodeLesson3._id],
    totalXP: 710
  });
  await Lesson.findByIdAndUpdate(nodeLesson1._id, { exercises: [nodeEx1._id] });
  await Lesson.findByIdAndUpdate(nodeLesson2._id, { exercises: [nodeEx2._id] });
  await Lesson.findByIdAndUpdate(nodeLesson3._id, { exercises: [nodeEx3._id] });

  // ─── MongoDB ────────────────────────────────────────────────────────────────
  const mongoModule = await Module.create({
    title: 'MongoDB',
    slug: 'mongodb',
    description: 'Aprende bases de datos NoSQL con MongoDB y Mongoose.',
    icon: '🍃',
    color: '#16A34A',
    order: 5,
    isLocked: true,
    unlockPercentage: 70,
    prerequisites: [nodeModule._id],
    estimatedHours: 10,
    tags: ['mongodb', 'database', 'intermediate']
  });

  const mongoLesson1 = await Lesson.create({
    moduleId: mongoModule._id,
    title: 'Fundamentos de MongoDB',
    slug: 'mongodb-fundamentos',
    content: `# Fundamentos de MongoDB\n\nMongoDB es una base de datos NoSQL orientada a documentos. En lugar de tablas y filas, usa **colecciones** y **documentos** JSON.\n\n## Conceptos Clave\n\n| SQL | MongoDB |\n|-----|---------|\n| Base de datos | Base de datos |\n| Tabla | Colección |\n| Fila | Documento |\n| Columna | Campo |\n\n## Estructura de un Documento\n\n\`\`\`json\n{\n  "_id": "ObjectId(\"64a1b2c3d4e5f6789012\")",\n  "nombre": "Ana García",\n  "edad": 28,\n  "email": "ana@ejemplo.com",\n  "habilidades": ["JavaScript", "React", "Node.js"],\n  "direccion": {\n    "ciudad": "Madrid",\n    "pais": "España"\n  }\n}\n\`\`\`\n\n## Comandos Básicos de MongoDB Shell\n\n\`\`\`javascript\n// Mostrar bases de datos\nshow dbs\n\n// Usar/crear base de datos\nuse miBaseDeDatos\n\n// Insertar\ndb.usuarios.insertOne({ nombre: 'Ana', edad: 28 })\n\n// Buscar todos\ndb.usuarios.find()\n\n// Buscar con filtro\ndb.usuarios.find({ edad: { $gte: 18 } })\n\n// Actualizar\ndb.usuarios.updateOne({ nombre: 'Ana' }, { $set: { edad: 29 } })\n\n// Eliminar\ndb.usuarios.deleteOne({ nombre: 'Ana' })\n\`\`\``,
    order: 1,
    type: 'theory',
    xpReward: 60,
    estimatedMinutes: 20
  });

  const mongoEx1 = await Exercise.create({
    lessonId: mongoLesson1._id,
    moduleId: mongoModule._id,
    title: 'Consultas MongoDB básicas',
    description: 'Practica las operaciones CRUD en MongoDB Shell',
    instructions: 'Escribe los comandos de MongoDB para: 1) Insertar 3 productos con nombre, precio y categoria, 2) Buscar todos los productos con precio mayor a 50, 3) Actualizar el precio del primer producto a 99, 4) Eliminar productos con precio menor a 20.',
    starterCode: "// 1. Insertar 3 productos\n\n// 2. Buscar productos con precio > 50\n\n// 3. Actualizar precio del primer producto a 99\n\n// 4. Eliminar productos con precio < 20\n",
    solutionCode: "// 1. Insertar 3 productos\ndb.productos.insertMany([\n  { nombre: 'Laptop', precio: 999, categoria: 'tecnologia' },\n  { nombre: 'Mouse', precio: 25, categoria: 'tecnologia' },\n  { nombre: 'Cuaderno', precio: 5, categoria: 'papeleria' }\n]);\n\n// 2. Buscar productos con precio > 50\ndb.productos.find({ precio: { $gt: 50 } });\n\n// 3. Actualizar precio del primer producto a 99\ndb.productos.updateOne(\n  { nombre: 'Laptop' },\n  { $set: { precio: 99 } }\n);\n\n// 4. Eliminar productos con precio < 20\ndb.productos.deleteMany({ precio: { $lt: 20 } });",
    language: 'javascript',
    difficulty: 'beginner',
    xpReward: 120,
    hints: ['Usa $gt para "mayor que" y $lt para "menor que"', 'insertMany acepta un array de documentos', 'updateOne recibe el filtro y luego { $set: { campo: valor } }'],
    order: 1
  });

  const mongoLesson2 = await Lesson.create({
    moduleId: mongoModule._id,
    title: 'Mongoose: ODM para Node.js',
    slug: 'mongoose-odm',
    content: `# Mongoose\n\nMongoose es una librería ODM (Object Document Mapper) que facilita el trabajo con MongoDB desde Node.js.\n\n## Instalación y Conexión\n\n\`\`\`javascript\nnpm install mongoose\n\`\`\`\n\n\`\`\`javascript\nconst mongoose = require('mongoose');\n\nmongoose.connect('mongodb://localhost:27017/miApp')\n  .then(() => console.log('Conectado a MongoDB'))\n  .catch(err => console.error('Error:', err));\n\`\`\`\n\n## Definir un Schema y Model\n\n\`\`\`javascript\nconst { Schema, model } = require('mongoose');\n\nconst productoSchema = new Schema({\n  nombre: { type: String, required: true, trim: true },\n  precio: { type: Number, required: true, min: 0 },\n  categoria: { type: String, enum: ['tecnologia', 'ropa', 'hogar'] },\n  stock: { type: Number, default: 0 },\n  creadoEn: { type: Date, default: Date.now }\n});\n\nconst Producto = model('Producto', productoSchema);\nmodule.exports = Producto;\n\`\`\`\n\n## Operaciones CRUD con Mongoose\n\n\`\`\`javascript\n// Crear\nconst producto = await Producto.create({ nombre: 'Laptop', precio: 999 });\n\n// Leer\nconst todos = await Producto.find();\nconst uno = await Producto.findById(id);\nconst filtrados = await Producto.find({ precio: { $gte: 100 } });\n\n// Actualizar\nconst actualizado = await Producto.findByIdAndUpdate(id, { precio: 899 }, { new: true });\n\n// Eliminar\nawait Producto.findByIdAndDelete(id);\n\`\`\``,
    order: 2,
    type: 'theory',
    xpReward: 70,
    estimatedMinutes: 25
  });

  const mongoEx2 = await Exercise.create({
    lessonId: mongoLesson2._id,
    moduleId: mongoModule._id,
    title: 'Schema de usuario con Mongoose',
    description: 'Diseña y valida un schema de usuario con Mongoose',
    instructions: 'Crea un schema de Mongoose para un "Usuario" con: nombre (string, requerido, mínimo 2 caracteres), email (string, requerido, único, en minúsculas), password (string, requerido, mínimo 6 caracteres), rol (string, enum: ["estudiante","admin"], default: "estudiante"), creadoEn (Date, default: Date.now). Luego exporta el modelo.',
    starterCode: "const mongoose = require('mongoose');\nconst { Schema, model } = mongoose;\n\nconst usuarioSchema = new Schema({\n  // Define los campos aquí\n});\n\nconst Usuario = model('Usuario', usuarioSchema);\nmodule.exports = Usuario;\n",
    solutionCode: "const mongoose = require('mongoose');\nconst { Schema, model } = mongoose;\n\nconst usuarioSchema = new Schema({\n  nombre: {\n    type: String,\n    required: [true, 'El nombre es obligatorio'],\n    minlength: [2, 'El nombre debe tener al menos 2 caracteres'],\n    trim: true\n  },\n  email: {\n    type: String,\n    required: [true, 'El email es obligatorio'],\n    unique: true,\n    lowercase: true,\n    trim: true\n  },\n  password: {\n    type: String,\n    required: [true, 'La contraseña es obligatoria'],\n    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']\n  },\n  rol: {\n    type: String,\n    enum: ['estudiante', 'admin'],\n    default: 'estudiante'\n  },\n  creadoEn: {\n    type: Date,\n    default: Date.now\n  }\n});\n\nconst Usuario = model('Usuario', usuarioSchema);\nmodule.exports = Usuario;",
    language: 'nodejs',
    difficulty: 'intermediate',
    xpReward: 180,
    hints: ['Para mensajes de error personalizados usa: required: [true, "mensaje"]', 'El atributo unique: true crea un índice único en la colección', 'trim: true elimina espacios al inicio y al final automáticamente'],
    order: 1
  });

  const mongoLesson3 = await Lesson.create({
    moduleId: mongoModule._id,
    title: 'Relaciones y Populate',
    slug: 'mongoose-populate',
    content: `# Relaciones y Populate en Mongoose\n\nEn MongoDB, las relaciones se pueden manejar de dos formas: **embebiendo** documentos o usando **referencias**.\n\n## Referencias con ObjectId\n\n\`\`\`javascript\nconst comentarioSchema = new Schema({\n  texto: String,\n  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },\n  post: { type: Schema.Types.ObjectId, ref: 'Post' }\n});\n\`\`\`\n\n## Populate: Unir Documentos\n\n\`\`\`javascript\n// Sin populate\nconst comentario = await Comentario.findById(id);\n// { texto: '...', autor: '64a1b2c3...', post: '64a1b2d4...' }\n\n// Con populate\nconst comentario = await Comentario.findById(id)\n  .populate('autor', 'nombre email') // solo estos campos\n  .populate('post', 'titulo');\n// { texto: '...', autor: { nombre: 'Ana', email: '...' }, post: { titulo: '...' } }\n\`\`\`\n\n## Ejemplo Completo: Posts y Comentarios\n\n\`\`\`javascript\nconst postSchema = new Schema({\n  titulo: String,\n  contenido: String,\n  autor: { type: Schema.Types.ObjectId, ref: 'Usuario' },\n  comentarios: [{ type: Schema.Types.ObjectId, ref: 'Comentario' }]\n});\n\n// Obtener post con autor y comentarios\nconst post = await Post.findById(id)\n  .populate('autor', 'nombre avatar')\n  .populate({ path: 'comentarios', populate: { path: 'autor', select: 'nombre' } });\n\`\`\`\n\n## ¿Embeber o Referenciar?\n\n- **Embeber**: datos que siempre se usan juntos, no cambian mucho (comentarios cortos, direcciones)\n- **Referenciar**: datos grandes, compartidos entre documentos o que cambian frecuentemente (usuarios, productos)`,
    order: 3,
    type: 'practice',
    xpReward: 90,
    estimatedMinutes: 35
  });

  const mongoEx3 = await Exercise.create({
    lessonId: mongoLesson3._id,
    moduleId: mongoModule._id,
    title: 'API con relaciones Mongoose',
    description: 'Crea schemas relacionados y una consulta con populate',
    instructions: 'Crea dos schemas: Autor (nombre, email) y Libro (titulo, año, autor como referencia a Autor). Luego escribe una función async "obtenerLibrosConAutor" que retorne todos los libros con la información del autor completa usando populate.',
    starterCode: "const mongoose = require('mongoose');\nconst { Schema, model } = mongoose;\n\n// Schema Autor\nconst autorSchema = new Schema({\n  // Definir campos\n});\n\n// Schema Libro con referencia a Autor\nconst libroSchema = new Schema({\n  // Definir campos\n});\n\nconst Autor = model('Autor', autorSchema);\nconst Libro = model('Libro', libroSchema);\n\n// Función para obtener libros con su autor\nasync function obtenerLibrosConAutor() {\n  // Tu código aquí\n}\n\nmodule.exports = { Autor, Libro, obtenerLibrosConAutor };\n",
    solutionCode: "const mongoose = require('mongoose');\nconst { Schema, model } = mongoose;\n\nconst autorSchema = new Schema({\n  nombre: { type: String, required: true },\n  email: { type: String, required: true, unique: true }\n});\n\nconst libroSchema = new Schema({\n  titulo: { type: String, required: true },\n  anio: { type: Number, required: true },\n  autor: { type: Schema.Types.ObjectId, ref: 'Autor', required: true }\n});\n\nconst Autor = model('Autor', autorSchema);\nconst Libro = model('Libro', libroSchema);\n\nasync function obtenerLibrosConAutor() {\n  return await Libro.find().populate('autor', 'nombre email');\n}\n\nmodule.exports = { Autor, Libro, obtenerLibrosConAutor };",
    language: 'nodejs',
    difficulty: 'intermediate',
    xpReward: 220,
    hints: ['Para referenciar usa: { type: Schema.Types.ObjectId, ref: "NombreModelo" }', '.populate("autor") rellena el campo autor con los datos del documento Autor', 'El segundo argumento de populate selecciona los campos: populate("autor", "nombre email")'],
    order: 1
  });

  await Module.findByIdAndUpdate(mongoModule._id, {
    lessons: [mongoLesson1._id, mongoLesson2._id, mongoLesson3._id],
    totalXP: 740
  });
  await Lesson.findByIdAndUpdate(mongoLesson1._id, { exercises: [mongoEx1._id] });
  await Lesson.findByIdAndUpdate(mongoLesson2._id, { exercises: [mongoEx2._id] });
  await Lesson.findByIdAndUpdate(mongoLesson3._id, { exercises: [mongoEx3._id] });

  console.log('✅ Seed completed successfully!');
  await mongoose.connection.close();
};

seedData().catch(console.error);
