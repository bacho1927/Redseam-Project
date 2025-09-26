import './Products.css'
import { BiSliderAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FetchProducts } from '../features/auth/fetch/FetchProducts';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //filter and sort states
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [sortOrder, setSortOrder] = useState('default');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
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

    
    //sorts products
    const sortedResult = [...result]; 
    
    if (sortOrder === 'price-asc') {
      sortedResult.sort((a, b) => a.price - b.price); 
    } else if (sortOrder === 'price-desc') {
      sortedResult.sort((a, b) => b.price - a.price); 
    } else if (sortOrder === 'release_year') {
     
      sortedResult.sort((a, b) => b.release_year - a.release_year);
      
    }
    
    setFilteredProducts(sortedResult);
  }, [minPrice, maxPrice, products, sortOrder]);

    //applies filter
const handleApplyFilter = (e) => {
    e.preventDefault();
    setMinPrice(minPriceRef.current.value);
    setMaxPrice(maxPriceRef.current.value);
    setIsFilterOpen(false)
  };

  //clears filter
  const handleClearFilter = () => {
      setMinPrice('');
      setMaxPrice('');
      if(minPriceRef.current) minPriceRef.current.value = '';
      if(maxPriceRef.current) maxPriceRef.current.value = '';
  };


const handleSortChange = (order) => {
    setSortOrder(order);
    setIsSortOpen(false);
  };
  

    return (
        <div className='Products-Page-Container'>
            <div className='Products-Header-Container'>
              <div>
                <h1 >Products</h1>
                {(minPrice || maxPrice) && (
                <div className="active-filter-display">
                    <p>
                        Price:
                        {minPrice && ` ${minPrice}-`}
                        {maxPrice && `${maxPrice}`}
                    </p>
                    <button onClick={handleClearFilter} className="clear-filter-button">X</button>
                </div>
            )}
                </div>
                <form className='Filter-Sort-Container'>
                    
                    <div className='Filter'>
                      <div className='Filter-Button' onClick={() => setIsFilterOpen(!isFilterOpen)}>
                      <BiSliderAlt /><span>Filter</span>
                      </div>
                      {isFilterOpen &&
                      
                      <div className="Filter-Inputs-Container">
                        <h3>Select price</h3>
                        <div className='Filter-Inputs'>
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
                    <div className='Sort'>
                    <label onClick={()=> setIsSortOpen(!isSortOpen)} htmlFor="Sort-select" className='Sort-Button'>Sort by <FaChevronDown /></label>
                    {isSortOpen &&
                      <div className="Sort-Modal-container">
                        <strong>Sort by</strong>
                         <button
                          onClick={() => handleSortChange('release_year')}
                        >
                          New products first
                        </button>
                        <button
                          onClick={() => handleSortChange('price-asc')}
                        >
                          Price, Low to High
                        </button>
                        <button  onClick={() => handleSortChange('price-desc')}>Price, High to Low</button>
                      </div>}
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