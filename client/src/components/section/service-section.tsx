import Container from "@/components/container";
import { Card, CardContent } from "@/components/ui/card";

const SERVICES = [
  {
    title: "Dreamy Quality",
    subTitle: "Unmatched craftsmanship",
    image: "/images/homepage/services/service-01.png",
  },
  {
    title: "Fast Worldwide Shipping",
    subTitle: "Global delivery, quick and easy",
    image: "/images/homepage/services/service-04.png",
  },
  {
    title: "Free Returns",
    subTitle: "Hassle-free returns",
    image: "/images/homepage/services/service-03.png",
  },
  {
    title: "Made-to-Order Sustainably",
    subTitle: "Eco-friendly custom creations",
    image: "/images/homepage/services/service-02.png",
  },
];

const ServiceSection = () => {
  return (
    <Container className="w-full">
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 md:gap-4 gap-2 w-full">
        {SERVICES.map((item) => (
          <Card key={item.title} className="w-full md:pt-6">
            <CardContent className="w-full">
              <div className="flex flex-col items-center space-y-2">
                <img
                  src={item.image}
                  className="lg:size-24 md:size-20 size-16"
                />
                <div className="flex flex-col items-center space-y-1">
                  <h4 className="font-semibold text-sm md:text-base text-nowrap">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground text-xs md:text-sm">
                    {item.subTitle}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default ServiceSection;
