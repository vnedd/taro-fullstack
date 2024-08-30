import Container from "@/components/container";
import ReturnFaqs from "./_components/return-faqs";
import OrderFaqs from "./_components/order-faqs";
import Heading from "@/components/heading";

const FaqPage = () => {
  return (
    <Container className="lg:pt-28 pt-20 flex flex-col gap-y-10 pb-20">
      <div className="flex items-center flex-col gap-y-10 w-full">
        <Heading variant="large" title="FREQUENTLY ASKED QUESTIONS" />
        <p className="text-sm max-w-lg text-center">
          Unfortunately, if you&apos;re looking for the answer to whether cereal
          is soup, you&apos;re at the wrong place. If you&apos;re
          what-the-FAQing about Taro, though, scroll on.
        </p>
        <img
          src={"/images/faqs.gif"}
          className="w"
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div className="mt-16 space-y-16">
        <ReturnFaqs />
        <OrderFaqs />
      </div>
    </Container>
  );
};

export default FaqPage;
