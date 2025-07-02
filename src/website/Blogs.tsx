import FullScreenLoader from "@/common/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { useGetBlogs, useGetTopBlogs } from "@/services/blogs";
import type { Blog } from "@/types/type";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Blogs() {
    const [InputValue, setInputValue] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); 
      setSearchTerm(InputValue);
    }
  };

  const navigate = useNavigate();
  const { token } = useSelector((state: RootState) => state.auth);
  const { data, isLoading, isFetching } = useGetBlogs(token ?? "", searchTerm);
  const { data: TopBlogs } = useGetTopBlogs(token ?? "");

  if (isFetching || isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <section className="container mx-auto mt-10 mb-10 ">
      <div className="">
        <h2 className="font-semibold text-2xl">Blogs</h2>

        <ul className="grid grid-cols-4 gap-x-6 w-full ">
          <li className="col-span-1 flex flex-col gap-y-3">
            <div className="relative w-full mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by Title..."
                onKeyDown={handleKeyDown}
                value={InputValue}
                onChange={(event) => setInputValue(event.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>

            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-md">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">
                Top Posts
              </h2>
              <ul className="space-y-4">
                {TopBlogs?.map((post: Blog, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span
                        onClick={() => {
                          navigate(`/blogs/detail/${post?.blog_id}`);
                        }}
                        className="text-base cursor-pointer font-semibold text-textPrimary"
                      >
                        {post?.blog_title}
                      </span>
                      <span className="text-sm text-slate-500">
                        {post?.created_time}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="col-span-3">
            <ul className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {data?.map((blog: Blog) => (
                <li
                  key={blog?.blog_id}
                  className="border rounded-xl w-96 overflow-hidden shadow-sm bg-white flex flex-col"
                >
                  <img
                    src={blog?.blog_image_url}
                    alt={blog?.blog_title}
                    className="w-full h-48 object-cover"
                  />

                  <div className="flex items-center justify-between text-sm text-primary-black px-4 pt-4">
                    <p className="flex items-center gap-x-1">
                      {blog?.created_time}{" "}
                    </p>
                  </div>

                  <h2 className="text-lg font-semibold px-4 pt-2">
                    {blog?.blog_title}
                  </h2>

                  <p className="text-sm text-gray-600 px-4 pt-1 line-clamp-4">
                    {blog?.blog_desc}
                  </p>
                  <div className="flex  p-3">
                    <Button
                      onClick={() => {
                        navigate(`/blogs/detail/${blog.blog_id}`);
                      }}
                      className="border-primary border bg-white flex items-center gap-x-1.5 text-primary"
                    >
                      Read More <ArrowRight />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
