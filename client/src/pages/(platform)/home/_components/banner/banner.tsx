import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Content from "./content";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
const slides = [
  {
    url: "/images/homepage/banner/banner-02.jpg",
    title: "Vintage Graphic Tees",
    subTitle: "Our Classic Cut",
    buttonContent: "Shop trending designs",
  },
  {
    url: "/images/homepage/banner/banner-01.jpg",
    title: "Oversized Graphic Tees",
    subTitle: "90s-Inspired Boxy Fit Back in Stock 🔥",
    buttonContent: "Shop oversized",
  },
  {
    url: "/images/homepage/banner/banner-03.jpg",
    title: "Introducing Spring / Summer",
    subTitle: "Versatile and Neutral",
    buttonContent: "Get discount now!",
  },
];

const Banner = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="h-screen">
      <div className="relative overflow-hidden">
        <div ref={containerRef} className="w-full h-full">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent className="h-screen w-[100vw] flex gap-0">
              {slides.map((item) => (
                <CarouselItem
                  key={item.title}
                  className={cn(
                    "w-full h-full shrink-0 flex items-center bg-bottom repeat-0 bg-cover overflow-hidden pl-0 brightness-90"
                  )}
                  style={{
                    backgroundImage: `url(${item.url})`,
                  }}
                >
                  <div className="lg:p-20 md:p-10">
                    <Content item={item} className="w-full order-2 shrink-0 " />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Banner;
