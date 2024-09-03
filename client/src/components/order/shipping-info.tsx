import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Modal from "../ui/modal";
import { Button } from "../ui/button";
import { FiEdit3 } from "react-icons/fi";
import { IOrder } from "@/types/order";
import CheckoutForm from "@/pages/(platform)/checkout/_components/checkout-form";

type ShippingInfoProps = {
  order: IOrder;
};

const ShippingInfo = ({ order }: ShippingInfoProps) => {
  const [show, setShow] = useState(false);
  return (
    <div className="">
      <Modal isOpen={show} onClose={() => setShow(false)}>
        <CheckoutForm
          formType="edit"
          orderId={order.id}
          onSetShowModal={setShow}
        />
      </Modal>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <p className="text-base">Shipping info</p>
              <Button
                disabled={
                  !!order?.tracking?.code ||
                  order.orderState === "Shipped" ||
                  order.orderState === "Delivered" ||
                  order.orderState === "Cancelled"
                }
                onClick={() => setShow(true)}
                variant={"ghost"}
                size={"icon"}
              >
                <FiEdit3 className="w-3 h-3" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <h3 className="font-medium">{order.customerName}</h3>
            {order.phoneNumber ? (
              <p className="font-normal text-sm">+1 {order.phoneNumber}</p>
            ) : null}
            <p className="font-normal text-sm">{order.address}</p>
            <Badge variant={"success"}>Verified</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingInfo;
