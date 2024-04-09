import React from "react";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import { ReactTyped } from "react-typed";
import HeartIcon from "../icons/HeartIcon";
import StarIcon from "../icons/StarIcon";
import { useNavigate } from "react-router-dom";

const LIST_ITEM_SEPARATE_PAGE_1 = [
  {
    id: 1,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-01.png",
  },
  {
    id: 2,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-02.png",
  },
  {
    id: 3,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-03.png",
  },
  {
    id: 4,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-04.png",
  },
  {
    id: 5,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-05.png",
  },
  {
    id: 6,
    logo: "https://amentotech.com/htmls/tuturn/images/brand/img-06.png",
  },
];

const LIST_ITEM_SEPARATE_PAGE_2 = [
  {
    id: 1,
    logo: "https://amentotech.com/htmls/tuturn/images/stats/img-01.png",
    number: "560,616",
    description: "Courses available for verified and top tutors",
  },
  {
    id: 2,
    logo: "https://amentotech.com/htmls/tuturn/images/stats/img-02.png",
    number: "560,616",
    description: "Total tuition job posted on the platform till date",
  },
  {
    id: 3,
    logo: "https://amentotech.com/htmls/tuturn/images/stats/img-03.png",
    number: "20+ Hours",
    description: "User daily average time spent on the platform",
  },
  {
    id: 4,
    logo: "https://amentotech.com/htmls/tuturn/images/stats/img-04.png",
    number: "7+ Milioon",
    description: "Active instructor and students available on the platform",
  },
];

function HomePageContent() {
  const navigate = useNavigate();
  return (
    <div>
      {/* Page 1 */}
      <PageContentWrapper className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-6xl font-bold text-black">
            A good
            <span className="text-blue-600"> #education </span>
            is always a base of
          </h1>
          <ReactTyped
            strings={[
              "A bright future",
              "Equitable society",
              "Self confidence",
            ]}
            typeSpeed={60}
            backSpeed={60}
            loop
            className="bg-[#6a307d] w-fit p-3 text-6xl text-white font-bold rounded-md"
          />
          <div className="text-lg">
            Consectur adipiscing elitsedo eiusmod tempor incididuntem utaborate
            dolore magna aliqua ad minim veniamque.
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate("/register-parent");
              }}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#eaac13] to-[#ee4444] rounded-md"
            >
              <p className="text-base font-bold text-white">Start as parent</p>
              <ArrowRightIcon />
            </button>
            <button
              onClick={() => {
                navigate("/register-tutor");
              }}
              className="flex items-center gap-2 px-5 py-3 bg-transparent border border-gray-500 rounded-md"
            >
              <p className="text-base font-bold text-black">
                Join as Instructor
                <span className="ml-3 text-blue-400">It&apos;s Free!</span>
              </p>
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <img
            src="https://amentotech.com/htmls/tuturn/images/index/banner/img-02.png"
            className="object-cover w-full aspect-square"
            alt="bg"
          />
        </div>
      </PageContentWrapper>
      {/* Separate Page 1 and 2  */}
      <div className="bg-[#F7F8FC]">
        <div className="py-10 mx-auto max-w-[1116px] grid md:grid-cols-6 grid-cols-3 gap-5">
          {LIST_ITEM_SEPARATE_PAGE_1.map((item) => (
            <div key={item.id} className="flex justify-center">
              <img
                src={item.logo}
                alt="brand-img"
                className="h-[34px] object-cover w-[97px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page 2  */}
      <PageContentWrapper className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col justify-center gap-5">
          <div className="">
            <img
              src="https://amentotech.com/htmls/tuturn/images/zigzag-line.svg"
              alt="zigzag-line"
            />
            <div className="mt-3 text-lg font-normal">
              Better Learning. Better Results
            </div>
            <div className="mt-3 text-4xl font-semibold">
              Online education platform that fits for everyone
            </div>
          </div>
          <div className="text-base font-normal">
            Accusamus et iusidio dignissimos ducimus blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores etmquasa molestias
            epturi sint occaecati cupiditate non providente mikume molareshe.
          </div>
          <button className="w-fit flex items-center gap-2 px-5 py-3 rounded-md bg-[#6a307d] hover:bg-[#6a307d90]">
            <p className="text-base font-bold text-white">
              Explore more about us
            </p>
            <ArrowRightIcon />
          </button>
        </div>
        <div className="hidden md:block">
          <img
            src="https://amentotech.com/htmls/tuturn/images/index/platform/img-01.png"
            className="object-cover w-full aspect-square"
            alt="bg"
          />
        </div>
      </PageContentWrapper>

      {/* Separate Page 2  */}
      <div className="bg-[#F7F8FC]">
        <div className="py-10 mx-auto max-w-[1116px] grid md:grid-cols-4 grid-cols-2 gap-5">
          {LIST_ITEM_SEPARATE_PAGE_2.map((item) => (
            <div key={item.id}>
              <img
                src={item.logo}
                alt="brand-img"
                className="h-[54px] object-cover w-[54px]"
              />
              <div className="mt-5 text-xl font-bold">{item.number}</div>
              <div>{item.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Page 3 - Carousel do later, now grid box */}
      <PageContentWrapper className="flex flex-col items-center">
        <div className="max-w-[750px] flex flex-col items-center justify-center text-center">
          <img
            src="https://amentotech.com/htmls/tuturn/images/zigzag-line.svg"
            alt="zigzag-line"
          />
          <h2 className="mt-3 text-lg font-normal">Our featured instructors</h2>
          <div className="mt-3 text-4xl font-semibold">
            Every instructor is professional <br /> and highly qualified
          </div>
          <div className="mt-5 text-base font-light">
            Accusamus et iusidio dignissimos ducimus blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores etmquasa molestias
            epturi sint occaecati cupiditate non providente mikume molareshe.
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-3 gap-4">
            <FeaturedInstructorCard />
            <FeaturedInstructorCard />
            <FeaturedInstructorCard />
          </div>
        </div>
        <button className="mt-5 w-fit flex items-center gap-2 px-5 py-3 rounded-md bg-[#6a307d] hover:bg-[#6a307d90]">
          <p className="text-base font-bold text-white">
            Explore all instructors
          </p>
          <ArrowRightIcon />
        </button>
      </PageContentWrapper>

      {/* Page 4 - No value, do later */}
      <div className="bg-[#F7F8FC]">
        <div className="py-10 mx-auto max-w-[1116px] grid md:grid-cols-6 grid-cols-3 gap-5">
          {LIST_ITEM_SEPARATE_PAGE_1.map((item) => (
            <div key={item.id} className="flex justify-center">
              <img
                src={item.logo}
                alt="brand-img"
                className="h-[34px] object-cover w-[97px]"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Page 5 - Top visited - Carousel do later */}
      <PageContentWrapper className="flex flex-col items-center">
        <div className="max-w-[750px] flex flex-col items-center justify-center text-center">
          <img
            src="https://amentotech.com/htmls/tuturn/images/zigzag-line.svg"
            alt="zigzag-line"
          />
          <h2 className="mt-3 text-lg font-normal">
            Let&apos;s make a quick start today
          </h2>
          <div className="mt-3 text-4xl font-semibold">
            Choose from the top visited
            <br /> categories you may like
          </div>
          <div className="mt-5 text-base font-light">
            Accusamus et iusidio dignissimos ducimus blanditiis praesentium
            voluptatum deleniti atque corrupti quos dolores etmquasa molestias
            epturi sint occaecati cupiditate non providente mikume molareshe.
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <TopCategoryTab key={i} />
            ))}
          </div>
        </div>
        <button className="mt-5 w-fit flex items-center gap-2 px-5 py-3 rounded-md bg-[#6a307d] hover:bg-[#6a307d90]">
          <p className="text-base font-bold text-white">
            Explore all categories
          </p>
          <ArrowRightIcon />
        </button>
      </PageContentWrapper>

      {/* Page 6 - Menu list tutors */}
      <div className="bg-[#f7f8fc]">
        <PageContentWrapper className="md:py-10">
          <h2 className="mt-3 text-lg font-medium">
            Explore from our huge collection
          </h2>
          <h3 className="text-3xl font-bold">
            Approach tutors near to your house
          </h3>
          <div className="grid grid-cols-4 gap-5 mt-5">
            {[1, 2, 3, 4].map((i) => (
              <ListTutorNear key={i} />
            ))}
          </div>
        </PageContentWrapper>
      </div>
    </div>
  );
}

export default HomePageContent;

function PageContentWrapper({ className = "", ...props }) {
  return (
    <div
      className={`w-full px-0 py-10 mx-auto max-w-[1116px] md:py-20 ${className}`}
    >
      {props.children}
    </div>
  );
}

function FeaturedInstructorCard() {
  return (
    <div className="border border-gray-300 rounded-md">
      <div className="relative">
        <img
          src="https://amentotech.com/htmls/tuturn/images/index/qualified/img-01.jpg"
          alt=""
          className="h-[234px] aspect-video object-cover rounded-md"
        />
        <div className="absolute left-0 top-[6px] px-2 py-1 bg-red-500 text-white text-xs rounded-r-md">
          FEATURED
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <img
            src="https://amentotech.com/htmls/tuturn/images/index/professionol/img-01.jpg"
            alt=""
            className="w-[46px] h-[46px] object-cover rounded-full"
          />
          <div>
            <p className="text-base font-bold">Dwayne Garrett</p>
            <p className="text-sm font-light">Arlington, TN</p>
          </div>
        </div>

        <div className="grid grid-cols-2 mt-5 gap-x-3 gap-y-1">
          <div className="text-left">Starting from:</div>
          <div className="text-right">$893.30/hr</div>
          <div className="text-left">Mobile:</div>
          <div className="text-right">xxx-xxxx-33</div>
          <div className="text-left">Whatsapp:</div>
          <div className="text-right">xxx-xxxx-33</div>
          <div className="text-left">Qualification:</div>
          <div className="text-right">B.Tech/B.E</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-t-gray-300">
        <div className="flex items-center gap-2 px-5 pt-2 pb-1">
          <StarIcon />
          <div className="font-bold">5.0</div>
          <div>(4,448)</div>
        </div>
        <div className="p-3 border-l cursor-pointer border-l-gray-300">
          <HeartIcon />
        </div>
      </div>
    </div>
  );
}

function TopCategoryTab() {
  return (
    <div className="p-1 border border-gray-300 rounded-md">
      <img
        src="https://amentotech.com/htmls/tuturn/images/index/categories/img-09.jpg"
        alt="category"
        className="object-cover w-full rounded-md aspect-square"
      />
      <div className="flex items-center justify-between p-3 mt-2">
        <div>
          <div className="font-bold">Islamic education</div>
          <div>4157 Listings</div>
        </div>
        <ArrowRightIcon />
      </div>
    </div>
  );
}

function ListTutorNear() {
  return (
    <div>
      <div className="text-base font-semibold">Tutors in Atlanta</div>
      <div className="flex flex-col gap-1 mt-3">
        <a href="#" className="flex items-center gap-2">
          <p>•</p>
          <p>B.Tech IT</p>
        </a>
        <a href="#" className="flex items-center gap-2">
          <p>•</p>
          <p>B.Tech IT</p>
        </a>
      </div>
      <div className="mt-3">
        <a href="#" className="font-medium text-blue-500">
          Explore all
        </a>
      </div>
    </div>
  );
}

// const responsive = {
//   desktop: {
//     breakpoint: { max: 3000, min: 1024 },
//     items: 3,
//     slidesToSlide: 3, // optional, default to 1.
//   },
//   tablet: {
//     breakpoint: { max: 1024, min: 464 },
//     items: 2,
//     slidesToSlide: 2, // optional, default to 1.
//   },
//   mobile: {
//     breakpoint: { max: 464, min: 0 },
//     items: 1,
//     slidesToSlide: 1, // optional, default to 1.
//   },
// };
