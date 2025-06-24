import FullScreenLoader from "@/common/FullScreenLoader";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductsList from "@/components/products/ProductsList";
import type { RootState } from "@/redux/store";
import {
  useFilterByFeatureProducts,
  useFilterValues,
} from "@/services/product";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function Products() {
  const location = useLocation();
    // const { filter } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const best_selling = searchParams.get("best_selling");
  const is_featured = searchParams.get("is_featured");
  const isin_todays_deal = searchParams.get("isin_todays_deal");
  const category_id = searchParams.get("category_id");
    const subcategory_id = searchParams.get("subcategory_id");
  const product_name = searchParams.get("product_name");
  const { state } = useLocation();
  const {title} = state || {};
  const { token } = useSelector((state: RootState) => state.auth);

  const { data } = useFilterValues(token);
  const {
    data: products,
    isLoading,
    isFetching,
    isError,
  } = useFilterByFeatureProducts(
    token,
    category_id ?? "",
    subcategory_id ?? "",
    isin_todays_deal ?? "",
    is_featured ?? "",
    best_selling ?? "",
    product_name ?? ""
  );
  if (isLoading || isFetching) {
    return <FullScreenLoader />;
  }
  if (isError) {
    return <div>Error.....</div>;
  }
  return (
    <main>
      <section className="container mx-auto flex  gap-x-10 mt-6 mb-16">
        <div className="w-2/12">
          <FilterSidebar filterValues={data} />
        </div>
        <div className="col-span-5 w-10/12">
          <ProductsList Products={products} title={title ?? ''} />
        </div>
      </section>
    </main>
  );
}
