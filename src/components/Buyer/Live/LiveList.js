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

import ReactPlayer from 'react-player'

import { makeStyles, useTheme } from '@material-ui/core/styles';

import ReactFlowPlayer from "react-flow-player";
import { Player } from 'video-react';

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



  render() {
    // const classes = useStyles();
    return (
      <Fragment>
        
      

      {/*
      <ReactFlvPlayer
        url = "http://localhost:8000/live/test.flv"
        heigh = "800px"
        width = "800px"
        isMuted={true}
      />
      */}

        {/*<ReactFlowPlayer
          sources={{
            type: 'video/flash',
            src: "http://localhost:8000/live/test.flv",
          }}
          // rtmp="rtmp://192.168.10.8:1935/live/test"
          playerInitScript="https://releases.flowplayer.org/7.2.4/commercial/flowplayer.min.js"
          playerId="reactFlowPlayer"
        />*/}
      
        <div className="py-5">
          <div className="container">
            <Title title="Available Live Streams" />
            <div className="row">

            <p>jigger</p>

            <ReactFlowPlayer
              sources={{
                type: 'video/flash',
                src: "rtmp://192.168.10.8:1935/live/test",
              }}
              rtmp="rtmp://192.168.10.8:1935/live/test"
              playerInitScript="https://releases.flowplayer.org/7.2.4/commercial/flowplayer.min.js"
              playerId="reactFlowPlayer"
              title="title"
              licenseKey=""
              />
              
            </div>
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
