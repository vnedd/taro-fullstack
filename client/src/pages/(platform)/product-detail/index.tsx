import { useEffect } from "react";
import { useProduct } from "@/hooks/use-product";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/product/loading";
import ErrorBlock from "@/components/error-block";
import Container from "@/components/container";
import BreadCrumb from "./_components/breadcum";
import ProductGallery from "./_components/product-gallery";
import ProductDetails from "@/components/product/product-details";
import FeaturedSection from "@/components/section/featured-section";
import useScrollToTop from "@/hooks/use-scroll-to-top";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useScrollToTop();
  useEffect(() => {
    if (!id) navigate("/");
  }, [id, navigate]);

  const { data: product, isLoading, isError } = useProduct(id!);

  if (isLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (isError || !product) {
    return <ErrorBlock />;
  }

  return (
    <div className="flex flex-col space-y-20">
      <Container className="lg:pt-28 md:pt-24 pt-20 ">
        <BreadCrumb label={product.name} />
        <div className="space-y-10 mt-6">
          <div className="grid md:grid-cols-2 grid-cols-1 lg:gap-16 md:gap-10 gap-6">
            <ProductGallery images={product.images} />
            <ProductDetails data={product} />
          </div>
        </div>
      </Container>
      <FeaturedSection />
    </div>
  );
};

export default ProductDetailPage;
