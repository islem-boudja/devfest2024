import Image from 'next/image'
import React from 'react'

type Props = {}

function Navbar() {
  return (
    <div className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        <div>
          <Image src="/Logo_landing.svg" alt="Logo" width={120} height={120} className="h-auto w-24 md:w-32" />
        </div>
        <div>
          <button className="rounded-lg bg-main px-4 py-2 text-sm font-semibold text-white md:text-base">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar