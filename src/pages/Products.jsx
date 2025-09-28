import './Products.css';
import { BiSliderAlt } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { FetchProducts } from '../features/auth/fetch/FetchProducts';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Pagination from '../components/Pagination';

function Products() {
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

 
  useEffect(() => {
   
    const currentPage = parseInt(searchParams.get('page')) || 1;
    const sortOrder = searchParams.get('sort') || 'default';
    const minPrice = searchParams.get('filter[price_from]') || '';
    const maxPrice = searchParams.get('filter[price_to]') || '';

    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await FetchProducts({ 
          page: currentPage, 
          sort: sortOrder, 
          minPrice: minPrice, 
          maxPrice: maxPrice 
        });
        setApiResponse(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
    
  }, [searchParams]);

  
  const handleApplyFilter = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    newParams.set('filter[price_from]', minPriceRef.current.value);
    newParams.set('filter[price_to]', maxPriceRef.current.value);
    newParams.set('page', '1');
    setSearchParams(newParams);
    setIsFilterOpen(false);
  };

  const handleClearFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('filter[price_from]');
    newParams.delete('filter[price_to]');
    newParams.set('page', '1'); 
    if (minPriceRef.current) minPriceRef.current.value = '';
    if (maxPriceRef.current) maxPriceRef.current.value = '';
    setSearchParams(newParams);
  };

  const handleSortChange = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sort', order);
    newParams.set('page', '1'); 
    setSearchParams(newParams);
    setIsSortOpen(false);
  };

  const paginate = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', pageNumber.toString());
    setSearchParams(newParams);
  };

 
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const minPrice = searchParams.get('filter[price_from]') || '';
  const maxPrice = searchParams.get('filter[price_to]') || '';
  const products = apiResponse?.data || [];
  
  return (
    <div className='Products-Page-Container'>
      <div className='Products-Header-Container'>
        <div>
          <h1>Products</h1>
          {(minPrice || maxPrice) && (
            <div className="active-filter-display">
              <p>
                Price: {minPrice && ` ${minPrice}-`}{maxPrice}
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
            {isFilterOpen && (
              <div className="Filter-Inputs-Container">
                <h3>Select price</h3>
                <div className='Filter-Inputs'>
                  <input type="number" name="minPrice" placeholder="From" ref={minPriceRef} className="price-input" defaultValue={minPrice}/>
                  <input type="number" placeholder="To" name="maxPrice" ref={maxPriceRef} className="price-input" defaultValue={maxPrice}/>
                </div>
                <div className="Apply-Button-Wrapper">
                  <button onClick={handleApplyFilter} className="filter-apply-button">Apply</button>
                </div>
              </div>
            )}
          </div>
          <div className='Sort'>
            <label onClick={() => setIsSortOpen(!isSortOpen)} className='Sort-Button'>Sort by <FaChevronDown /></label>
            {isSortOpen && (
              <div className="Sort-Modal-container">
                <strong>Sort by</strong>
                
                <button onClick={() => handleSortChange('-created_at')}>New products first</button>
                <button onClick={() => handleSortChange('price')}>Price, Low to High</button>
                <button onClick={() => handleSortChange('-price')}>Price, High to Low</button>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className='Product-List-Container'>
        {loading ? <p>Loading products...</p> : 
         error ? <p>Error: {error}</p> : 
         products.length > 0 ? (
          products.map((product) => (
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
          <p>No products found.</p>
        )}
      </div>

      {apiResponse && apiResponse.meta && products.length > 0 && (
        <Pagination
          productsPerPage={apiResponse.meta.per_page}
          totalProducts={apiResponse.meta.total}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default Products;