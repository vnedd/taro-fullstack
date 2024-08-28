import Container from "@/components/container";
import BackButton from "../_components/back-button";
import ProductForm from "../_components/form/product-form";
import { useCategories } from "@/hooks/use-categories";
import { useSizes } from "@/hooks/use-sizes";
import { useColors } from "@/hooks/use-colors";
import { useStyles } from "@/hooks/use-styles";
import Loading from "../_components/loading";

const AddNewPage = () => {
  const categoriesQuery = useCategories({ get_all: true });
  const sizesQuery = useSizes({ get_all: true });
  const colorsQuery = useColors({ get_all: true });
  const stylesQuery = useStyles({ get_all: true });

  const queries = [categoriesQuery, sizesQuery, colorsQuery, stylesQuery];

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Loading />;
  }

  const categories = categoriesQuery.data?.metaData ?? [];
  const sizes = sizesQuery.data?.metaData ?? [];
  const colors = colorsQuery.data?.metaData ?? [];
  const styles = stylesQuery.data?.metaData ?? [];

  if (!categories.length || !sizes.length || !colors.length || !styles.length) {
    return <Loading />;
  }

  return (
    <div className="max-w-full pb-20">
      <Container>
        <div className="mb-6">
          <BackButton title="Add new product" backUrl="/dashboard/products" />
        </div>
        <ProductForm
          initialData={null}
          formType="add"
          categories={categories}
          colors={colors}
          sizes={sizes}
          styles={styles}
        />
      </Container>
    </div>
  );
};

export default AddNewPage;
