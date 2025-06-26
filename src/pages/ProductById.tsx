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

export default function ProductById() {
  const params = useParams();
  const { id } = params || {};
  const { data } = useProductDetailsById(id ?? "");
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
  return (
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
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data?.benefits || ''),
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
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data?.how_to_use || ''),
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
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(data?.ingredients || ''),
      }}
    />
  </AccordionContent>
</AccordionItem>   
            
            </Accordion>
          </div>
        </div>
      </section>
      <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
        <div className="container mx-auto  flex  w-full">
          <div className="w-full md:px-24">
            <h2 className="font-bold text-lg md:text-xl text-title mb-4">
              FAQ{"’"}s
            </h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="md:text-lg font-semibold text-title cursor-pointer ">
                  What are the main benefits of Aloe Vera Gel for skin?
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base font-medium text-[#494F49]">
                  Aloe Vera Gel improves hydration, calms irritation, soothes
                  sunburns, and reduces acne scars.{" "}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
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
  );
}
