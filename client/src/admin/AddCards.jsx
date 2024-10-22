import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import customToast from '../hooks/customToast'
import { Link, useLocation } from 'react-router-dom'
import apiClient from '../axios'

const AddCards = () => {

  const location = useLocation()
  const subcategory = location.state?.sub

  const [card, setCard] = useState({
    name: '',
    image: '',
    designer: '',
    color: '',
    shape: '',
    price: '',
  })

  const handleAddCardToCat = (e) => {
    e.preventDefault()
    const formData = new FormData;
    formData.append('name', card.name)
    formData.append('designer', card.designer)
    formData.append('color', card.color)
    formData.append('shape', card.shape)
    formData.append('price', card.price)
    formData.append('image', card.image)

    if (subcategory?._id) {
      apiClient.put(`/subcategories/${subcategory?._id}`, formData, {
        headers: { 'Content-type': 'multipart/form-data' },
      }).then(res => {
        customToast(`Card added to ${subcategory?.name}`)
        setCard({
          name: '',
          image: '',
          designer: '',
          color: '',
          shape: '',
          price: '',
        })
      }).catch(err => {
        console.error(err)
        customToast(err.response.message || "Something went wrong", 'error')
      })
    } else {
      customToast("Please select category first", "error")
    }
  }
  if(!location.state){
    return (
      <div className='text-xl text-center min-h-[80vh]'>
        You have not selected any subcategory please select <Link to="/admin/managesubcategory" className='underline text-fuchsia-500'>here.</Link>
      </div>
    )
  }
  return (
    <div className='min-h-screen'>
      <form className='flex flex-col m-10 lg:w-[80%] mx-auto' onSubmit={handleAddCardToCat}>
          <h1 className='text-3xl text-center'>Add Cards for {subcategory.name}</h1>
          <div className='grid grid-cols-2'>
            <input
              placeholder='Name'
              type="text"
              name="name"
              value={card.name}
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, name: e.target.value }
                })
              }}
            />
            <input
              placeholder='Designer'
              type="text"
              name="designer"
              value={card.designer}
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, designer: e.target.value }
                })
              }}
            />
            <input
              placeholder='Color'
              type="text"
              name="color"
              value={card.color}
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, color: e.target.value }
                })
              }}
            />
            <input
              placeholder='Shape'
              type="text"
              name="shape"
              value={card.shape}
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, shape: e.target.value }
                })
              }}
            />
            <input
              placeholder='Price'
              type="number"
              name="price"
              value={card.price}
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, price: e.target.value }
                })
              }}
            />
          </div>
          <label htmlFor="dropzone-file" className="flex cursor-pointer flex-col w-80 h-64 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:hover:bg-bray-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600">
            <div className='relative h-full w-full'>
              <div className="flex flex-col items-center justify-center pt-5 pb-6 absolute z-30 w-full h-full">
                <AiOutlineCloudUpload className='text-3xl ' />
                <p className="mb-2 text-sm "><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>

              {
                card?.image && <div className='absolute w-full h-full top-0 left-0'>
                  <LazyLoadImage
                    src={URL.createObjectURL(card?.image)}
                    alt={card.name}
                    className="h-full w-full object-contain rounded-lg"
                  />
                </div>
              }
            </div>
            <input
              id="dropzone-file"
              placeholder='Image'
              type="file"
              // value={card.image}
              accept='image/png, image/gif, image/jpeg'
              name="image"
              required={true}
              className='p-3 my-5 mx-1 border border-gray-500 bg-transparent hidden'
              onChange={(e) => {
                setCard((prev) => {
                  return { ...prev, image: e.target.files[0] }
                })
              }}
            />
          </label>
          <button className='w-fit px-5 mx-auto bg-black text-white dark:text-black dark:bg-white py-3 mt-5'>
            Submit
          </button>
        </form>
    </div>
  )
}

export default AddCards