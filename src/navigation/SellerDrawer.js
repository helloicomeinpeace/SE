import React, { Component, Fragment } from "react";
// import Product from "./Product";
// import Title from "./Title";
import { ProductConsumer } from "../context";
import { withStyles } from '@material-ui/core/styles';
import { Link, NavLink } from "react-router-dom";
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
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CategoryIcon from '@material-ui/icons/Category';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import StorageIcon from '@material-ui/icons/Storage';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import RateReviewIcon from '@material-ui/icons/RateReview';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import EqualizerIcon from '@material-ui/icons/Equalizer';

import Switch from '@material-ui/core/Switch';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect } from "react-router";
import HomeIcon from '@material-ui/icons/Home';


const AntSwitch = withStyles((theme) => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: '#6600ff',
        borderColor: '#6600ff',
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

class MainDrawer extends Component {
  
  state={
    checkedC: true
  }

  handleChange = (event) => {
    // this.setState({checkedC: false})
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  render() {
    return (
      <Fragment>
      <ProductConsumer>
      {value => {
      return <Drawer open={value.isDrawerVisible} onClose={value.handleDrawerClose}>
            <div style={{width:250}}>  
              <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          // padding: theme.spacing(0, 1),
                          // necessary for content to be below app bar
                          // ...theme.mixins.toolbar,
                          justifyContent: 'flex-end',
                        }}>
                <div style={{
                  marginRight:'11%',
                  display: 'flex',
                  alignItems: 'center',
                  // padding: theme.spacing(0, 1),
                  // necessary for content to be below app bar
                  // ...theme.mixins.toolbar,
                  justifyContent: 'flex-end',
                }}>
                  <p style={{fontSize:12, 
                    marginTop:'16%', 
                    marginRight:'10%',
                    color: value.isSeller ? 'grey':'#6600ff'}}>BUYER</p>
                  <AntSwitch checked={value.isSeller} onChange={value.toggleAppMode} name="isSeller" />
                  <p style={{fontSize:12, 
                    marginTop:'16%', 
                    marginLeft:'10%',
                    color: value.isSeller ? '#6600ff':'grey'}}>SELLER</p>
                  
                </div>
                <Link to='/'>
                <IconButton onClick={value.handleDrawerClose}>
                  <HomeIcon style={{color:'#6600ff'}} />
                </IconButton>
                </Link >
                <IconButton onClick={value.handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <List>

              <NavLink to='/products'
              style={{
                color:'#000000',
                textDecoration: 'none',
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "#6600ff"
              }}>
              <ListItem button key={'Products'}>
                  <ListItemIcon>{<LocalMallIcon />}</ListItemIcon>
                  <ListItemText primary={'Products'} />
                </ListItem>
              </NavLink>

              <NavLink to='/categories'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Categories'}>
                  <ListItemIcon>{<CategoryIcon />}</ListItemIcon>
                  <ListItemText primary={'Categories'} />
                </ListItem>
              </NavLink>

              <NavLink to='/reviews'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
              <ListItem button key={'Reviews'}>
                <ListItemIcon>{<RateReviewIcon />}</ListItemIcon>
                <ListItemText primary={'Reviews'} />
              </ListItem>
              </NavLink>

              <NavLink to='/live'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Live Stream'}>
                  <ListItemIcon>{<LiveTvIcon />}</ListItemIcon>
                  <ListItemText primary={'Live Stream'} />
                </ListItem>
              </NavLink>
              
              <NavLink to='/statistics'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Statistics'}>
                  <ListItemIcon>{<EqualizerIcon />}</ListItemIcon>
                  <ListItemText primary={'Statistics'} />
                </ListItem>
              </NavLink>

              <NavLink to='/hire'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Hire'}>
                  <ListItemIcon>{<PersonAddIcon />}</ListItemIcon>
                  <ListItemText primary={'Hire'} />
                </ListItem>
              </NavLink>

              <NavLink to='/credit'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Credit'}>
                  <ListItemIcon>{<AttachMoneyIcon />}</ListItemIcon>
                  <ListItemText primary={'Credit'} />
                </ListItem>
              </NavLink>
              <NavLink to='/viewcomplains'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'Complain'}>
                  <ListItemIcon>{<ChatBubbleOutlineIcon />}</ListItemIcon>
                  <ListItemText primary={'View Complains'} />
                </ListItem>
              </NavLink>
              <NavLink to='/vieworders'
                        style={{
                          color:'#000000',
                          textDecoration: 'none',
                        }}
                        activeStyle={{
                          fontWeight: "bold",
                          color: "#6600ff"
                        }}>
                <ListItem button key={'ViewOrders'}>
                  <ListItemIcon>{<StorageIcon />}</ListItemIcon>
                  <ListItemText primary={'View Orders'} />
                </ListItem>
              </NavLink>
                

                </List>
              </div>
            </Drawer>}}

        </ProductConsumer>
      </Fragment>
    );
  }
}
export default MainDrawer;

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
