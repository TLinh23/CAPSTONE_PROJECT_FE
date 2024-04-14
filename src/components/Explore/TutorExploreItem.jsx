import React from "react";
import HeartIcon from "../icons/HeartIcon";
import StarIcon from "../icons/StarIcon";

function TutorExploreItem(props) {
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

export default TutorExploreItem;
