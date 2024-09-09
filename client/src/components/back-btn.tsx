import { MdKeyboardBackspace } from "react-icons/md";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface BackBtnProps {
  url?: string;
  className?: string;
}

const BackBtn = ({ url, className }: BackBtnProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (!url) {
      navigate(-1);
    } else {
      navigate(url);
    }
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClick}
      className={className}
    >
      <MdKeyboardBackspace className="w-4 h-4" />
    </Button>
  );
};

export default BackBtn;
