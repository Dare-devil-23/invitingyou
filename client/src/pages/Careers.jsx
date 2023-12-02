import React from 'react'
import jobData from "../constants/jobData"
import HoverLine from "../components/HoverLine"

const Careers = () => {
  return (
    <div className='min-h-screen'>
      <h1 className='text-6xl font-bold lg:text-8xl p-10'>
        The only way to achieve success is to take risks and embrace failure, and make it happen.
      </h1>
      <div className='text-2xl p-10 lg:ml-auto w-full lg:w-1/2'>
        <div className='mb-5'>
          Through visual collaboration, we power the world’s most creative organizations and inspire solutions that make our team, our communities, and our world better.
        </div>
        <a href='#open_roles'>
          <button className='text-lg transition-all duration-500 shadow-lg px-5 py-3 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'>
            View open roles
          </button>
        </a>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 p-10 lg:mt-20 mt-10'>
        <div className='col-span-1 text-3xl font-bold p-5'>
          A place where everyone belongs, thrives, and grows. A place where you’re trusted to make anything possible.
        </div>
        <div className='col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4 text-lg'>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We’re building a transformative collaboration platform that’s defining a new category while making an impact on the world around us.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We’re committed to fostering a community where everyone feels welcome, seen, and heard as they are, enabling us to better serve our customers and communities.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We work in small teams to give our employees the autonomy and voice they need to be heard.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We empower InVisioners to author their day so they can balance work with making time for those relationships that matter most—friends, family, and loved ones.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We’re a people-centric organization that is guided by a set of transformative principles.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            We ship projects with intent and urgency, and we thrive in ambiguity.
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 p-10 lg:mt-20 mt-10 bg-gray-100 dark:bg-zinc-900'>
        <div className='col-span-1 text-3xl font-bold p-5'>
          Our principles
        </div>
        <div className='col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4 text-lg'>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>01</h1>
            <h2 className='text-3xl pb-3'>Humility</h2>
            We believe humility is the most noble of all human character traits.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>02</h1>
            <h2 className='text-3xl pb-3'>Co-Ownership</h2>
            We think and act like owners in everything we do.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>03</h1>
            <h2 className='text-3xl pb-3'>Candor with Compassion</h2>
            We speak the truth, even when it takes us beyond our comfort zone.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>04</h1>
            <h2 className='text-3xl pb-3'>Relentless self-development</h2>
            We relentlessly pursue learning and holistic development for ourselves and everyone around us.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>05</h1>
            <h2 className='text-3xl pb-3'>Go-Getting and Go-Giving</h2>
            We stand up and step forward for the tough jobs, and we look for opportunities to give back to our team and the world around us.
          </div>
          <div className='pt-3 m-5 border-t border-t-gray-500'>
            <h1 className='text-6xl py-2'>06</h1>
            <h2 className='text-3xl pb-3'>Inclusive Collaboration</h2>
            We actively seek out different perspectives, are open to new ideas, and collaborate to deliver extraordinary outcomes.
          </div>
        </div>
      </div>
      <div className='p-10' id="open_roles">
        <h1 className='text-5xl py-2'>
          Career Opportunities
        </h1>
        <p className='mb-14'>Join our team</p>
        <p className='mb-4 font-bold'>Open Roles</p>
        {
          jobData.map((job) => (
            <div className='flex justify-between border-t border-t-gray-500 py-10' key={job.id}>
              <h1>{job.role}</h1>
              <button><HoverLine text={"Apply Now"} /></button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Careers