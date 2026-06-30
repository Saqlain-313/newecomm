import { Routes, Route } from 'react-router-dom'
import Home from './Page/Home'
import Register from './Page/Register'
import Navbar from './component/Navbar'
import Footer from './component/Footer'
import Login from './Page/Login'
import About from './Page/About'
import Carrer from './Page/Carrer'
import PrivacyPolicy from './Page/PrivacyPolicy'
import ProductDetails from './Page/ProductDetails'
import Cart from './Page/Cart'
import Wishlist from './Page/WishList'
import Profile from './Page/Profile'
import { getProfile } from './redux/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import PrivateRoute from './component/PrivateRoute'
import ProfileLayout from './layout/ProfileLayout'
import Address from './Page/Address'
import Orders from './Page/Orders'
import EditProfile from './Page/EditProfile'
import Return from './Page/Return'
import TermOffUse from './Page/TermOffUse'
import Security from './Page/Security'
import Shipping from './Page/ShippingAndReturn'
import ShippingAndReturn from './Page/ShippingAndReturn'
import FAQ from './Page/FAQ'
import SubCategoryProduct from './Page/SubCategoryProduct'
import { getAllProduct } from './redux/productSlice'
import Payment from './Page/Payment'
import Contact from './Page/Contact'
import AllProduct from './Page/AllProduct'
import Checkout from './Page/Checkout'
import OrderSuccess from './Page/OrderSuccess'
import GiftCards from './Page/GiftCards'
import Brands from './Page/Brands'
import Press from './Page/Press'





function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/carrer' element={<Carrer />} />
        <Route path='/privacypolicy' element={<PrivacyPolicy />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/wishlist' element={<PrivateRoute><Wishlist /></PrivateRoute>} />
        <Route path='/return' element={<Return />} />
        <Route path='/termoffuse' element={<TermOffUse />} />
        <Route path='/security' element={<Security />} />
        <Route path='/shipping' element={<ShippingAndReturn />} />
        <Route path='/giftcards' element={<GiftCards />} />
        <Route path='/brands' element={<Brands />} />
        <Route path='/press' element={<Press />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/payment' element={<Payment />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/allproduct' element={<AllProduct />} />
        <Route path='/products/subcategory/:id' element={<SubCategoryProduct />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/ordersuccess/:id' element={<OrderSuccess />} />

        <Route
          path="/profilelayout"
          element={
            <PrivateRoute>
              <ProfileLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Profile />} />
          <Route path="address" element={<Address />} />
          <Route path="orders" element={<Orders />} />
          <Route path="editprofile" element={<EditProfile />} />
        </Route>

      </Routes>
      <Footer />
    </>
  )
}

export default App
