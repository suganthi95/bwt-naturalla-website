import FullScreenLoader from "@/common/FullScreenLoader";
import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "@/lib/api";
import type { RootState } from "@/redux/store";
import type { Category } from "@/types/type";
import { useQuery } from "@tanstack/react-query"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Categories() {

    const navigate = useNavigate();
    const { token } = useSelector((state: RootState) => state.auth);
    const { data, isLoading, isError, error, isSuccess } = useQuery({
        queryKey: [ "getAllCategories" ],
        queryFn: () => getAllCategories(token),
        retry: 2,
        select: (data): Category[] => data.data
    });


    if (isLoading) {
        return <FullScreenLoader />;
    }

    let content;

    if(isError){
        content = (
            <div>{error.message}</div>
        )
    }

    if(isSuccess){
        content = (
            <div className="grid grid-cols-3 mt-5 gap-10">
                {data.map(item => (
                    <Link 
                        to={`/products/top-categories?category_id=${item.category_id}`} 
                        state={{
                            category_id: `${item.category_id}`,
                            title: `${item.category_title}`,
                        }}
                        key={item.category_id} 
                        className="border shadow-xs rounded-2xl p-4"
                    >

                        <h1 className="text-xl font-semibold">{item.category_title}</h1>

                        <div className="mt-3 flex items-center gap-2 flex-wrap">
                            {item.subcategories.map(subcategories => (
                                <Badge 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/products/${subcategories.subcategory_name.toLowerCase()}?category_id=${item.category_id}&subcategory_id=${subcategories.subcategory_id}`, 
                                        { state: {
                                            title: subcategories.subcategory_name,
                                        }})
                                    }} 
                                    key={subcategories.subcategory_id} 
                                    variant="secondary"
                                >
                                    {subcategories.subcategory_name}
                                </Badge>
                            ))}
                        </div>

                        <div className="w-full h-[250px] rounded-xl overflow-hidden mt-5">
                            <img className="h-full w-full object-cover" src={item.category_thumbnail_image} alt="thumbnail" />
                        </div>

                    </Link>
                ))}
            </div>
        )
    }

    return (
        <div className="min-h-screen container pt-10">
            <h1 className="text-2xl font-semibold">All Categories</h1>

            {content}
            
        </div>
    )
}

export default Categories