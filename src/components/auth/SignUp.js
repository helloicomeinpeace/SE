import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import Button from '@material-ui/core/Button';
import fire from '../fire'
import {Link} from "react-router-dom"
import { ProductConsumer } from "../../context";
import {useState} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class SignUp extends React.Component {
    constructor(props){
        super(props);
       }
       state={
          email:'',
          password:'',
          displayName:'',
          type:''
          }
      
          handleRadioChange = (event) => {
            this.setState({type: event.target.value});
          };

          handleEmailChange = (event) => {
            this.setState({email: event.target.value});
          };
      
          handlePasswordChange = (event) => {
            this.setState({password: event.target.value});
          };
          handleNameChange = (event) => {
            this.setState({displayName: event.target.value});
          };
      
      render() {
          return (
            <div style={{display:'flex', justifyContent:'center', alignItems:'center', paddingTop:230}}>
              <MuiThemeProvider>
                <div>
                <h1>Sign Up</h1>
                    {/*<TextField
                      hintText="Email"
                      floatingLabelText="Email"
                      value={this.state.email}
                      onChange = {(event,newValue) => this.setState({email:newValue})}
                    />*/}
      
                  <TextField
                    id="standard-multiline-flexible"
                    label="E-mail"
                    // multiline
                    rowsMax={4}
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                  />
                   <br/>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Display Name"
                    // multiline
                    rowsMax={4}
                    value={this.state.displayName}
                    onChange={this.handleNameChange}
                  />
                 <br/>
                  <TextField
                    id="standard-multiline-flexible"
                    label="Password"
                    type='password'
                    // multiline
                    rowsMax={4}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  />
                  <br/><br/>
                    <FormControl component="fieldset" onChange={this.handleRadioChange}>
                    <FormLabel component="legend">sign up as a buyer or a rider?</FormLabel>
                    <RadioGroup row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                        value="buyer"
                        control={<Radio color="primary" />}
                        label="Buyer"
                        labelPlacement="bottom"
                        />
                        <FormControlLabel
                        value="rider"
                        control={<Radio color="primary" />}
                        label="Rider"
                        labelPlacement="bottom"
                        />
                    </RadioGroup>
                    </FormControl>
                  <ProductConsumer>
                  {value => {
                    return <div><div><Button variant="contained" color="primary" onClick={()=>{value.signUp(this.state.email,this.state.displayName,this.state.password,this.state.type)}}>
                    Sign Up
                   </Button></div>
                   <div style={{paddingTop:"15px"}}><Link to="/"><Button variant="contained" color="primary">
                   Sign In
                  </Button></Link></div></div>
                  }}
                </ProductConsumer>
                  
               </div>
               </MuiThemeProvider>
            </div>
          );
        }
}

export default SignUp;