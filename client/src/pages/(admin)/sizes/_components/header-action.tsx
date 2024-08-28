import { useState } from "react";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import SizesForm from "./size-form";

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
        <span className="hidden md:block">Add Size</span>
      </Button>
      <Modal
        isOpen={show}
        onClose={() => setShow(false)}
        title="Add style"
        description="Add style to products"
      >
        <SizesForm onSetShow={setShow} />
      </Modal>
    </>
  );
};

export default HeaderAction;