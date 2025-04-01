"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ProfilePic from "../../public/IMG20220124231430.jpg";
import Link from "next/link";

// Interface for Link Item Props
interface LinkItemProps {
  href: string;
  children: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const LinkItem: React.FC<LinkItemProps> = ({
  href,
  children,
  onMouseEnter,
  onMouseLeave,
}) => (
  <a
    href={href}
    className="text-blue-600 underline hover:text-blue-800 cursor-pointer select-none"
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </a>
);

// Interface for Section Props
interface SectionProps {
  title: string;
  items: { href: string; label: string }[];
}

// Interface for Project
interface Project {
  href: string;
  live: string;
  label: string;
  description: string;
  tools: string[];
  iframe: boolean;
}

// Interface for Writing
interface Writing {
  href: string;
  label: string;
  description: string;
}

// Interface for Footer Link
interface FooterLink {
  href: string;
  label: string;
}

const projects: Project[] = [
  {
    iframe: true,
    href: "https://example.com/cinema-social-media",
    live: "https://letsee-dusky.vercel.app",
    label: "Cinema Social Media (Letsee)",
    description:
      "A platform where movie enthusiasts connect and discuss films.",
    tools: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
  },
  {
    iframe: false,
    href: "https://github.com/abhijeetrayy/LS-Extension",
    live: "https://addons.mozilla.org/en-US/firefox/addon/let-s-see-cine-app/",
    label: "CinemaConnect Browser Extension",
    description:
      "Built a companion extension to enhance the CinemaConnect experience, integrating with the website via Supabase APIs",
    tools: ["Javascript", "Supabase", "Tailwind CSS", "PostgreSQL", "TMDB API"],
  },
  {
    iframe: true,
    href: "https://example.com/university-course-forum",
    live: "https://snsthinkhub-abhijeet11ray-gmailcom.vercel.app/",
    label: "University Course Forum",
    description:
      "A discussion platform for university students to share resources and knowledge.",
    tools: ["React", "Node.js", "MongoDB", "GraphQL"],
  },
];

const writing: Writing[] = [
  {
    href: "https://abhijeetray.hashnode.dev/building-a-scalable-fullstack-application-with-nextjs-and-supabase-a-step-by-step-guide",
    label: "Scalable FullStack Application with Next.js and Supabase",
    description:
      "A platform where movie enthusiasts connect and discuss films.",
  },
  {
    href: "https://abhijeetray.hashnode.dev/ideas-for-ai-integration-that-can-better-nextjs-projects",
    label: "Ideas for AI integration that can better NextJs projects",
    description:
      "A discussion platform for university students to share resources and knowledge.",
  },
];

const known: SectionProps[] = [
  {
    title: "Tools",
    items: [
      { href: "https://git-scm.com/", label: "Git" },
      // { href: "https://www.docker.com/", label: "Docker" },
      // { href: "https://www.jenkins.io/", label: "Jenkins" },
      { href: "https://www.postman.com/", label: "Postman" },
    ],
  },
  {
    title: "Languages",
    items: [
      { href: "https://www.typescriptlang.org/", label: "TypeScript" },
      { href: "https://www.javascript.com/", label: "JavaScript" },
      // { href: "https://www.python.org/", label: "Python" },
      // { href: "https://go.dev/", label: "Go" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { href: "https://nextjs.org/", label: "Next.js" },
      { href: "https://reactjs.org/", label: "React" },
      { href: "https://tailwindcss.com/", label: "Tailwind CSS" },
      { href: "https://expressjs.com/", label: "Express.js" },
    ],
  },
  {
    title: "Databases",
    items: [
      { href: "https://www.postgresql.org/", label: "PostgreSQL" },
      { href: "https://www.mongodb.com/", label: "MongoDB" },
      // { href: "https://www.mysql.com/", label: "MySQL" },
    ],
  },
  {
    title: "Cloud Services",
    items: [
      // { href: "https://aws.amazon.com/", label: "AWS" },
      { href: "https://vercel.com/", label: "Vercel" },
      { href: "https://supabase.com/", label: "Supabase" },
    ],
  },
  // {
  //   title: "Other",
  //   items: [
  //     { href: "https://graphql.org/", label: "GraphQL" },
  //     { href: "https://www.prisma.io/", label: "Prisma" },
  //     { href: "https://jestjs.io/", label: "Jest" },
  //   ],
  // },
];

const footerLinks: FooterLink[] = [
  { href: "https://www.linkedin.com/in/abhijeetray", label: "LinkedIn" },
  { href: "https://twitter.com/abhijeetray", label: "Twitter" },
  { href: "https://github.com/abhijeetrayy", label: "Github" },
];

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isMouseConnected, setIsMouseConnected] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isHoveringLink, setIsHoveringLink] = useState<boolean>(false);
  const words = ["Hi.", "it's", "Abhijeet", "Ray", "🧡"];
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkPointer = () => {
      setIsMouseConnected(window.matchMedia("(pointer: fine)").matches);
    };

    checkPointer();
    window.addEventListener("resize", checkPointer);

    const interval = setInterval(() => {
      if (!isHoveringLink) {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, 500);

    return () => {
      window.removeEventListener("resize", checkPointer);
      clearInterval(interval);
    };
  }, [isHoveringLink]); // Depend on isHoveringLink to pause animation when hovering

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseConnected) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Email: ${email}\nMessage: ${message}`);
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseMove={handleMouseMove}
      data-hydrate-cursor={isMounted && isMouseConnected ? "true" : "false"}
    >
      {/* Custom Cursor */}
      {isMounted && isMouseConnected && !isHoveringLink && (
        <div
          className="fixed pointer-events-none text-lg font-semibold text-neutral-600"
          style={{
            left: position.x,
            top: position.y,
            transform: "translate(-50%, -50%)",
            whiteSpace: "nowrap",
            zIndex: 1000,
          }}
        >
          {words[currentWordIndex]}
        </div>
      )}
      <div
        className={`max-w-3xl m-auto mb-10 px-3 flex gap-5 flex-col ${
          isMounted && isMouseConnected ? "cursor-none" : ""
        }`}
      >
        {/* Sticky Navbar */}
        <nav className="sticky top-0 bg-white border-b shadow-sm z-50">
          <div className="max-w-3xl m-auto px-3 py-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={scrollToForm}
              className="text-blue-600 underline hover:text-blue-800"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Contact Me
            </button>
            <button
              type="button"
              onClick={scrollToForm}
              className="text-blue-600 underline hover:text-blue-800"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Hire Me
            </button>
          </div>
        </nav>

        <Image
          src={ProfilePic}
          width={300}
          height={300}
          alt="Profile Picture"
        />
        <h1 className="font-semibold text-3xl">Abhijeet Ray</h1>
        <h3 className="text-gray-600">
          Next.js / Supabase, FullStack Developer
        </h3>
        <p className="font-mono text-gray-700">
          Experienced web developer specializing in full-stack applications.
        </p>
        <div>
          <span>Resume : </span>
          <Link
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setIsHoveringLink(true)}
            onMouseLeave={() => setIsHoveringLink(false)}
            href={"/abhijeet_ray.pdf"}
          >
            click me
          </Link>
        </div>

        <div className="p-5 border rounded-md shadow">
          {known.map((itemk, index) => (
            <div key={index}>
              <h2 className="font-semibold text-lg text-gray-600 mt-8">
                {itemk.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {itemk.items.map((item, idx) => (
                  <span key={idx}>
                    <LinkItem
                      onMouseEnter={() => setIsHoveringLink(true)}
                      onMouseLeave={() => setIsHoveringLink(false)}
                      href={item.href}
                    >
                      {item.label}
                    </LinkItem>
                    {idx < itemk.items.length - 1 && <span>, </span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-semibold text-2xl mt-8">Projects</h2>

        {projects.map((project, index) => (
          <div
            key={index}
            className=" w-full mt-3 border p-4 rounded-lg shadow flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-700 text-xl font-semibold">
                {project.label}
              </h3>
              <p className="text-gray-700">{project.description}</p>
              <p className="my-3">
                <strong>Tools Used:</strong> {project.tools.join(", ")}
              </p>
              <div className="flex gap-3">
                <a
                  href={project.href}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  View Project
                </a>
                <a
                  href={project.live}
                  className="text-blue-600 underline hover:text-blue-800"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setIsHoveringLink(true)}
                  onMouseLeave={() => setIsHoveringLink(false)}
                >
                  Live
                </a>
              </div>
            </div>
            {project.iframe && (
              <iframe
                src={project.live}
                className="w-full h-[601px] border rounded-md"
                title={`${project.label} Preview`}
                allowFullScreen
                loading="lazy"
              />
            )}
          </div>
        ))}

        <h2 className="font-semibold text-2xl mt-8">Writing</h2>
        <div>
          {writing.map((heading, index) => (
            <div key={index} className="ml-4 mt-3">
              <a
                href={heading.href}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
              >
                {heading.label}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
          ref={formRef}
          id="contact-form"
          onSubmit={handleSubmit}
          className="mt-10 p-5 border rounded-md shadow"
        >
          <h2 className="font-semibold text-xl mb-5">Contact Me</h2>
          <div className="space-y-4">
            <div>
              <input
                placeholder="Email"
                type="email"
                value={email}
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                onMouseEnter={() => setIsHoveringLink(true)}
                onMouseLeave={() => setIsHoveringLink(false)}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
                required
              />
            </div>
            <button
              type="submit"
              className="underline text-blue-600"
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              Submit
            </button>
          </div>
        </form>

        <footer className="list-none mt-10 border-t pt-5 flex flex-row gap-4">
          {footerLinks.map((link, index) => (
            <LinkItem
              key={index}
              href={link.href}
              onMouseEnter={() => setIsHoveringLink(true)}
              onMouseLeave={() => setIsHoveringLink(false)}
            >
              {link.label}
            </LinkItem>
          ))}
        </footer>
      </div>
    </div>
  );
}
