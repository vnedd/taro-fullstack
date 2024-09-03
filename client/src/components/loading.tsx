import Container from "@/components/container";
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <Container>
      <div className="w-full h-full p-20 pt-30 flex items-center justify-center">
        <div className="bg-black/60 w-24 h-24 aspect-square flex items-center justify-center rounded-lg">
          <Loader className="animate-spin text-white" />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
