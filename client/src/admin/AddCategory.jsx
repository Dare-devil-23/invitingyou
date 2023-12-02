import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import customToast from '../hooks/customToast'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    hero_banner: '',
  })

  const saveCategory = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', category.name)
    formData.append('description', category.description)
    formData.append('hero_banner', category.hero_banner)

    axios.post('/categories', formData, {
      headers: { 'Content-type': 'multipart/form-data' }
    }).then(res => {
      if (res.status === 200) {
        customToast("Successfull")
        setCategory({
          name: '',
          description: '',
          hero_banner: '',
        })
      } else {
        customToast("Something went wrong", "error")
      }
    }).catch(e => {
      customToast(e.response?.message || "Something went wrong", "error")
    })
  }

  useEffect(() => {
    console.log(category)
  }, [category])

  return (
    <form onSubmit={saveCategory} className="min-h-screen flex flex-col m-10 lg:w-[80%] mx-auto">
      <h1 className='text-3xl text-center'>Add Category</h1>
      <input
        placeholder='Name'
        type="text"
        name="name"
        value={category.name}
        className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
        required
        onChange={(e) => {
          setCategory((prev) => {
            return { ...prev, name: e.target.value }
          })
        }}
      />
      <textarea
        placeholder='description'
        name='description'
        value={category.description}
        required
        rows={4}
        className='p-3 my-5 mx-1 border border-gray-500 bg-transparent'
        onChange={(e) => {
          setCategory((prev) => {
            return { ...prev, description: e.target.value }
          })
        }}
      />

      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg   bg-gray-50 dark:hover:bg-bray-800 dark:bg-zinc-900 hover:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:hover:bg-zinc-600">
          <div className='relative h-full w-full'>
            <div className="flex flex-col items-center justify-center pt-5 pb-6 absolute z-30 w-full h-full">
              <AiOutlineCloudUpload className='text-3xl ' />
              <p className="mb-2 text-sm "><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            {
              category.hero_banner &&
              <div className='absolute w-full h-full top-0 left-0'>
                <LazyLoadImage
                  src={URL.createObjectURL(category.hero_banner)}
                  alt={category.name}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            }
          </div>
          <input
            id="dropzone-file"
            placeholder='upload hero banner'
            name="hero_banner"
            required
            className='p-3 my-5 mx-1 border border-zinc-900 bg-transparent hidden'
            onChange={(e) => {
              setCategory((prev) => {
                return { ...prev, hero_banner: e.target.files[0] }
              })
            }}
            type="file"
            accept='image/png, image/gif, image/jpeg'
          />
        </label>
      </div>

      <button className='w-fit px-5 mx-auto bg-black text-white dark:text-black dark:bg-white py-3 mt-5'>
        Submit
      </button>
    </form>
  )
}

export default AddCategory