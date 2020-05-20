import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";

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
  }
  handleClose = () => {
    this.setState({open: false});
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
            
            <div className="row">
            

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              <ReviewDetails review={value.reviewDetail} />  
                  
              {value.productReviews.map((productReview) => {
                const labelId = `checkbox-list-secondary-label-${productReview}`;
                const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div>
                  {/*MyBackDrop*/}
                  <ListItem onClick={() => value.handleRDetailToggle(productReview)}  alignItems="flex-start">
                    {
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={fetchedProduct.img} />
                    </ListItemAvatar>
                    }
                    <ListItemText
                      primary={fetchedProduct.name}
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


