import React, { Component } from "react";
import { ProductConsumer } from "../../../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Title from "../../Title";

import fire from '../../fire'

class AddReview extends Component {
    state={
        value:'',
        rating:0,
        bEmail: '',
        pId:''
    }

    pushReview = () => {

      // console.log(this.context.userData.filter(function(el) { return el.email === this.state.bEmail })[0].id)

      if (this.state.value !== '' && this.state.bEmail !== '' && this.state.pId !== ''){
        console.log('review pushed')

        var buyerId = this.context.userData.filter(function(el) { return el.email === this.state.bEmail }.bind(this))[0].id

        var d = new Date();
        fire.getFire()
        .database()
        .ref("reviews")
        .push()
        .set(
          {
            createdAt: Math.round(d.getTime() / 1000),
            buyerId: buyerId,
            buyerEmail: this.state.bEmail,
            productId: this.state.pId,
            rating: this.state.rating,
            review: this.state.value,
            sellerId: this.context.user.uid 
           })

          this.setState({
            value:'',
            rating:0,
            bEmail: '',
            pId:'',
        })

      } else {
        alert('Fill the fields')
      }
      
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };

    handleChangePN = (event) => {
      this.setState({bEmail: event.target.value});
    };
    handleChangeBN = (event) => {
      this.setState({pId: event.target.value});
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
                <Title title="Add Review" />

                <TextField
                    style={{width:'100%', marginBottom:'2%'}}
                    id="standard-name"
                    label="Buyer E-mail"
                    // multiline
                    rowsMax="4"
                    value={this.state.bEmail}
                    onChange={this.handleChangePN}
                />
                <TextField
                    style={{width:'100%', marginBottom:'2%'}}
                    id="standard-name"
                    label="Product ID"
                    // multiline
                    rowsMax="4"
                    value={this.state.pId}
                    onChange={this.handleChangeBN}
                />
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
                  <Link to="/reviews">
                    <ButtonContainer 
                      onClick={() => {
                        // // console.log(value.productReviews)
                      }}
                    >Discard</ButtonContainer>
                  </Link>
                  <ButtonContainer 
                    onClick={() => {
                      this.pushReview()
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

AddReview.contextType = ProductConsumer

export default AddReview;

// <div className="row">
// </div>
//         <p>sdjgsdughoehgroelofiwrtfwrfpwofhwehfoiwhoifhweohfowhfoiwehfowehofwheifhwifhwoehfwih</p>
