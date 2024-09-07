import { PiCoatHanger } from "react-icons/pi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const SizeChart = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="text-xs flex items-center cursor-pointer border-b-2 border-slate-800">
          <PiCoatHanger className="w-4 h-4 mr-2" />
          <p>Size chart</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] md:max-w-[650px] lg:max-w-[700px] rounded-lg p-1">
        <div className="aspect-square relative">
          <img
            src={"/images/size-chart.png"}
            alt="size chart"
            className="w-full h-full"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeChart;
