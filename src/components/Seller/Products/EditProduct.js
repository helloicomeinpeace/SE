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

class EditProduct extends Component {
    state={
        value:'',
        pName:'',
        bName:'',
        category: '',
        price:'',
        rating:0,
        itemImage: null,
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    };
    handleChangePN = (event) => {
      this.setState({pName: event.target.value});
    };
    handleChangeBN = (event) => {
      this.setState({bName: event.target.value});
    };
    handleChangeP = (event) => {
      this.setState({price: event.target.value});
    };
    handleChangeC = (event) => {
      this.setState({category: event.target.value});
    };

    // uploadImage(){
    //   console.log('uploadin')
    // }

    pushProduct = () => {

      // console.log(this.context.user.uid)

      // var catId = this.context.categories.filter(function(el){ return el.name === this.state.category }.bind(this))[0].id

      fire.getFire()
          .database()
          .ref("products/"+this.context.detailProduct.id)
          .set(
            {
              brand: this.state.bName,
              logo: "http://www.example.com/logo.png",
              name: this.state.pName,
              category: this.state.category,
              categoryId: this.context.detailProduct.categoryId,
              sellerId: this.context.user.uid,
              image: this.state.itemImage,
              description: this.state.value,
              price: parseInt(this.state.price),
              aggregateRating: this.state.rating,
            })

    }


    componentDidMount(){
      // Mount edit items
      console.log('product ', this.context.detailProduct.aggregateRating)
      this.setState({
          value:this.context.detailProduct.description,
          pName:this.context.detailProduct.name,
          bName:this.context.detailProduct.brand,
          category: this.context.detailProduct.category,
          price:this.context.detailProduct.price,
          rating:this.context.detailProduct.aggregateRating,
          itemImage: this.context.detailProduct.image,
      })

      
    }

    
  handleChangeUsername = event =>
  this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    console.log('filename ', filename)
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    fire.getFire()
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ itemImage: url }));
  };

    render() {
    return (
      <ProductConsumer>
        {value => {
        // console.log(value.detailProduct)
        // this.setState({pName: this.context.detailProduct.name})
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
                  <Title title="Edit Product" />  
                  {/*<img style={{width:'50%', marginBottom:'2%'}} src={value.detailProduct.image} />*/}
                  <Card style={{
                    marginBottom: '5%',
                    maxWidth: '100%',
                  }}>
              
              {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
              {this.state.avatarURL && <img src={this.state.avatarURL} />}
              <FileUploader
                accept="image/*"
                name="avatar"
                randomizeFilename
                storageRef={fire.getFire().storage().ref("images/users/")}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
              />
              <CardActionArea 
                // onClick={() => this.uploadImage}
              >
                <CardMedia
                  style={{height: 0,
                    paddingTop: '56.25%', // 16:9
                    // height: 140,
                  }}
                //   className={classes.media}
                  image={this.state.itemImage ? this.state.itemImage : uploadPlaceholder}
                  title="Contemplative Reptile"
                />
              </CardActionArea>
            
            </Card>
                  <TextField
                      style={{width:'100%', marginBottom:'2%'}}
                      id="standard-name"
                      label="Product"
                      // multiline
                      rowsMax="4"
                      value={this.state.pName}
                      onChange={this.handleChangePN}
                  />
                  <TextField
                      style={{width:'100%', marginBottom:'2%'}}
                      id="standard-name"
                      label="Brand"
                      // multiline
                      rowsMax="4"
                      value={this.state.bName}
                      onChange={this.handleChangeBN}
                  />
                  <TextField
                      style={{width:'100%', marginBottom:'2%'}}
                      id="standard-name"
                      label="Price"
                      // multiline
                      rowsMax="4"
                      value={this.state.price}
                      onChange={this.handleChangeP}
                  />
                  {/* 
                  <h1>{value.detailProduct.name}</h1>
                  <h5>{value.detailProduct.brand}</h5>
                  <h3>{value.detailProduct.price} Rs.</h3>
                  */}
                  <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                  
                  <TextField
                      style={{width:'100%'}}
                      id="standard-name"
                      label="Category"
                      // multiline
                      rowsMax="4"
                      value={this.state.category}
                      onChange={this.handleChangeC}
                  />

                <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                <p>Description</p>
                <TextField
                    style={{width:'100%'}}
                    id="standard-name"
                    label="Type here..."
                    multiline
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
                      this.pushProduct()
                      // console.log(value.pushProductReview([this.state.rating, this.state.value]))
                    }}
                  >Save</ButtonContainer>
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

EditProduct.contextType = ProductConsumer


export default EditProduct;

// <div className="row">
// </div>
//         <p>sdjgsdughoehgroelofiwrtfwrfpwofhwehfoiwhoifhweohfowhfoiwehfowehofwheifhwifhwoehfwih</p>
