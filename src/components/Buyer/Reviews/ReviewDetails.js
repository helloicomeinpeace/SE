import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

import Rating from '@material-ui/lab/Rating';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class ReviewDetails extends Component {

    
  extractProduct(products, pid){
    var newArray = products.filter(function (el) {
      // // console.log(el)
      return el.id === pid
    });

    return newArray[0];
  } 

  state = {
    value:2,
    open: false,
    review:null,
  }
  handleClose = () => {
    this.setState({open: false});
  }

  handleToggle = () => {
    // setOpen(!open);
    this.setState({open: !this.state.open});
  }

  componentDidMount() {
    this.setState({review: this.props.review})
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

    // const MyBackDrop = <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
    //             <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                
    //           </Dialog>

    // console.log(this.props.review)

    // position: 'absolute', 

    return (
      <Fragment>
        <ProductConsumer>
            {value => {
                return <Dialog style={{
                                    // width:'40%'                
                                }}
                    onClose={value.handleRDetailClose} aria-labelledby="simple-dialog-title" open={value.isRDetailsPopUp}>
                    <DialogTitle id="simple-dialog-title">Review Details</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.review.productName}
                        </DialogContentText>
                        <Divider style={{marginBottom:'5%'}}/>
                        <Rating
                            readOnly
                            fullWidth={true}
                            maxWidth={'xs'}
                            size="small"
                            name="simple-controlled"
                            // value={this.props.review.rating}
                            value={this.props.review.rating}
                            // onChange={(event, newValue) => {
                            //   this.setState(newValue);
                            // }}
                          />
                        <DialogContentText style={{}} id="alert-dialog-description">
                        {this.props.review.rating}/5
                        </DialogContentText>
                        
                        <Divider style={{marginBottom:'5%'}}/>
                        <DialogContentText style={{fontWeight:'bold'}} id="alert-dialog-description">
                          Review:
                        </DialogContentText>
                        <DialogContentText id="alert-dialog-description">
                            {this.props.review.review}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            }}
        </ProductConsumer>
      
      </Fragment>
    );
  }
}

// onClose={value.handleRDetailClose()}

// <ProductConsumer>
//             {value => {
//               return <List style={{width:'100%'}}>

//               {value.productReviews.map((productReview) => {
//                 const labelId = `checkbox-list-secondary-label-${productReview}`;
//                 const fetchedProduct = this.extractProduct(value.products, productReview.productId)
//                 // console.log(productReview.review)
//                 return (
//                   <div>
//                   {/*MyBackDrop*/}
//                   <ReviewDetails />  
//                   <ListItem onClick={this.handleToggle} alignItems="flex-start">
//                     {
//                     <ListItemAvatar>
//                       <Avatar alt="Remy Sharp" src={fetchedProduct.img} />
//                     </ListItemAvatar>
//                     }
//                     <ListItemText
//                       primary={fetchedProduct.name}
//                       secondary={
//                         <React.Fragment>
//                           {/*<Typography
//                             component="span"
//                             variant="body2"
//                             // className={classes.inline}
//                             color="textPrimary"
//                           >
//                             Ali Connors
//                           </Typography>*/}
//                           <Rating
//                             readOnly
//                             size="small"
//                             name="simple-controlled"
//                             value={productReview.rating}
//                             // onChange={(event, newValue) => {
//                             //   this.setState(newValue);
//                             // }}
//                           />
//                           {" — "} {productReview.review}
//                         </React.Fragment>
//                       }
//                     />
//                   </ListItem>
//                   <Divider variant="inset" component="li" />
//                   </div>
//               );
//               })}

              
                
            
//               </List>
//             }}
//             </ProductConsumer>

            

export default ReviewDetails;


