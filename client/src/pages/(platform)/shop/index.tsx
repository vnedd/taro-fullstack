import Container from "@/components/container";
import Banner from "./_components/banner";
import ProductFilter from "./_components/product-filter";
import CategoriesSection from "@/components/section/categories-section";

const ShopPage = () => {
  return (
    <>
      <Container className="lg:pt-28 pt-20 flex flex-col gap-y-8 pb-20">
        <div className="hidden md:block">
          <Banner />
        </div>
        <ProductFilter />
      </Container>
      <CategoriesSection />
    </>
  );
};

export default ShopPage;
