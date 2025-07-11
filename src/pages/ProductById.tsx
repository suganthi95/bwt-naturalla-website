import ProductSection from "@/components/individualProductPage/ProductSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomerReview from "@/components/individualProductPage/CustomerReview";
import { useProductDetailsById } from "@/services/product";
import { useParams } from "react-router-dom";
import { ASSETS } from "@/assets/assets";
import BestSelling from "@/components/home/BestSelling";
import DOMPurify from "dompurify";

import FullScreenLoader from "@/common/FullScreenLoader";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function ProductById() {

  const { id } = useParams();
  const { token } = useSelector((data: RootState) => data.auth);
  const { data, isLoading, isError, isSuccess, error } = useProductDetailsById({ id: id as string, token });

  useEffect(() => {
    if (data) {
      document.title = `${data.product_name} – Naturalla`;

      const setMetaTag = (name: string, content: string) => {
        let tag = document.querySelector(
          `meta[name="${name}"]`
        ) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("name", name);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      const setOGTag = (property: string, content: string) => {
        let tag = document.querySelector(
          `meta[property="${property}"]`
        ) as HTMLMetaElement;
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      };

      if (data.meta_description) {
        setMetaTag("description", data.meta_description);
        setOGTag("og:description", data.meta_description);
      }

      if (data.meta_keywords) {
        setMetaTag("keywords", data.meta_keywords.join(", "));
      }

      if (data.product_name) {
        setOGTag("og:title", data.product_name);
      }

      if (data.meta_image_url) {
        setOGTag("og:image", data.meta_image_url);
      }
    }
  }, [data]);
  
  const whatsout = [
    {
      id: "1",
      Img: ASSETS.SULPHATE,
      title: "Sulphates",
    },
    {
      id: "2",
      Img: ASSETS.PHATHALATES,
      title: "Phthalates",
    },
    {
      id: "3",
      Img: ASSETS.PARABENS,
      title: "Parabens",
    },
    {
      id: "4",
      Img: ASSETS.AIRTIFICIAL_COLURS,
      title: "Artificial Colours",
    },
  ];

  let product;

  if(isLoading){
    product = <FullScreenLoader/>
  }

  if(isError){
    product = <div className="h-screen flex items-center justify-center font-semibold text-red-500">{(error as any).response.data.message}</div>
  }

  if(isSuccess){
    product = (
      <main>
        <section className=" mt-10 mb-10  ">
          <ProductSection products={data} media={data?.gallery_image_url} />
        </section>
        <section className="mt-10 mb-10 md:mt-20 md:mb-20  ">
          <div className="container mx-auto  flex  w-full">
            <div className="w-full md:px-24">
              <h2 className="font-bold text-xl text-title mb-4">Whats out</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
                {whatsout.map((item, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-center py-6 px-3 border w-10/12 rounded-lg  text-center"
                  >
                    <img
                      src={item.Img}
                      alt={item.title}
                      className="md:size-24 mb-2"
                    />
                    <p className="font-semibold text-title">{item.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
          <div className="container mx-auto  flex  w-full">
            <div className="w-full md:px-24">
              <h2 className="font-bold text-lg md:text-xl text-title mb-4">
                Description
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer">
                    Details
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                    <div
                      className="rich-text text-sm md:text-base font-medium text-[#494F49]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.long_description || ""),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer">
                    Benefits
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                    <div
                      className="rich-text text-sm md:text-base font-medium text-[#494F49]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.benefits || ""),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer">
                    How to Use
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                    <div
                      className="rich-text text-sm md:text-base font-medium text-[#494F49]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.how_to_use || ""),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                    <div
                      className="rich-text text-sm md:text-base font-medium text-[#494F49]"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data?.ingredients || ""),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
        {data?.faq &&
          <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
            <div className="container mx-auto  flex  w-full">
              <div className="w-full md:px-24">
                <h2 className="font-bold text-lg md:text-xl text-title mb-4">
                  FAQ{"’"}s
                </h2>
                <Accordion type="single" collapsible>
                  {data?.faq.map((item: any, index: number) => (
                    <AccordionItem key={`product-faq-${index}`} value={`product-faq-${index}`}>
                      <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer">
                        {item.qn}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                        {item.ans}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                  
                </Accordion>
              </div>
            </div>
          </section>
        }
        
        <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
          <CustomerReview Product={data} />
        </section>
        <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
          <BestSelling
            title="Related Products"
            Products={data?.relatedProducts}
          />
        </section>
      </main>
    )
  }

  return product;
}
