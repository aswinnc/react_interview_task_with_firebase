import React, { useState, useEffect } from 'react'
export default function Admin(){
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(allOrders)
  }, [])

  const updateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    setOrders(updatedOrders)
    localStorage.setItem('orders', JSON.stringify(updatedOrders))
  }

  const statusOptions = ['On Process', 'Shipped', 'Delivered']

  return (
    <div>
      <h2>Admin Panel - Order Management</h2>
      {orders.length === 0 ? <div>No orders</div> : (
        <div>
          {orders.map(o => (
            <div key={o.id} className="card">
              <div><b>Order #{o.id}</b> - User ID: {o.userId} - Date: {new Date(o.date).toLocaleString()}</div>
              <div>Items: {o.items.map(i => i.title).join(', ')}</div>
              <div>Address: {o.address ? `${o.address.label}: ${o.address.line}` : 'N/A'}</div>
              <div>
                Status:
                <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)}>
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
