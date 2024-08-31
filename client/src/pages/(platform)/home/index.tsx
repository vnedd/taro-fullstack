import CategoriesSection from "@/components/section/categories-section";
import Banner from "./_components/banner/banner";
import FeaturedSection from "@/components/section/featured-section";
import StylesSection from "@/components/section/styles-section";
import ServiceSection from "@/components/section/service-section";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-16">
      <Banner />
      <CategoriesSection />
      <ServiceSection />
      <FeaturedSection />
      <StylesSection />
    </div>
  );
};

export default HomePage;
