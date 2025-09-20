import { useParams } from 'react-router-dom';
import { FetchProductById } from '../features/auth/fetch/FetchProductById';
import { useState,useEffect } from 'react';
import './ProductDetail.css'
function ProductDetail() {

    const { productId } = useParams(); 
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(product?.available_colors?.[0] || '');
    const [selectedSize, setSelectedSize] = useState('');


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
console.log(product)
    return (
        <div className="Product-Detail-Container">
            
            <img class='Product-Detail-Main-Image'  src={product?.cover_image} alt={product?.name}  />
            <div className='Product-Description-Info-Container'>
            <h1>{product?.name}</h1>
            <div className="Product-Detail-Info">
                <h1 className="Product-Detail-Price">${product?.price}</h1> 
                {/* <p className="Product-Detail-Description">{product?.description}</p> */}
                

                <p>{`Color: ${selectedColor}`}</p>

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
             </div>
        </div>
    )
}

export default ProductDetail
