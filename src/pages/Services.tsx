import ProductsAdd from "@/components/pages/servicises/ServicesCreate";
import ProductsList from "@/components//pages/servicises/ServicesList";

const Services = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4 mt-2">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold text-slate-400">
            Xizmatlar royhati
          </p>
          <ProductsAdd />
        </div>
        <ProductsList />
      </div>
    </div>
  );
};

export default Services;
