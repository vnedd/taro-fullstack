import { Button } from "./ui/button";

interface SocialButtonProps {
  icon: any;
  onClick: () => void;
  disabled?: boolean;
  title: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  onClick,
  disabled,
  title,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full space-x-3"
      disabled={disabled}
    >
      <Icon size={20} />
      <p className="font-semibold">{title}</p>
    </Button>
  );
};

export default SocialButton;
