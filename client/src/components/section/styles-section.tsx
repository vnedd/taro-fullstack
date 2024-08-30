import { Link } from "react-router-dom";

const array = [
  {
    label: "Shop T-shirt",
    url: "/images/homepage/styles/tshirt.png",
  },
  {
    label: "Shop Hoodies",
    url: "/images/homepage/styles/hoodie.jpg",
  },
  {
    label: "Shop Long Sleeves",
    url: "/images/homepage/styles/long-sleeve.jpg",
  },
  {
    label: "Shop Sweaters",
    url: "/images/homepage/styles/sweater.jpg",
  },
];

const StylesSection = () => {
  return (
    <div className="md:h-[500px] h-[60vh] w-full grid md:grid-cols-4 grid-cols-2">
      {array.map((item) => (
        <Link
          to={"/shop"}
          key={item.label}
          className="w-full h-full relative group overflow-hidden cursor-pointer"
        >
          <img
            src={item.url}
            alt={item.label}
            className="object-cover group-hover:scale-110 duration-1000 transition-all w-full h-full "
          />
          <div className="absolute group-hover:bg-opacity-30 bg-black opacity-20 transition-all w-full h-full"></div>
          <p className="absolute bottom-6 left-6 z-20 text-white uppercase italic font-3xl font-extrabold">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default StylesSection;
