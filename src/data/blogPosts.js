//mock data

const blogPosts = [
  {
    id: 1,
    title: "Understanding AI and Machine Learning",
    excerpt: "A beginner-friendly introduction to AI and ML concepts.",
    content: `
      <p>Artificial Intelligence (AI) is transforming industries globally...</p>
      <p>Machine Learning (ML) is a subset of AI where systems learn from data...</p>
      <p>Deep Learning uses neural networks to mimic human decision-making...</p>
    `,
    author: "John Doe",
    date: "Aug 25, 2025",
    image: "https://source.unsplash.com/800x400/?ai,technology",
    categories: ["AI", "Tech"],
    tags: ["AI", "Machine Learning", "Deep Learning", "Python"],
  },
  {
    id: 2,
    title: "Modern Web Development Trends in 2025",
    excerpt: "Stay ahead with the latest trends in web development.",
    content: `
      <p>Web development is evolving rapidly with React, Tailwind, and AI integration...</p>
      <p>Serverless architecture and JAMstack are revolutionizing deployment...</p>
      <p>Dark mode, animations, and performance optimizations are key UX factors...</p>
    `,
    author: "Jane Smith",
    date: "Aug 20, 2025",
    image: "https://source.unsplash.com/800x400/?web,development",
    categories: ["Web Dev", "Tech"],
    tags: ["React", "Tailwind", "JAMstack", "Frontend"],
  },
  {
    id: 3,
    title: "Deep Dive into Neural Networks",
    excerpt: "Learn the inner workings of modern neural networks.",
    content: `
      <p>Neural networks mimic the human brain's structure to solve complex problems...</p>
      <p>They consist of layers, neurons, and activation functions...</p>
      <p>Training requires large datasets and proper optimization techniques...</p>
    `,
    author: "Alex Johnson",
    date: "Aug 15, 2025",
    image: "https://source.unsplash.com/800x400/?neural,network",
    categories: ["AI", "ML"],
    tags: ["Neural Networks", "Deep Learning", "Python", "TensorFlow"],
  },
  {
    id: 4,
    title: "Next-Gen Frontend Frameworks",
    excerpt: "A look at the newest trends in frontend development.",
    content: `
      <p>Next.js and Remix are reshaping how we think about React applications...</p>
      <p>Static site generation (SSG) and server-side rendering (SSR) are now easy to implement...</p>
    `,
    author: "Emily Clark",
    date: "Aug 10, 2025",
    image: "https://source.unsplash.com/800x400/?frontend,technology",
    categories: ["Web Dev"],
    tags: ["React", "Next.js", "Frontend", "Performance"],
  },
  {
    id: 5,
    title: "AI in Healthcare",
    excerpt: "How artificial intelligence is revolutionizing healthcare.",
    content: `
      <p>AI is being used to predict diseases, assist in diagnosis, and optimize treatments...</p>
      <p>Healthcare datasets combined with ML models are improving patient outcomes...</p>
    `,
    author: "Dr. Sophia Lee",
    date: "Aug 5, 2025",
    image: "https://source.unsplash.com/800x400/?ai,healthcare",
    categories: ["AI", "Health Tech"],
    tags: ["AI", "Healthcare", "React", "Machine Learning", "Data Science"],
  },
  {
    id: 6,
    title: "Cybersecurity Essentials in 2025",
    excerpt: "Protecting digital assets in an increasingly connected world.",
    content: `
      <p>Cyber threats are evolving rapidly with AI-driven attacks...</p>
      <p>Multi-factor authentication and encryption remain critical...</p>
      <p>Companies must adopt proactive monitoring and incident response plans...</p>
    `,
    author: "David Brown",
    date: "Aug 2, 2025",
    image: "https://source.unsplash.com/800x400/?cybersecurity,tech",
    categories: ["Cybersecurity", "Tech"],
    tags: ["Security", "Encryption", "MFA", "AI Security"],
  },
  {
    id: 7,
    title: "Building Scalable Web Applications",
    excerpt: "Techniques for handling growing traffic and data.",
    content: `
      <p>Microservices architecture allows independent deployment of features...</p>
      <p>Cloud solutions and serverless platforms scale automatically...</p>
      <p>Performance monitoring and caching optimize response times...</p>
    `,
    author: "Emma Davis",
    date: "Jul 30, 2025",
    image: "https://source.unsplash.com/800x400/?cloud,web",
    categories: ["Web Dev", "Cloud"],
    tags: ["Microservices", "Serverless", "Performance", "Scalability"],
  },
  {
    id: 8,
    title: "Introduction to Quantum Computing",
    excerpt: "The basics of quantum computing and its potential impact.",
    content: `
      <p>Quantum computers use qubits to perform computations beyond classical limits...</p>
      <p>Quantum algorithms promise breakthroughs in cryptography and optimization...</p>
      <p>Learning quantum programming languages is essential for future developers...</p>
    `,
    author: "Robert Miller",
    date: "Jul 25, 2025",
    image: "https://source.unsplash.com/800x400/?quantum,technology",
    categories: ["Quantum Computing", "Tech"],
    tags: ["Quantum Computing", "Qubits", "Algorithms", "Future Tech"],
  },
];

export default blogPosts;
