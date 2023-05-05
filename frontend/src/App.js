import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import Signin  from './screens/AuthScreen';
import Checkout from './screens/Checkout';
import PasswordScreen from './screens/Password';

//components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer  from './components/SideDrawer';

function App() {
  const [sideToggle, setSideToggle] = useState(false)
  return (
    <Router>
      <Navbar click={()=>setSideToggle(true)}/>
      <SideDrawer show={ sideToggle} click={()=>setSideToggle(false)}/>
      <Backdrop show={ sideToggle} click={()=>setSideToggle(false)}/>
      <main>
        <Routes>
          <Route  index element={<HomeScreen />} />
        
          <Route  path=":id" element={<ProductScreen />} />
          <Route  path=":id/cart" element={<CartScreen />} />
          <Route  path="/checkout" element={<Checkout />} />
          <Route  path="/signin" element={<Signin/>} />
          <Route path="/password" element={<PasswordScreen/>} />
          <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
        </Routes>
      </main>
  
      </Router>
  );
}

export default App;
