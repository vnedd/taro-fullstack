import { cn } from "@/lib/utils";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface ContentProps {
  className?: string;
  item: {
    url: string;
    title: string;
    subTitle: string;
    buttonContent: string;
  };
}

const Content = ({ className, item }: ContentProps) => {
  const buttonRef = useRef(null);
  useGSAP(() => {
    gsap.fromTo(
      ".banner__stagger",
      {
        y: 100,
        opacity: 0,
        stagger: {
          each: 0.1,
        },
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
        stagger: {
          each: 0.1,
        },
      }
    );
  }, []);

  return (
    <div className={cn("lg:p-8 p-4", className)}>
      <div className="select-none w-full h-2/5 flex justify-center items-center text-white">
        <div className=" flex justify-start flex-col md:items-start items-center w-full md:space-y-6 space-y-3 ">
          <h6 className=" banner__stagger md:text-xl text-base font-bold md:text-left text-center w-full">
            {item.subTitle}
          </h6>
          <h1 className="banner__stagger text-left lg:text-5xl md:text-4xl text-3xl font-extrabold italic uppercase">
            {item.title}
          </h1>
          <div className="banner__stagger relative overflow-hidden md:w-1/2 w-full">
            <Link to={"/shop"}>
              <Button
                ref={buttonRef}
                className=" w-full text-primary bg-white hover:bg-white/95  rounded-2xl font-semibold text-lg lg:py-8 py-5"
                size={"lg"}
              >
                {item.buttonContent}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
