export const SITE_CONFIG = {
  name: "LearnHub",
  tagline: "Master the Art of Modern Development",
  description:
    "Premium video courses taught by industry experts. Level up your skills with production-ready knowledge.",
  url: "https://learnhub.dev",
  ogImage: "/images/og.jpg",
  links: {
    twitter: "https://twitter.com/learnhub",
    github: "https://github.com/learnhub",
    youtube: "https://youtube.com/@learnhub",
  },
};

export const NAV_LINKS = [
  { label: "Courses", href: "/products" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
] as const;

export const FEATURES = [
  {
    title: "Production-Ready Knowledge",
    description:
      "Learn real-world patterns used by top engineering teams. No fluff, just what works in production.",
    icon: "Zap",
  },
  {
    title: "Learn at Your Pace",
    description:
      "Self-paced with lifetime access. Each course is structured into digestible chapters with practical exercises.",
    icon: "Clock",
  },
  {
    title: "Expert Instructors",
    description:
      "Courses crafted by engineers from Stripe, Vercel, and GitHub. Battle-tested expertise, delivered clearly.",
    icon: "Users",
  },
  {
    title: "Hands-On Projects",
    description:
      "Build production-grade projects as you learn. Portfolio-ready code with every course.",
    icon: "Code2",
  },
  {
    title: "Community Access",
    description:
      "Join a private community of developers. Get code reviews, career advice, and network with peers.",
    icon: "MessageCircle",
  },
  {
    title: "Certificate of Completion",
    description:
      "Earn verifiable certificates to showcase on LinkedIn. Proof of your commitment to mastery.",
    icon: "Award",
  },
] as const;

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: 4999,
    originalPrice: 9999,
    description: "Perfect for getting started with a single course.",
    features: [
      "1 course of your choice",
      "Lifetime access",
      "Community access",
      "Certificate of completion",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: 14999,
    originalPrice: 29999,
    description: "For serious learners who want the complete toolkit.",
    features: [
      "All courses (20+)",
      "Lifetime access",
      "Community + mentorship",
      "Certificates for all",
      "Private code reviews",
      "Early access to new content",
    ],
    cta: "Go Professional",
    popular: true,
  },
  {
    name: "Team",
    price: 49999,
    originalPrice: 99999,
    description: "Equip your entire team with top-tier skills.",
    features: [
      "Everything in Professional",
      "Team dashboard & analytics",
      "Priority support",
      "Custom workshops",
      "Bulk enrollment",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Senior Frontend Engineer",
    company: "Flipkart",
    avatar: "/images/avatars/avatar-1.jpg",
    content:
      "The Advanced React course completely transformed how I architect applications. The patterns taught here are what we actually use in production at Flipkart.",
    rating: 5,
  },
  {
    name: "Arun Kumar",
    role: "Full-Stack Developer",
    company: "Freelance",
    avatar: "/images/avatars/avatar-2.jpg",
    content:
      "I was struggling with system design interviews. This platform's curriculum is incredibly well-structured. Landed my dream job at a FAANG company within 3 months.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Tech Lead",
    company: "Flipkart",
    avatar: "/images/avatars/avatar-3.jpg",
    content:
      "We've used LearnHub for our entire frontend team. The consistency and depth of the content is unmatched. Highly recommend for enterprise upskilling.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Software Engineer",
    company: "Google",
    avatar: "/images/avatars/avatar-4.jpg",
    content:
      "The quality of production code examples is what sets this apart. You're not just learning theory — you're seeing how it's done at the highest level.",
    rating: 5,
  },
] as const;

export const FAQS = [
  {
    question: "How do the courses work?",
    answer:
      "Each course is a structured curriculum of video lessons, code exercises, and real-world projects. You get lifetime access and can learn at your own pace. Every lesson includes downloadable code and resources.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Absolutely. If you're not satisfied within the first 30 days, we'll refund your purchase — no questions asked. We're confident in the quality of our content.",
  },
  {
    question: "Can I switch plans?",
    answer:
      "Yes! You can upgrade from Starter to Professional at any time. You'll only pay the difference, prorated. Downgrades are also available upon request.",
  },
  {
    question: "Do you offer team discounts?",
    answer:
      "Yes. The Team plan is designed for organizations. For larger teams (20+), contact us for custom pricing. We also offer dedicated workshops and curriculum customization.",
  },
  {
    question: "What format are the courses in?",
    answer:
      "Courses consist of high-quality video lessons (1080p), written guides, code repositories, and interactive exercises. Most courses also include capstone projects.",
  },
  {
    question: "Will I get a certificate?",
    answer:
      "Every course includes a verifiable certificate of completion. Professional and Team plans include certificates for all courses. You can share them on LinkedIn.",
  },
] as const;

export const TRUST_BADGES = [
  { label: "30-Day Guarantee", description: "Money-back guarantee" },
  { label: "Lifetime Access", description: "Learn at your own pace" },
  { label: "Downloadable", description: "Offline access included" },
  { label: "Certificate", description: "Shareable credentials" },
] as const;

export const COUNTERS = [
  { label: "Students Enrolled", value: 15000, suffix: "+" },
  { label: "Courses", value: 24, suffix: "" },
  { label: "Hours of Content", value: 500, suffix: "+" },
  { label: "Average Rating", value: 4.9, suffix: "/5" },
] as const;

export const COURSES = [
  {
    title: "Advanced React Architecture",
    description:
      "Master component composition, state management, and production patterns used at scale.",
    category: "Frontend",
    lessons: 48,
    hours: 16,
    price: 4999,
    image: "/images/courses/react.jpg",
    instructor: "Priya Sharma",
    rating: 4.9,
    students: 3200,
  },
  {
    title: "System Design Deep Dive",
    description:
      "Learn to design scalable distributed systems. Covers microservices, databases, and real-world architectures.",
    category: "Backend",
    lessons: 36,
    hours: 14,
    price: 5999,
    image: "/images/courses/system-design.jpg",
    instructor: "Arun Kumar",
    rating: 4.9,
    students: 2100,
  },
  {
    title: "TypeScript Mastery",
    description:
      "Go from intermediate to expert with advanced types, generics, and real-world TypeScript patterns.",
    category: "Languages",
    lessons: 42,
    hours: 12,
    price: 3999,
    image: "/images/courses/typescript.jpg",
    instructor: "Sneha Patel",
    rating: 5.0,
    students: 4500,
  },
  {
    title: "Full-Stack Next.js",
    description:
      "Build production applications with Next.js, from server components to deployment.",
    category: "Frontend",
    lessons: 54,
    hours: 20,
    price: 6999,
    image: "/images/courses/nextjs.jpg",
    instructor: "Rahul Verma",
    rating: 4.8,
    students: 5600,
  },
  {
    title: "iOS & SwiftUI Development",
    description:
      "Build beautiful, performant iOS applications with SwiftUI and modern Apple frameworks.",
    category: "Mobile",
    lessons: 38,
    hours: 15,
    price: 5499,
    image: "/images/courses/ios.jpg",
    instructor: "Priya Sharma",
    rating: 4.7,
    students: 1800,
  },
  {
    title: "Cloud Architecture on AWS",
    description:
      "Design and deploy cloud-native applications. Master AWS services, serverless, and infrastructure as code.",
    category: "DevOps",
    lessons: 44,
    hours: 18,
    price: 6499,
    image: "/images/courses/aws.jpg",
    instructor: "Rahul Verma",
    rating: 4.8,
    students: 2900,
  },
] as const;
