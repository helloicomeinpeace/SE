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

class OrderCollection extends Array {
    sum(key) {
        return this.reduce((a, b) => a + (b[key] || 0), 0);
    }
}

class Statistics extends Component {

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
    value:2
  }



  orderProducts(products, orders){
    var i;
    var totalProd = [];

    var uniqueIds = []

    for (var order in orders){
        // console.log(uniqueIds.indexOf(orders[order].product))
        if (uniqueIds.indexOf(orders[order].product) === -1){
            uniqueIds.push(orders[order].product)
        }
    }

    // console.log(uniqueIds)
    // console.log(products)

    // console.log(products.filter(obj => { return obj.id === uniqueIds[0] })[0])

    const dataStruct = [];
    for (var id in uniqueIds){
        dataStruct.push([products.filter(obj => { return obj.id === uniqueIds[id] })[0],
                        orders.filter((obj) => obj.product === uniqueIds[id]).length])
        // console.log('yeah', orders.filter((obj) => obj.product === uniqueIds[id]).length)
        // dataStruct.push([products.filter(obj => { return obj.id === uniqueIds[id] })[0],
        //                 3])
        
    }

    dataStruct.sort(function(a,b) {
        return a[1]-b[1]
    });

    // console.log(dataStruct.reverse())

    return dataStruct.reverse()
  }

  getSpendings(orders){
    var sumOrders = new OrderCollection(...orders)
    // console.log(sumOrders)
    return sumOrders.sum('bill');
  }

  getMonthlySpending(orders){

        const monthData=['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'Jun', 'Jul', 'Aug',
                    'Sep', 'Oct', 'Nov', 'Dec']

        const dataStruct = []

      if (orders.length > 0) {
        var date;// = new Date(1578154896000);
        // var month = date.getMonth();

        orders = orders.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1).reverse()
        
        // console.log(orders[0].createdAt)
        // date = new Date(orders[0].createdAt*1000)
        // console.log(date.getMonth())

        var sumOrdersMonthly;// = new OrderCollection(...orders)
        var monthCounter = 0;
        var prevBracket = 0;
        var currMonth = (new Date(orders[0].createdAt*1000)).getMonth();
        // console.log(currMonth)
        for (var order in orders){
            
            if (currMonth === (new Date(orders[order].createdAt*1000)).getMonth()){
                // console.log(monthData[currMonth])
                if (monthCounter === 12){
                    break;
                }
            } else {    
                sumOrdersMonthly = new OrderCollection(...orders.slice(prevBracket, order))
                dataStruct.push([monthData[currMonth], sumOrdersMonthly.sum('bill')]);
                currMonth = (new Date(orders[order].createdAt*1000)).getMonth()
                // console.log(monthData[currMonth])
                ++monthCounter;
                prevBracket = order;
            }
        }
        dataStruct.push(['Month', 'Spending'])

        return dataStruct.reverse()
        // return dataStruct.reverse()

    }
  }

  render() {
    // const classes = useStyles();
    return (
      <Fragment>
        <div className="py-5">
          <div className="container">
            <Title title="Your Stats" />
            <div className="row">

                
                <Paper style={{width: '100%', marginTop:'3%'}}>
                    <p style={{marginTop:'1%', marginLeft:'2%', 
                        fontSize:30, 
                        fontWeight:'bold',
                        color:'#6600ff'}}>
                        Spending
                    </p>
                    <p style={{ marginLeft:'2%',
                        paddingTop:0, 
                        fontSize:16, 
                        fontWeight:'bold',
                        color:'gray'}}>
                        All Time
                    </p>

                    <ProductConsumer>
                    {value => {

                        const totalSpending = this.getSpendings(value.buyerOrders)
                        // console.log('totalSpendings', totalSpending)
                        return <p style={{marginLeft:'2%', 
                            fontSize:50, 
                            fontWeight:'bold',
                            color:'#b380ff'}}>
                            {totalSpending} Rs.
                        </p>
                    }}
                    </ProductConsumer>
                </Paper>

                <Paper style={{width: '100%', marginTop:'3%'}}>
                    <p style={{marginTop:'1%', marginLeft:'2%', 
                        fontSize:30, 
                        fontWeight:'bold',
                        color:'#6600ff'}}>
                        Spending
                    </p>
                    <p style={{ marginLeft:'2%',
                        paddingTop:0, 
                        fontSize:16, 
                        fontWeight:'bold',
                        color:'gray'}}>
                        Monthly
                    </p>

                    <ProductConsumer>
                    {value => {

                        const totalMonthly = this.getMonthlySpending(value.buyerOrders)
                        // console.log('totalSpendings', totalSpending)
                        return <Chart
                            style={{margin: '1%', color:'#6600ff'}}
                            width={'98%'}
                            height={'300px'}
                            chartType="Bar"
                            loader={<div>Loading Chart</div>}
                            data={totalMonthly}
                            options={{
                                // Material design options
                                chart: {
                                title: 'Spending Year: 2019-2020',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '2' }}
                            />
                    }}
                    </ProductConsumer>

                    
                </Paper>

                
                <Paper style={{width: '100%', marginTop:'3%'}}>
                    <p style={{marginTop:'1%', marginLeft:'2%', 
                        fontSize:30, 
                        fontWeight:'bold',
                        color:'#6600ff'}}>
                        Most Bought Products
                    </p>
                    <ProductConsumer>
                    {value => {


                        const orderedProducts = this.orderProducts(value.products, value.buyerOrders)
                        // console.log(orderedProducts)
                        return <List style={{width:'98%', marginBottom:'2%'}}>

                        {orderedProducts.map((product) => {
                            const labelId = `checkbox-list-secondary-label-${product}`;
                            // var fetchedProduct = this.extractProduct(value.products, "uHrYlhp39KS7Bsl5FYsSQzm9m8x2")
                            // // console.log(product[0])

                            // console.log(fetchedProduct)

                            return (
                            <div>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" />
                                </ListItemAvatar>
                                <ListItemText
                                primary={product[0].name}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        // className={classes.inline}
                                        color="textPrimary"
                                    >
                                        Time Bought
                                    </Typography>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        // className={classes.inline}
                                        color="white"
                                    >
                                        {'-'} {product[1]}
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

                        return <p style={{marginLeft:'2%', 
                            fontSize:50, 
                            fontWeight:'bold',
                            color:'#b380ff'}}>
                            {'345'} Rs.
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
export default Statistics;


