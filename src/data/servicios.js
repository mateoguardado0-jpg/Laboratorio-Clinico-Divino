/**
 * Áreas del Laboratorio. Orden y etiquetas para agrupar servicios.
 */
export const areasLaboratorio = [
  { id: 'hematologia', label: 'Hematología' },
  { id: 'quimica-clinica', label: 'Química Clínica' },
  { id: 'uroanalisis', label: 'Uroanálisis' },
  { id: 'coprologia', label: 'Coprología' },
  { id: 'inmunologia-serologia', label: 'Inmunología y Serología' },
  { id: 'hormonas-tiroides', label: 'Hormonas y Tiroides' },
  { id: 'perfiles-preventivos', label: 'Perfiles Preventivos' },
]

/**
 * Catálogo de servicios con exámenes, requisitos y tiempo de entrega por examen.
 * Cada servicio pertenece a un área del laboratorio.
 */
export const servicios = [
  // —— 1️⃣ Hematología ——
  {
    areaId: 'hematologia',
    slug: 'hematologia',
    title: 'Hematología',
    desc: 'Estudios de sangre para seguimiento y diagnóstico.',
    examenes: [
      {
        nombre: 'Hemograma Completo',
        requisitos: ['No requiere ayuno (salvo indicación médica).'],
        tiempoEntrega: 'Mismo día o 24 horas',
      },
      {
        nombre: 'Grupo Sanguíneo y RH',
        requisitos: ['No requiere preparación.'],
        tiempoEntrega: 'Mismo día',
      },
      {
        nombre: 'Tiempo de Protrombina (TP / INR)',
        requisitos: ['Informar si toma anticoagulantes.'],
        tiempoEntrega: 'Mismo día',
      },
    ],
  },
  // —— 2️⃣ Química Clínica ——
  {
    areaId: 'quimica-clinica',
    slug: 'quimica-clinica',
    title: 'Química Clínica',
    desc: 'Paneles metabólicos, glucosa, perfil lipídico y función renal y hepática.',
    examenes: [
      {
        nombre: 'Glucosa en Ayunas',
        requisitos: ['Ayuno de 8–12 horas.'],
        tiempoEntrega: 'Mismo día',
      },
      {
        nombre: 'Perfil Lipídico',
        requisitos: ['Ayuno de 8–12 horas.'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'Creatinina y Urea',
        requisitos: ['Ayuno recomendado 8 horas.'],
        tiempoEntrega: 'Mismo día',
      },
      {
        nombre: 'Pruebas Hepáticas',
        requisitos: ['Ayuno de 8 horas.'],
        tiempoEntrega: '24 horas',
      },
    ],
  },
  // —— 3️⃣ Uroanálisis ——
  {
    areaId: 'uroanalisis',
    slug: 'uroanalisis',
    title: 'Uroanálisis',
    desc: 'Análisis de orina y prueba de embarazo.',
    examenes: [
      {
        nombre: 'Examen General de Orina',
        requisitos: ['Primera orina de la mañana, muestra limpia en frasco estéril.'],
        tiempoEntrega: 'Mismo día',
      },
      {
        nombre: 'Prueba de Embarazo en Orina',
        requisitos: ['Primera orina del día recomendada.'],
        tiempoEntrega: 'Mismo día',
      },
    ],
  },
  // —— 4️⃣ Coprología ——
  {
    areaId: 'coprologia',
    slug: 'coprologia',
    title: 'Coprología',
    desc: 'Estudios de heces: general, parasitológico y sangre oculta.',
    examenes: [
      {
        nombre: 'Examen General de Heces',
        requisitos: ['Muestra reciente en recipiente limpio.'],
        tiempoEntrega: 'Mismo día',
      },
      {
        nombre: 'Parasitológico',
        requisitos: ['Puede requerir muestra seriada (3 días).'],
        tiempoEntrega: '24–48 horas',
      },
      {
        nombre: 'Sangre Oculta en Heces',
        requisitos: ['Evitar carnes rojas y ciertos medicamentos 48 horas antes.'],
        tiempoEntrega: '24 horas',
      },
    ],
  },
  // —— 5️⃣ Inmunología y Serología ——
  {
    areaId: 'inmunologia-serologia',
    slug: 'inmunologia-serologia',
    title: 'Inmunología y Serología',
    desc: 'VIH, hepatitis, sífilis y dengue.',
    examenes: [
      {
        nombre: 'VIH',
        requisitos: ['No requiere ayuno.'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'Hepatitis B y C',
        requisitos: ['No requiere preparación especial.'],
        tiempoEntrega: '24–48 horas',
      },
      {
        nombre: 'VDRL (Sífilis)',
        requisitos: ['No requiere ayuno.'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'Dengue',
        requisitos: ['No requiere preparación especial.'],
        tiempoEntrega: 'Mismo día o 24 horas',
      },
    ],
  },
  // —— 6️⃣ Hormonas y Tiroides ——
  {
    areaId: 'hormonas-tiroides',
    slug: 'hormonas-tiroides',
    title: 'Hormonas y Tiroides',
    desc: 'TSH, T3, T4 e insulina.',
    examenes: [
      {
        nombre: 'TSH',
        requisitos: ['No requiere ayuno (preferible en la mañana).'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'T3 y T4',
        requisitos: ['No requiere preparación especial.'],
        tiempoEntrega: '24–48 horas',
      },
      {
        nombre: 'Insulina',
        requisitos: ['Ayuno de 8 horas.'],
        tiempoEntrega: '24 horas',
      },
    ],
  },
  // —— 7️⃣ Perfiles Preventivos ——
  {
    areaId: 'perfiles-preventivos',
    slug: 'perfiles-preventivos',
    title: 'Perfiles Preventivos',
    desc: 'Chequeo general, perfil diabético y perfil tiroideo.',
    examenes: [
      {
        nombre: 'Chequeo General',
        requisitos: ['Incluye: Hemograma, glucosa, perfil lipídico y orina.', 'Ayuno de 8–12 horas.'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'Perfil Diabético',
        requisitos: ['Incluye: Glucosa y HbA1c.', 'Ayuno de 8 horas.'],
        tiempoEntrega: '24 horas',
      },
      {
        nombre: 'Perfil Tiroideo',
        requisitos: ['Incluye: TSH, T3 y T4.', 'No requiere ayuno.'],
        tiempoEntrega: '24–48 horas',
      },
    ],
  },
]
