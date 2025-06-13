import FullScreenLoader from "@/common/FullScreenLoader";
import FilterSidebar from "@/components/products/FilterSidebar";
import ProductsList from "@/components/products/ProductsList";
import { useFilterByFeatureProducts, useFilterValues } from "@/services/product";

export default function Products() {
    // const {state} = useLocation()
    // const param= state || {}
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoiTW9uIEp1biAwOSAyMDI1IDEzOjIzOjA5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKSIsInVzZXJfaWQiOjMsInBob25lX25vIjoiODg4MzY2MDg1MSIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTc0OTQ1NTU4OX0.sPT7jc2DpU9iF-7lF6t0-MyTSjak2VfuoQi75cBQ-vg";
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
