import Image from "next/image";
import ProfilePic from "../../public/IMG20220124231430.jpg";

// Type definitions for reusable components
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

interface SectionProps {
  title: string;
  items: { href: string; label: string }[];
}

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <>
    <h2 className="font-semibold text-2xl mt-8">{title}</h2>
    <ul className="list-none space-y-2">
      {items.map((item, index) => (
        <LinkItem key={index} href={item.href}>
          {item.label}
        </LinkItem>
      ))}
    </ul>
  </>
);

export default function Home() {
  // Data for Projects and Writing
  const projects: { href: string; label: string }[] = [
    {
      href: "https://example.com/cinema-social-media",
      label: "Cinema Social Media",
    },
    {
      href: "https://example.com/university-course-forum",
      label: "University Course Forum",
    },
  ];

  const writings: { href: string; label: string }[] = [
    {
      href: "https://example.com/cinema-social-media-article",
      label: "Cinema Social Media Article",
    },
    {
      href: "https://example.com/university-course-forum-article",
      label: "University Course Forum Article",
    },
  ];

  // Footer Links
  const footerLinks: { href: string; label: string }[] = [
    { href: "https://www.linkedin.com/in/abhijeetray", label: "LinkedIn" },
    { href: "https://twitter.com/abhijeetray", label: "Twitter" },
  ];

  return (
    <div className="max-w-3xl m-auto my-10 flex gap-5 flex-col">
      {/* Profile Picture */}
      <Image
        className="my-5"
        src={ProfilePic}
        width={300}
        height={300}
        alt="Profile Picture"
      />

      {/* Name */}
      <h1 className="font-semibold text-3xl">Abhijeet Ray</h1>

      {/* Bio */}
      <p className="font-mono text-gray-700">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
        consequatur tempore dicta, minima qui similique nemo id! Distinctio
        reiciendis voluptatum adipisci ratione perferendis libero nobis?
      </p>

      {/* Projects Section */}
      <Section title="Projects" items={projects} />

      {/* Writing Section */}
      <Section title="Writing" items={writings} />

      {/* Footer */}
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
