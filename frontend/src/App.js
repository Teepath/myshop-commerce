import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

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
          <Route exact path=":id" element={<ProductScreen />} />
          <Route exact path=":id/cart" element={<CartScreen />} />

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
