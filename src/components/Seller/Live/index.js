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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';

import StarIcon from '@material-ui/icons/Star';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from '@material-ui/core/ListSubheader';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import ReactPlayer from 'react-player'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import ReactFlowPlayer from "react-flow-player";
import { Player } from 'video-react';

import { ButtonContainer } from "../../Button";

import {ReactFlvPlayer} from 'react-flv-player'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class OffersList extends Component {

  componentDidMount() {
    // console.log(ProductConsumer); 

  }

  isAvailable = () => {
      const timeout = new Promise((resolve, reject) => {
          setTimeout(reject, 300, 'Request timed out');
      });

      const request = fetch('http://localhost:8000/live/test.flv');

      return Promise
          .race([timeout, request])
          .then(response => alert('It worked :)'))
          .catch(error => alert('It timed out :('));
  }

  state={
    open: false,
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  };

  render() {
    // const classes = useStyles();
    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <Title title="Your Stream" />
            <ButtonContainer style={{marginTop:'1%'}} >Start Live</ButtonContainer>
            <ButtonContainer style={{marginTop:'1%'}} >End Live</ButtonContainer>
            <p style={{marginTop: '2%'}}>Hint: if your stream doesn't show make sure you are upload to your correct stream in OBS</p>
            <ProductConsumer>
        {value => {
        // console.log(value.detailProduct)
          return (
            <p>Stream Key: {value.user.uid}</p>
            );
        }}
      </ProductConsumer>
            

            <div className="row">

            <ProductConsumer>
            {value => {
            // console.log(value.detailProduct)
              return (
                <ReactFlvPlayer
                    url = "http://localhost:8000/live/test.flv"
                    // heigh = "800px"
                    width = "100%"
                    isMuted={false}
                />
                );
            }}
          </ProductConsumer>
            </div>
            <ProductConsumer>
            {value => {
            // console.log(value.detailProduct)
              return (
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  // className={classes.root}
                  style={{
                    width: '100%',
                    maxWidth: 360}}
                >
                  <ListItem button onClick={this.handleClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Live Products" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      
                    {value.productsDup.map((product) => {
                      // const labelId = `checkbox-list-secondary-label-${productReview}`;
                      // const fetchedProduct = this.extractProduct(value.products, productReview.productId)
                      // console.log(productReview.review)
                      return (
                        <div>
                          <ListItem button 
                          // className={classes.nested}
                          >
                            <ListItemIcon>
                            {product.isLive ? <StarIcon /> : <StarBorder />}
                              
                            </ListItemIcon>
                            <ListItemText primary={product.name} />
                          </ListItem>
                        </div>
                    );
                    })}

                      
                    </List>
                  </Collapse>
                </List>
                 );
            }}
          </ProductConsumer>
            
          </div>
        </div>
      </Fragment>
    );
  }
}
export default OffersList;

//rtmp://192.168.10.8:1935/live/test

// <ProductConsumer>
//             {value => {
//               return <List style={{width:'100%'}}>

//               {value.offers.map((offer) => {
//                 const labelId = `checkbox-list-secondary-label-${offer}`;
//                 // const fetchedProduct = 
//                 return (
//                   <div>
//                   <ListItem alignItems="flex-start">
//                     <ListItemAvatar>
//                       <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary="Brunch this weekend?"
//                       secondary={
//                         <React.Fragment>
//                           <Typography
//                             component="span"
//                             variant="body2"
//                             // className={classes.inline}
//                             color="textPrimary"
//                           >
//                             Ali Connors
//                           </Typography>
//                           {" — I'll be in your neighborhood doing errands this…"}
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
