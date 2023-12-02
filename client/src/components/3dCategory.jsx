import React, { useEffect, useState } from 'react';
import './3dCategory.scss';
import LoadImg from './LoadImg';
const Card = ({category}) => {
  const [rotateY, setRotateY] = useState(0);
  const [rotateX, setRotateX] = useState(0);

  const handleMouseMove = (event) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const rotationX = (mouseY - centerY) / 10;
    const rotationY = (mouseX - centerX) / 10;
    setRotateX(rotationX);
    setRotateY(rotationY);
  };

  return (
    <div className="perspective" onMouseLeave={()=>{
      setRotateX(0) 
      setRotateY(0)
    }}>
      <div className="card" onMouseMove={handleMouseMove} style={{ transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)` }}>
        <LoadImg className="thumb" src={category?.hero_banner}/>
        <h2 >{category?.name}</h2>
      </div>
    </div>
  );
};

const ThreedCategory = ({category}) => {
  return (
    <div className="flex items-center justify-center">
      <Card category={category}/>
    </div>
  );
};

export default ThreedCategory;
