import Container from "@/components/container";
import SuccessContent from "./_components/success-content";
import { useNavigate, useParams } from "react-router-dom";
import useScrollToTop from "@/hooks/use-scroll-to-top";
import { useEffect } from "react";
import { useOrder } from "@/hooks/use-orders";
import Loading from "@/components/loading";
import ErrorBlock from "@/components/error-block";

const CheckoutSuccessPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  useScrollToTop();
  useEffect(() => {
    if (!orderId) navigate("/");
  }, [orderId, navigate]);

  const { data: order, isLoading, isError } = useOrder(orderId!);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (isError || !order) {
    return <ErrorBlock />;
  }
  return (
    <Container className="lg:pt-28 pt-20">
      <SuccessContent order={order} />
    </Container>
  );
};

export default CheckoutSuccessPage;
