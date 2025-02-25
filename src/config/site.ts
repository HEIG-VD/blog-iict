export const siteConfig = {
  institute: {
    name: 'IICT',
    fullName: 'Institut des Technologies de l\'Information et de la Communication',
    school: 'HEIG-VD',
    url: 'https://www.heig-vd.ch/recherche/instituts/iict/',
    baseUrl: 'https://iict.heig-vd.ch'
  },
  social: {
    twitter: 'heigvd',
    linkedin: 'https://www.linkedin.com/school/heig-vd',
    youtube: 'https://www.youtube.com/@HEIGVD'
  },
  address: {
    street: 'Route de Cheseaux 1',
    postBox: 'Case postale 521',
    city: '1401 Yverdon-les-Bains'
  }
} as const;

export type SiteConfig = typeof siteConfig; 