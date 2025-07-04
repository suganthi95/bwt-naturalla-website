import FullScreenLoader from "@/common/FullScreenLoader";
import type { RootState } from "@/redux/store";
import { useGetBlogDetail } from "@/services/blogs";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";


export default function BlogDetails() {
  const { token } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: blog, isFetching, isLoading } = useGetBlogDetail(
    token ?? "",
    id ?? ""
  );

  if (isFetching || isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <section className="container mx-auto mt-10 mb-10">
      <div className="mx-auto container">
        <div className="md:col-span-3 space-y-6">
          <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <ArrowLeft
              className="cursor-pointer"
              onClick={() => navigate("/blogs")}
            />
            {blog?.blog_title}
          </h1>
          <p className="uppercase flex items-center gap-x-1 font-medium text-textPrimary ">Published on:  <span className="text-[15px]">{blog?.created_time}</span></p>

          </div>


          {blog?.blog_image_url && (
            <img
              src={blog.blog_image_url}
              alt="Blog"
              className="w-full rounded-lg md:h-[400px] object-cover "
            />
          )}

          <p className="text-lg text-slate-700 leading-relaxed">
            {blog?.blog_desc}
          </p>

          <div
            className=" rich-text prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog?.blog_content || "" }}
          />

          <div className="flex flex-wrap gap-2">
            {blog?.blog_tags?.map((tag: string) => (
              <span
                key={tag}
                className="bg-slate-100 text-sm text-slate-600 px-3 py-1 rounded-md border"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      
      </div>
    </section>
  );
}
