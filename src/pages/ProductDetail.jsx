import { useParams } from 'react-router-dom';
import { FetchProductById } from '../features/auth/fetch/FetchProductById';
import { useState,useEffect, useContext } from 'react';
import './ProductDetail.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { AppContext } from '../context/AppContext';

function ProductDetail() {

    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // states for item selections
    const [mainImage, setMainImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const { addToCart,openCart } = useContext(AppContext);

 // this code fetches products by id
   useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await FetchProductById(productId);
        setProduct(data);
        
        // sets initial defaults only after product data is successfully fetched
        if (data) {
          setMainImage(data.cover_image);
          setSelectedColor(data.available_colors?.[0] || '');
          setSelectedSize(data.available_sizes?.[0] || '');
        }
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

   const handleAddToCart = () => {
    
    if (!product) return;

    const itemToAdd = {
      ...product, // copies all original product info
      id: `${product.id}-${selectedColor}-${selectedSize}`, 
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      selectedImage: mainImage, 
      quantity: quantity
    };
    
    addToCart(itemToAdd); // adds the detailed item to the cart
    openCart();  //opens cart when item is added to cart
  };  
 
 const handleThumbnailClick = (image, index) => {
    setMainImage(image);
    if (product?.available_colors?.[index]) {
      setSelectedColor(product.available_colors[index]);
    }
  };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;



    //this is to display custom colors, that css dont have access on
     const getBackgroundColor = (color) => {
        if (color.toLowerCase() === 'multi') {
            return 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
        }
        return color.toLowerCase();
    };


    return (
      <>
      <p style={{padding:'1rem 5rem'}}>Listing/Product</p>
        <div className="Product-Detail-Container">
          
            <div class="Product-Detail-Main-Image-Container">
              <div class="Product-Small-Images-Container">
                {product?.images?.map((image,index) =>(
                  <img src={image} 
                  key={index}
                   onClick={() => handleThumbnailClick(image, index)}class="Product-Small-Images"
                   style={{border: mainImage === image ? `1px solid gray` : ''}}/>
                ))}
                </div>
              <img class='Product-Detail-Main-Image'  src={mainImage} alt={product?.name}  />
              
            </div>
            <div className='Product-Description-Info-Container'>
            <h2>{product?.name}</h2>
            <div className="Product-Detail-Info">
                <h1 className="Product-Detail-Price">${product?.price}</h1> 
            
                <p class="Product-Color-Text">{`Color: ${selectedColor}`}</p>

                <div className='Product-Colors-Container'>

                {product?.available_colors?.map((color, index) => (
                  <span 
                    key={index} 
                    className='Product-Color-Box' 
                    //this style is to give color box outline
                   style={{ 
                      background: getBackgroundColor(color),
                      border: '1px solid #ccc',  
                      ...(selectedColor === color && { 
                          outline: `2px solid ${color}`, 
                          outlineOffset: '2px' 
                      })
                    }}
                    onClick={() => {
                      setSelectedColor(color);
                      if (product?.images?.[index]) {
                        setMainImage(product.images[index]);
                      }
                    }}>
                  </span>
                ))}
            </div>
                <p>{`Size: ${selectedSize}`}</p>
                 <div className='Product-Sizes-Container'>
                    
                {product?.available_sizes?.map((size, index) => (
                    <div key={index} className='Product-Size-Box'
                    onClick={() => setSelectedSize(size)}
                    style={{
                          backgroundColor: selectedSize === size ? '#F8F6F7' : '#ffffffff',
                        border: selectedSize === size ? `1px solid #333 ` : '1px solid #c7c4c4ff',}}>
                        {size}
                    </div>
                ))}
                </div>            
             </div>
             <div className="Quantity-Selector">
              <label htmlFor="quantity">Quantity </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
            </div>
             <button onClick={handleAddToCart}class="Add-To-Cart-Button"><MdOutlineShoppingCart />Add to cart</button>
             <div class="Product-Brand-Details-Container">
              <div class="Details-brand-logo-container">
                <p class='Details-Text'>Details</p>
                <img class="Details-brand-logo" src={product?.brand?.image}/>
              </div>

              <p >Brand:  {product?.brand?.name}</p>
              <p>{product?.description}</p>
             </div>
             </div>
        </div>
        </>
    )
}

export default ProductDetail
