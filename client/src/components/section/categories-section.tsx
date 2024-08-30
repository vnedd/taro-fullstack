import Heading from "@/components/heading";
import Container from "@/components/container";
import { useCategories } from "@/hooks/use-categories";
import ErrorBlock from "@/components/error-block";
import CardSkeleton from "@/components/skeletons/cards-skeleton";
import CategoriesMenu from "./categories-menu";

const CategoriesSection = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useCategories({ get_all: true });

  if (isError)
    return (
      <Container>
        <ErrorBlock />
      </Container>
    );

  return (
    <Container className="py-10 space-y-8">
      <Heading variant="large" title="Shop by Categories" />
      <div className="w-full">
        {isLoading ? (
          <CardSkeleton />
        ) : categories?.metaData ? (
          <CategoriesMenu data={categories.metaData} />
        ) : null}
      </div>
    </Container>
  );
};

export default CategoriesSection;
