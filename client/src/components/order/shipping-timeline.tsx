import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { IOrder, ShippingTimelineType } from "@/types/order";
import { trackingIntance } from "@/services/api.config";

type ShippingTimelineProps = {
  order: IOrder;
};
const ShippingTimeline = ({ order }: ShippingTimelineProps) => {
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState<ShippingTimelineType>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (order?.tracking?.code) {
        const res = await trackingIntance.get(`/${order?.tracking?.code}`);
        const data = res.data.return_value;

        const payload = {
          orderState:
            data.success && data.is_delivered
              ? "Delivered"
              : data.success && !data.is_delivered
              ? "Shipped"
              : null,
        };
        if (payload.orderState) {
          await axios.patch(`/api/orders/${order.id}`, {
            orderState: payload.orderState,
          });
        }
        setTimeline(data);
        setLoading(false);
      } else {
        return;
      }
      setLoading(false);
    })();
  }, [order.id, order?.tracking?.code]);

  return (
    <div>
      <h3 className="font-semibold text-xl">Time Line</h3>
      {loading ? (
        <div className="p-20 flex items-center justify-center">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      ) : (
        <div className="mt-4">
          {timeline?.success ? (
            <ul className="">
              {timeline?.scans_detail.map((item, index) => (
                <li
                  key={item.timestamp}
                  className="border-l  border-slate-300 pl-8 relative flex items-center py-3 space-x-4 first:text-green-500"
                >
                  <p className="text-sm capitalize">{`${item.time_part} - ${item.date_part}`}</p>
                  <p className="font-medium text-sm">{item.status}</p>
                  <span
                    className={cn(
                      "w-3 h-3 rounded-full bg-gray-200 absolute -left-[22px] z-10",
                      index === 0 && "bg-green-500"
                    )}
                  ></span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-destructive text-sm">
              {timeline?.message}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingTimeline;
