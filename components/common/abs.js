import React, { useEffect } from 'react'

const ABS = ({ slotId, width, height }) => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || [1,2,3]).push({})
  }, [])

  return (
    <ins
      className='adsbygoogle'
      style={{ display: 'inline-flex', 
               alignItems:'center', 
               justifyContent:'space-around',
               width: `calc(${width}% - 2px)`, 
               height: `auto` }}
      data-ad-client='ca-pub-6421975370931679'
      data-ad-slot={slotId} />
  )
}

export default ABS