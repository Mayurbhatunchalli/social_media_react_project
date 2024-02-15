import React from 'react'

const UserReelsCard = () => {
  return (
    <div className='w-[15rem] px-2' >
        {/* <video controls className='w-full h-full' src='https://youtube.com/shorts/X3tr5ax78V4?si=CGSIqsF7NoP0CTuT' /> */}

        <iframe width="360" height="144" src="https://www.youtube.com/embed/Ak3MotjZgSA?si=Xl-gv4kDrwiTjRzx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  )
}

export default UserReelsCard