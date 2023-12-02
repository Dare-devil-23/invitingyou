import React from 'react'
import Pagination from 'react-responsive-pagination';

const CustomPaginate = ({ currentPage, length, setCurrentPage }) => {
  return (
    <Pagination
      current={currentPage}
      total={Math.ceil(length / 8)}
      onPageChange={setCurrentPage}
      className="flex gap-4 text-xl place-items-center justify-center"
      activeItemClassName="border-b border-gray-500"
      ariaPreviousLabel=''
      ariaNextLabel=''
      disabledItemClassName='cursor-default text-gray-500'
    />
  )
}

export default CustomPaginate