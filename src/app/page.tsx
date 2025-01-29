"use client";

import { useState } from "react";
import Image from "next/image";
import ProfilePic from "../../public/IMG20220124231430.jpg";
import U1 from "../../public/u1.png";
import U2 from "../../public/u2.png";
import U3 from "../../public/u3.png";
import L1 from "../../public/l1.png";
import L2 from "../../public/l2.png";
import L3 from "../../public/l3.png";

// Interface for Link Item Props
interface LinkItemProps {
  href: string;
  children: React.ReactNode;
}

const LinkItem: React.FC<LinkItemProps> = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="text-blue-600 underline hover:text-blue-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  </li>
);

// Interface for Section Props
interface SectionProps {
  title: string;
  items: { href: string; label: string }[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <>
    <h2 className="font-semibold text-lg text-gray-600 mt-8">{title}</h2>
    <ul className="list-none space-y-2">
      {items.map((item, index) => (
        <LinkItem key={index} href={item.href}>
          {item.label}
        </LinkItem>
      ))}
    </ul>
  </>
);

// Modal Component
interface ModalProps {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ModalProps> = ({ imageSrc, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-white p-5 rounded-lg shadow-lg max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-300 px-2 py-1 rounded-full text-black"
        >
          ✕
        </button>
        <Image
          src={imageSrc}
          width={900}
          height={900}
          alt="Enlarged Image"
          className="rounded-md"
        />
      </div>
    </div>
  );
};

const projects = [
  {
    href: "https://example.com/cinema-social-media",
    label: "Cinema Social Media",
    description:
      "A platform where movie enthusiasts connect and discuss films.",
    images: [L1.src, L2.src, L3.src],
    tools: ["Next.js", "Supabase", "Tailwind CSS", "PostgreSQL"],
  },
  {
    href: "https://example.com/university-course-forum",
    label: "University Course Forum",
    description:
      "A discussion platform for university students to share resources and knowledge.",
    images: [U1.src, U2.src, U3.src],
    tools: ["React", "Node.js", "MongoDB", "GraphQL"],
  },
];

const tools = [
  { href: "https://git-scm.com/", label: "Git" },
  { href: "https://www.docker.com/", label: "Docker" },
];

const languages = [
  { href: "https://www.typescriptlang.org/", label: "TypeScript" },
  { href: "https://www.javascript.com/", label: "JavaScript" },
];

const frameworks = [
  { href: "https://nextjs.org/", label: "Next.js" },
  { href: "https://reactjs.org/", label: "React" },
  { href: "https://tailwindcss.com/", label: "Tailwind CSS" },
];

const footerLinks = [
  { href: "https://www.linkedin.com/in/abhijeetray", label: "LinkedIn" },
  { href: "https://twitter.com/abhijeetray", label: "Twitter" },
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  return (
    <div className="max-w-3xl m-auto my-10 px-3 flex gap-5 flex-col">
      <Image src={ProfilePic} width={300} height={300} alt="Profile Picture" />
      <h1 className="font-semibold text-3xl">Abhijeet Ray</h1>
      <h3 className="text-gray-600">Next.js / Supabase, FullStack Developer</h3>
      <p className="font-mono text-gray-700">
        Experienced web developer specializing in full-stack applications.
      </p>

      <div className="p-5 border rounded-md shadow">
        <Section title="Tools" items={tools} />
        <Section title="Languages" items={languages} />
        <Section title="Frameworks" items={frameworks} />
      </div>

      <h2 className="font-semibold text-2xl mt-8">Projects</h2>
      {projects.map((project, index) => (
        <div key={index} className="mt-5 border p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold">{project.label}</h3>
          <p className="text-gray-600">{project.description}</p>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {project.images.map((src, idx) => (
              <Image
                className="rounded-md cursor-pointer transition-transform hover:scale-105"
                key={idx}
                src={src}
                width={300}
                height={300}
                alt={`Project ${index + 1} Image ${idx + 1}`}
                onClick={() => openModal(src)}
              />
            ))}
          </div>
          <p className="mt-3">
            <strong>Tools Used:</strong> {project.tools.join(", ")}
          </p>
          <a
            href={project.href}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Project
          </a>
        </div>
      ))}

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          imageSrc={selectedImage}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}

      <footer className="list-none mt-10 border-t pt-5 flex flex-row gap-4">
        {footerLinks.map((link, index) => (
          <LinkItem key={index} href={link.href}>
            {link.label}
          </LinkItem>
        ))}
      </footer>
    </div>
  );
}
