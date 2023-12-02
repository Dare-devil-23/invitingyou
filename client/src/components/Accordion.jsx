import { useState } from "react";
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import HoverLine from "./HoverLine";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-left" onMouseLeave={() => setIsOpen(false)}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg">{title}</h2>
        {
          isOpen ? <AiOutlineDown /> : <AiOutlineRight /> }
      </div>
      {isOpen && (
        <div className="border-t border-gray-500 pt-2">
          {
            children.map((child , i)=>(
              <div key={i} className="leading-8 w-fit text-lg">
                <HoverLine text={child}/>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default Accordion;
