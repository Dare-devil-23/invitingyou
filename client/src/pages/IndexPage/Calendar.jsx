import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import '../../index.css'
import { TypeAnimation } from 'react-type-animation';
import { AnimatePresence, motion } from 'framer-motion';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Calendar = () => {
  const [currentCat, setCurrentCat] = useState('')
  const canvasVarients = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
      }
    },
    exit: {
      scale: 0,
      opacity: 0
    }
  }
  return (
    <div className='relative w-screen h-[800px] md:h-[500px] lg:h-screen mb-10 bg-[url("/bg/herobg-removebg.png")] bg-contain md:bg-[length:522px_294px] lg:bg-[length:900px_506px] bg-no-repeat'>
      <div className='flex md:justify-end justify-center lg:mr-32 pt-60 md:pt-0'>
        <div className='h-full absolute'>
          <div className='h-[400px] w-[400px] md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]'>
            <Canvas>
              <OrbitControls enableZoom={false} />
              <ambientLight intensity={1} />
              <directionalLight position={[3, 2, 1]} />
              <Sphere args={[1, 100, 200]} scale={2.5}>
                <MeshDistortMaterial color="#A020F0" attach="material" distort={0.5} speed={2} />
              </Sphere>
            </Canvas>
          </div>
        </div>
        <div className='h-screen absolute'>
          <AnimatePresence>
            <motion.div
              key={currentCat}
              variants={canvasVarients}
              initial='hidden'
              animate='show'
              className='h-[400px] w-[400px] md:h-[300px] md:w-[300px] lg:h-[350px] lg:w-[350px]'>
              <LazyLoadImage src={currentCat} alt="camera" className='object-contain h-full w-full duration-1000 animate-float' />
            </motion.div>
          </AnimatePresence>
          <div className='flex flex-col text-3xl justify-center text-center mt-20 md:mt-10 lg:mt-14'>
            <span>Are you celebrating</span>
            <span className='text-4xl'>
              <TypeAnimation
                sequence={[
                  () => setCurrentCat("/hero/couple.png"),
                  'Wedding',
                  3000,
                  () => setCurrentCat("/hero/festival.png"),
                  'Festival Special',
                  3000,
                  () => setCurrentCat("/hero/birthday.png"),
                  'Birth Day',
                  3000,
                  () => setCurrentCat("/hero/babyshower.png"),
                  'Baby & Kids',
                  3000,
                  () => setCurrentCat("/hero/valentine.png"),
                  'Valentine',
                  3000,
                  () => setCurrentCat("/hero/party.png"),
                  'Party',
                  3000,
                ]}
                repeat={Infinity}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar