import './Products.css'
import { FaFilter } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FetchProducts } from '../features/auth/fetch/FetchProducts';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //filter states
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await FetchProducts();
        setProducts(data);
        setFilteredProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProducts();
  }, []);


  useEffect(() => {
    
    let result = products?.data || [];
    if (minPrice) {
      result = result.filter(product => product.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter(product => product.price <= parseFloat(maxPrice));
    }
    setFilteredProducts(result);
  }, [minPrice, maxPrice, products]);

const handleApplyFilter = (e) => {
    e.preventDefault();
    setMinPrice(minPriceRef.current.value);
    setMaxPrice(maxPriceRef.current.value);
  };
  

    return (
        <div class='Products-Page-Container'>
            <div class='Products-Header-Container'>
                <h1 >Products</h1>
                <form class='Filter-Sort-Container'>
                  
                    <div className='Filter'>
                      <div className='Filter-Button' onClick={() => setIsFilterOpen(!isFilterOpen)}>
                      <FaFilter /><p>Filter</p>
                      </div>
                      {isFilterOpen &&
                      
                      <div class="Filter-Inputs-Container">
                        <h3>Select price</h3>
                        <div class='Filter-Inputs'>
                              <input
                              type="number"
                               name="minPrice"
                              placeholder="From"
                              
                              ref={minPriceRef} 
                              className="price-input"
                            />
                            
                            <input
                              type="number"
                              placeholder="To"
                              name="maxPrice"
                              
                              ref={maxPriceRef}
                              className="price-input"
                            />
                            
                        </div>
                          <div className="Apply-Button-Wrapper">
                            <button 
                            onClick={handleApplyFilter}
                            className="filter-apply-button">Apply</button>
                          </div>
                      </div>}
                    </div>
                    <div class='Sort'>
                        <p>Sort by</p>
                        <FaChevronDown />
                    </div>
                </form>
            </div>
          <div className='Product-List-Container'>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className='Product-Link'>
              <div className='Product-Card'>
                <div className='Product-Cover'>
                  <img src={product.cover_image} className='Products-Image' alt={product.name} />
                </div>
                <p>{product.name}</p>
                <p>${product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products match your filter.</p>
        )}
      </div>

        </div>
    )
}

export default Products
