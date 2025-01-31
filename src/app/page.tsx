"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProfilePic from "../../public/IMG20220124231430.jpg";

// Interface for Link Item Props
interface LinkItemProps {
  href: string;
  children: React.ReactNode;
  onMouseEnter?: () => void; // Add onMouseEnter prop
  onMouseLeave?: () => void; // Add onMouseLeave prop
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
    onMouseEnter={onMouseEnter} // Pass onMouseEnter to the <a> tag
    onMouseLeave={onMouseLeave} // Pass onMouseLeave to the <a> tag
  >
    {children}
  </a>
);

// Interface for Section Props
interface SectionProps {
  title: string;
  items: { href: string; label: string }[];
}

const projects = [
  {
    href: "https://example.com/cinema-social-media",
    live: "https://letsee-dusky.vercel.app",
    label: "Cinema Social Media",
    description:
      "A platform where movie enthusiasts connect and discuss films.",
    tools: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
  },
  {
    href: "https://example.com/university-course-forum",
    live: "https://snsthinkhub-abhijeet11ray-gmailcom.vercel.app/",
    label: "University Course Forum",
    description:
      "A discussion platform for university students to share resources and knowledge.",
    tools: ["React", "Node.js", "MongoDB", "GraphQL"],
  },
];

const Writting = [
  {
    href: "https://abhijeetray.hashnode.dev/building-a-scalable-fullstack-application-with-nextjs-and-supabase-a-step-by-step-guide",

    label: "Scalable FullStack Application with Next.js and Supabase",
    description:
      "A platform where movie enthusiasts connect and discuss films.",
  },
  {
    href: "https://example.com/university-course-forum",

    label: "University Course Forum",
    description:
      "A discussion platform for university students to share resources and knowledge.",
  },
];

const known: SectionProps[] = [
  {
    title: "Tools",
    items: [
      { href: "https://git-scm.com/", label: "Git" },
      { href: "https://www.docker.com/", label: "Docker" },
    ],
  },
  {
    title: "Languages",
    items: [
      { href: "https://www.typescriptlang.org/", label: "TypeScript" },
      { href: "https://www.javascript.com/", label: "JavaScript" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { href: "https://nextjs.org/", label: "Next.js" },
      { href: "https://reactjs.org/", label: "React" },
      { href: "https://tailwindcss.com/", label: "Tailwind CSS" },
    ],
  },
];

const footerLinks = [
  { href: "https://www.linkedin.com/in/abhijeetray", label: "LinkedIn" },
  { href: "https://twitter.com/abhijeetray", label: "Twitter" },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isMouseConnected, setIsMouseConnected] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHoveringLink, setIsHoveringLink] = useState(false); // Track hover state
  const words = ["Hi.", "it's", "Abhijeet", "Ray", "🧡"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true);
    const checkPointer = () => {
      setIsMouseConnected(window.matchMedia("(pointer: fine)").matches);
    };

    checkPointer();
    window.addEventListener("resize", checkPointer);

    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 500);

    return () => {
      window.removeEventListener("resize", checkPointer);
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseConnected) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Email: ${email}\nMessage: ${message}`);
  };

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
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
              onClick={scrollToForm}
              className="text-blue-600 underline hover:text-blue-800"
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
            >
              Contact Me
            </button>
            <button
              onClick={scrollToForm}
              className="text-blue-600 underline hover:text-blue-800"
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
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
                      onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
                      onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
                      href={item.href}
                    >
                      {item.label}
                    </LinkItem>
                    {idx < itemk.items.length - 1 && <span>, </span>}{" "}
                    {/* Add comma between items */}
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
            className="max-w-lg mt-3 border p-4 rounded-lg shadow"
          >
            <h3 className="text-gray-700 text-xl font-semibold">
              {project.label}
            </h3>
            <p className="text-gray-700">{project.description}</p>
            <p className="my-3">
              <strong>Tools Used:</strong> {project.tools.join(", ")}
            </p>
            <a
              href={project.href}
              className="text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
            >
              View Project
            </a>{" "}
            <a
              href={project.live}
              className="mx-3 text-blue-600 underline hover:text-blue-800"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
            >
              Live
            </a>
          </div>
        ))}

        <h2 className="font-semibold text-2xl mt-8">Writting</h2>
        <div className=" ">
          {Writting.map((heading, index) => (
            <div key={index} className="ml-4 mt-3">
              <a
                href={heading.href}
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
                onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
              >
                {heading.label}
              </a>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <form
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
                onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
                onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Message"
                onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
                onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
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
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
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
              onMouseEnter={() => setIsHoveringLink(true)} // Show palm cursor on hover
              onMouseLeave={() => setIsHoveringLink(false)} // Hide palm cursor on leave
            >
              {link.label}
            </LinkItem>
          ))}
        </footer>
      </div>
    </div>
  );
}
