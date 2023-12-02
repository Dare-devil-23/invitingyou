import { motion } from "framer-motion";
import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import HoverLine from "../../components/HoverLine";
import forFamily from "../../constants/forFamily";
import forFriends from "../../constants/forFriends";

const ReasonsSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const varient = {
    initial: {
      x: "100%",
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1,
      },
    },
    animate: {
      x: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.95],
        duration: 1,
      },
    },
  };

  return (
    <div className="min-h-[30vh] lg:min-h-screen mb-20">
      <div className="h-[10%]">
        <div className="p-5 text-2xl">
          <button
            className={`${selectedTab === 0 ? "" : "text-gray-500 dark:text-zinc-500"
              } px-2`}
            onClick={() => setSelectedTab(0)}
          >
            For Family
          </button>
          <button
            className={`${selectedTab === 1 ? "" : "text-gray-500 dark:text-zinc-500"
              } px-2`}
            onClick={() => setSelectedTab(1)}
          >
            For Friends
          </button>
        </div>
        <div className="overflow-hidden h-[90%]">
          <motion.div
            variants={varient}
            animate={
              selectedTab ? "animate" : "initial"
            }
            className="relative min-h-[30vh] lg:min-h-[90vh] w-screen"
          >
            <div className="absolute -left-[100%] flex justify-around w-full">
              {
                forFamily.map((item, i) => (
                  <div className="w-full relative" key={i}>
                    <div className="overflow-hidden relative group">
                      <div className="z-50 opacity-0 h-full w-full min-h-[25vh] lg:min-h-[90vh] backdrop-filter backdrop-blur-sm group-hover:opacity-100 transition duration-300 ease-in-out absolute">
                        <div className="flex justify-center h-full place-items-center">
                          <div className="align-middle">
                            <div className="font-bold text-3xl">item</div>
                            <div className='w-fit'><HoverLine text="Shop Now"/></div>
                          </div>
                        </div>
                      </div>
                      <LazyLoadImage
                        alt={i}
                        className="group-hover:scale-110 transition duration-300 ease-in-out min-h-[25vh] lg:min-h-[90vh]"
                        src={item.image}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="absolute flex justify-around w-full">
              {
                forFriends.map((item, i) => (
                  <div className="w-full relative" key={i}>
                    <div className="overflow-hidden relative group">
                      <div className="z-50 opacity-0 h-full w-full min-h-[25vh] lg:min-h-[90vh] backdrop-filter backdrop-blur-sm group-hover:opacity-100 transition duration-300 ease-in-out absolute">
                        <div className="flex justify-center h-full place-items-center">
                          <div className="align-middle">
                            <div className="font-bold text-3xl">item</div>
                            <div><HoverLine text="Shop Now"/></div>
                          </div>
                        </div>
                      </div>
                      <LazyLoadImage
                        alt={i}
                        className="group-hover:scale-110 transition duration-300 ease-in-out min-h-[25vh] lg:min-h-[90vh]"
                        src={item.image}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ReasonsSection