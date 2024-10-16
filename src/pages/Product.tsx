import ProductCreate from "@/components/pages/product/ProductCreate";
import ProductList from "@/components/pages/product/ProductList";

const Product = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Product ro'yhati
          </p>
          <ProductCreate />
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
