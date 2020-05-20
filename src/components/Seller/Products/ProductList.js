import React, { Component, Fragment } from "react";
import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";

import clsx from 'clsx';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import { Link } from "react-router-dom";
// import { ButtonContainer } from "../../Button";


import TextField from '@material-ui/core/TextField';

import { ButtonContainer } from "../../Button";

class ProductList extends Component {

  render() {
    return (
      <Fragment>
      
        <div className="py-5">
          <div className="container">
            <Title title="Our Products" />
            <ProductConsumer>
              {value => {
                  return <TextField style={{}} 
                        color='primary'
                        id="outlined-basic" 
                        label="Search Products" 
                        variant="outlined"
                        onChange={value.searchProducts} />;          
              }}
            </ProductConsumer>
            <Link to="/addproduct">
              <ButtonContainer style={{marginLeft:'2%', marginTop:'1%'}} >Add Product</ButtonContainer>
            </Link>
            <div className="row">
              <ProductConsumer>
                {value => {
                  
                  return value.products.map(product => {
                    // console.log("skeet ", product.id)
                    return <Product key={product.id} product={product} />;
                  });
                
                  
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default ProductList;

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
