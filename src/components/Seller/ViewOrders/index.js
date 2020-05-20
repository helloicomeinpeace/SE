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

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { ButtonContainer } from "../../Button";
import { Link } from "react-router-dom";

import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

class ViewOrders extends Component {
  componentDidMount() {
  }

  
  render() {
    // const classes = useStyles();
    return (
      <Fragment>
      
        <div className="py-5">
          <div className="container">
            <Title title="Your Orders" />
            <div className="row">

            <ProductConsumer>
            {value => {
              return <List style={{width:'100%'}}>

              {value.buyerOrders.map((details) => {
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
export default ViewOrders;


// <List dense >
//                 {value.offers.map((offer) => {
//                   const labelId = `checkbox-list-secondary-label-${offer}`;
//                   return (
//                     <ListItem key={offer} button>
//                       {/*<ListItemAvatar>
//                         <Avatar
//                           alt={`Avatar n°${category + 1}`}
//                           src={`/static/images/avatar/${category + 1}.jpg`}
//                       />
//                       </ListItemAvatar>*/}
//                         <ListItemText style={{fontSize:80}} primary={`${offer.name}`} />
//                         <ListItemText id={labelId} primary={`${offer.description}`} />
//                       <ListItemSecondaryAction>
//                       </ListItemSecondaryAction>
//                     </ListItem>
//                   );
//                 })}
//               </List>

// <ProductConsumer>
//   {value => {
    
//     return value.products.map(product => {
//       return <Product key={product.id} product={product} />;
//     });
  
    
//   }}
// </ProductConsumer>

// <Drawer open={this.state.isDrawerVisible} variant="persistent" onClose={// console.log('Drawer Closed')}>
//       <div style={{width:250}}>  
//         <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     // padding: theme.spacing(0, 1),
//                     // necessary for content to be below app bar
//                     // ...theme.mixins.toolbar,
//                     justifyContent: 'flex-end',
//                   }}>
//           <IconButton onClick={this.handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </div>
//         <List>
//             {['All mail', 'Trash', 'Spam'].map((text, index) => (
//               <ListItem button key={text}>
//                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </div>
//       </Drawer>
