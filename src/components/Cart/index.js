import React, { Component } from "react";
import {TextField } from '@material-ui/core';
import Title from "../Title";
import CartColumns from "./CartColumns";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import { ProductConsumer } from "../../context";
import CartTotals from "./CartTotals";
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
class Cart extends Component {
  state={
    address:'',
    cnumber:''
  }
  handleChange = (event) => {
    this.setState({address: event.target.value});
  }
  handleCnumberChange = (value) => {
    this.setState({cnumber: value});
  }
  render() {
    return (
      <section>
        <br/><br/><br/><br/><br/><br/>
        
        <ProductConsumer>
          {value => {
            const { cart } = value;
            if (cart.length > 0) {
              return (
                
                <React.Fragment>
                  <TextField
                      style={{width:'100%'}}
                      id="standard-name"
                      label="address"
                      // multiline
                      rowsMax="4"
                      value={this.state.address}
                        onChange={this.handleChange}
                      
                  />
                  <br/><br/><br/><br/><br/><br/>
                  <PhoneInput
                  country="Pakistan"
                  placeholder="Enter phone number"
                  value={this.state.cnumber}
                  onChange={this.handleCnumberChange}/>
                  <br/><br/><br/><br/><br/><br/>
                  <Title title=" Your cart" />
                  <CartColumns />
                  <CartList value={value} />
                  <CartTotals value={value} address={this.state.address} cnumber={this.state.cnumber}/>
                </React.Fragment>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductConsumer>
      </section>
    );
  }
}
export default Cart;
