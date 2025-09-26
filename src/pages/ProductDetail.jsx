import { useParams } from 'react-router-dom';
import { FetchProductById } from '../features/auth/fetch/FetchProductById';
import { useState, useEffect, useContext } from 'react';
import './ProductDetail.css';
import { MdOutlineShoppingCart } from "react-icons/md";
import { AppContext } from '../context/AppContext';

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mainImage, setMainImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, openCart } = useContext(AppContext);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await FetchProductById(productId);
        setProduct(data);

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
      ...product,
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      selectedColor,
      selectedSize,
      selectedImage: mainImage,
      quantity,
    };

    addToCart(itemToAdd);
    openCart();
  };

  const handleThumbnailClick = (image, index) => {
    setMainImage(image);
    if (product?.available_colors?.[index]) {
      setSelectedColor(product.available_colors[index]);
    }
  };

  const getBackgroundColor = (color) => {
    if (color.toLowerCase() === 'multi') {
      return 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)';
    }
    return color.toLowerCase();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <p style={{ padding: '1rem 5rem' }}>Listing/Product</p>
      <div className="Product-Detail-Container">
        <div className="Product-Detail-Main-Image-Container">
          <div className="Product-Small-Images-Container">
            {product?.images?.map((image, index) => (
              <img
                src={image}
                key={index}
                onClick={() => handleThumbnailClick(image, index)}
                className="Product-Small-Images"
                style={{ border: mainImage === image ? `1px solid gray` : '' }}
              />
            ))}
          </div>
          <img
            className="Product-Detail-Main-Image"
            src={mainImage}
            alt={product?.name}
          />
        </div>
        <div className="Product-Description-Info-Container">
          <h2>{product?.name}</h2>
          <div className="Product-Detail-Info">
            <h1 className="Product-Detail-Price">${product?.price}</h1>
            <p className="Product-Color-Text">{`Color: ${selectedColor}`}</p>

            <div className="Product-Colors-Container">
              {product?.available_colors?.map((color, index) => (
                <span
                  key={index}
                  className="Product-Color-Box"
                  style={{
                    background: getBackgroundColor(color),
                    border: '1px solid #ccc',
                    ...(selectedColor === color && {
                      outline: `2px solid ${color}`,
                      outlineOffset: '2px',
                    }),
                  }}
                  onClick={() => {
                    setSelectedColor(color);
                    if (product?.images?.[index]) {
                      setMainImage(product.images[index]);
                    }
                  }}
                ></span>
              ))}
            </div>

            <p>{`Size: ${selectedSize}`}</p>
            <div className="Product-Sizes-Container">
              {product?.available_sizes?.map((size, index) => (
                <div
                  key={index}
                  className="Product-Size-Box"
                  onClick={() => setSelectedSize(size)}
                  style={{
                    backgroundColor: selectedSize === size ? '#F8F6F7' : '#ffffffff',
                    border:
                      selectedSize === size
                        ? `1px solid #333 `
                        : '1px solid #c7c4c4ff',
                  }}
                >
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

          <button onClick={handleAddToCart} className="Add-To-Cart-Button">
            <MdOutlineShoppingCart /> Add to cart
          </button>

          <div className="Product-Brand-Details-Container">
            <div className="Details-brand-logo-container">
              <p className="Details-Text">Details</p>
              <img
                className="Details-brand-logo"
                src={product?.brand?.image}
              />
            </div>

            <p>Brand: {product?.brand?.name}</p>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;