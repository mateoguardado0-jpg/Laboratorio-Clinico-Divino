const AREA_IDS = [
  'hematologia',
  'quimica-clinica',
  'uroanalisis',
  'coprologia',
  'inmunologia-serologia',
  'hormonas-tiroides',
  'perfiles-preventivos',
]

const SERVICE_SPECS = [
  { areaId: 'hematologia', slug: 'hematologia' },
  { areaId: 'quimica-clinica', slug: 'quimica-clinica' },
  { areaId: 'uroanalisis', slug: 'uroanalisis' },
  { areaId: 'coprologia', slug: 'coprologia' },
  { areaId: 'inmunologia-serologia', slug: 'inmunologia-serologia' },
  { areaId: 'hormonas-tiroides', slug: 'hormonas-tiroides' },
  { areaId: 'perfiles-preventivos', slug: 'perfiles-preventivos' },
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
