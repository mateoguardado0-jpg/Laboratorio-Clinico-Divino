const AREA_IDS = [
  'quimica-clinica',
  'hematologia',
  'coagulacion',
  'quimica-urinaria',
  'inmunohematologia',
  'uroanalisis',
  'coprologia',
  'inmunologia-serologia',
  'microbiologia',
  'hormonas-tiroides',
  'perfiles-preventivos',
  'pruebas-especiales',
]

const SERVICE_SPECS = [
  { areaId: 'quimica-clinica', slug: 'quimica-clinica' },
  { areaId: 'hematologia', slug: 'hematologia' },
  { areaId: 'coagulacion', slug: 'coagulacion' },
  { areaId: 'quimica-urinaria', slug: 'quimica-urinaria' },
  { areaId: 'inmunohematologia', slug: 'inmunohematologia' },
  { areaId: 'uroanalisis', slug: 'uroanalisis' },
  { areaId: 'coprologia', slug: 'coprologia' },
  { areaId: 'inmunologia-serologia', slug: 'inmunologia-serologia' },
  { areaId: 'microbiologia', slug: 'microbiologia' },
  { areaId: 'hormonas-tiroides', slug: 'hormonas-tiroides' },
  { areaId: 'perfiles-preventivos', slug: 'perfiles-preventivos' },
  { areaId: 'pruebas-especiales', slug: 'pruebas-especiales' },
]

/**
 * Catálogo internacionalizado. Conserva areaId/slug estables para no romper rutas ni búsqueda.
 */
export function getCatalogData(t) {
  const areasLaboratorio = AREA_IDS.map((id) => ({
    id,
    label: t(`catalog.areas.${id}`),
  }))

  const servicios = SERVICE_SPECS.map(({ areaId, slug }) => {
    const base = t(`catalog.services.${slug}`)
    return {
      areaId,
      slug,
      title: base.title,
      desc: base.desc,
      examenes: base.exams.map((exam) => ({
        nombre: exam.nombre,
        requisitos: exam.requisitos,
        tiempoEntrega: exam.tiempoEntrega,
      })),
    }
  })

  return { areasLaboratorio, servicios }
}
