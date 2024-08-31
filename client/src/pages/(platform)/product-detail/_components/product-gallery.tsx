import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
};

const ProductGallery = ({ images }: Props) => {
  return (
    <div className="w-full relative">
      <Carousel>
        <CarouselContent>
          {images.map((image) => (
            <CarouselItem key={image} className="aspect-square relative">
              <img
                src={image}
                alt="product image"
                className="rounded-md object-cover w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute md:left-10  left-5" />
        <CarouselNext className="absolute md:right-10 right-5" />
      </Carousel>
    </div>
  );
};

export default ProductGallery;
