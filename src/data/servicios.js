/**
 * Catálogo de servicios con exámenes, requisitos y tiempo de entrega por examen.
 * Origen único para la lista (Servicios) y el detalle (ServicioDetalle).
 */
export const servicios = [
  {
    slug: 'hematologia-completa',
    title: 'Hematología completa',
    desc: 'Indicadores esenciales para un seguimiento confiable.',
    examenes: [
      { nombre: 'Biometría hemática', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24 horas' },
      { nombre: 'Velocidad de sedimentación globular (VSG)', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24 horas' },
      { nombre: 'Frotis de sangre periférica', requisitos: ['Ayuno no requerido.', 'Indicar medicación actual si aplica.'], tiempoEntrega: '24-48 horas' },
    ],
  },
  {
    slug: 'quimica-clinica',
    title: 'Química clínica',
    desc: 'Paneles metabólicos y pruebas de rutina.',
    examenes: [
      { nombre: 'Panel metabólico básico', requisitos: ['Ayuno de 8-12 horas.', 'Solo agua permitida.'], tiempoEntrega: '24 horas' },
      { nombre: 'Panel metabólico completo', requisitos: ['Ayuno de 8-12 horas.', 'Indicar medicación actual.'], tiempoEntrega: '24-48 horas' },
      { nombre: 'Creatinina y BUN', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24 horas' },
    ],
  },
  {
    slug: 'perfil-lipidico',
    title: 'Perfil lipídico',
    desc: 'Control y prevención con resultados claros.',
    examenes: [
      { nombre: 'Colesterol total', requisitos: ['Ayuno de 9-12 horas.'], tiempoEntrega: '24 horas' },
      { nombre: 'Perfil lipídico completo (HDL, LDL, VLDL, triglicéridos)', requisitos: ['Ayuno de 9-12 horas.', 'Evitar alcohol 24 h antes.'], tiempoEntrega: '24-48 horas' },
    ],
  },
  {
    slug: 'glicemia-hba1c',
    title: 'Glicemia y HbA1c',
    desc: 'Monitoreo y control con enfoque preventivo.',
    examenes: [
      { nombre: 'Glicemia en ayunas', requisitos: ['Ayuno de 8-12 horas.', 'Solo agua permitida.'], tiempoEntrega: '24 horas' },
      { nombre: 'Hemoglobina glicada (HbA1c)', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24-48 horas' },
      { nombre: 'Curva de tolerancia a la glucosa', requisitos: ['Ayuno de 8-12 horas.', 'Asistir con cita programada.'], tiempoEntrega: 'Mismo día (interpretación 24 h)' },
    ],
  },
  {
    slug: 'inmunologia',
    title: 'Inmunología',
    desc: 'Apoyo diagnóstico con procesos estandarizados.',
    examenes: [
      { nombre: 'PCR cuantitativa', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24 horas' },
      { nombre: 'Factor reumatoide', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24-48 horas' },
      { nombre: 'Anticuerpos específicos (según solicitud)', requisitos: ['Indicar estudio solicitado por el médico.'], tiempoEntrega: 'Según disponibilidad' },
    ],
  },
  {
    slug: 'orina-heces',
    title: 'Orina y heces',
    desc: 'Pruebas básicas con lectura cuidadosa y oportuna.',
    examenes: [
      { nombre: 'Examen general de orina', requisitos: ['Muestra de primera orina de la mañana.', 'Limpieza del área genital.'], tiempoEntrega: '24 horas' },
      { nombre: 'Coproparasitológico', requisitos: ['Muestra reciente (menos de 2 horas).', 'Evitar laxantes 72 h antes.'], tiempoEntrega: '24-48 horas' },
      { nombre: 'Sangre oculta en heces', requisitos: ['Dieta sin carnes rojas 3 días antes.', 'Indicar medicación.'], tiempoEntrega: '48 horas' },
    ],
  },
  {
    slug: 'marcadores-generales',
    title: 'Marcadores generales',
    desc: 'Opciones de apoyo clínico según disponibilidad.',
    examenes: [
      { nombre: 'Marcadores tumorales (según solicitud)', requisitos: ['Ayuno según tipo de marcador.', 'Traer orden médica.'], tiempoEntrega: '48-72 horas' },
      { nombre: 'Proteína C reactiva', requisitos: ['Ayuno no requerido.'], tiempoEntrega: '24 horas' },
    ],
  },
  {
    slug: 'pruebas-rapidas',
    title: 'Pruebas rápidas',
    desc: 'Tiempo de respuesta ágil con comunicación clara.',
    examenes: [
      { nombre: 'Prueba rápida de embarazo', requisitos: ['Muestra de orina preferiblemente matutina.'], tiempoEntrega: 'Mismo día' },
      { nombre: 'Glucómetro (glicemia capilar)', requisitos: ['Indicar si en ayunas o posprandial.'], tiempoEntrega: 'Mismo día' },
      { nombre: 'Pruebas rápidas de dengue/COVID (según disponibilidad)', requisitos: ['Consultar requisitos al agendar.'], tiempoEntrega: 'Mismo día' },
    ],
  },
  {
    slug: 'paquetes-preventivos',
    title: 'Paquetes preventivos',
    desc: 'Chequeos recomendados para control periódico.',
    examenes: [
      { nombre: 'Check-up básico (hematología + química básica)', requisitos: ['Ayuno de 8-12 horas.'], tiempoEntrega: '24-48 horas' },
      { nombre: 'Check-up ejecutivo (perfil ampliado)', requisitos: ['Ayuno de 9-12 horas.', 'Traer orden o indicar paquete.'], tiempoEntrega: '48 horas' },
      { nombre: 'Perfil tiroideo', requisitos: ['Ayuno no requerido.', 'Indicar si toma hormonas tiroideas.'], tiempoEntrega: '24-48 horas' },
    ],
  },
]
