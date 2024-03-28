import React from 'react'

export default function Loader() {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center bg-opacity-50">
  <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
</div>
  )
}
