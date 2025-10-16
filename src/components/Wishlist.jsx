import React, {useEffect, useState} from 'react'

export default function Wishlist(){
  const [w, setW] = useState([])
  useEffect(()=> setW(JSON.parse(localStorage.getItem('wishlist')||'[]')),[])
  return (
    <div>
      <h2>Wishlist</h2>
      {w.length===0 ? <div>No items</div> : w.map((i,idx)=><div key={idx} className="card">{i.title} - ₹{i.price}</div>)}
    </div>
  )
}
