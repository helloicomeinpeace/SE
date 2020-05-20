import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
//import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
// import ProductList from "./components/Buyer/ProductList";
// import Details from "./components/Details";
// import Cart from "./components/Cart";
// import Default from "./components/Default";
import Modal from "./components/Modal";

import MainDrawer from  '../src/components/Drawer';
import Notifications from "./components/Seller/Notifications/index"
import BuyerNav from './navigation/BuyerNav';
import SellerNav from './navigation/SellerNav';
import { ProductConsumer } from "./context";
import SellerDrawer from './navigation/SellerDrawer';
import BuyerDrawer from './navigation/BuyerDrawer';
import AddProduct from "./components/AddProduct"
import SignIn from "../src/components/auth/SignIn"
import SignUp from "../src/components/auth/SignUp"
import AuthNav from "./navigation/AuthNav"

// import ProtectedRoute from './Authentication/ProtectedRoute';
import Home from './components/Home';

class App extends Component {

  render() {
    // const { isAuthenticated, isVerifying } = this.props;
    // // console.log("isAuthenticated +++ " + isAuthenticated)
    return (
      
      <Fragment>
        <ProductConsumer>
          {value => {
            if(value.user!==null){
            return <Navbar />   
          }
          }}
          {/*value => {
              return value.isSeller ?  <SellerDrawer /> : <BuyerDrawer />   
          }*/}
        </ProductConsumer>
        
          <ProductConsumer>
            {value => {
              // // console.log(value.user)
              if(value.user!==null){
                // console.log('change bitch')
              return (value.isSeller ?  <SellerDrawer /> : <BuyerDrawer />)   
            }
              else{
                return (<AuthNav/>)
              }
            }}
          </ProductConsumer>
          <ProductConsumer>
            {value => 
            {
              if(value.user!=null){
              return value.isRider ? <Notifications/> : (value.isSeller ?  <SellerNav /> : <BuyerNav />) 
             }
              else{ }
            }}
          </ProductConsumer>
        <Modal />
      </Fragment>
    );
  }
}


// <MainDrawer />
// <BuyerNav />

// <Switch>
//           <Route exact path="/" component={ProductList} />
//           <Route exact path="/products" component={ProductList} />
//           <Route exact path="/categories" component={ProductList} />
//           <Route exact path="/details" component={Details} />
//           <Route exact path="/cart" component={Cart} />
//           <Route component={Default} />
//         </Switch>
        

export default App;
