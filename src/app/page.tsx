import Image from "next/image";
import ProfilePic from ".//../../public/IMG20220124231430.jpg";
export default function Home() {
  return (
    <div className="max-w-3xl m-auto my-10 flex gap-5 flex-col">
      <Image
        className="my-5"
        src={ProfilePic}
        width={300}
        height={300}
        alt={""}
      />
      <h1 className="font-semibold">Abhjijeet Ray</h1>
      <p className="font-mono">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque
        consequatur tempore dicta, minima qui similique nemo id! Distinctio
        reiciendis voluptatum adipisci ratione perferendis libero nobis?
      </p>
      <h2 className="font-">Project</h2>
      <ul>
        <li>Cinema Social media </li> <li>University Course Forum </li>{" "}
      </ul>
      <h2>Writing</h2>
      <ul>
        <li>Cinema Social media </li> <li>University Course Forum </li>{" "}
      </ul>
    </div>
  );
}
