import React, { Component, Fragment } from "react";
// import Product from "./Product";
import Title from "../../Title";
import { ProductConsumer } from "../../../context";

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Chart } from "react-google-charts";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import fire from '../../fire'

class OrderCollection extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
}

class Credit extends Component {

  extractProduct(products, pid){
    var newArray = products.filter(function (el) {
    //   // console.log(el)
      return el.id === pid
    });

    // console.log("nigger")
    // console.log(newArray[0])

    return newArray[0];
  } 

  state = {
    value:2,
    credit:0,
  }

  componentDidMount(){

    // console.log('context : ', this.context)
    var fb=fire.getFire();

    fb.database().ref('/')
      .child('users/'+this.context.user.uid)
      .on("value", function(snapshot) {
        snapshot.forEach((doc) => {
        //   var tempJSON = doc.key
          
          if (doc.key === 'credit'){
                // console.log(doc.val())
                this.setState({credit: doc.val()})            
            }
            //   tempJSON['id'] = doc.key
        //   userData.push(tempJSON);
        });
        // // console.log(offers)
        // // console.log(userData)

        // this.setState(() => {
        //   return { userData: userData };
        // });

    }.bind(this));
  }


  render() {
    // const classes = useStyles();
    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <Title title="Your Credit" />
            <div className="row">

                
                <Paper style={{width: '100%', marginTop:'3%'}}>
                    <p style={{marginTop:'1%', marginLeft:'2%', 
                        fontSize:30, 
                        fontWeight:'bold',
                        color:'#6600ff'}}>
                        Credit
                    </p>

                    <ProductConsumer>
                    {value => {

                        // const totalSpending = this.getSpendings(value.sellerOrders)
                        // console.log('totalSpendings', totalSpending)
                        return <p style={{marginLeft:'2%', 
                            fontSize:50, 
                            fontWeight:'bold',
                            color:'#b380ff'}}>
                            {this.state.credit} Rs.
                        </p>
                    }}
                    </ProductConsumer>
                </Paper>
      
            </div>

          </div>
        </div>
      </Fragment>
    );
  }
}

Credit.contextType = ProductConsumer

export default Credit;


