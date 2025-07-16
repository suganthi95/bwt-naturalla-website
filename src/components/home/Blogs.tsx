import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { useGetTopBlogs } from "@/services/blogs";
import type { Blog } from "@/types/type";
import { useNavigate } from "react-router-dom";

export default function Blogs() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { data: TopBlogs } = useGetTopBlogs(token ?? "");
  const navigate = useNavigate();

  return (
    <>
      {TopBlogs?.length > 0 && (
        <div className="container mx-auto">
          <div className="px-4 flex justify-between items-center text-sm font-semibold md:text-xl">
            <p className="text-title text-center ">Latest News and Blogs</p>
            <p
              className="text-title text-sm md:text-base cursor-pointer hover:underline underline-primary"
              onClick={() => navigate("/blogs")}
            >
              View more
            </p>
          </div>

        <div className="grid grid-cols-2 md:grid-cols-2  lg:grid-cols-3  gap-8 md:gap-14 lg:gap-x-0.5 mt-4 md:mt-8">
            {TopBlogs?.slice(0, 3)?.map((item: Blog, index: number) => (
              <div
                key={index}
                className="space-y-3 p-4    h-full bg-white transition-shadow"
              >
                <img
                  src={item.blog_image_url || "/placeholder.jpg"}
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                  alt={`blog-${item.blog_id}`}
                  className="w-full h-56 sm:h-64 md:h-72 object-cover  rounded-lg"
                />
                <p className="text-lead text-lg font-semibold">
                  {item.blog_title}
                </p>
                <p className="text-primary text-sm line-clamp-3">
                  {item.blog_desc ?? "No description available."}
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => navigate(`/blogs/detail/${item.blog_id}`)}
                    className="rounded-full text-sm px-4 py-2 hover:bg-transparent text-primary border bg-primary/10 border-primary"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
