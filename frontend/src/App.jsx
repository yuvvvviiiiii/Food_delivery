
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Register, Login, Home, ProductPage, CheckoutPage, UserAddress, PaymentPage, OrderSuccessPage, ProfilePage } from './pages';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={ <Home/> } />
          <Route path='/login' element={ <Login/> }/>
          <Route path='/register' element={ <Register/> }/>
          <Route path='/checkout' element={ <CheckoutPage/> }/>
          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route path='/product-page' element={ <ProductPage/> }/>
            <Route path='/your-address' element={ <UserAddress/> }/>
            <Route path='/payment' element={ <PaymentPage/> }/>
            <Route path='/payment-successful' element={ <OrderSuccessPage/> }/>
            <Route path='/profile' element={ <ProfilePage/> }/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
