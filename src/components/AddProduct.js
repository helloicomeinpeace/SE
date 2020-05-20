import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import ImageUpload from "./ImageUpload/ImageUpload";
import fire from './fire'
import {useState} from 'react'

class AddProduct extends React.Component {
constructor(props){
  super(props);
  this.getImageFile= this.getImageFile.bind(this);
  this.Submit= this.Submit.bind(this);
 }
 state={
  name:'',
  description:'',
  price:'',
  category:'',
  img:"",
  reset:'',
  brand:'',
  file:'',
  aggregateRating:{
    ratingValue:0,
    reviewCount:0,
    type:"aggregateRating"
    }
}
 Add = () => {
  var fb=fire.getFire();
  fb.database().ref().child('products').push({
    name: this.state.name,
    description: this.state.description,
    image: this.state.img,
    price: this.state.price,
    category: this.state.category,
    brand: this.state.brand,
    aggregateRating:this.state.aggregateRating
  });
  var resetstate=this.state.reset;
  resetstate();
  this.setState({
    name:'',
    description:'',
    price:'',
    category:'',
    img:"",
    file:'',
    brand:''
});
  };
 
  getImageFile =(imgfile,func)=>
  {
    this.setState({file:imgfile} , () => {
      // console.log(this.state.file.name)
      this.setState({
        reset:func
      })
  })
  }
  // setUrl(url)
  // {
  //   this.setState({
  //     img: url
  //   })
  // }
  // getFileName()
  // {
  //   while(true)
  //   {
  //     if(this.state.file.name!==undefined)
  //     {
  //       return this.state.file.name
  //     }
  //   }
  // }
  Submit=()=>{
   
   
   const uploadTask = fire.getFire().storage().ref(`/images/products/${this.state.file.name}`).put(this.state.file);
   // console.log(this.state.file.name)
   var name=this.state.file.name
   uploadTask.on('state_changed', 
    (snapShot) => {
      //takes a snap shot of the process as it is happening
      // console.log(snapShot)
    }, (err) => {
      //catches the errors
      // console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      fire.getFire().storage().ref().child('images/products/'+name).getDownloadURL()
       .then(fireBaseUrl => {
         this.setState({
           img:fireBaseUrl
         },()=>{
           this.Add()
         })
       })
    })

  }
render() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:100}}>
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Name"
             floatingLabelText="Name"
             value={this.state.name}
             onChange = {(event,newValue) => this.setState({name:newValue})}
             />
           <br/>
             <TextField
               hintText="Description"
               floatingLabelText="Description"
               value={this.state.description}
               onChange = {(event,newValue) => this.setState({description:newValue})}
               />
            <br/>
             <TextField
               hintText="Price"
               floatingLabelText="Price"
               value={this.state.price}
               onChange = {(event,newValue) => this.setState({price:newValue})}
               />
               <br/>
             <TextField
               hintText="category"
               floatingLabelText="category"
               value={this.state.category}
               onChange = {(event,newValue) => this.setState({category:newValue})}
               />
               <br/>
             <TextField
               hintText="brand"
               floatingLabelText="brand"
               value={this.state.brand}
               onChange = {(event,newValue) => this.setState({brand:newValue})}
               />
            <br/>
            <div>
            <ImageUpload cardName="Input Image" sendImageFile={this.getImageFile}/>
            </div>
            <br></br>
            <Button variant="contained" color="primary" onClick={()=>{this.Submit()}}>
             ADD
            </Button>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default AddProduct;