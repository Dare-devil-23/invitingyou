import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ThreedCategory from "../components/3dCategory"
import toSnakeCase from '../helpers/stringToSnake'
import apiClient from '../axios'

const Categories = () => {
  const [categories, setCategoies] = useState([])

  const getCategories = () => {
    apiClient.get("/subcategories").then((res) => {
      setCategoies(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className='mb-10'>
      <h1 className='text-3xl text-center'>Select your Category</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-5 gap-5'>
        {
          categories?.map((category) => (
            <Link to={`/category/${toSnakeCase(category.name)}`} state={{id : category._id}} key={category._id}>
              <ThreedCategory category={category} />
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Categories