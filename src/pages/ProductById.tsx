import ProductSection from "@/components/individualProductPage/ProductSection";
import group from "@/assets/Group 3590.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomerReview from "@/components/individualProductPage/CustomerReview";
import BestSelling from "@/components/home/BestSelling";
export default function ProductById() {
  // const params = useParams();
  // const { id } = params || {};
  const whatsout = [
    {
      id: "1",
      Img: group,
      title: "Sulphates",
    },
    {
      id: "2",
      Img: group,
      title: "Sulphates",
    },
    {
      id: "3",
      Img: group,
      title: "Sulphates",
    },
    {
      id: "4",
      Img: group,
      title: "Sulphates",
    },
  ];
  return (
    <main>
      <section className=" mt-10 mb-10  ">
        <ProductSection />
      </section>
      <section className="mt-10 mb-10 md:mt-20 md:mb-20  ">
        <div className="container mx-auto  flex  w-full">
          <div className="w-full md:px-24">
            <h2 className="font-bold text-xl text-title mb-4">Whats out</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 ">
              {whatsout.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col items-center w-fit border p-4 px-8 rounded-lg  text-center"
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
            <h2 className="font-bold text-xl text-title mb-4">Description</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-title cursor-pointer ">
                  Details
                </AccordionTrigger>
                <AccordionContent className="font-medium text-[#494F49]">
                  Red wine face wash is a skincare product that incorporates the
                  benefits of red wine extracts, often combined with other
                  natural ingredients, to cleanse, rejuvenate, and enhance the
                  skin’s appearance. It is particularly popular for its
                  antioxidant properties and anti-aging benefits.{" "}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
        <div className="container mx-auto  flex  w-full">
          <div className="w-full md:px-24">
            <h2 className="font-bold text-xl text-title mb-4">FAQ{"’"}s</h2>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold text-title cursor-pointer ">
                  What are the main benefits of Aloe Vera Gel for skin?
                </AccordionTrigger>
                <AccordionContent className="font-medium text-[#494F49]">
                  Aloe Vera Gel improves hydration, calms irritation, soothes
                  sunburns, and reduces acne scars.{" "}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
        <CustomerReview />
      </section>
      <section className=" mt-10 mb-10 md:mt-20 md:mb-20  ">
        <BestSelling title="Related Products" />
      </section>
    </main>
  );
}
