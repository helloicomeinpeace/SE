import React, { Component } from "react";
import { ProductConsumer } from "../../../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';

import uploadPlaceholder from  '../../../assets/upload.png'

import FileUploader from "react-firebase-file-uploader";

import ImageUpload from '../../ImageUpload/ImageUpload'

import fire from  '../../fire';

import Title from "../../Title";

class AddCategory extends Component {
    state={
        value:'',
        description: '',
        
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    handleChangeD = (event) => {
      this.setState({description: event.target.value});
    };

    // uploadImage(){
    //   console.log('uploadin')
    // }

    pushCategory = () => {
      if (this.state.value !== '' && this.state.description !== ''){
        fire.getFire()
          .database()
          .ref("categories")
          .push()
          .set(
            {
              userId: this.context.user.uid,
              userEmail: this.context.user.email,
              name: this.state.value,
              description: this.state.description,
            })
      }

      this.setState({value: '', description: ''})
    }

    componentDidMount(){
      // Mount edit items

    }

    render() {
    return (
      <ProductConsumer>
        {value => {
        // console.log(value.detailProduct)
          // const {
          //   id,
          //   company,
          //   img,
          //   info,
          //   price,
          //   title,
          //   inCart
          // } = value.detailProduct;
          return (
            <div className="container py-5">
                
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                <Title title="Add Category" />  
                  {/*<img style={{width:'50%', marginBottom:'2%'}} src={value.detailProduct.image} />*/}
                  
                  

                  
                  <TextField
                      style={{width:'100%'}}
                      id="standard-name"
                      label="Category"
                      // multiline
                      rowsMax="4"
                      value={this.state.value}
                        onChange={this.handleChange}
                      
                  />

                <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                <p>Description</p>
                <TextField
                    style={{width:'100%'}}
                    id="standard-name"
                    label="Type here..."
                    multiline
                    rowsMax="4"
                    value={this.state.description}
                      onChange={this.handleChangeD}
                />
                </div>
              </div>
              <div className="row">
                <div className="mx-auto ">
                <div>
                            {/* goBack via history */}
                  <Link to="/categories">
                    <ButtonContainer 
                      onClick={() => {
                        // // console.log(value.productReviews)
                      }}
                    >Discard</ButtonContainer>
                  </Link>
                  <ButtonContainer 
                    onClick={() => {
                      this.pushCategory()
                      // console.log(value.pushProductReview([this.state.rating, this.state.value]))
                    }}
                  >Add</ButtonContainer>
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

AddCategory.contextType = ProductConsumer

export default AddCategory;

// <div className="row">
// </div>
//         <p>sdjgsdughoehgroelofiwrtfwrfpwofhwehfoiwhoifhweohfowhfoiwehfowehofwheifhwifhwoehfwih</p>
