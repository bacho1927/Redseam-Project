import { useParams } from 'react-router-dom';
import { FetchProductById } from '../features/auth/fetch/FetchProductById';
import { useState,useEffect } from 'react';
import './ProductDetail.css'
import { MdOutlineShoppingCart } from "react-icons/md";


function ProductDetail() {

    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product?.available_colors?.[0] || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [mainImage, setMainImage] = useState(product?.cover_image);
    const [quantity, setQuantity] = useState(1);

 // this code fetches products by id
   useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await FetchProductById(productId);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]); 

    useEffect(() => {
    if (product?.available_colors?.length) {
        setSelectedColor(product.available_colors[0]);
    }
    }, [product]);
        

    useEffect(() => {
  if (product?.available_sizes?.length) {
    setSelectedSize(product.available_sizes[0]);
  }
}, [product]);

// this code is to display main image on initial render
  useEffect(() => {
    if (product?.cover_image) {
      setMainImage(product.cover_image);
    }
  }, [product]);


console.log(product)

    return (
        <div className="Product-Detail-Container">
            <div class="Product-Detail-Main-Image-Container">
              <div class="Product-Small-Images-Container">
                {product?.images?.map((image,index) =>(
                  <img src={image} 
                  key={index}
                   onClick={() => setMainImage(image)}class="Product-Small-Images"
                   style={{border: mainImage === image ? `1px solid gray` : ''}}/>
                ))}
                </div>
              <img class='Product-Detail-Main-Image'  src={mainImage} alt={product?.name}  />
              
            </div>
            <div className='Product-Description-Info-Container'>
            <h1>{product?.name}</h1>
            <div className="Product-Detail-Info">
                <h1 className="Product-Detail-Price">${product?.price}</h1> 
                
                

                <p class="Product-Color-Text">{`Color: ${selectedColor}`}</p>

                <div className='Product-Colors-Container'>

                {product?.available_colors?.map((color, index) => (
                    <>
                
                    <span 
                        key={index} 
                        className='Product-Color-Box' 
                        style={{ backgroundColor: color.toLowerCase(),
                            border: selectedColor === color ? '2px solid black' : '1px solid #ccc'
                         }}
                        onClick={() => setSelectedColor(color)}
                    >
                        
                    </span>
                    </>
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
             <button class="Add-To-Cart-Button"><MdOutlineShoppingCart />Add to cart</button>
             <div class="Product-Brand-Details-Container">
              <p class='Details-Text'>Details</p>

              <p >Brand:  {product?.brand?.name}</p>
              <p>{product?.description}</p>
             </div>
             </div>
        </div>
    )
}

export default ProductDetail
