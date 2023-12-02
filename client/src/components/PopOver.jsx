import { useState } from 'react';

const PopOver = (props) => {
  const [showPopover, setShowPopover] = useState(false);
  const [sortType, setSortType] = useState("lh");

  return (
    <div className="relative"
      onMouseEnter={() => setShowPopover(true)}
      onMouseLeave={() => setShowPopover(false)}>
      <div
        className='flex gap-2 place-items-center  '
      >
        {props.label}
        {props.icon}
      </div>
      {showPopover && (
        <div className="absolute transition-all duration-500 top-5 right-0 bg-gray-50 dark:bg-zinc-900 p-4  shadow-lg">
          <h3 className="text-lg font-bold mb-2">{props.name}</h3>
          <div className='w-40 place-items-center'>
            <div className="flex justify-center flex-col gap-4 place-items-center">
              <div onClick={()=>setSortType("lh")}>
                <input
                  type='radio'
                  className='mr-1 align-middle'
                  defaultChecked={sortType}
                />
                <label className=' '>Price low to high</label>
              </div>
              <div onClick={()=>setSortType("hl")}>
                <input
                  type='radio'
                  className='mr-1 align-middle'
                  defaultChecked={sortType}
                />
                <label className=' '>Price high to low</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopOver