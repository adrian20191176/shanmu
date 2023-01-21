const categoryOptions = [
  {
    value: 'it',
    option: 'IT'
  },
  {
    value: 'engineering',
    option: 'Engineering'
  },
  {
    value: 'biology',
    option: 'Biology'
  },
  {
    value: 'law',
    option: 'Law'
  },
  {
    value: 'commerce',
    option: 'Commerce'
  },
  {
    value: 'arts',
    option: 'Arts'
  },
  {
    value: 'maths',
    option: 'Maths'
  },
  {
    value: 'chemistry',
    option: 'Chemistry'
  },
  {
    value: 'physics',
    option: 'Physics'
  },
  {
    value: 'humanities',
    option: 'Humanities'
  },
  {
    value: 'media',
    option: 'Media'
  },
  {
    value: 'hospitality',
    option: 'Hospitality'
  },
  {
    value: 'agriculture',
    option: 'Agriculture'
  }
];


export const subcategory = [
  {
    type: 'it',
    description: 'IT is the application of technology to solve organizational and business problems. This field of engineering uses computers, networks, storage and other technical infrastructure, both hardware and software to handle and manipulate information',
    it: [
      {
        value: 'cs',
        option: 'Computer Science'
      },
      {
        value: 'se',
        option: 'Software Engineering'
      },
      {
        value: 'ce',
        option: 'Computer Engineering'
      },
      {
        value: 'bootstrap',
        option: 'Bootstrap'
      },
      {
        value: 'java',
        option: 'Java'
      },
    ]
  },
  {
    type: 'engineering',
    description: 'Engineering is the design, testing and construction of machines, structures and processes using mathematics and the natural sciences. It is a decipline dedicated t solve problems',
    engineering: [
      {
        value: 'mechanical-engineering',
        option: 'Mechanical Engineering'
      },
      {
        value: 'civil-engineering',
        option: 'Civil Engineering'
      },
      {
        value: 'automobile-engineering',
        option: 'Autombile Engineering'
      },
    ]
  },
  {
    type: 'biology',
    description: 'Biology is a branch of science that studies living things. It is a very large and broad field due to the wide variety of life on Earth, so individual biologists tend to focus on a specific field. These fields are either categorized by the scale of life or by the types of organisms studied',
    biology: [
      {
        value: 'tissue',
        option: 'Tissue'
      },
      {
        value: 'brain',
        option: 'Brain'
      },
      {
        value: 'cell',
        option: 'Cell'
      },
    ]
  },
  {
    type: 'law',
    description: 'Law is outlined as principles and regulations laid down by a governing body and have binding legal force. Citizens must approve and abide by it, subject to sanctions or legal consequences. It shows the will of the supreme state power',
    law: [
      {
        value: 'civil-law',
        option: 'Civil Law'
      },
      {
        value: 'criminal-law',
        option: 'Criminal Law'
      },
      {
        value: 'business-law',
        option: 'Business Law'
      },
    ]
  },
  {
    type: 'commerce',
    description: 'Commerce deals with various aspects of business, commerce, accounting, financial information/transactions and merchandising. Trade plays a significant role in the development of nations and their citizens by facilitating trade between nations or within a nation',
    commerce: [
      {
        value: 'business',
        option: 'Business'
      },
      {
        value: 'accounting',
        option: 'Accounting'
      },
      {
        value: 'marketing',
        option: 'Marketing'
      },
      {
        value: 'economics',
        option: 'Economics'
      },
    ]
  },
  {
    type: 'arts',
    description: 'The Humanities stream which is popularly known as \'Arts\' provides students with a platform to study human society and the world. It is quite a vast stream which offers numerous career options to the students. From studying how people interact in a group setting to understanding the legal rights of citizens, everything falls under the purview of Art Stream entities',
    arts: [
      {
        value: 'literature',
        option: 'Literature'
      },
      {
        value: 'visual arts',
        option: 'Visual arts'
      },
      {
        value: 'graphic arts',
        option: 'Graphic arts'
      },
    ]
  },
  {
    type: 'maths',
    description: 'Mathematics is the science and study of quality, structure, space and change. Mathematicians search for patterns, formulate new conjectures, and establish truth by rigorous deduction from well-chosen axioms and definitions',
    maths: [
      {
        value: 'algebra',
        option: 'Algebra'
      },
      {
        value: 'calculus',
        option: 'Calculus'
      },
      {
        value: 'trigonometry',
        option: 'Trigonometry'
      },
      {
        value: 'geometry',
        option: 'Geometry'
      },
    ]
  },
  {
    type: 'chemistry',
    description: 'Chemistry is the scientific study of the properties and behavior of matter. It is a natural science that covers the elements that make up matter to the compounds made of atoms, molecules and ions: their composition, structure, properties, behavior and the changes they undergo during a reaction with other substances',
    chemistry: [
      {
        value: 'organic-chemistry',
        option: 'Organic chemistry'
      },
      {
        value: 'bio-chemistry',
        option: 'Biochemistry'
      },
      {
        value: 'inorganic-chemistry',
        option: 'Inorganic chemistry'
      },
      {
        value: 'thermodynamics',
        option: 'Thermodynamics'
      },
    ]
  },
  {
    type: 'physics',
    description: 'The branch of science concerned with the nature and properties of matter and energy. The subject matter of physics includes mechanics, heat, light and other radiation, sound, electricity, magnetism, and the structure of atoms',
    physics: [
      {
        value: 'classical-mechanics',
        option: 'Classical mechanics'
      },
      {
        value: 'electromagnetism and photonics',
        option: 'Electromagnetism and photonicsy'
      },
      {
        value: 'quantum mechanics',
        option: 'Quantum mechanics'
      },
    ]
  },
  {
    type: 'humanities',
    description: 'Humanities are academic disciplines that study aspects of human society and culture. In the Renaissance, the term contrasted with divinity and referred to what is now called classics, the main area of secular study in universities at the time',
    humanities: [
      {
        value: 'ancient-and-modern-languages',
        option: 'Ancient and modern languages'
      },
      {
        value: 'human-geography',
        option: 'Human geography'
      },
      {
        value: 'history',
        option: 'History'
      },
      {
        value: 'philosophy',
        option: 'Philosophy'
      },
    ]
  },
  {
    type: 'media',
    description: 'Media are the communication outlets or tools used to store and deliver information or data. The term refers to components of the mass media communications industry, such as print media, publishing, the news media, photography, cinema, broadcasting (radio and television), digital media, and advertising',
    media: [
      {
        value: 'print-media',
        option: 'Print media'
      },
      {
        value: 'broadcast-media',
        option: 'Broadcast media'
      },
      {
        value: 'news-media',
        option: 'News Media'
      },
    ]
  },
  {
    type: 'hospitality',
    description: 'Hospitality is the relationship between a guest and a host, wherein the host receives the guest with some amount of goodwill, including the reception and entertainment of guests, visitors, or strangers',
    hospitality: [
      {
        value: 'accommodation',
        option: 'Accommodation'
      },
      {
        value: 'travel and tourism',
        option: 'Travel and Tourism'
      },
      {
        value: 'entertainment and Recreation',
        option: 'Entertainment and Recreation'
      },
    ]
  },
  {
    type: 'agriculture',
    description: 'Agriculture or farming is the practice of cultivating plants and livestock. Agriculture was the key development in the rise of sedentary human civilization, whereby farming of domesticated species created food surpluses that enabled people to live in cities',
    agriculture: [
      {
        value: 'crop-production',
        option: 'Crop production'
      },
      {
        value: 'agricultural-economics',
        option: 'Agricultural economics'
      },
      {
        value: 'agricultural-engineering',
        option: 'Agricultural engineering'
      },
      {
        value: 'livestock-production',
        option: 'Livestock production'
      },
    ]
  },
]


export default categoryOptions;
