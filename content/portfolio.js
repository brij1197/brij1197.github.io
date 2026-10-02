export const profile = {
  name: "Brij Bhatia",
  siteUrl: "https://brij1197.github.io",
  greetingPrefix: "hi, it's ",
  typedName: "brij",
  tagline: ["I often code."],
  intro:
    "I'm a full-stack software developer from Bangalore, India. I'm intrigued by new technologies and constantly seek opportunities to learn and integrate them into my projects. I am also interested in cybersecurity and networking.",
  contactLabel: "Hello!",
  credit: "Built and designed by Brij Bhatia.",
  role: "Software Engineer II",
  company: "NetApp",
  companyUrl: "https://www.netapp.com/",
  email: "brijbhatia997@gmail.com",
  github: "https://github.com/brij1197",
  linkedin: "https://www.linkedin.com/in/brijbhatia/",
  resume: "/assets/Resume_Brij.pdf",
  portrait: "/assets/me.jpg",
  
  about: [
    [
      "I am a graduate from ",
      { text: "Simon Fraser University", url: "https://www.sfu.ca/about" },
      " with a Masters in Professional Computer Science. With over 5 years of experience, I have worked at renowned companies such as ",
      { text: "HP", url: "https://www.hp.com/us-en/hp-information.html" },
      " and ",
      { text: "IBM", url: "https://www.ibm.com/ca-en/about" },
      ". I am also an ",
      {
        text: "AWS Certified Solutions Architect",
        url: "https://www.credly.com/badges/00b58604-e7d9-4100-8fd9-c7993371880d/linked_in_profile",
      },
      ".",
    ],
  ],
  skillsIntro: "Here are some technologies I have been working with:",
  skills: ["C++", "Python", "React.js", "AWS", "Node.js", "Django"],
  aboutOutro: [
    [
      "Besides work, I'm also interested in playing video games and making personal projects. And, I do play Chess.",
    ],
  ],
};

export const featuredProjects = [
  {
    id: "project-0",
    title: "Project and Client Management System",
    description:
      "A full-stack app for managing projects and their clients, built on a GraphQL API.",
    stack: "Node.js, GraphQL, React, MongoDB",
    url: "https://github.com/brij1197/Project-and-Client-Management-POC",
    image: "/assets/management.png",
    animationIndex: 0,
    diagram: {
      nodes: ["Client", "GraphQL", "Data"],
      caption: "A query finds its data.",
    },
  },
  {
    id: "project-1",
    title: "Pathfinding Visualizer",
    description:
      "An interactive Python app that demonstrates how pathfinding algorithms work.",
    stack: "Python (Pygame)",
    url: "https://github.com/brij1197/Path-Finding-Algorithm",
    image: "/assets/pygame.png",
    animationIndex: 1,
    diagram: {
      nodes: [],
      caption: "Finding a route around obstacles.",
    },
  },
  {
    id: "project-2",
    title: "Rent Tracking Web App",
    description:
      "A full-stack web app for managing tenant information, rent payments, and maintenance requests.",
    stack: "TypeScript, Angular, Firebase, MySQL, Postman",
    url: "https://github.com/brij1197/RentTrackingWebApplication",
    image: "/assets/rent-tracking.png",
    animationIndex: 2,
    diagram: {
      nodes: ["Tenant", "Payment", "Ledger"],
      caption: "A payment becomes a record.",
    },
  },
  {
    id: "project-3",
    title: "Augmented Reality for Education",
    description:
      "An augmented reality app that helps kindergarten students learn.",
    stack: "C# (Unity), Vuforia, VoiceRSS TTS",
    url: "https://github.com/brij1197/Augmented-Reality-for-Education",
    image: "/assets/eduar.png",
    animationIndex: 3,
    diagram: {
      nodes: [],
      caption: "A digital object, anchored in space.",
    },
  },
];

export const otherProjects = [
  {
    title: "Corvus (in progress)",
    description:
      "An infrastructure management host I'm building from scratch: a C++20 core on Drogon, a Python CLI and SDK, and Prometheus, Grafana, Loki, and Jaeger built in.",
    stack: "C++20, Drogon, Python, PostgreSQL, Redis, Docker",
    url: "https://github.com/brij1197/corvus",
  },
  {
    title: "Encrypted Filesystem",
    description:
      "A C++ middleware layer that secures files on the host file system, so users can't extract any information about the stored data or who it belongs to.",
    stack: "C++",
    url: "https://github.com/brij1197/cmpt785-g5-secure-filesystem",
  },
  {
    title: "Virtual Private Cloud",
    description:
      "Terraform configuration that provisions an AWS VPC and all of its associated resources.",
    stack: "Terraform, AWS",
    url: "https://github.com/brij1197/VirtualPrivateCloud-Terraform",
  },
  {
    title: "TorPlay",
    description: "A web-based player for streaming or downloading torrents.",
    stack: "Node.js (Express), Python",
    url: "https://github.com/brij1197/Project_TorPlay",
  },
  {
    title: "Enigma Machine",
    description: "A Python implementation of how the Enigma machine works.",
    stack: "Python",
    url: "https://github.com/brij1197/ENIGMA",
  },
  {
    title: "Sudoku Solver",
    description: "Solves Sudoku puzzles with a backtracking algorithm.",
    stack: "Python",
    url: "https://github.com/brij1197/Backtracking-Algorithm",
  },
  {
    title: "Image Compression",
    description:
      "Compresses images using k-means clustering or the Tinify API.",
    stack: "Python",
    url: "https://github.com/brij1197/Image-Compression",
  },
];

export const experience = [
  {
    company: "NetApp",
    role: "Software Engineer II",
    dates: "Oct 2025 - Present",
    bullets: [
      "Contributing to ONTAP Core Storage Software development.",
      "Building and optimizing cloud storage solutions.",
    ],
  },
  {
    company: "Freelance",
    role: "Software Developer",
    dates: "Jan 2025 - Sep 2025",
    bullets: [
      "Engineered scalable backend APIs using FastAPI and PostgreSQL for a construction management platform.",
      "Worked alongside product engineers to design and test core features, improving backend test coverage by 35%.",
      "Optimized API response times by streamlining database queries and schema design, improving system efficiency and user experience.",
    ],
  },
  {
    company: "HP",
    role: "Product Test Automation Engineer Co-op",
    dates: "May 2023 - Dec 2023",
    bullets: [
      "Conducted comprehensive regression testing for HP Voice Products' OS builds, effectively identifying, documenting, and resolving software irregularities, which improved product quality.",
      "Implemented test scripts using Selenium, Jenkins, and Robot Framework, reducing testing duration by 45%.",
      "Resolved over 100 software issues, boosting reliability, performance, and maintainability by 20%.",
      "Collaborated with the development team to integrate test automation into the CI/CD pipeline, ensuring seamless and timely code deployments.",
    ],
  },
  {
    company: "IBM",
    role: "Systems Engineer",
    dates: "Oct 2019 - Aug 2022",
    bullets: [
      "Developed custom security monitoring tools using Python and Java, enhancing the efficiency of SAP security processes and reducing the need for manual intervention by 35%.",
      "Formulated and enforced security policies and procedures, enhancing overall system security and user access controls, resulting in a 40% reduction in security incidents.",
      "Optimized Oracle SQL queries and database schemas to improve data retrieval efficiency by 20%.",
    ],
  },
  {
    company: "IBM",
    role: "Software Engineer Intern",
    dates: "Feb 2019 - May 2019",
    bullets: [
      "Streamlined end-to-end service support processes using RPA, achieving a 40% workload reduction.",
      "Automated internal website functions with Java and Selenium, reducing manual testing efforts significantly.",
    ],
  },
  {
    company: "Subex",
    role: "Firmware Engineer",
    dates: "Jun 2018 - Jul 2018",
    bullets: [
      "Implemented a Bus-Tracking System with IoT Components such as a NodeMCU and a GPS Tracker.",
      "Designed the application using 'Blynk' using pre-defined widgets in the app such as a map for relaying the location along with value displays for latitude and longitude of the position.",
    ],
  },
];
