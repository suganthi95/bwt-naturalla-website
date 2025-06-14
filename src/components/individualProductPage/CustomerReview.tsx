import { Button } from "@/components/ui/button";
import { Icons } from "@/assets/icons";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { Product } from "@/types/Home";
interface Props {
  Product: Product;
}
export default function CustomerReview({ Product }: Props) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const averageRatings = Math.round(
    Product?.review_count[0]?.total_ratings /
      Number(Product?.review_count[0]?.total_reviews)
  );
  const FiveStar =
    (Product?.review_count[0]?.five_star /
      Number(Product?.review_count[0].total_reviews)) *
    100;
  const FourStar =
    (Product?.review_count[0]?.four_star /
      Number(Product?.review_count[0].total_reviews)) *
    100;
  const ThreeStar =
    (Product?.review_count[0]?.three_star /
      Number(Product?.review_count[0].total_reviews)) *
    100;
  const TwoStar =
    (Product?.review_count[0]?.two_star /
      Number(Product?.review_count[0].total_reviews)) *
    100;
  const OneStar =
    (Product?.review_count[0]?.one_star /
      Number(Product?.review_count[0].total_reviews)) *
    100;

  return (
    <div className="container mx-auto px-4 lg:px-44 py-6">
      <div className=" space-y-6">
        <h2 className="font-bold text-xl text-title">Customer Reviews</h2>

        <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-6 items-start">
          <div className="flex flex-col items-center gap-1">
            <div className="space-y-1.5">
              <div className="flex items-center gap-x-1">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < averageRatings ? (
                    <Icons.Star key={i} className="text-yellow-500 w-4 h-4" />
                  ) : (
                    <Icons.Un_Star key={i} className="text-gray-300 w-4 h-4" />
                  )
                )}
                <p className="font-semibold text-xl">
                  {averageRatings} out of 5
                </p>
              </div>
              <p className="text-lead text-center font-medium text-lg">
                ({Product?.review_count[0]?.total_ratings} overall ratings)
              </p>
            </div>
          </div>

          <div className="space-y-4 col-span-2 px-8 border-l border-r  border-gray-300">
            {/* {[Product?.review_count[0]?.five_star, Product?.review_count[0]?.four_star, Product?.review_count[0]?.three_star, Product?.review_count[0]?.two_star, Product?.review_count[0]?.one_star].map((star) => (
              <div key={star} className="flex items-center gap-2">
                <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                  {star} star
                </p>
                <div className="relative w-full h-3 border rounded">
                  <div
                    className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                    style={{ width: `${star * 18}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm text-right text-[#007AFF] ">
                  {star * 18}%
                </span>
              </div>
            ))} */}
            <div className="flex items-center gap-2">
              <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                5 star
              </p>
              <div className="relative w-full h-3 border rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${FiveStar}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-right text-[#007AFF] ">
                {FiveStar}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                4 star
              </p>
              <div className="relative w-full h-3 border rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${FourStar}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-right text-[#007AFF] ">
                {FourStar}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                3 star
              </p>
              <div className="relative w-full h-3 border rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${ThreeStar}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-right text-[#007AFF] ">
                {ThreeStar}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                2 star
              </p>
              <div className="relative w-full h-3 border rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${TwoStar}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-right text-[#007AFF] ">
                {TwoStar}%
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm min-w-[60px] text-[#007AFF] whitespace-nowrap">
                1 star
              </p>
              <div className="relative w-full h-3 border rounded">
                <div
                  className="absolute top-0 left-0 h-3 bg-yellow-400 rounded"
                  style={{
                    width: `${OneStar}%`,
                  }}
                ></div>
              </div>
              <span className="w-12 text-sm text-right text-[#007AFF] ">
                {OneStar}%
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center  gap-4 w-full  border-gray-300">
            <Button variant="outline" className="w-40">
              Write a Review
            </Button>
            <Button variant="default" className="w-40">
              Ask a Question
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-bold text-xl text-title">{Product?.review_count[0].total_reviews} Comments</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          </div>
        </div>
        <Slider {...settings} className="mt-6 space-x-10">
          {Product?.reviews?.map((item, index) => {
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3 "
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-semibold text-sm text-title">
                          {item.first_name}
                        </p>
                        {/* <Icons.Tick /> */}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        2 hours ago
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(item?.ratings)].map((_, i) => (
                      <Icons.Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                    {item?.ratings !== 5 && (
                      <Icons.Un_Star className="w-4 h-4 fill-muted" />
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-title ">
                  Great quality and fast delivery
                </h3>

                <p className="text-lg text-lead">{item?.review_txt}</p>
              </div>
            );
          })}
          {/* <div className="border border-gray-200 rounded-lg p-4 space-y-3 ">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-sm text-title">John Doe</p>
                    <Icons.Tick />
                  </div>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Icons.Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
                <Icons.Star className="w-4 h-4 fill-muted" />
              </div>
            </div>

            <h3 className="font-semibold text-title ">
              Great quality and fast delivery
            </h3>

            <p className="text-lg text-lead">
              The product was exactly as described. Arrived earlier than
              expected and the packaging was very secure.
            </p>
          </div> */}
        </Slider>
      </div>
    </div>
  );
}
