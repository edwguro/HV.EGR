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
    fullName: 'Ing. Edwin Gustavo Rodríguez B.',
    headline: 'Desarrollador de software e ingeniero de sistemas',
    professionalSummary:
      'Hola, soy Edwin Rodríguez, desarrollador de software e ingeniero de sistemas. Cuento con conocimientos intermedios en backend y frontend, adquiridos en proyectos académicos, colaborativos y personales. Tengo experiencia práctica creando interfaces web, APIs REST y soluciones con persistencia de datos mediante Node.js, TypeScript, React, Next.js, Express, MongoDB y MySQL. Adicionalmente, cuento con una trayectoria de 20 años en sistemas de seguridad y protección de personas, análisis de riesgos, protección de altos dignatarios, entrenamiento militar avanzado y conocimientos en ciberseguridad y ciberdefensa.',
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
      company: 'Developer Freelance',
      role: 'Developer Software',
      description:
        'Desarrolador independiente, diseño y desarrollo e implementacion de soluciones de software para PYMES. ',
      location: 'Villavicencio, Meta',
      startDate: '2025-01-01',
      endDate: '2026-07-31',
      isCurrent: false,
      // certificateUrl: '/documents/certificado-eds-la-fortaleza.pdf',
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
      role: 'SLP-BAFER2',
      description:
        'Operaciones especiales antiterrorismo en todo el territorio nacional colombiano.',
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
      description:
        'Ingeniero de Sistemas · Tarjeta profesional No. 091122-0807632 CNDC COPNIA.',
      startDate: '2019-04-01',
      endDate: '2024-10-01',
      certificateUrl:
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
    },
    {
      institution: 'CUN',
      degree: 'Diplomado en JavaScript y aplicaciones web',
      field: 'Facultad de Ingeniería',
      description:
        'Diplomado en diseño y desarrollo de aplicaciones web con JavaScript, ingeniería de software, análisis y modelado de datos, Express, React y librerías del ecosistema JavaScript.',
      startDate: '2024-04-01',
      endDate: '2024-10-01',
      certificateUrl:
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
    },
    {
      institution: 'EDUTIN ACADEMY',
      degree: 'Certificación en Node.js',
      field: 'Desarrollo de software',
      description:
        'Formación en fundamentos de Node.js, diseño y construcción de soluciones web, análisis y modelado de datos, arquitectura MVC y levantamiento de requisitos.',
      startDate: '2023-01-15',
      endDate: '2023-10-01',
      certificateUrl:
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
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
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
    },
    {
      institution: 'Universidad de Caldas',
      degree:
        'Programa MinTIC · Desarrollo de software en aplicaciones web · 800 horas',
      field: 'Desarrollo de software',
      description:
        'Programa de desarrollo de aplicaciones web con JavaScript, Node.js, C#, .NET y TypeScript; ingeniería de software, Git, bases de datos relacionales y no relacionales, entornos cloud, metodologías ágiles, seguridad y experiencia de usuario.',
      startDate: '2019-04-01',
      endDate: '2023-06-01',
      certificateUrl:
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
    },
    {
      institution: 'CUN',
      degree: 'Técnico Profesional en Soporte e Informática',
      field: 'Facultad de Ingeniería',
      description:
        'Formación técnica profesional en soporte, informática y fundamentos de infraestructura tecnológica.',
      startDate: '2019-04-01',
      endDate: '2023-06-01',
      certificateUrl:
        'https://drive.google.com/file/d/1xXFR3HKeXs6OKoLAVqggU7ROneqp07Y3/view?usp=drivesdk',
    },
  ] as ResumeEducation[],
} as const;
