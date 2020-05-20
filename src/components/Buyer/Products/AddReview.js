import React, { Component } from "react";
import { ProductConsumer } from "../../../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

class AddReview extends Component {
    state={
        value:'',
        rating:0,
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
    return (
      <ProductConsumer>
        {value => {
        // console.log(value.detailProduct)
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <img style={{width:'50%', marginBottom:'2%'}} src={value.detailProduct.image} />
                  <h1>{value.detailProduct.name}</h1>
                  <h5>{value.detailProduct.brand}</h5>
                  <h3>{value.detailProduct.price} Rs.</h3>
                  <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                  <Rating   style={{}}
                            // readOnly
                            size="large"
                            name="simple-controlled"
                            value={this.state.rating}
                            onChange={(event, newValue) => {
                              this.setState({rating: newValue});
                            }}
                          />
                    <h5>{this.state.rating} / 5</h5>
                  
                <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                <p>Your Review</p>
                <TextField
                    style={{width:'100%'}}
                    id="standard-name"
                    label="Type here..."
                    // multiline
                    rowsMax="4"
                    value={this.state.value}
                    onChange={this.handleChange}
                />
                </div>
              </div>
              <div className="row">
                <div className="mx-auto ">
                <div>
                            {/* goBack via history */}
                  <Link to="/details">
                    <ButtonContainer 
                      onClick={() => {
                        // // console.log(value.productReviews)
                      }}
                    >Discard</ButtonContainer>
                  </Link>
                  <ButtonContainer 
                    onClick={() => {
                      // console.log(value.pushProductReview([this.state.rating, this.state.value]))
                    }}
                  >Review</ButtonContainer>
                  </div>
                </div>
                </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export default AddReview;

// <div className="row">
// </div>
//         <p>sdjgsdughoehgroelofiwrtfwrfpwofhwehfoiwhoifhweohfowhfoiwehfowehofwheifhwifhwoehfwih</p>
