import React, { useState, useEffect } from 'react'

export default function Dashboard({user}){
  const [orders, setOrders] = useState([])
  const [addresses, setAddresses] = useState(user?.addresses || [])
  const [newAddress, setNewAddress] = useState({ label: '', line: '' })

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]')
      setOrders(allOrders.filter(o => o.userId === user.id))
      setAddresses(user.addresses || [])
    }
  }, [user])

  const addAddress = () => {
    if (!newAddress.label || !newAddress.line) return
    const updatedAddresses = [...addresses, { id: Date.now(), ...newAddress }]
    setAddresses(updatedAddresses)
    const updatedUser = { ...user, addresses: updatedAddresses }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setNewAddress({ label: '', line: '' })
  }

  const deleteAddress = (id) => {
    const updatedAddresses = addresses.filter(a => a.id !== id)
    setAddresses(updatedAddresses)
    const updatedUser = { ...user, addresses: updatedAddresses }
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return (
    <div>
      <h2>My Dashboard</h2>
      {user ? (
        <div>
          <div><b>Name:</b> {user.name}</div>
          <div><b>Email:</b> {user.email}</div>
          {user.photoURL && <img src={user.photoURL} alt="avatar" style={{width:80,borderRadius:8}}/>}
          <h3>Addresses</h3>
          {addresses.length === 0 ? <div>No addresses saved</div> : (
            <div>
              {addresses.map(a => (
                <div key={a.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div><b>{a.label}:</b> {a.line}</div>
                  <button onClick={() => deleteAddress(a.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
          <div className="card">
            <h4>Add New Address</h4>
            <input placeholder="Label (e.g., Home)" value={newAddress.label} onChange={e => setNewAddress({ ...newAddress, label: e.target.value })} />
            <input placeholder="Address Line" value={newAddress.line} onChange={e => setNewAddress({ ...newAddress, line: e.target.value })} />
            <button onClick={addAddress}>Add Address</button>
          </div>
          <h3>Order History</h3>
          {orders.length === 0 ? <div>No orders</div> : orders.map(o => (
            <div key={o.id} className="card">
              Order #{o.id} - Status: {o.status} - Date: {new Date(o.date).toLocaleString()}
              <br />Address: {o.address ? `${o.address.label}: ${o.address.line}` : 'N/A'}
            </div>
          ))}
        </div>
      ) : <div>Please login</div>}
    </div>
  )
}
