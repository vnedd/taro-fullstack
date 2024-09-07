import ProductList from "@/components/product/product-list";
import { useAuthStore } from "@/store/auth";

const WishlistPage = () => {
  const { profile } = useAuthStore();
  return (
    <div>
      {profile?.wishlist.length ? (
        <ProductList
          data={profile?.wishlist}
          className="lg:grid-cols-4 md:grid-cols-3 grid-cols-2"
        />
      ) : (
        <div className="p-20 flex items-center justify-center text-sm">
          Your wishlist empty!
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
