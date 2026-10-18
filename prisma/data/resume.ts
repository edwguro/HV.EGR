export interface ResumeExperience {
  certificateUrl?: string;
  company: string;
  description: string;
  endDate?: string;
  isCurrent: boolean;
  location?: string;
  role: string;
  startDate: string;
}

export interface ResumeEducation {
  certificateUrl?: string;
  degree: string;
  description?: string;
  endDate?: string;
  field?: string;
  institution: string;
  startDate?: string;
}

export const resumeData = {
  profile: {
    fullName: 'Edwin Gustavo Rodríguez Balcázares',
    headline: 'Desarrollador de software · Backend, APIs y aplicaciones web',
    professionalSummary:
      'Soy Ingeniero de Sistemas y Tecnólogo en Desarrollo de Software y Redes, con más de 20 años de trayectoria en seguridad, análisis de riesgos y protección de personas. Hoy aplico ese criterio al desarrollo de software de producción. Como desarrollador autónomo he diseñado, construido y desplegado dos sistemas web para clientes externos: EDS La Fortaleza y Pautas JI. Trabajo con arquitecturas monolíticas Node.js/Express, PostgreSQL y MySQL, Docker, PWA y Railway; incorporo sesiones persistentes, control de acceso por roles, consultas parametrizadas, hash de contraseñas y auditoría de acciones.',
    location: 'Villavicencio, Meta, Colombia',
    email: 'rodriguezedwingustavo@gmail.com',
    githubUrl: 'https://github.com/edwguro',
    linkedinUrl:
      'https://www.linkedin.com/in/edwin-gustavo-rodriguez-balcazares/',
    cvUrl: null,
  },

  // Añade primero tu experiencia más reciente. Copia el bloque de ejemplo por cada cargo.
  experiences: [
    {
      company: 'EDS Texaco La Fortaleza',
      role: 'Manager General',
      description:
        'Administrador general de EDS La Fortaleza. Diseñé, desarrollé y administro la aplicación que centraliza y automatiza la operación de la empresa, facilita una gestión clara, auditable y con trazabilidad, y convierte los datos en información para la toma de decisiones en tiempo real.',
      location: 'Villavicencio, Meta',
      startDate: '2024-01-01',
      isCurrent: true,
      certificateUrl: '/documents/certificado-eds-la-fortaleza.pdf',
    },
    {
      company: 'Meta Tech Software Solution',
      role: 'Fundador y Desarrollador Full Stack',
      description:
        'Diseño, desarrollo y despliegue autónomo de soluciones de software para clientes y organizaciones. He construido y mantengo EDS La Fortaleza y Pautas JI: sistemas web en producción para gestión operativa, financiera y comercial. Aplico Node.js, Express, PostgreSQL, MySQL, Docker, PWA, Railway y prácticas de seguridad como RBAC, sesiones persistentes, consultas parametrizadas, hash de contraseñas y auditoría.',
      location: 'Villavicencio, Meta',
      startDate: '2025-12-01',
      isCurrent: true,
    },
    {
      company: 'Unidad Nacional de Protección (UNP) · Contratista',
      role: 'Hombre de Protección',
      description:
        'Protección de altos dignatarios del Estado. He integrado esquemas de seguridad de ministros, fiscales, congresistas, periodistas y magistrados de altas cortes. Esta experiencia me ha permitido desarrollar conocimientos en protección física, análisis de riesgos y toma de decisiones que también puedo aplicar en el ámbito de la ciberseguridad.',
      location: 'Bogotá D. C. · Territorio nacional',
      startDate: '2015-01-01',
      isCurrent: true,
      // certificateUrl: 'https://enlace-real-al-certificado',
    },
    {
      company: 'Cementos Tequendama S.A.',
      role: 'Hombre de Protección',
      description:
        'Protección a altos directivos de la compañía en esquema y equipo de alta seguridad.',
      location: 'Bogotá D. C. · Territorio nacional',
      startDate: '2011-08-01',
      endDate: '2012-10-15',
      isCurrent: false,
    },
    {
      company: 'Grupo Multinacional Sanford-Mongibello S.A.',
      role: 'Hombre de Protección',
      description:
        'Protección a altos directivos de la multinacional en esquema y grupo de alta seguridad.',
      location: 'Bogotá D. C. · Territorio nacional',
      startDate: '2008-03-15',
      endDate: '2010-12-15',
      isCurrent: false,
    },
    {
      company: 'Ejército Nacional de Colombia',
      role: 'Operaciones Especiales',
      description:
        'Realizar Operaciones especiales antiterrorismo en todo el territorio nacional colombiano en unidades de contraguerrilas y contraterrorismo.',
      location: 'Territorio nacional',
      startDate: '1999-09-29',
      endDate: '2006-03-15',
      isCurrent: false,
    },
  ] as ResumeExperience[],

  // Registra universidad, cursos técnicos o formación relevante.
  education: [
    {
      institution: 'CUN',
      degree: 'Ingeniero de Sistemas',
      field: 'Informática',
      description: 'Ingeniero de Sistemas · Tarjeta profesional COPNIA.',
      startDate: '2019-04-01',
      endDate: '2024-10-01',
      certificateUrl: '/documents/diploma-ingeniero-sistemas-cun.pdf',
    },
    {
      institution: 'CUN',
      degree:
        'Diplomado en Desarrollo de Aplicaciones de Software Orientadas a Objetos con Java',
      field: 'Desarrollo de software',
      description:
        'Formación continuada de 100 horas en desarrollo de aplicaciones de software orientadas a objetos con Java.',
      startDate: '2024-04-01',
      endDate: '2024-11-12',
      certificateUrl: '/documents/diplomado-java-poo-cun.pdf',
    },
    {
      institution: 'CUN',
      degree: 'Tecnólogo en Desarrollo de Software y Redes',
      field: 'Facultad de Ingeniería',
      description:
        'Formación tecnológica en desarrollo de software, redes, soporte, modelado de datos y construcción de soluciones informáticas.',
      startDate: '2019-04-01',
      endDate: '2023-06-01',
      certificateUrl:
        '/documents/acta-diploma-tecnologo-software-redes-cun.pdf',
    },
    {
      institution: 'Universidad de Caldas',
      degree:
        'Diplomado en habilidades en programación con énfasis en aplicaciones web · Misión TIC 2022',
      field: 'Desarrollo de software',
      description:
        'Formación intensiva de 800 horas en programación con énfasis en aplicaciones web, cursada como beneficiario del programa Misión TIC 2022.',
      startDate: '2021-05-03',
      endDate: '2021-12-18',
      certificateUrl: '/documents/acta-ucaldas-desarrollo-software.pdf',
    },
  ] as ResumeEducation[],
} as const;
