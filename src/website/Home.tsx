import HeroCarousal from "@/components/home/HeroCarousal";
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
    </main>
  );
}
