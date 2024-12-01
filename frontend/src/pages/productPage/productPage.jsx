import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { checkOutCart, fetchImage, fetchProducts } from "../../utils";
import "../../styles/productPage.css";
import {
  clock1_icon,
  clock_icon,
  forward_button,
  forward_icon2,
  forward_icon3,
  id_verified,
  location_icon,
  motocross_icon,
  order_complete,
  plus_icon,
  remove_icon,
  scooter_icon,
  search_icon,
  shopping_cart,
  store_icon,
  tracking1_icon,
} from "../../assets";
import PopularRestaurants from "../../components/PopularRestaurants/PopularRestaurants";
import { LuShare2 } from "react-icons/lu";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const customIcon = new L.Icon({
  iconUrl: location_icon,
  iconSize: [45, 45],
  iconAnchor: [10, 38],
  popupAnchor: [0, -38],
});

export default function ProductPage() {
  const [images, setImages] = useState({});
  const [imageLoading, setimageLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const position = [28.6044, 77.1025];
  const [modalData, setModalData] = useState({});

  const navigate = useNavigate();
  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setimageLoading(true);
        const data = await fetchImage();
        setImages(data.images);
        setimageLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setimageLoading(false);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setProductLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setProductLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setProductLoading(false);
      }
    };
    getProducts();
  }, []);

  

  const addPrdouct = (product) =>{
    setCart((prevProduct) => {
      const existingProduct = prevProduct.find((cartItem) => cartItem._id === product._id);

      if(existingProduct){
        return prevProduct.map((cartItem) => 
          cartItem._id === product?._id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        );
      } else {

        
        return [...prevProduct, {...product, quantity: 1}];
      };
    });
    // console.log(cart);
  };

  const removeProduct= (product) => {
    setCart((prevProduct) => {
      const existingProduct = prevProduct.find((cartItem) => cartItem._id === product?._id);
      if(existingProduct.quantity === 1){
        return prevProduct.filter((cartItem) => cartItem._id !== product._id);
      }
      return prevProduct.map((cartItem) => 
        cartItem._id === product?._id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
      );
    });
  }

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemPrice = Number(item.price.replace(/[^0-9]/g, ""));
      return total + itemPrice * item.quantity;
    }, 0)
  }
  
  
  // console.log(totalPrice);
  
  const handleCheckOut = async (e) => {
    e.preventDefault();

    if(cart?.length === 0){
      return alert("Please add some items to the cart");
    }
    const totalPrice = calculateTotalPrice().toString();
    const userId = localStorage.getItem("userId");
    const data = {
      orders: cart,
      totalPrice,
      userId
    }

    setModalData(data);
    setCart([]);
    navigate('/checkout');
    closeModal();

    try {
      const response = await checkOutCart(data);
      toast.success(response?.message);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("checkout failed please try again");
    }
   
  }

  

  if (imageLoading || productLoading) {
    return <div>Loading...</div>;
  };

  return (
    <>
      <Navbar openModal={openModal} closeModal={closeModal}/>
      {images && (
        <div className="product-banner">
          <img src={images.burger_logo} alt="" className="product-banner-img" />
          <div className="banner-content">
            <div className="content-left">
              <p className="content-title">I'm lovin' it!</p>
              <p className="comp-name">McDonald’s East London</p>
              <div className="content-list">
                <div className="min-order">
                  <img src={order_complete} alt="" />
                  <p>Minimum Order: 12 GBP</p>
                </div>
                <div className="delivery">
                  <img src={motocross_icon} alt="" />
                  <p>Delivery in 20-25 Minutes</p>
                </div>
              </div>
            </div>
            <div className="content-right">
              <img src={images.burger_logo} alt="" />
              <div className="ratings-logo">
                <img src={images.ratings_icon} alt="" />
              </div>
            </div>
          </div>
          <div className="open-msg">
            <img src={clock_icon} alt="" />
            <p>Open until 3:00 AM</p>
          </div>
        </div>
      )}
      <div className="offer-search">
        <p>All Offers from McDonald’s East London</p>
        <div className="offer-input">
          <img src={search_icon} alt="" className="search-icon" />
          <input type="text" placeholder="Search from menu..." />
        </div>
      </div>
      <div className="offer-options">
        <div className="offer-title-black">
          <p>Offers</p>
        </div>
        <div className="offer-title">
          <p>Burgers</p>
        </div>
        <div className="offer-title">
          <p>Fries</p>
        </div>
        <div className="offer-title">
          <p>Snacks</p>
        </div>
        <div className="offer-title">
          <p>Salads</p>
        </div>
        <div className="offer-title">
          <p>Cold drinks</p>
        </div>
        <div className="offer-title">
          <p>Happy Meal®</p>
        </div>
        <div className="offer-title">
          <p>Desserts</p>
        </div>
        <div className="offer-title">
          <p>Hot drinks</p>
        </div>
        <div className="offer-title">
          <p>Sauces</p>
        </div>
        <div className="offer-title">
          <p>Orbit®</p>
        </div>
      </div>
      <div className="product-modal">
        <div className="display-product">
          {images && images.discount && (
            <div className="offer-discount">
              <div className="discount-card">
                <img
                  src={images.discount.firstorder}
                  alt=""
                  className="discount-img"
                />
                <div className="discount-msg">
                  <p className="discount-restaurant">McDonald’s East London</p>
                  <p className="discount-desc">First Order Discount</p>
                </div>
                <div className="discount-per">
                  <p>-20%</p>
                </div>
                <div className="discount-add">
                  <img src={plus_icon} alt="" />
                </div>
              </div>
              <div className="discount-card">
                <img src={images.discount.vegan} alt="" className="discount-img" />
                <div className="discount-msg">
                  <p className="discount-restaurant">McDonald’s East London</p>
                  <p className="discount-desc">First Order Discount</p>
                </div>
                <div className="discount-per">
                  <p>-20%</p>
                </div>
                <div className="discount-add">
                  <img src={plus_icon} alt="" />
                </div>
              </div>
              <div className="discount-card">
                <img
                  src={images.discount.icecream}
                  alt=""
                  className="discount-img"
                />
                <div className="discount-msg">
                  <p className="discount-restaurant">McDonald’s East London</p>
                  <p className="discount-desc">First Order Discount</p>
                </div>
                <div className="discount-per">
                  <p>-20%</p>
                </div>
                <div className="discount-add">
                  <img src={plus_icon} alt="" />
                </div>
              </div>
            </div>
          )}

          <div className="product-section">
            <div className="category-section">
              <div className="section-title">
                <p>Burgers</p>
              </div>
              <div className="product-list">
                {products.burger &&
                  products.burger.map((product, index) => (
                    <div className="product-card" key={index}>
                      <div className="product-left">
                        <div className="product-desc">
                          <p className="product-name">{product.name}</p>
                          <p className="product-item">{product.description}</p>
                          <p className="product-price">{product.price}</p>
                        </div>
                      </div>
                      <div className="product-right">
                        <img src={product.image} alt="" />
                        <div className="product-add" onClick={() => addPrdouct(product)}>
                          <img src={plus_icon} alt="Add-product" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <div className="section-title">
                <p className="orange-title">Fries</p>
              </div>
              <div className="product-list">
                {products.fries &&
                  products.fries.map((product, index) => (
                    <div className="product-card" key={index}>
                      <div className="product-left">
                        <div className="product-desc">
                          <p className="product-name">{product.name}</p>
                          <p className="product-item">{product.description}</p>
                          <p className="product-price">{product.price}</p>
                        </div>
                      </div>
                      <div className="product-right">
                        <img src={product.image} alt="" />
                        <div className="product-add" onClick={() => addPrdouct(product)}>
                          <img src={plus_icon} alt="Add-product" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="category-section">
              <div className="section-title">
                <p className="orange-title">Cold Drinks</p>
              </div>
              <div className="product-list">
                {products.drinks &&
                  products.drinks.map((product, index) => (
                    <div className="product-card" key={index}>
                      <div className="product-left">
                        <div className="product-desc">
                          <p className="product-name">{product.name}</p>
                          <p className="product-item">{product.description}</p>
                          <p className="product-price">{product.price}</p>
                        </div>
                      </div>
                      <div className="product-right">
                        <img src={product.image} alt="" />
                        <div className="product-add" onClick={() => addPrdouct(product)}>
                          <img src={plus_icon} alt="Add-product" />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (<div className="modal">
          <div className="copy-link">
            
              <LuShare2 className="copy-icon"/>
            
            <p className="copy-title">Share this cart with your friends</p>
            <button className="copy-btn">Copy Link</button>
          </div>
          <div className="my-basket">
            <div className="basket-header">
              <img src={shopping_cart} alt="" />
              <p>My Basket</p>
            </div>
            {/* map here */}
            {cart && cart.map((product, index) => {
              return (
                <div className="basket-product" key={index}>
                  <div className="no-products">
                    <p>{product.quantity}x</p>
                  </div>
                  <div className="product-detail">
                    <p>{product.price}</p>
                    <span>{product.name}</span>
                  </div>
                  <div className="delete-product" onClick={() => removeProduct(product)}>
                      <img src={remove_icon} alt="" />
                  </div>
                </div>
              );
            })}
            
            <div className="sale-price">
              <div className="sub-total">
                <p>Sub Total:</p>
                <span>₹{calculateTotalPrice()}</span>
              </div>
              <div className="sub-total">
                <p>Discounts:</p>
                <span>-₹3.00</span>
              </div>
              <div className="sub-total">
                <p>Delivery Fee:</p>
                <span>₹3.00</span>
              </div>
            </div>
            <div className="bill-info">
              <div className="total-pay">
                <p>Total to pay</p>
                <span>₹{calculateTotalPrice()}</span>
              </div>
              <div className="free-item">
                <p>Choose your free item..</p>  
                <img src={forward_icon3} alt="" />
              </div>
              <div className="coupon-code">
                <p>Apply Coupon Code here</p>
                <img src={forward_icon2} alt="" />
              </div>
            </div>
            <div className="checkout-section">
              <div className="delivery-time">
                <img src={scooter_icon} alt="" />
                <p>Delivery</p>
                <span>Starts at 17:50</span>
              </div>
              <div className="straight-line"><hr /></div>
              <div className="collection-time">
                <img src={store_icon} alt="" />
                <p>Collection</p>
                <span>Starts at 16:50</span>
              </div>
            </div>
            {cart && (<button className="checkout-btn" onClick={handleCheckOut}>
              <img src={forward_button} alt="" />
              <p>Checkout!</p>
            </button>
            )}
          </div>
        </div>)}
      </div>
      <div className="operational-info">
        <div className="info-del">
          <div className="delivery-header">
            <img src={tracking1_icon} alt="" />
            <p>Delivery information</p>
          </div>
          <div className="day-info">
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Monday:</span>12:00 AM–3:00 AM, 8:00 AM–3:00 AM
            </p>
            <p>
              <span>Estimated time until delivery:</span> 20 min
            </p>
          </div>
        </div>
        <div className="contact-container">
          <div className="contact-header">
            <img src={id_verified} alt="" />
            <p>Contact Information</p>
          </div>
          <p className="contact-text">
            If you have allergies or other dietary restrictions, please contact
            the restaurant. The restaurant will provide food-specific
            information upon request.
          </p>
          <div className="phone-no">
            <p>Phone number</p>
            <span>+934443-43</span>
          </div>
          <div className="website">
            <p>Website</p>
            <span>http://mcdonalds.uk/</span>
          </div>
        </div>
        <div className="operation-bg">
          <div className="operation-container">
            <div className="operation-header">
              <img src={clock1_icon} alt="" />
              <p className="header-text">Operational Times</p>
            </div>
            <div className="operation-info">
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
              <p>
                <span>Monday:</span> 8:00 AM–3:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-map">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%", borderRadius: "25px" }}
          className=""
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon} className="shop-marker">
            <Popup>McDonald’s South London</Popup>
          </Marker>
        </MapContainer>
        <div className="map-info">
          <div className="map-info-small">
            <div className="map-company">
              <p className="map-title">McDonald’s</p>
              <p className="map-location">South London</p>
            </div>
            <div className="map-desc">
              <p>Tooley St, London Bridge, London SE1 2TF, United Kingdom</p>
            </div>
            <div className="map-number">
              <p>Phone number</p>
              <span>+934443-43</span>
            </div>
            <div className="map-website">
              <p>Website</p>
              <span>http://mcdonalds.uk/</span>
            </div>
          </div>
        </div>
      </div>
      <div className="customer-review">
        
      </div>
      <PopularRestaurants/>      
      <Footer />
    </>
  );
}


