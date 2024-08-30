import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Container from "@/components/container";
import BackButton from "../_components/back-button";
import ProductForm from "../_components/form/product-form";
import Loading from "../_components/loading";
import ErrorBlock from "@/components/error-block";

import { useCategories } from "@/hooks/use-categories";
import { useSizes } from "@/hooks/use-sizes";
import { useColors } from "@/hooks/use-colors";
import { useStyles } from "@/hooks/use-styles";
import { useProduct } from "@/hooks/use-product";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) navigate("/dashboard/products");
  }, [id, navigate]);

  const categoriesQuery = useCategories({ get_all: true });
  const sizesQuery = useSizes({ get_all: true });
  const colorsQuery = useColors({ get_all: true });
  const stylesQuery = useStyles({ get_all: true });
  const productQuery = useProduct(id!);

  const queries = [
    categoriesQuery,
    sizesQuery,
    colorsQuery,
    stylesQuery,
    productQuery,
  ];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !productQuery.data) {
    return <ErrorBlock />;
  }

  const categories = categoriesQuery.data?.metaData ?? [];
  const sizes = sizesQuery.data?.metaData ?? [];
  const colors = colorsQuery.data?.metaData ?? [];
  const styles = stylesQuery.data?.metaData ?? [];
  const product = productQuery.data;

  return (
    <div className="max-w-full pb-20">
      <Container>
        <div className="mb-6">
          <BackButton title="Update product" backUrl="/dashboard/products" />
        </div>
        <ProductForm
          initialData={product}
          formType="update"
          categories={categories}
          colors={colors}
          sizes={sizes}
          styles={styles}
        />
      </Container>
    </div>
  );
};
export default UpdatePage;
