import React, { Component } from "react";
import { ProductConsumer } from "../../../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
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


class AddHire extends Component {
    state={
        value:'',
        description: '',
        orderindex:''
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


    componentDidMount(){
      // Mount edit items

    }

    pushHire = (index,value,pendingOrders) => {

      if (this.state.value !== '' && this.state.description !== ''){
        var empId = this.context.userData.filter(function(el) { return el.email === this.state.value }.bind(this))[0].id

        var d = new Date();
        var hire=fire.getFire()
        .database()
        .ref("hire")
        .push();
        
        hire.set(
          {
            id: hire.key,
            employerId: this.context.user.uid,
            employerEmail: this.context.user.email,
            employeeId: empId,
            state: 'REQUESTED',
            message: this.state.description,
            empEmail: this.state.value,
            orderId: pendingOrders[index].orderId.toString()
          })
          fire.getFire().database().ref("orderDetails/"+pendingOrders[index].orderId.toString())
        .update(
          {
            status: "on it's way"
          })
            // // console.log(offers)
            // // console.log(this)
          this.setState({
            value:'',
            description:'',
        })
        window.location.reload();
      }
       else {
        alert('Fill the fields')
      }

  }
      // console.log(this.context.userData.filter(function(el) { return el.email === this.state.value }.bind(this))[0].id)

    handleRadioChange = (event) => {
      this.setState({orderindex: event.target.value});
    };

    render() {
    return (
      <ProductConsumer>
        {value => {
          var pendingOrders=value.buyerOrders.filter(function (order) {
            return order.status === "pending";
          })
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
                <Title title="Send Hire Request" />
                  {/*<img style={{width:'50%', marginBottom:'2%'}} src={value.detailProduct.image} />*/}
                  <br/>
                  <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>

              {value.riders.map((riderdetail) => {
                // const labelId = `checkbox-list-secondary-label-${offer}`;
                // const fetchedProduct = this.extractProduct(value.products, offer.productId)
                // console.log("fetched ", fetchedProduct)
                // const fetchedProduct = 
                return (
                  <div>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" //src={fetchedProduct.image} 
                        />
                    </ListItemAvatar>
                    <ListItemText
                      primary={riderdetail.email}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                          >
                            {"Active"}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </div>
              );
              })}

              </List>
            }}
            </ProductConsumer>
                  <br/>
                  <TextField
                      style={{width:'100%'}}
                      id="standard-name"
                      label="E-mail"
                      // multiline
                      rowsMax="4"
                      value={this.state.value}
                        onChange={this.handleChange}
                      
                  />

                <Divider style={{marginTop:'5%', marginBottom:'5%'}}/>
                <p>Message</p>
                <TextField
                    style={{width:'100%'}}
                    id="standard-name"
                    label="Type here..."
                    multiline
                    rowsMax="4"
                    value={this.state.description}
                      onChange={this.handleChangeD}
                />
                 
                <List style={{width:'100%'}}>
                <FormControl component="fieldset" onChange={this.handleRadioChange}>
<RadioGroup row aria-label="position" name="position" defaultValue="top">
          {pendingOrders.map((details,index) => {
            let display= new Date();
            display.setTime(details.createdAt * 1000)
            let date=display.toString();
            let color=details.status==="pending"?'red':'green'
            // const labelId = `checkbox-list-secondary-label-${offer}`;
            // const fetchedProduct = this.extractProduct(value.products, offer.productId)
            // console.log("fetched ", fetchedProduct)
            // const fetchedProduct = 
            return (
              <div>
                
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" //src={fetchedProduct.image} 
                    />
                </ListItemAvatar>
              
                <ListItemText
                  disableTypography
            primary={<Typography type="body2" style={{ color: color }}>{details.status}</Typography>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {date}
                      </Typography>
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        // className={classes.inline}
                        color="textPrimary"
                      >
                        {"Address: "+details.address}
                      </Typography>
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        // className={classes.inline}
                        color="textPrimary"
                      >
                        {"Bill: Rs. "+details.totalBill+"/-"}
                      </Typography>
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        // className={classes.inline}
                        color="textPrimary"
                      >
                        {"Ordered by: "+value.extractData(details.buyerId)}
                      </Typography>
                    </React.Fragment>
                  }
                />
                        <FormControlLabel
                        value={index.toString()}
                        control={<Radio color="primary" />}
                        labelPlacement="bottom"
                        />
                    
                   
              </ListItem>
    <Divider variant="inset" component="li" />
    </div>
);
})}</RadioGroup>
</FormControl>
        </List> 
                </div>
                
              </div>
              <div className="row">
                <div className="mx-auto ">
                <div>
                            {/* goBack via history */}
                  <Link to="/hire">
                    <ButtonContainer 
                      onClick={() => {
                        // // console.log(value.productReviews)
                      }}
                    >Discard</ButtonContainer>
                  </Link>
                  <ButtonContainer 
                    onClick={() => {
                      this.pushHire(this.state.orderindex,value,pendingOrders)
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

AddHire.contextType = ProductConsumer

export default AddHire;

// <div className="row">
// </div>
//         <p>sdjgsdughoehgroelofiwrtfwrfpwofhwehfoiwhoifhweohfowhfoiwehfowehofwheifhwifhwoehfwih</p>
