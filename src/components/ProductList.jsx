import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'

export default function ProductList({user}){
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [sort, setSort] = useState('none')
  const [category, setCategory] = useState('all')
  const [categories, setCategories] = useState([])

  useEffect(()=>{
    fetchProducts()
    fetchCategories()
  },[])

  async function fetchProducts(){
    const res = await axios.get('http://localhost:4000/products')
    setProducts(res.data)
  }
  async function fetchCategories(){
    const res = await axios.get('http://localhost:4000/categories')
    setCategories(res.data)
  }

  const filtered = products
    .filter(p=> (category==='all' || p.category===category))
    .filter(p=> p.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a,b)=>{
      if(sort==='price-asc') return a.price - b.price
      if(sort==='price-desc') return b.price - a.price
      return 0
    })

  return (
    <div>
      <div className="controls">
        <input placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c=> <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)}>
          <option value="none">No Sort</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>
      <div className="products">
        {filtered.map(p=> <ProductCard key={p.id} product={p} user={user} />)}
      </div>
    </div>
  )
}
