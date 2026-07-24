import project1Img from '../assets/project1.jpg';
import project2Img from '../assets/project2.jpg';
import project3Img from '../assets/project3.jpg';

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experience {
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface PortfolioData {
  navbar: {
    logoText: string;
    links: NavLink[];
  };
  hero: {
    name: string;
    role: string;
    tagline: string;
    ctaPrimary: {
      label: string;
      href: string;
    };
    ctaSecondary: {
      label: string;
      href: string;
    };
  };
  about: {
    bio: string;
    profileImage: string;
    skills: SkillCategory[];
  };
  projects: Project[];
  experience: Experience[];
  certifications: Experience[];
  contact: {
    title: string;
    subtitle: string;
    email: string;
    github?: string;
    linkedin?: string;
    naukri?: string;
    indeed?: string;
  };
}

export const portfolioData: PortfolioData = {
  navbar: {
    logoText: "Sanskriti Singh",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
      { label: "Certifications", href: "#certifications" },
      { label: "Contact", href: "#contact" }
    ]
  },
  hero: {
    name: "Sanskriti Singh",
    role: "Aspiring Digital Marketer",
    tagline: "Exploring branding, social media strategy, content creation, and audience engagement with a creative mindset and a strong passion for growth in the digital world.",
    ctaPrimary: {
      label: "View Projects",
      href: "#projects"
    },
    ctaSecondary: {
      label: "Get in Touch",
      href: "#contact"
    }
  },
  about: {
    bio: "I'm a digital marketing learner currently pursuing a Diploma in Digital Marketing at Techpath, alongside a BBA in General Studies. I'm passionate about branding, social media strategy, and using AI tools to create engaging content. I bring creative thinking, adaptability, and a genuine drive to keep learning and growing in the marketing world.",
    profileImage: "/src/assets/profile.png",
    skills: [
      {
        category: "Marketing",
        items: ["Brand Positioning", "Social Media", "Customer Journey Mapping", "Competitive Analysis"]
      },
      {
        category: "AI & Creative Tools",
        items: ["Gemini", "ChatGPT", "Canva", "Image Generation", "Video Generation", "Prompt Engineering", "Antigravity", "Claude", "Speckit", "Figma"]
      },
      {
        category: "Soft Skills",
        items: ["Communication Skills", "Goal Setting", "Adaptability", "Customer Service"]
      }
    ]
  },
  projects: [
    {
      title: "Nike India Brand Kit",
      description: "Strategic brand playbook for Nike India covering brand philosophy, visual identity, and customer personas to drive membership growth.",
      thumbnail: project1Img,
      tags: ["Brand Strategy", "Market Research", "Consumer Personas", "Journey Mapping"],
      liveUrl: "",
      githubUrl: ""
    },
    {
      title: "Nykaa Digital Marketing Audit",
      description: "Digital presence audit for Nykaa covering social media, UX, content strategy, and a full SWOT analysis.",
      thumbnail: project2Img,
      tags: ["Digital Audit", "Marketing Strategy", "SWOT Analysis", "UX Review"],
      liveUrl: "",
      githubUrl: ""
    },
    {
      title: "Vitara Brand Identity & Positioning",
      description: "Brand identity and positioning playbook for Vitara Beauty, covering brand archetypes, voice guidelines, and color palette.",
      thumbnail: project3Img,
      tags: ["Brand Identity", "Skincare Marketing", "Brand Archetype", "Strategic Voice"],
      liveUrl: "",
      githubUrl: ""
    }
  ],
  experience: [
    {
      role: "BBA in General Studies",
      company: "Chandigarh University (Online/Correspondence)",
      duration: "2026 - Present",
      description: []
    },
    {
      role: "12th Grade",
      company: "NIOS, Arts Stream",
      duration: "Pass Year 2026",
      description: []
    },
    {
      role: "10th Grade",
      company: "ICSE, St John's School Katsila, Chandauli",
      duration: "Pass Year 2023",
      description: []
    }
  ],
  certifications: [
    {
      role: "Digital Marketing Trainee",
      company: "Techpath",
      duration: "2026 - Present",
      description: [
        "Building hands-on expertise in SEO, social media strategy, content creation, and brand positioning through practical learning and real-world projects.",
        "Leveraging Generative AI tools such as Gemini and ChatGPT for content ideation, copywriting, image/video generation, and AI-powered workflows.",
        "Exploring SpecKit-based automation to streamline digital marketing processes while analyzing brands, competitors, customer journeys, and growth strategies."
      ]
    }
  ],
  contact: {
    title: "Start a Conversation",
    subtitle: "Interested in branding, social media collaborations, or looking for a passionate digital marketing intern? Feel free to reach out!",
    email: "sanskriti.workmail@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    naukri: "https://www.naukri.com/mnjuser/profile?id=&altresid",
    indeed: "https://indeed.com"
  }
};
