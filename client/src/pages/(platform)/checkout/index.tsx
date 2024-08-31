import Container from "@/components/container";
import CheckoutForm from "./_components/checkout-form";
import CheckoutInfor from "./_components/checkout-infor";

const CheckoutPage = () => {
  return (
    <Container className="lg:pt-28 py-20">
      <div className="flex lg:gap-8 flex-col-reverse md:flex-row gap-4">
        <div className="w-full p-6 border rounded-md">
          <CheckoutForm formType="checkout" />
        </div>
        <div className="w-full">
          <CheckoutInfor />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
