"use client";
import Lottie from "lottie-react";
import loading from "../../public/static/animations/loading.json";

const Loading = () => {
  return (
    <div className="h-screen flex items-center justify-center text-3xl font-semibold">
      <Lottie
        style={{
          pointerEvents: "none",
          height: "300px",
          width: "300px",
        }}
        animationData={loading}
        loop
      />
    </div>
  );
};

export default Loading;
