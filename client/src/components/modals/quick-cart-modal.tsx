import React from "react";
import Modal from "@/components/ui/modal";
import { useProduct } from "@/hooks/use-product";
import ProductDetails from "@/components/product/product-details";
import Loading from "../product/loading";

interface QuickCartModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

const QuickCartModal: React.FC<QuickCartModalProps> = ({
  productId,
  isOpen,
  onClose,
}) => {
  const { data: product, isLoading, isError } = useProduct(productId);

  if (isLoading) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="md:max-w-[60vw]">
        <Loading />
      </Modal>
    );
  }

  if (isError || !product) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className="md:max-w-[60vw]">
        <div className="text-center p-4">
          <p>Error loading product. Please try again.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="md:max-w-[60vw] max-h-[70vh] overflow-y-auto"
    >
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="lg:w-1/2 shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="lg:aspect-square aspect-video object-cover rounded-lg"
          />
        </div>
        <div className="lg:w-1/2">
          <ProductDetails data={product} />
        </div>
      </div>
    </Modal>
  );
};

export default QuickCartModal;
