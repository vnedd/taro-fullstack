import { BiCheck } from "react-icons/bi";
import { addDays, format } from "date-fns";
import { PiHandsClapping } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
interface Props {
  date: Date;
}

const congratulation = ({ date }: Props) => {
  const orderDate = format(date, "MMM dd");
  const expectedDate = format(addDays(date, 3), "MMM dd");
  return (
    <div className="relative">
      <div className="text-center pt-8">
        <div className="flex items-center justify-center space-x-3 text-center">
          <PiHandsClapping className="w-10 h-10 hidden md:block" />
          <h3 className="font-bold md:text-3xl text-xl">
            Woohoo! Your order is confirmed!
          </h3>
        </div>
        <div className="text-center md:mt-3 mt-2 font-medium md:text-sm text-xs">
          <p>We will start working on this right way.</p>
          <p>We will email you as soon as ships.</p>
        </div>
      </div>
      <div className="mt-8 flex items-center justify-between relative">
        <div className="z-20 relative">
          <div className="flex items-center flex-col justify-start space-y-4">
            <div className=" lg:w-8 lg:h-8 w-6 h-6  bg-primary dark:bg-primary rounded-full flex items-center justify-center">
              <BiCheck className="w-6 h-6 text-white" />
            </div>
            <div className="lg:w-32 w-16 md:h-18 h-16 flex flex-col font-medium items-center">
              <p className="text-nowrap md:text-sm text-xs">Ordered</p>
              <p className="md:text-sm text-xs ">{orderDate}</p>
            </div>
          </div>
        </div>
        <div className="z-20 relative">
          <div className="flex items-center flex-col justify-start space-y-4">
            <div className=" lg:w-8 lg:h-8 w-6 h-6 bg-white border-primary border-2 dark:bg-slate-800 dark:border-primary rounded-full flex items-center justify-center" />
            <div className="lg:w-32 w-16 md:h-18 h-16 flex flex-col font-medium items-center">
              <p className="text-nowrap md:text-sm text-xs">To ship</p>
            </div>
          </div>
        </div>
        <div className="z-20 relative">
          <div className="flex items-center flex-col justify-start space-y-4">
            <div className=" lg:w-8 lg:h-8 w-6 h-6 bg-white  border-primary border-2 dark:bg-slate-800 dark:border-primary rounded-full flex items-center justify-center" />
            <div className="lg:w-32 w-16 md:h-18 h-16 flex flex-col font-medium items-center">
              <p className="text-nowrap md:text-sm text-xs">Expected</p>
              <p className="md:text-sm text-xs ">{expectedDate}</p>
            </div>
          </div>
        </div>
        <p className="lg:top-[14px] top-[11px] h-[2px] left-8 right-6 md:left-14 md:right-14 bg-primary dark:bg-primary absolute"></p>
      </div>
      <div className="flex flex-col items-center space-y-3">
        <Link to="/account/orders">
          <Button className="rounded-full" variant={"default"}>
            View your order
          </Button>
        </Link>
        <p className="md:text-sm text-xs text-center md:max-w-[70%] max-w-sm">
          Delivery times are estimated. If you are experiencing difficulty with
          this order, please{" "}
          <span className="underline">contact the seller</span>
        </p>
      </div>
    </div>
  );
};

export default congratulation;
