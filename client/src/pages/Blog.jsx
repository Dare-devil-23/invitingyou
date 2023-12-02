import React, { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import blogs from '../constants/blogs'

const Blog = () => {
  const [featuredBlog] = useState(Math.floor(Math.random() * blogs.length))
  return (
    <div className='min-h-screen'>
      <div className='flex flex-col-reverse lg:flex-row place-items-center'>
        <div className='m-10 flex flex-col w-2/3'>
          <h2 className='text-lg mb-5'>
            FEATURED ARTICLE
          </h2>
          <h1 className='text-5xl mb-3'>
            {blogs[featuredBlog].title}
          </h1>
          <p>
            {blogs[featuredBlog].blog_description}
          </p>
          <span className='w-fit underline underline-offset-4 uppercase text-gray-500 dark:text-zinc-500 mt-3'>Read more</span>
        </div>
        <div className='w-2/3 lg:p-10'>
          <LazyLoadImage src={blogs[featuredBlog].image} alt={blogs[featuredBlog].title} />
        </div>
      </div>
      <div className='h-10 bg-gray-100 dark:bg-zinc-900' />
      <div className='grid grid-cols-1 lg:grid-cols-2'>
        {
          blogs.map((blog, index) => (
            <div key={index} className="p-5 m-5">
              <div className='flex flex-col place-items-center'>
                <LazyLoadImage src={blog.image} alt={blog.title} className="" />
                <div className='w-full lg:w-2/3 text-center'>
                  <div className='w-full mx-auto text-gray-500 dark:text-zinc-500 mt-5'>
                    <span className='w-full pr-5'>{blog.author}</span>
                    |
                    <span className='w-full pl-5'>{blog.timestamp.slice(0,10)}</span>
                  </div>
                  <div className='text-5xl py-3'>
                    {blog.title}
                  </div>
                  <div>
                    {blog.blog_description.slice(0,20)}...
                  </div>
                  <span className='w-fit underline underline-offset-4 uppercase text-gray-500 dark:text-zinc-500 mt-5'>Read more</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Blog