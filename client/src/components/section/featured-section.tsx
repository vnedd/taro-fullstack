import Container from "@/components/container";
import ErrorBlock from "@/components/error-block";
import Heading from "@/components/heading";
import CardSkeleton from "@/components/skeletons/cards-skeleton";
import { useProductFeatured } from "@/hooks/use-product";
import ProductList from "@/components/product/product-list";

const FeaturedSection = () => {
  const { data: products, isLoading, isError } = useProductFeatured();

  if (isError)
    return (
      <Container>
        <ErrorBlock />
      </Container>
    );

  console.log(products);

  return (
    <Container className="w-full">
      <Heading variant="large" title="Featured" />
      {isLoading ? (
        <CardSkeleton items={8} />
      ) : products?.metaData ? (
        <ProductList
          data={products.metaData}
          className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-6"
        />
      ) : null}
    </Container>
  );
};

export default FeaturedSection;
