import { useAuthStore } from "@/store/auth";
import CartButton from "./cart-button";
import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";
import UserButton from "./user-button";
import { FaRegHeart } from "react-icons/fa";
const Actions = () => {
  const { isAuth } = useAuthStore();
  return (
    <div className="flex items-center space-x-5">
      <CartButton />
      {isAuth ? (
        <>
          <Link to={"/account/wishlist"}>
            <FaRegHeart size={20} />
          </Link>
          <UserButton />
        </>
      ) : (
        <Link to={"/auth/login"}>
          <GoPerson className="w-6 h-6 " />
        </Link>
      )}
    </div>
  );
};

export default Actions;
