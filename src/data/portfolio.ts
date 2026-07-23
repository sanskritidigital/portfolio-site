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
  contact: {
    title: string;
    subtitle: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export const portfolioData: PortfolioData = {
  navbar: {
    logoText: "Sanskriti Singh",
    links: [
      { label: "About", href: "#about" },
      { label: "Projects", href: "#projects" },
      { label: "Education", href: "#education" },
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
        items: ["Gemini", "ChatGPT", "Canva", "Image Generation", "Video Generation", "Prompt Engineering"]
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
      description: "An insight-led, plain-language strategic brand playbook for Nike India. Outlines core brand philosophy, visual & vocal systems (palette, typography), target consumer personas (Arjun, Priya, Rohan), and end-to-end customer journey maps to drive membership growth.",
      thumbnail: project1Img,
      tags: ["Brand Strategy", "Market Research", "Consumer Personas", "Journey Mapping"],
      liveUrl: "",
      githubUrl: ""
    },
    {
      title: "Nykaa Digital Marketing Audit",
      description: "A comprehensive digital presence analysis and strategic marketing review for Nykaa, India's premier beauty and lifestyle e-commerce platform. Evaluates social media presence, website & app user experience strengths, content funnel, and outlines a strategic SWOT analysis.",
      thumbnail: project2Img,
      tags: ["Digital Audit", "Marketing Strategy", "SWOT Analysis", "UX Review"],
      liveUrl: "",
      githubUrl: ""
    },
    {
      title: "Vitara Brand Identity & Positioning",
      description: "A comprehensive brand identity and strategic positioning playbook for Vitara Beauty, a conscious minimalist skincare line. Outlines brand archetypes (The Sage & The Caregiver), strategic positioning statements, brand voice guidelines, and a nature-imbued color palette.",
      thumbnail: project3Img,
      tags: ["Brand Identity", "Skincare Marketing", "Brand Archetype", "Strategic Voice"],
      liveUrl: "",
      githubUrl: ""
    }
  ],
  experience: [
    {
      role: "Digital Marketing Student",
      company: "Techpath",
      duration: "2025 - Present",
      description: [
        "Pursuing a Diploma in Digital Marketing, mastering social media strategy, SEO, and paid campaigns.",
        "Leveraging AI tools (Gemini, ChatGPT) for automated copywriting and content ideation.",
        "Analyzing real-world case studies for brand strategy and competitive positioning."
      ]
    },
    {
      role: "BBA in General Studies Student",
      company: "Chandigarh University (Online/Correspondence)",
      duration: "2023 - Present",
      description: [
        "Developing a foundational understanding of business operations, consumer behavior, and organizational communication.",
        "Applying marketing theories and statistical methods to mock business research projects.",
        "Strengthening critical thinking, goal setting, and presentation skills."
      ]
    }
  ],
  contact: {
    title: "Start a Conversation",
    subtitle: "Interested in branding, social media collaborations, or looking for a passionate digital marketing intern? Feel free to reach out!",
    email: "sanskriti.workmail@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com"
  }
};
