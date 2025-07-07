import FullScreenLoader from "@/common/FullScreenLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RootState } from "@/redux/store";
import { useGetBlogs, useGetTopBlogs } from "@/services/blogs";
import type { Blog } from "@/types/type";
import { ArrowRight, Notebook, Search } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
        {data?.length > 0 ? (
          <ul className="grid lg:grid-cols-4 gap-x-6 w-full ">
            <li className=" hidden lg:col-span-1 lg:flex flex-col gap-y-3">
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
                <ul className="space-y-4 ">
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
                          className="text-base hover:underline cursor-pointer font-semibold text-textPrimary"
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
                    className="border rounded-xl  overflow-hidden shadow-sm bg-white flex flex-col"
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

                    <h2 className="md:text-lg font-semibold md:px-4 pt-2">
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
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center py-20 px-4"
          >
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-6 shadow-sm">
              <Notebook className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              No Blogs Found
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">
              There are currently no blogs that match your search or filter
              criteria. Try adjusting your filters or check back later.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
