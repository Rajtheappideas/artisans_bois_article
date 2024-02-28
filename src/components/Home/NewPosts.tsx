import React from "react";
import category1 from "../../../public/static/images/Image.png";
import postImage from "../../../public/static/images/newpost.png";
import SingalPost from "./SingalPost";
import Image from "next/image";

const NewPosts = () => {
  return (
    <div className="w-full md:space-y-7 space-y-3">
      {/* title */}
      <div className="w-full flex items-center justify-between gap-2">
        <p className="relative capitalize text-lg ml-3 font-semibold text-blackText">
          New Posts
          <span className="absolute top-1/2 -translate-y-1/2 -left-3 bg-blue h-3 w-1 rounded-full"></span>
        </p>
      </div>
      {/* posts */}
      <div className="w-full h-full grid lg:grid-cols-2 gap-5 place-items-start items-start">
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
        <SingalPost
          image={category1}
          title="12 Mobile UX Design Trends For 2018"
          category="carpentry"
          date="july 14 ,2014"
          from="home"
          description="   Things move quickly in the mobile app universe. To succeed in the
            field of mobile UX design, designers must have the foresight and
            prepare for new challenges around the corner"
        />
      </div>
      {/* image */}
      <Image src={postImage} alt="" loading="lazy" className="w-full h-fit" />
    </div>
  );
};

export default NewPosts;
