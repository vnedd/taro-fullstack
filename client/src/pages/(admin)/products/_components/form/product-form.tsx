import { useCallback, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { IProduct, IVariant } from "@/types/product";

import VariantSection from "./variant-section";
import BasicInfo from "./basic-info";
import SaleInfo from "./sale-info";
import Marketing from "./marketing";
import Media from "./media";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-product";
import toast from "react-hot-toast";
import { ICategory } from "@/types/category";
import { IColor } from "@/types/color";
import { ISize } from "@/types/size";
import { IStyle } from "@/types/style";
import { useNavigate } from "react-router-dom";
import { productschema, TProductSchema } from "@/schemas/product.schema";
import { priceTemplate } from "@/constants/price-template";
import { FormError } from "@/components/form-error";
import ProductDetails from "./product-details";
import { useQueryClient } from "@tanstack/react-query";

interface ProductFormProps {
  categories: ICategory[];
  colors: IColor[];
  sizes: ISize[];
  styles: IStyle[];
  formType: "add" | "copy" | "update";
  initialData: IProduct | null;
}

const ProductForm = ({
  categories,
  colors,
  sizes,
  styles,
  formType,
  initialData,
}: ProductFormProps) => {
  const { mutateAsync: createMutation, isPending: createLoading } =
    useCreateProduct();

  const { mutateAsync: updateMutation, isPending: updateLoading } =
    useUpdateProduct();

  const queryClient = useQueryClient();

  const [variants, setVariants] = useState<IVariant[]>(
    initialData?.variants?.map((variant: IVariant) => ({
      id: variant.id || "",
      colorName: variant.colorName || "",
      sizeName: variant.sizeName || "",
      styleName: variant.styleName || "",
      color: variant.color || "",
      size: variant.size || "",
      style: variant.style || "",
      price: variant.price,
      stock: variant.stock || 50,
    })) || []
  );

  const [variantError, setVariantError] = useState("");
  const router = useNavigate();
  const form = useForm<TProductSchema>({
    resolver: zodResolver(productschema),
    defaultValues: {
      name: initialData
        ? `${initialData?.name} ${formType === "copy" ? "- copy" : ""}`
        : "",
      description: initialData?.description || "",
      category: initialData?.category?.id || "",
      images: initialData?.images || [],
      product_sizes: initialData?.productSizes?.map((size) => size.id) || [],
      product_colors:
        initialData?.productColors?.map((color) => color.id) || [],
      product_styles:
        initialData?.productStyles?.map((style) => style.id) || [],
      isFeatured: initialData?.isFeatured ?? true,
      discount: initialData?.discount ?? 0,
      variants,
    },
  });

  const { watch } = form;

  const checkValidDataVariants = () => {
    return !variants.find((v) => v.price === 0 || v.stock === 0);
  };

  const onSubmit = async (values: TProductSchema) => {
    setVariantError("");
    try {
      if (variants.length === 0) {
        setVariantError("Please generate products variants");
        return false;
      } else if (!checkValidDataVariants()) {
        setVariantError("Enter all price and quantity of variants");
        return false;
      } else {
        const productData = {
          ...values,
          isFeatured: values.isFeatured ?? false,
          discount: values.discount ?? 0,
          variants: variants,
        };

        switch (formType) {
          case "add":
            await createMutation(productData);
            toast.success("Product Added successfully!");
            router("/dashboard/products");
            break;
          case "update":
            await updateMutation({
              ...productData,
              id: initialData?.id || "",
            });
            toast.success("Product Updated successfully!");
            router("/dashboard/products");

            break;
          case "copy":
            await createMutation(productData);
            toast.success("Product Copied successfully!");
            router("/dashboard/products");
            break;
          default:
            return false;
        }
      }
    } catch (error: any) {
      toast.error(error || "An error occurred while processing your request");
    } finally {
      await queryClient.refetchQueries({ queryKey: ["products"] });
    }
  };

  const generateVariants = () => {
    setVariantError("");
    const array = [];
    const sizesW = watch("product_sizes");
    const colorsW = watch("product_colors");
    const productTypesW = watch("product_styles");

    if (
      sizesW?.length === 0 ||
      colorsW?.length === 0 ||
      productTypesW?.length === 0
    ) {
      setVariantError(
        "Please select at least 1 attribute in each colors, sizes and product types field"
      );
    }

    const sizeChoosed = sizes.filter((size) => sizesW?.includes(size.id));
    const colorChoosed = colors.filter((color) => colorsW?.includes(color.id));
    const productStyleChoosed = styles.filter((style) =>
      productTypesW?.includes(style.id)
    );

    for (const style of productStyleChoosed) {
      for (const color of colorChoosed) {
        for (const size of sizeChoosed) {
          array.push({
            size: size.id,
            sizeName: size.name,
            color: color.id,
            colorName: color.name,
            style: style.id,
            styleName: style.name,
            stock: 50,
            price: 0,
          });
        }
      }
    }

    setVariants(array);
    form.setValue("variants", array);
  };

  const handlePriceChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      let { value } = event.target;
      if (Number(value) < 0) {
        value = "";
      }
      setVariants((prevState) => {
        const newState = [...prevState];
        newState[index].price = Number(value);
        return newState;
      });
    },
    []
  );

  const handleQuantityChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      let { value } = event.target;
      if (Number(value) < 0) {
        value = "50";
      }
      setVariants((prevState) => {
        const newState = [...prevState];
        newState[index].stock = Number(value);
        return newState;
      });
    },
    []
  );

  const handleDelete = useCallback((index: number) => {
    setVariants((prevState) => {
      const newState = [...prevState].filter((_, i) => i !== index);
      return newState;
    });
  }, []);

  const handleUsePriceTemplate = useCallback(() => {
    const newArr = [...variants];
    const template = newArr.map((variant) => {
      const currTemp = priceTemplate.find(
        (tem: IVariant) =>
          tem.size === variant.size &&
          tem.color === variant.color &&
          tem.style === variant.style
      );
      return currTemp ? { ...variant, price: currTemp.price } : variant;
    });
    setVariants(template);
    form.setValue("variants", template);
  }, [variants, form]);

  const memoizedVariantSection = useMemo(
    () => (
      <VariantSection
        variants={variants}
        onQuantityChange={handleQuantityChange}
        onPriceChange={handlePriceChange}
        onDelete={handleDelete}
        onUsePriceTemplate={handleUsePriceTemplate}
        loading={createLoading || updateLoading}
      />
    ),
    [
      variants,
      handleQuantityChange,
      handlePriceChange,
      handleDelete,
      handleUsePriceTemplate,
      createLoading,
      updateLoading,
    ]
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full grid lg:grid-cols-5 grid-cols-1 gap-6"
      >
        <div className="lg:col-span-3 col-span-1 lg:space-y-8 md:space-y-6 space-y-4">
          <BasicInfo
            form={form}
            loading={createLoading || updateLoading}
            categories={categories}
          />
          <SaleInfo
            form={form}
            loading={createLoading || updateLoading}
            sizes={sizes}
            colors={colors}
            styles={styles}
            generateVariants={generateVariants}
          />
          {memoizedVariantSection}
          {variantError && <FormError message={variantError} />}
        </div>
        <div className="lg:col-span-2 col-span-1 lg:space-y-8 md:space-y-6 space-y-4">
          <Marketing form={form} loading={createLoading || updateLoading} />
          <Media form={form} loading={createLoading || updateLoading} />
          <ProductDetails
            form={form}
            loading={createLoading || updateLoading}
          />
        </div>
        <div className="fixed bottom-0 right-0 left-0 bg-white dark:bg-black px-4 py-3 flex justify-end border-t">
          <Button
            type="submit"
            variant="default"
            disabled={createLoading || updateLoading}
            size="sm"
          >
            {createLoading || updateLoading ? (
              <>
                <span className="mr-2">Saving</span>
                <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
              </>
            ) : formType === "add" ? (
              "Add Product"
            ) : formType === "copy" ? (
              "Copy product"
            ) : (
              "Edit Product"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
