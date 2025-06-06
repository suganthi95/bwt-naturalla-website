import { ASSETS } from "@/assets/assets";
import BestSelling from "@/components/home/BestSelling";
import Blogs from "@/components/home/Blogs";
import FeaturedOn from "@/components/home/FeaturedOn";
import HeroCarousal from "@/components/home/HeroCarousal";
import LatestProduct from "@/components/home/LatestProduct";
import OfferEnding from "@/components/home/OfferEnding";
import TodayDeals from "@/components/home/TodayDeals";
import TopCategories from "@/components/home/TopCategories";

export default function Home() {
  return (
    <main>
      {/* hero section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <HeroCarousal />
      </section>

      {/* todays deal section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <TodayDeals />
      </section>

      {/* top category section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <TopCategories />
      </section>

      {/* best selling section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <BestSelling />
      </section>

      {/* feature on section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <FeaturedOn />
      </section>

      {/* offer ending section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <OfferEnding />
      </section>

      {/* founder  section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <div className="bg-gradient-to-b from-[#FFFFFF] to-[#DFFEDF] flex items-center ">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8 px-4">
            <img
              src={ASSETS.FOUNDER}
              alt="founder"
              className="w-full xl:ml-20 object-contain"
            />

            <ul className="space-y-4 mt-8 md:mt-32 xl:-ml-20">
              <li className="text-[28px] sm:text-[32px] font-semibold">
                Hi, I&apos;m ************
              </li>
              <li className="text-justify font-normal w-full md:w-11/12 leading-[32px] md:leading-[35px] text-base md:text-xl lato">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </li>
              <li className="font-bold text-base md:text-lg">
                - Founder & CEO
              </li>
            </ul>
          </div>
        </div>
      </section>

        {/* latest products section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <LatestProduct />
      </section>

          {/* Blogs section */}
      <section className=" mt-10 mb-10 md:mt-20 mb:mb-20 ">
        <Blogs/>
      </section>
    </main>
  );
}
