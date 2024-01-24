import React from 'react'
import Layout from '../components/Layout/Layout.js'
import useCategory from '../hooks/useCategory.js'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories=useCategory()
  return (
    <Layout title={"All Categories"}>
        <h1>All Categories</h1>
        <div className='container'>
    <div className='row'>
    {categories.map(c=>(
        <div className='col-md-6 mt-5 mb-3 gx-3 gy-3' key={c._id}>
            <button>
                <Link to={`/category/${c.slug}`} className="btn btn-primary">{c.name}</Link>
            </button>
        </div>
    ))}
    </div>
    </div>
    </Layout>
  )
}

export default Categories