import React from "react";
import { Loader } from "lucide-react";
import Modal from "@/components/ui/modal";
import { useProduct } from "@/hooks/use-product";
import ProductDetails from "@/components/product/product-details";

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8 animate-spin" />
        </div>
      </Modal>
    );
  }

  if (isError || !product) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className="text-center p-4">
          <p>Error loading product. Please try again.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="md:max-w-[60vw]">
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
