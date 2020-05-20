import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";

import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";

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

import ReviewDetails from './ReviewDetails';
import DeleteIcon from '@material-ui/icons/Delete';

import fire from '../../fire';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class ReviewList extends Component {

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
    currRev: '',
  }

  handleClose = () => {
    this.setState({open: false});
  }

  handleClickOpen = (rev) => {
    // console.log(rev.id)
    this.setState({currRev: rev.id})
    this.setState({open: true});
  }

  deleteReview = () => {
    if (this.state.currRev !== ''){
      console.log('deletion', 'reviews/'+this.state.currRev)
    fire.getFire()
      .database()
      .ref('reviews/'+this.state.currRev)
      .remove(() => {
          console.log('Operation Complete');
      });
    }
    
    this.handleClose();
  }

  handleToggle = () => {
    // setOpen(!open);
    this.setState({open: !this.state.open});
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
            <Title title="Your Reviews" />
            <Link to="/addreview">
                <ButtonContainer style={{marginTop:'1%'}} >Add Review</ButtonContainer>
            </Link>
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
                  This action will delete the review permenantly.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.deleteReview} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              <ReviewDetails review={value.reviewDetail} />  
                  
              {value.reviews.map((productReview) => {
                const labelId = `checkbox-list-secondary-label-${productReview}`;
                const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div>
                  {/*MyBackDrop*/}
                  <ListItem onClick={() => value.handleRDetailToggle(productReview)}  alignItems="flex-start">
                    {/*
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={fetchedProduct.img} />
                    </ListItemAvatar>
                    */}
                    <ListItemText
                      primary={productReview.buyerEmail}
                      secondary={
                        <React.Fragment>
                          {/*<Typography
                            component="span"
                            variant="body2"
                            // className={classes.inline}
                            color="textPrimary"
                          >
                            Ali Connors
                          </Typography>*/}
                          <Rating
                            readOnly
                            size="small"
                            name="simple-controlled"
                            value={productReview.rating}
                            // onChange={(event, newValue) => {
                            //   this.setState(newValue);
                            // }}
                          />
                          {" — "} {productReview.review}
                        </React.Fragment>
                      }
                    />
                    
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => {
                        this.handleClickOpen(productReview)
                        //this.deleteProduct(value.detailProduct.id)
                      }}/>
                    </IconButton>
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
export default ReviewList;


