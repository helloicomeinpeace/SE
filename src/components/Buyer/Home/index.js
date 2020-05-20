import React, { Component } from "react";
import { ProductConsumer } from "../../../context";
import { Link } from "react-router-dom";
import { ButtonContainer } from "../../Button";

import Paper from '@material-ui/core/Paper';
import Carousel from 'react-material-ui-carousel'

import Sponsors from './Sponsors';
import Featured from './Featured';

// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>
 
//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         <Paper/>
//     )
// }

class Home extends Component {
  
    state={
        expanded: false
    }

    handleExpandClick = () => {
        this.setState({expanded: !this.state.expanded});
    };

    render() {
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
      <ProductConsumer>
        {value => {
          const {
            id,
            company,
            img,
            info,
            price,
            title,
            inCart
          } = value.detailProduct;
          return (
            <div className="container py-5">
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{"HOME"}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    <Carousel
                        // animation='slide'    
                    >
                        {items.map((item) => {
                            return (
                                <Sponsors />
                            );
                        })}  
                    </Carousel>
                    
                </div>
                <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
                    {items.map((item) => {
                        return (
                            <Featured/>
                            // <Sponsors />
                        );
                    })}  
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
export default Home;




// <Paper elevation={3} >
                
//                     {/*<img src={img} className="img-fluid" alt="product" />*/}
//                 </Paper>