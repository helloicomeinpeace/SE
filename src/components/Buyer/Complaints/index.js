import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextareaAutosize,TextField } from '@material-ui/core';
import React from 'react';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import fire from '../../fire'
import { ProductConsumer } from "../../../context";
import {useState} from 'react'

class Complaints extends React.Component {
constructor(props){
  super(props);
 }
 state={
    message:'',
    email:''
    }

    handleMessageChange = (event) => {
      this.setState({message: event.target.value});
    };
    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
      };


render() {
    return (
      <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:230}}>
        <MuiThemeProvider>
          <div>
          <h1>State your complain</h1>
              {/*<TextField
                hintText="Email"
                floatingLabelText="Email"
                value={this.state.email}
                onChange = {(event,newValue) => this.setState({email:newValue})}
              />*/}
            <TextField
              id="standard-multiline-flexible"
              label="Enter email"
              // multiline
              rowsMax={4}
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <br/>
            <br/>
            <br/>
            <TextareaAutosize
              id="standard-multiline-flexible"
              label="Message"
              // multiline
              rowsMax={4}
              value={this.state.message}
              onChange={this.handleMessageChange}
            />
           <br/>
            <ProductConsumer>
            {value => {
                // console.log('Bitch: ',this.state.email,this.state.password)
              return <div><div><Button variant="contained" color="primary" onClick={()=>{value.submitComplain(this.state.message,this.state.email)}}>
              Submit
             </Button></div></div>
            }}
          </ProductConsumer>
            
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

export default Complaints;