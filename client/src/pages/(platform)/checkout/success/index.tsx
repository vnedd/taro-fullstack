import Container from "@/components/container";

interface SuccessPageProps {
  params: {
    orderId: string;
  };
}

const SuccessPage = ({ params }: SuccessPageProps) => {
  console.log(params);
  return <Container className="lg:pt-28 pt-20">helloo</Container>;
};

export default SuccessPage;
