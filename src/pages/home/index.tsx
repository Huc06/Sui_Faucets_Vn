import suiVideo1 from "@/assets/sui-video-1.mp4";

const HomePage = () => {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 rounded-b-[40px]">
      <video
        src={suiVideo1}
        autoPlay
        muted
        loop
        className="w-full h-full object-cover absolute top-0 left-0 -z-10"
      />
      <div className="text-center max-w-4xl mx-auto space-y-12">
        <p className="text-[56px] md:text-[92px] font-bold leading-tight">
          SuiHub <br /> Ho Chi Minh City
        </p>
        <p className="text-2xl font-light mt-4 max-w-2xl mx-auto">
          Một không gian do cộng đồng dẫn dắt, nơi các builder Web3 tại Việt Nam
          kết nối, học hỏi và khám phá sâu hệ sinh thái Sui.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
