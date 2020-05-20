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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import DeleteIcon from '@material-ui/icons/Delete';
import { ButtonContainer } from "../../Button";
import { Link } from "react-router-dom";
// import ReviewDetails from './ReviewDetails';

import fire from  '../../fire';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class CategoryList extends Component {

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
    currCat: null
  }


  deleteCategory = () => {
    console.log('deletion', 'categories/'+this.state.currCat)
    // fire.getFire()
    //   .database()
    //   .ref('categories/'+this.currCat)
    //   .remove(() => {
    //       console.log('Operation Complete');
    //   });
    // this.handleClose();
  }

  handleClickOpen = (cat) => {
    console.log(cat.id)
    this.setState({currCat: cat.id})
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
    // setOpen(false);
  };

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
            <Title title="Your Categories" />
            <Link to="/addcategory">
                <ButtonContainer style={{marginTop:'1%'}} >Add Category</ButtonContainer>
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
                This action will delete the product permenantly.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteCategory} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>
              {/*<ReviewDetails review={value.reviewDetail} />*/}  
                  
              {value.categories.map((category) => {
                // const labelId = `checkbox-list-secondary-label-${productReview}`;
                // const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                // console.log(productReview.review)
                return (
                  <div>
                  {/*MyBackDrop*/}
                  <ListItem //onClick={() => value.handleRDetailToggle(productReview)}
                   alignItems="flex-start">
                    <ListItemText
                      primary={category.name}
                      secondary={
                        <React.Fragment>
                         {category.description}
                        </React.Fragment>
                      }
                    />
                    <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon onClick={() => {
                        this.handleClickOpen(category)
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
export default CategoryList;


