import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EOrderStates, IOrder, ShippingTimelineType } from "@/types/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ShippingTimeline from "@/components/order/shipping-timeline";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { trackingIntance } from "@/services/api.config";
import { useCreateTracking } from "@/hooks/use-tracking";
import { useUpdateOrderState } from "@/hooks/use-orders";
import { useQueryClient } from "@tanstack/react-query";

type OrderActionsProps = {
  order: IOrder;
};

const TRACKING_CODE_REGEX =
  /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/;

const formSchema = z.object({
  code: z.string().refine((value) => TRACKING_CODE_REGEX.test(value || ""), {
    message: "Tracking code invalid",
  }),
});

const OrderActions = ({ order }: OrderActionsProps) => {
  const { mutateAsync: createTracking, isPending } = useCreateTracking();
  const { mutateAsync: updateOrderState } = useUpdateOrderState();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: order?.tracking?.code || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: trackingData } = await trackingIntance.get<{
        return_value: ShippingTimelineType;
      }>(`/${values.code}`);
      const { return_value: data } = trackingData;

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      await createTracking({ orderId: order.id, code: values.code });

      const newOrderState = data.is_delivered
        ? EOrderStates.Delivered
        : EOrderStates.Shipped;
      await updateOrderState({ orderId: order.id, orderState: newOrderState });
      await queryClient.refetchQueries({ queryKey: ["orders"] });

      toast.success("Tracking added successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const isDisabled = !!order.tracking || isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking ID</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isDisabled} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="default"
              disabled={isDisabled}
              className="w-full lg:w-auto"
            >
              {isPending && <Loader className="animate-spin w-4 h-4 mr-2" />}
              <p>Submit 1 packet</p>
            </Button>
          </form>
        </Form>
        <Separator className="w-full" />
        {order?.tracking && <ShippingTimeline order={order} />}
      </CardContent>
    </Card>
  );
};

export default OrderActions;
