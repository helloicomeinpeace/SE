import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import ProductList from "../components/Seller/Products/ProductList";
import ProductDetails from "../components/Seller/Products/ProductDetails"
import AddProduct from "../components/Seller/Products/AddProduct"
import EditProduct from "../components/Seller/Products/EditProduct"

import CategoryList from "../components/Seller/Categories/index"
import AddCategory from "../components/Seller/Categories/AddCategory";

import ReviewList from "../components/Seller/Reviews/ReviewList"
import AddReview from "../components/Seller/Reviews/AddReview"

import Statistics from "../components/Seller/Statistics"

import Credit from "../components/Seller/Credit"

import Hire from "../components/Seller/Hire/HireList"
import AddHire from "../components/Seller/Hire/AddHire"

import Default from "../components/Default";

import Home from "../components/Buyer/Home";

import Live from "../components/Seller/Live";

import ViewComplains from "../components/Seller/ViewComplains"
import ViewOrders from "../components/Seller/ViewOrders"
import Notifications from "../components/Seller/Notifications";
import  history from "./history"
import MainDrawer from  '../components/Drawer';
class SellerNav extends Component {
  render() {
    return (
      <Fragment>
        <Switch history={history}>
          
          <Route exact path="/" component={Home} />
          

          <Route exact path="/products" component={ProductList} />
          <Route exact path="/details" component={ProductDetails} />
          <Route exact path="/addproduct" component={AddProduct} />
          <Route exact path="/editproduct" component={EditProduct} />
          
          <Route exact path="/categories" component={CategoryList} />
          <Route exact path="/addcategory" component={AddCategory} />

          <Route exact path="/reviews" component={ReviewList} />
          <Route exact path="/addreview" component={AddReview} />

          <Route exact path="/statistics" component={Statistics} />
          
          <Route exact path="/credit" component={Credit} />

          <Route exact path="/hire" component={Hire} />
          <Route exact path="/addhire" component={AddHire} />

          <Route exact path="/live" component={Live} />
          
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/viewcomplains" component={ViewComplains} />
          <Route exact path="/vieworders" component={ViewOrders} />
          

          <Route component={Default} />
        </Switch>
      </Fragment>
    );
  }
}

export default SellerNav;
