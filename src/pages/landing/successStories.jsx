import { Carousel, IconButton } from "@material-tailwind/react";

import accountImage from "../../assets/images/account.png"

const SuccessStories = () => {
  return (
    <section className="flex items-center justify-center py-14 bg-[#F0FFE9]">
      <div className="w-1/2">
        <Carousel
          className="rounded-xl"
          prevArrow={({ handlePrev }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handlePrev}
              className="!absolute bottom-0 left-[43%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#000"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              variant="text"
              color="white"
              size="lg"
              onClick={handleNext}
              className="!absolute bottom-0 right-[43%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#000"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </IconButton>
          )}
          loop
        >
          <div className="flex flex-col items-center gap-10 pb-[72px]">
            <div className="flex flex-col justify-center items-center gap-6 text-center">
              <p className="text-[40px] font-black text-landing_color">Success Stories</p>
              <p className="text-[22px] font-light text-[#A1A1A1]">Webmetic transformed the way we engage with our visitors. The insights have been pivotal in refining our marketing strategies to perfection.</p>
            </div>
            <div className="flex flex-col items-center gap-6 px-8">
              <div className="flex flex-col items-center gap-10">
                <p className="text-2xl font-semibold text-[#68BE31] text-center">With VisiTrack, we've not just tracked our visitors, we've understood them. It's been a game-changer for our engagement strategies!</p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <img alt="account" src={accountImage} />
                    <p className="text-xl font-normal text-landing_color">Leslie Alexander</p>
                  </div>
                  <p className="text-xl font-extralight text-landing_color">/ McDonald's</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 pb-[72px]">
            <div className="flex flex-col justify-center items-center gap-6 text-center">
              <p className="text-[40px] font-black text-landing_color">Success Stories</p>
              <p className="text-[22px] font-light text-[#A1A1A1]">Webmetic transformed the way we engage with our visitors. The insights have been pivotal in refining our marketing strategies to perfection.</p>
            </div>
            <div className="flex flex-col items-center gap-6 px-8">
              <div className="flex flex-col items-center gap-10">
                <p className="text-2xl font-semibold text-[#68BE31] text-center">With VisiTrack, we've not just tracked our visitors, we've understood them. It's been a game-changer for our engagement strategies!</p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <img alt="account" src={accountImage} />
                    <p className="text-xl font-normal text-landing_color">Leslie Alexander</p>
                  </div>
                  <p className="text-xl font-extralight text-landing_color">/ McDonald's</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-10 pb-[72px]">
            <div className="flex flex-col justify-center items-center gap-6 text-center">
              <p className="text-[40px] font-black text-landing_color">Success Stories</p>
              <p className="text-[22px] font-light text-[#A1A1A1]">Webmetic transformed the way we engage with our visitors. The insights have been pivotal in refining our marketing strategies to perfection.</p>
            </div>
            <div className="flex flex-col items-center gap-6 px-8">
              <div className="flex flex-col items-center gap-10">
                <p className="text-2xl font-semibold text-[#68BE31] text-center">With VisiTrack, we've not just tracked our visitors, we've understood them. It's been a game-changer for our engagement strategies!</p>
                <div className="flex justify-center gap-2">
                  <div className="flex items-center gap-3">
                    <img alt="account" src={accountImage} />
                    <p className="text-xl font-normal text-landing_color">Leslie Alexander</p>
                  </div>
                  <p className="text-xl font-extralight text-landing_color">/ McDonald's</p>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default SuccessStories;