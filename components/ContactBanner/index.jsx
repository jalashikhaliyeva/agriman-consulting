import React from 'react'

function ContactBanner() {
  return (
    <div className='flex w-full justify-between  items-center rounded-full items-between bg-brand py-5 px-10 mt-10'>

        <p className='text-white text-3xl'>İstixana Layihələndirilməsi üzrə ozünüzə uyğun</p>
        <button className="relative py-3 px-7  w-[140px] text-center font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
              View more
              <span className="absolute left-[120px] top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-1">
                <svg
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.50002 7.42893L0.428955 14.5L3.09807 7.33111L0.428955 0.357865L7.50002 7.42893Z"
                    fill="black"
                  />
                </svg>
              </span>
            </button>


    </div>
  )
}

export default ContactBanner