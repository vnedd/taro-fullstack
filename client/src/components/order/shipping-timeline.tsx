import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { EOrderStates, IOrder, ShippingTimelineType } from "@/types/order";
import { trackingIntance } from "@/services/api.config";
import { useUpdateOrderState } from "@/hooks/use-orders";

type ShippingTimelineProps = {
  order: IOrder;
};

const ShippingTimeline: React.FC<ShippingTimelineProps> = ({ order }) => {
  const [timeline, setTimeline] = useState<ShippingTimelineType>();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = useUpdateOrderState();

  const fetchTimeline = useCallback(async () => {
    if (!order?.tracking?.code) return;

    setIsLoading(true);
    try {
      const res = await trackingIntance.get(`/${order.tracking.code}`);
      const data = res.data.return_value;

      const newOrderState = data.success
        ? data.is_delivered
          ? EOrderStates.Delivered
          : EOrderStates.Shipped
        : null;

      if (newOrderState) {
        await mutateAsync({ orderId: order.id, orderState: newOrderState });
      }

      setTimeline(data);
    } catch (error) {
      console.error("Error fetching timeline:", error);
    } finally {
      setIsLoading(false);
    }
  }, [order.id, order.tracking?.code, mutateAsync]);

  useEffect(() => {
    fetchTimeline();
  }, [fetchTimeline]);

  const renderTimelineItem = useCallback(
    (item: any, index: number) => (
      <li
        key={item.timestamp}
        className="border-l border-slate-300 pl-8 relative flex items-center py-3 space-x-4 first:text-green-500"
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
    ),
    []
  );

  const timelineContent = useMemo(() => {
    if (isLoading) {
      return (
        <div className="p-20 flex items-center justify-center">
          <Loader className="animate-spin w-6 h-6" />
        </div>
      );
    }

    return (
      <div>
        <h3 className="font-semibold text-xl">Time Line</h3>
        <div className="mt-4">
          {timeline?.success ? (
            <ul>{timeline.scans_detail.map(renderTimelineItem)}</ul>
          ) : (
            <span className="text-destructive text-sm">
              {timeline?.message}
            </span>
          )}
        </div>
      </div>
    );
  }, [isLoading, timeline, renderTimelineItem]);

  return timelineContent;
};

export default React.memo(ShippingTimeline);
