import React,{useState} from 'react'
import blogs from '../../constants/blogs'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link } from 'react-router-dom'

const FeaturedBlog = () => {
  const [featuredBlog] = useState(Math.floor(Math.random() * blogs.length))
  return (
    <div className=''>
      <div className='flex flex-col-reverse lg:flex-row place-items-center'>
        <div className='m-10 flex flex-col w-2/3'>
          <h2 className='text-lg mb-5'>
            See Our Blog Posts Get Inspired.
          </h2>
          <h1 className='text-5xl mb-3'>
            {blogs[featuredBlog].title}
          </h1>
          <p>
            {blogs[featuredBlog].blog_description}
          </p>
          <Link to="/blog" className='w-fit underline underline-offset-4 uppercase text-gray-500 dark:text-zinc-500 mt-3'>Read more</Link>
        </div>
        <div className='w-2/3 lg:p-10'>
          <LazyLoadImage src={blogs[featuredBlog].image} alt={blogs[featuredBlog].title} className='w-4/5 mx-auto'/>
        </div>
      </div>
    </div>
  )
}

export default FeaturedBlog