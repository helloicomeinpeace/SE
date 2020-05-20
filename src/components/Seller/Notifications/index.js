import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";
import Collapsible from 'react-collapsible';
import { Link } from "react-router-dom";

import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
// import List from '@material-ui/core/List';
// // import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

// import ReviewDetails from './ReviewDetails';
import DeleteIcon from '@material-ui/icons/Delete';



import fire from '../../fire';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));



class Notifications extends Component {

  extractProduct(products, pid){
    var newArray = products.filter(function (el) {
      // console.log(el)
      return el.id === pid
    });

    return newArray[0];
  } 

  state = {
    value:2,
    open: false,
    currOff: '',
    currHir: '',
    dMessage: '',
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleClickOpenOX = (obj) => {
    // console.log('rev.id')
    this.setState({currOff: obj.id})
    this.setState({dMessage: 'Are you sure you want to reject this offer?'});
    this.setState({open: true});
  }
  handleClickOpenOC = (obj) => {
    // console.log('rev')
    this.setState({currOff: obj.id})
    this.setState({dMessage: 'Are you sure you want to accept this offer?'});
    this.setState({open: true});
  }

  handleClickOpenHX = (obj) => {
    // console.log(rev.id)
    // this.setState({currRev: rev.id})
    this.setState({currHir: obj.id})
    this.setState({dMessage: 'Are you sure you want to reject this job?'});
    this.setState({open: true});
  }
  handleClickOpenHC = (obj) => {console.log("message",obj)
    // console.log(rev.id)
    // this.setState({currRev: rev.id})
    this.setState({currHir: obj.id})
    this.setState({dMessage: 'Are you sure you want to accept this job?'});
    this.setState({open: true});
  }

  confirmAction = () => {
    if (this.state.dMessage === 'Are you sure you want to reject this offer?'){
      console.log('rejected')
      fire.getFire()
        .database()
        .ref(`/offers/${this.state.currOff}/status`)
        .transaction(currentLikes => {
        // if (currentLikes === null) return 1;
        return "REJECTED";
      });
    } else if (this.state.dMessage === 'Are you sure you want to accept this offer?'){
      console.log('accepted')
      fire.getFire()
        .database()
        .ref(`/offers/${this.state.currOff}/status`)
        .transaction(currentLikes => {
        // if (currentLikes === null) return 1;
        return "ACCEPTED";
      });
    } else if (this.state.dMessage === 'Are you sure you want to reject this job?'){
      fire.getFire()
        .database()
        .ref(`/hire/${this.state.currHir}/state`)
        .transaction(currentLikes => {
        // if (currentLikes === null) return 1;
        return "REJECTED";
      });
    } else if (this.state.dMessage === 'Are you sure you want to accept this job?'){
      fire.getFire()
        .database()
        .ref(`/hire/${this.state.currHir}/state`)
        .transaction(currentLikes => {
        // if (currentLikes === null) return 1;
        return "ACCEPTED";
      });
    }

    this.handleClose();
  }

  handleToggle = () => {
    // setOpen(!open);
    this.setState({open: !this.state.open});
  }

  getOrderDetails=(key,value)=>
  {   
    let orderDetails=[[],[]];
    for (var j = 0; j < value.buyerOrders.length; j++) {
      //this.printValues(value.orderDetails[i].toJSON());
            // use array[i] here
            if(key===value.buyerOrders[j].orderId)
            {
             orderDetails[0].push(value.buyerOrders[j])
            }
          }
    for (var i = 0; i < value.orderDetails.length; i++) {
      //this.printValues(value.orderDetails[i].toJSON());
            // use array[i] here
            if(key===value.orderDetails[i].key)
            {
              var obj=value.orderDetails[i].toJSON();
              console.log("heyy: ",key);
              for(var k in obj)
              {
                orderDetails[1].push(obj[k]);
              }
              //  console.log(value.orderDetails[i].toJSON())
              return orderDetails;
            }
          }
  }
  render() {
    // const classes = useStyles();

    // const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    // const handleClose = () => {
    //   setOpen(false);
    // };
    // const handleToggle = () => {
    //   setOpen(!open);
    // };

    const MyBackDrop = <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>

              </Dialog>

    return (
      <Fragment>
      
        <div className="py-5">
          <div className="container">
            <Title title="Notifications" />
            <div className="row">
            
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.state.dMessage}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.confirmAction} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            {/* <Title title="Offers" />
            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>    
              {value.offerNotifs.map((offer) => {
                return (
                  <div>
                  <ListItem 
                        alignItems="flex-start">
                    <ListItemText
                      primary={offer.productName}
                      secondary={
                        <React.Fragment>
                          {offer.price}
                            
                          {"Rs. — "} {offer.status}
                        </React.Fragment>
                      }
                    />
                    
                    <ListItemSecondaryAction>
                    {offer.status === 'PENDING' ?
                    (<div><IconButton edge="end" aria-label="delete">
                      <CloseIcon style={{ color: 'red' }}
                            onClick={() => {
                              this.handleClickOpenOX(offer)
                            }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <CheckIcon style={{ color: 'green' }} 
                            onClick={() => {
                              this.handleClickOpenOC(offer)
                            }}/>
                    </IconButton></div>) : (null)}
                  </ListItemSecondaryAction> 
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </div>
              );
              })}

              
                
            
              </List>
            }}
            </ProductConsumer> */}


            <Title title="Jobs" />
            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
                  
              {value.hireNotifs.map((hire, index) => {
              
                let orderDetails=this.getOrderDetails(hire.orderId,value);
                let display= new Date();
                display.setTime(orderDetails[0][0].createdAt * 1000)
                let date=display.toString();
                //console.log(orderDetails[0][0].totalBill)
                return (
                  <div>
                  <ListItem 
                        alignItems="flex-start">
                    <ListItemText
                      primary={hire.empEmail}
                      
                      secondary={
                        <React.Fragment>
                          <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {"Total Bill: "+orderDetails[0][0].totalBill}
                      </Typography><br/>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {date}
                      </Typography><br/>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {"Address: "+orderDetails[0][0].address}
                      </Typography><br/>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {"Contact Number: "+orderDetails[0][0].contactNumber}
                      </Typography>
                      <br/>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'gray' }}
                        // className={classes.inline}
                      >
                        {hire.message}
                          {" — "} {hire.state}
                      </Typography>
                      <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'blue' }}
                        // className={classes.inline}
                      >
                        <Collapsible trigger="Click to view details" 
                        triggerWhenOpen="Click to hide details" 
                        transitionTime="200">
                        <Typography
                        component="span"
                        variant="body2"
                        style={{ color: 'black' }}
                        // className={classes.inline}
                      >
                          {orderDetails[1].map((details) => {
                            let product=value.getProduct(details["product"]);
                          return (
                            <div>
                            <ListItem 
                                  alignItems="flex-start">
                              <ListItemText
                                primary={product.name}
                                
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                  component="span"
                                  variant="body2"
                                  style={{ color: 'gray' }}
                                  // className={classes.inline}
                                >
                                  {product.price}
                                </Typography>
                                </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </div>
                        );
                            })}
                              </Typography>
                          </Collapsible></Typography>
                          </React.Fragment>
                          }
                    />
                    
                    <ListItemSecondaryAction>
                    {hire.state === 'REQUESTED' ?
                    (<div><IconButton edge="end" aria-label="delete">
                      <CloseIcon style={{ color: 'red' }} 
                            onClick={() => {
                              this.handleClickOpenHX(hire)
                            }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete">
                      <CheckIcon style={{ color: 'blue' }} 
                            onClick={() => {
                              this.handleClickOpenHC(hire)
                            }} />
                      {/*<DeleteIcon onClick={() => {
                        this.handleClickOpen(productReview)
                        //this.deleteProduct(value.detailProduct.id)
                      }}/>*/}
                    </IconButton></div>) : (<div><Button variant="contained" color="primary" onClick={()=>{value.completeDelivery(orderDetails[0][0].orderId)}}>
                    Complete Delivery
                   </Button></div>)}
                  </ListItemSecondaryAction> 
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </div>
              );
              })}

              
                
            
              </List>
            }}
            </ProductConsumer>

            

            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Notifications;


