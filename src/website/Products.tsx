import FullScreenLoader from "@/common/FullScreenLoader";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductsList from "@/components/products/ProductsList";
import type { RootState } from "@/redux/store";
import { useFilterByFeatureProducts, useFilterValues } from "@/services/product";
import { useSelector } from "react-redux";

export default function Products() {
    // const {state} = useLocation()
    // const param= state || {}
      const {token} = useSelector((state:RootState)=>state.auth)

    const { data } = useFilterValues(token);
  const  {data:Products,isLoading,isFetching,isError}  =useFilterByFeatureProducts('',token)
  if(isLoading || isFetching){
    return <FullScreenLoader/>
  }
  if(isError){
    return <div>Error.....</div>
  }
  return (
    <main>
    <section className="container mx-auto flex  gap-x-10 mt-6 mb-16">
  <div className="w-3/12">
    <FilterSidebar filterValues={data} />
  </div>
  <div className="col-span-5">
    <ProductsList Products={Products} />
  </div>
</section>

    </main>
  );
}
