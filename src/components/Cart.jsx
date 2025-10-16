import React, {useState, useEffect} from 'react'

export default function Cart(){
  const [cart, setCart] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(()=> {
    setCart(JSON.parse(localStorage.getItem('cart')||'[]'))
    const u = JSON.parse(localStorage.getItem('user')||'null')
    setUser(u)
    if(u && u.addresses && u.addresses.length > 0) setSelectedAddress(u.addresses[0])
  },[])

  const confirmOrder = ()=>{
    if(!user){ alert('Please login to place order'); return }
    if(!selectedAddress){ alert('Please select an address'); return }
    const orders = JSON.parse(localStorage.getItem('orders')||'[]')
    const order = { id: Date.now(), items: cart, status: 'On Process', address: selectedAddress, date: new Date().toISOString(), userId: user.id }
    orders.push(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('cart', JSON.stringify([]))
    setCart([])
    alert('Order confirmed (payment skipped).')
  }

  return (
    <div>
      <h2>Cart</h2>
      {cart.length===0 ? <div>No items</div> : (
        <div>
          {cart.map((c,i)=><div key={i} className="card"><b>{c.title}</b> - ₹{c.price}</div>)}
          <h3>Select Address</h3>
          {user && user.addresses && user.addresses.length > 0 ? (
            <select value={selectedAddress ? selectedAddress.id : ''} onChange={e=> setSelectedAddress(user.addresses.find(a=>a.id==e.target.value))}>
              {user.addresses.map(a=> <option key={a.id} value={a.id}>{a.label}: {a.line}</option>)}
            </select>
          ) : (
            <div>No addresses saved. Please add addresses in your Dashboard.</div>
          )}
          <button onClick={confirmOrder} disabled={!selectedAddress}>Confirm Order</button>
        </div>
      )}
    </div>
  )
}
