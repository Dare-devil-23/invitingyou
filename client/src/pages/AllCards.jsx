import React, { useContext, useEffect, useState } from 'react'
import LoadImg from '../components/LoadImg'
import { Link } from 'react-router-dom'
import Accordion from '../components/Accordion'
import { BsHeart } from 'react-icons/bs'
import { WatchListContext } from '../context/WatchListContext'
import apiClient from '../axios'

const AllCards = () => {
  const [cards, setCards] = useState([])
  const { watchList, setWatchList } = useContext(WatchListContext)

  useEffect(() => {
    apiClient.get("/cards").then(res => {
      setCards(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  if (!cards.length) {
    return "loading"
  }
  return (
    <div className='min-h-screen'>
      <h1 className='text-3xl text-center mb-5'>All Cards</h1>
      <div className="flex">
        <div className="flex flex-col h-screen p-3 w-60">
          <div className="space-y-3">
            <div className="flex items-center">
              <h2 className="text-xl font-bold">Filters</h2>
            </div>
            <div className="flex-1">
              <ul className="pt-2 pb-4 space-y-1 text-sm">
                <li className="rounded-sm">
                  <Accordion title={"Sort By"} children={[
                    "Most Popular",
                    "Recently Added",
                    "Price (Low)",
                    "Price (High)"
                  ]} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
            {
              cards.map((card) => (
                <div className="w-full" key={card._id}>
                  <Link to={`/customize/${card._id}`} state={{ cardId: card._id }} className="flex justify-center flex-col w-52 mx-auto cursor-pointer overflow-hidden relative z-[1]">
                    <LoadImg src={card.image} alt={card._id} className="w-full h-[280px] hover:scale-105 transition-all duration-500" />
                    <div className='flex justify-between font-medium mt-2'>
                      <h1>{card.name}</h1>
                      <p>$&nbsp;{card.price}</p>
                    </div>
                    <p className='text-gray-500 dard:text-zinc-500'>{card.designer}</p>
                    <button className='top-3 right-3 absolute' onClick={()=>{}}>
                      <BsHeart className='hover:text-red-600 transition-all duration-500 text-xl'/>
                    </button>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllCards