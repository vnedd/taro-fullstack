import { Button } from "@/components/ui/button";
import { EOrderStates, EPaymentStates } from "@/types/order";
import { TOrderUrlParams } from "@/types/response";
import React from "react";

interface OrderStateTabsProps {
  params: TOrderUrlParams;
  onSetParams: React.Dispatch<React.SetStateAction<TOrderUrlParams>>;
}

const OrderStateTabs: React.FC<OrderStateTabsProps> = React.memo(
  ({ onSetParams, params }) => {
    const handleTabClick = React.useCallback(
      (orderState?: EOrderStates, paymentState?: EPaymentStates) => {
        onSetParams((prev) => ({
          ...prev,
          orderState,
          paymentState,
        }));
      },
      [onSetParams]
    );

    const renderButton = React.useCallback(
      (state: string, isActive: boolean, onClick: () => void) => (
        <Button
          size="sm"
          variant={isActive ? "default" : "secondary"}
          key={state}
          onClick={onClick}
        >
          {state}
        </Button>
      ),
      []
    );

    return (
      <div className="flex items-center lg:gap-4 gap-2 text-sm text-gray-500 dark:text-gray-200 overflow-x-auto">
        <div className="mb-4 flex space-x-4">
          {renderButton("All", !params.paymentState && !params.orderState, () =>
            handleTabClick()
          )}
          {Object.values(EOrderStates).map((state) =>
            renderButton(state, params.orderState === state, () =>
              handleTabClick(state)
            )
          )}
          {Object.values(EPaymentStates).map((state) =>
            renderButton(state, params.paymentState === state, () =>
              handleTabClick(undefined, state)
            )
          )}
        </div>
      </div>
    );
  }
);

OrderStateTabs.displayName = "OrderStateTabs";

export default OrderStateTabs;
