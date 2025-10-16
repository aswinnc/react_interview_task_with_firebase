import React from 'react'

export default function ProductCard({product, user}){
  const addToCart = ()=>{
    if(product.stock === 0){ alert('Out of stock. Cannot add to cart.'); return }
    const cart = JSON.parse(localStorage.getItem('cart')||'[]')
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart')
  }
  const addToWishlist = ()=>{
    if(product.stock === 0){ alert('Cannot add out-of-stock item to wishlist.'); return }
    const w = JSON.parse(localStorage.getItem('wishlist')||'[]')
    w.push(product)
    localStorage.setItem('wishlist', JSON.stringify(w))
    alert('Added to wishlist')
  }

  return (
    <div className="card">
      <h3>{product.title}</h3>
      <div className="small">Category: {product.category}</div>
      <div className="small">Price: ₹{product.price}</div>
      <div className="small">Stock: {product.stock}</div>
      <p>{product.description}</p>
      <div style={{display:'flex',gap:8}}>
        <button onClick={addToCart} disabled={product.stock===0}>{product.stock===0 ? 'Out of stock' : 'Add to cart'}</button>
        <button onClick={addToWishlist} disabled={product.stock===0}>Wishlist</button>
      </div>
    </div>
  )
}
