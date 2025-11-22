export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface Social {
  platform: string;
  url: string;
  icon: string;
}

export interface PortfolioData {
  name: string;
  title: string;
  about: string;
  email: string;
  phone: string;
  location: string;
  welcomeMessages: string[];
  socials: Social[];
  projects: Project[];
  experience: Experience[];
  education: {
    institution: string;
    degree: string;
    period: string;
    cgpa: string;
  };
  skills: {
    languages: string[];
    backend: string[];
    aiml: string[];
    data: string[];
    devops: string[];
    observability: string[];
    frontend: string[];
  };
}

export const portfolioData: PortfolioData = {
  name: "Abhijeet Karmakar",
  title: "Senior Software Engineer | Backend Developer",
  about: "Experienced software engineer specializing in backend development with expertise in Java, Spring Boot, microservices architecture, and cloud technologies. Passionate about building scalable, high-performance systems and leveraging AI/ML to solve complex problems.",
  email: "abhijeetkarmakar1920@gmail.com",
  phone: "+91-8877042416",
  location: "India",
  welcomeMessages: [
    "Hello!",
    "I am Abhijeet Karmakar",
    "A Software Engineer with 3+ years of experience",
    "Welcome to my Portfolio!"
  ],
  socials: [
    { platform: "LinkedIn", url: "https://www.linkedin.com/in/abhijeet-karmakar-4a47a6224", icon: "linkedin" },
    { platform: "LeetCode", url: "https://leetcode.com/u/abhijeetkarmakar1920/", icon: "code" },
    { platform: "Email", url: "mailto:abhijeetkarmakar1920@gmail.com", icon: "mail" },
  ],
  education: {
    institution: "Techno Main Saltlake",
    degree: "Bachelor of Technology in Computer Science",
    period: "Aug 2018 - Jul 2022",
    cgpa: "8.38 CGPA"
  },
  projects: [
    {
      id: "1",
      title: "Autonomous PR Review Agent",
      description: "Developed a stateful review agent using LangGraph and a RAG pipeline to provide deep contextual analysis by querying a vector store of the codebase. Wrapped SonarQube and BlackDuck APIs as custom LangChain Tools to automate security vulnerability and code quality checks.",
      technologies: ["LangGraph", "RAG", "LangChain", "SonarQube", "BlackDuck", "Python", "AI/ML"],
    },
    {
      id: "2",
      title: "Distributed Ticket Booking System",
      description: "Designed and implemented a Microservice Architecture with Booking and Payment services. Utilized Redis for caching and a distributed locking mechanism to manage concurrent seat reservations. Integrated Kafka for asynchronous messaging in the Notification Service.",
      technologies: ["Java", "Spring Boot", "Microservices", "Redis", "Kafka", "Distributed Systems"],
    },
  ],
  experience: [
    {
      id: "1",
      role: "Developer (Life & Pension)",
      company: "Sapiens",
      period: "Mar 2025 - Present",
      description: [
        "Resolved API timeouts by implementing pagination, reducing latency to 500ms, and fixed 20+ issues across Presentation Layer and Service Layer",
        "Modernized legacy services using the Strangler Pattern, introducing a microservice handling 40% of traffic, improving scalability and maintainability",
        "Automated comparative testing with Change Data Capture (CDC) and Aspect-Oriented Programming (AOP) across versions and databases",
        "Tech Stack: Java 21, Spring, Spring AI, Jakarta EE, AOP, SQL Server, Apache Spark"
      ],
    },
    {
      id: "2",
      role: "Senior Software Engineer (Banking & Finance)",
      company: "LTIMindtree",
      period: "Jun 2022 - Mar 2025",
      description: [
        "Global Cash Management System - Citi Bank (Jun 2022 - Oct 2024): Migrated 10+ microservices to Spring Boot 3 and Java 17, improving performance. Achieved 20% faster response time by migrating to Spring WebFlux. Deployed API Gateway with Spring Cloud Gateway, enabling DDoS prevention and rate limiting",
        "Netting Engine - Citi Bank (Nov 2024 - Mar 2025): Configured CI/CD pipelines on Red Hat OpenShift for auto-build and on-demand deployment. Implemented Reactive Kafka consumers and publishers for asynchronous messaging",
        "Resolved 50+ critical issues, automated workflows using Autosys jobs and shell scripts",
        "Tech Stack: Java 17/21, Spring Boot, Spring WebFlux, Angular, Oracle, SQL Server, Docker, Kubernetes, Kafka"
      ],
    },
  ],
  skills: {
    languages: ["Java (Core, 17/21)", "Golang", "JavaScript", "Python", "Shell Script", "PL/SQL"],
    backend: ["Spring Boot", "Spring WebFlux", "Spring Security", "Spring AOP", "Jakarta EE"],
    aiml: ["AI", "LLMs", "RAG", "Spring AI", "LangChain", "LangGraph"],
    data: ["Kafka (Reactive Messaging)", "Redis (Caching, Distributed Locks)", "SQL Server", "Oracle", "MongoDB", "ZooKeeper"],
    devops: ["AWS", "Docker", "Kubernetes", "OpenShift", "CI/CD", "Git", "Maven"],
    observability: ["Prometheus", "Grafana", "Splunk", "Profiling", "Load Testing"],
    frontend: ["Angular", "React", "HTML", "CSS"]
  }
};
