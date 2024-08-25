import { uploadImageToCloudinary } from "@/services/cloudinary.service";
import { useState, ChangeEvent, useId } from "react";
import { Button } from "./ui/button";
import { RiDeleteBackLine } from "react-icons/ri";

interface UploadWidgetProps {
  initUrl?: string;
  disabled?: boolean;
  onUpload: (url: string) => void;
  onRemove: (url: string) => void;
}

const UploadWidget = ({
  onUpload,
  onRemove,
  disabled,
  initUrl = "",
}: UploadWidgetProps) => {
  const [image, setImage] = useState<string>(initUrl);
  const inputId = useId();
  const uploadImage = async (file: File) => {
    try {
      const url = await uploadImageToCloudinary(file);
      setImage(url);
      onUpload(url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleRemove = () => {
    setImage("");
    onRemove(image);
  };

  return (
    <div>
      {image ? (
        <div className="relative aspect-square rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="Uploaded"
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-6 h-6  p-1 rounded"
          >
            <RiDeleteBackLine className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div className="mt-4">
          <label
            htmlFor={inputId}
            className={`flex justify-center items-center w-full h-32 border border-dashed border-gray-300 rounded-md cursor-pointer ${
              disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <span className="text-secondary-foreground">
              Drag & drop an image here, or{" "}
              <span className="text-blue-600">browse</span>
            </span>
            <input
              id={inputId}
              type="file"
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
