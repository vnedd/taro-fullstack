import MobileNav from "./mobile-nav";

const Header = () => {
  return (
    <div className="bg-white dark:bg-transparent border-b h-14 flex items-center px-6 justify-between md:justify-end">
      <div className="md:hidden">
        <MobileNav />
      </div>
    </div>
  );
};

export default Header;
