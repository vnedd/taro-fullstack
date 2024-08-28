import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

interface BackButtonProps {
  title: string;
  backUrl: string;
}

const BackButton = ({ title, backUrl }: BackButtonProps) => {
  return (
    <div className="flex items-center space-x-3">
      <Link to={backUrl}>
        <Button
          variant={"outline"}
          size={"icon"}
          className="md:w-10 md:h-10 w-8 h-8 "
        >
          <IoIosArrowBack className="w-5 h-5" />
        </Button>
      </Link>
      <h4 className="font-semibold md:text-xl text-base">{title}</h4>
    </div>
  );
};

export default BackButton;
