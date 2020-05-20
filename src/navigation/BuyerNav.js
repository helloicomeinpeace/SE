import { Switch, Route } from "react-router-dom";
import React, { Component, Fragment } from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import ProductList from "../components/Buyer/Products/ProductList";
import Details from "../components/Details";
import Cart from "../components/Cart";
import Default from "../components/Default";
import Modal from "../components/Modal";
import OffersList from "../components/Buyer/Offers/OffersList";
import ReviewList from "../components/Buyer/Reviews/ReviewList";
import LiveList from "../components/Buyer/Live/LiveList";
import Statistics from "../components/Buyer/Statistics";
import Complaints from "../components/Buyer/Complaints"
import ProductDetails from "../components/Buyer/Products/ProductDetails";
import AddReview from "../components/Buyer/Products/AddReview";
import SendOffer from "../components/Buyer/Products/SendOffer";

import MainDrawer from  '../components/Drawer';

// import ProtectedRoute from '../Authentication/ProtectedRoute';
import Home from '../components/Buyer/Home';
// import Login from '../components/Login';

class BuyerNav extends Component {
  render() {
    const { isAuthenticated, isVerifying } = this.props;
    // console.log("isAuthenticated oneda "+this.props.children)
    return (
      <Fragment>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={ProductList} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/offers" component={OffersList} />
            <Route exact path="/reviews" component={ReviewList} />
            <Route exact path="/live" component={LiveList} />
            <Route exact path="/statistics" component={Statistics} />
            <Route exact path="/complains" component={Complaints} />
            
            <Route exact path="/details" component={ProductDetails} />
            <Route exact path="/addreview" component={AddReview} />
            <Route exact path="/sendoffer" component={SendOffer} />
            

            <Route component={Default} />
        </Switch>
      </Fragment>
    );
  }
}

export default BuyerNav;
