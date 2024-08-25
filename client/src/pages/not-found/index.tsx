import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <span className="bg-gradient-to-b from-foreground to-transparent bg-clip-text text-[10rem] font-extrabold leading-none ">
        404
      </span>
      <h2 className="my-2 font-heading text-2xl font-bold">
        Something&apos;s missing
      </h2>
      <p>
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <Link to={"/"} className="hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
