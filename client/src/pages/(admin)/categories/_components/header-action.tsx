import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import CategoriesForm from "./categories-form";

const HeaderAction = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        variant="default"
        className="dark:text-white"
        size="sm"
      >
        <GoPlusCircle className="w-4 h-4 md:mr-2" />
        <span className="hidden md:block">Add Category</span>
      </Button>
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        title="Add category"
        description="Add category to products"
      >
        <CategoriesForm onSetShow={setShow} />
      </Modal>
    </>
  );
};

export default HeaderAction;
