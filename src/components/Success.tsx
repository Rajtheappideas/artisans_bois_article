import React from "react";
import Lottie from "lottie-react";
import success from "../../public/static/animations/success.json";
import Link from "next/link";

const Success = () => {
  return (
    <div className="fixed z-50 inset-0 bg-black bg-opacity-50 h-full flex items-center justify-center">
      {/* bg img + heading */}
      {/* <div className="relative md:h-80 h-60">
        <img
          src={require("../assests/images/terms.png")}
          alt="terms"
          className="w-screen h-full object-cover object-left"
          loading="lazy"
        />
      </div> */}
      <section className="md:Container bg-white drop-shadow-2xl rounded-xl md:px-5 md:py-5 px-4 py-2 flex items-center flex-col justify-center mx-auto md:w-1/2 w-11/12  h-1/2 gap-y-2">
        <Lottie
          style={{
            pointerEvents: "none",
          }}
          animationData={success}
          loop
          className="h-40 w-fit"
        />

        <p className="font-normal text-textColor text-center md:text-lg w-9/12">
          Your order has been received.
        </p>
        <Link href="/" className="w-1/2 mx-auto">
          <button type="button" className="blue_button capitalize w-full">
            Close
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Success;
