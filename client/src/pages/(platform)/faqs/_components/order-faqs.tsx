import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Heading from "@/components/heading";
import { CardContent, Card } from "@/components/ui/card";

const OrderFaqs = () => {
  return (
    <div className="flex items-center flex-col gap-y-6 w-full">
      <Heading variant="large" title="ORDERS & SHIPPING" />
      <Card className="md:w-[80%] md:max-w-full w-full">
        <CardContent className="pt-6 w-full">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Do you ship worldwide?</AccordionTrigger>
              <AccordionContent>
                Oopsie. Our store only supports shipping and delivery in the US
                area
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long will my order take?</AccordionTrigger>
              <AccordionContent>
                United States Standard 8-12 business days
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What payment methods do you offer?
              </AccordionTrigger>
              <AccordionContent>
                For international orders, we accept PayPal, Shop Pay, Apple Pay,
                Google Pay, as well as the usual Mastercard and Visa. For
                Australian orders, in addition to PayPal, Shop Pay, Apple Pay,
                Google Pay, Mastercard, and Visa, we also offer Afterpay,
                Klarna, Zip Pay, and Lay Buy. Taro Pay coming soon!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderFaqs;
