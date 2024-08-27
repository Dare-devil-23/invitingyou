import React, { useState, useEffect } from 'react'
import { BsPlusCircle } from 'react-icons/bs'
import { useDetectClickOutside } from 'react-detect-click-outside';
import customToast from '../hooks/customToast';
import HoverLine from '../components/HoverLine';
import { Link } from 'react-router-dom';
import apiClient from '../axios';

const AddSubCategory = () => {
  const [categories, setCategoies] = useState([])
  const [subCategory, setSubCategory] = useState('')
  const [showAdd, setShowAdd] = useState('')

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShowAdd('')
    }
  })

  useEffect(() => {
    getSubCategories()
  }, [])

  const getSubCategories = () => {
    apiClient.get(`/subcategories`).then((res) => {
      setCategoies(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

  const handleSubCategory = (e, selectedCategory) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('sub_category', subCategory)
    apiClient.put(`/categories/${selectedCategory._id}`, formData, {
      headers: { 'Content-type': 'application/json' },
    }).then(res => {
      customToast(`Sub Category created in ${selectedCategory.name}`)
      setSubCategory('')
    }).catch((err) => {
      customToast(err.response.data.message || "Something went wrong", 'error')
    })
  }
  return (
    <div className='min-h-screen my-10'>
      <h1 className='text-3xl font-medium text-center'>Manage Sub Category</h1>
      <div className='m-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' ref={ref}>
        {
          categories?.map((category) => {
            return (
              <div key={category._id} className="leading-10 border-2 p-4">
                <h1 className='text-xl'>{category.name}</h1>
                <div>
                  {
                    category.sub_categories?.map((sub) => (
                      <div key={sub._id} className="px-5">
                        <Link to="/admin/addcards" state={{sub}}>
                          <HoverLine text={sub.name} />
                        </Link>
                      </div>
                    ))
                  }
                  <button className='flex place-items-center' onClick={() => setShowAdd(category._id)}>
                    <BsPlusCircle />&nbsp;Add Subcategory
                  </button>
                  <div className={`${showAdd === category._id ? 'block' : 'hidden'} bg-gray-100 dark:bg-zinc-900 shadow-lg`}>
                    <form className='w-full' onSubmit={(e) => handleSubCategory(e, category)}>
                      <input
                        placeholder='Sub Category'
                        type="text"
                        name="sub_category"
                        value={subCategory}
                        required={true}
                        className='p-1 border w-[80%] border-gray-500 bg-transparent'
                        onChange={(e) => {
                          setSubCategory(e.target.value)
                        }}
                      />
                      <button className='p-1 w-[20%] mx-auto bg-black text-white dark:text-black dark:bg-white'>Add</button>
                    </form>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default AddSubCategory