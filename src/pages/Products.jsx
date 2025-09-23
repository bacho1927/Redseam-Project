import './Products.css'
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FetchProducts } from '../features/auth/fetch/FetchProducts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {


 const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await FetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProducts();
  }, []);

    return (
        <div class='Products-Page-Container'>
            <div class='Products-Header-Container'>
                <h1 >Products</h1>
                <form class='Filter-Sort-Container'>
                    <div class='Filter'>
                        <FaFilter /><p>Filter</p>
                    </div>
                    <div class='Sort'>
                        <p>Sort by</p>
                        <FaChevronDown />
                    </div>
                </form>
            </div>
             <div className='Product-List-Container'>
        {products?.data?.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id} className='Product-Link'>
            <div className='Product-Card'> 
              <div className='Product-Cover'>
                <img src={product.cover_image} className='Products-Image' alt={product.name}/>
              </div>
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>

        </div>
    )
}

export default Products
