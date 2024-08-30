import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Heading from "@/components/heading";
import { CardContent, Card } from "@/components/ui/card";

const ReturnFaqs = () => {
  return (
    <div className="flex items-center flex-col gap-y-6 w-full">
      <Heading variant="large" title="RETURNS & EXCHANGES" />
      <Card className="md:w-[80%] md:max-w-full w-full">
        <CardContent className="pt-6 w-full">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I return something?</AccordionTrigger>
              <AccordionContent>
                Oopsie. Did we make a poopsie? It is super duper easy. Click
                here to visit the returns centre, and it`&apos;ll walk you
                through the process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What is your exchange policy?</AccordionTrigger>
              <AccordionContent>
                We offer exchanges or store credit on retail items that are
                unworn and in the same condition received for up to 30 days
                after purchase.* Australian returns are donated to the homeless
                and disadvantaged through our Thread Together partnership. So,
                if it&apos;s the wrong size or something else isn&apos;t quite
                right, click here to get started, and we&apos;ll make it right.
                *In other words, don&apos;t send us back a tee that has
                mysterious stains on it. We tend to lick things to identify the
                source. And we don&apos;t want to get sick or pregnant.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is your exchange policy for discounted and free items?
              </AccordionTrigger>
              <AccordionContent>
                You can return the item that you obtained at a discounted price
                for store credit. Store credit will equate to the value you paid
                for the discounted item. Free items will not be included in the
                store credit. You can exchange the item that you obtained at a
                discounted price or for free only if you exchange with the same
                product type and same value.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnFaqs;
