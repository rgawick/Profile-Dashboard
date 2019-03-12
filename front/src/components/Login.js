import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../App.css'

class Login extends Component {

    state = {
        login: true,
        newUser: {},
        message: null
      }
    
      toggleRegister = () => {
        let doesShow = this.state.login
        this.setState({
          login: !doesShow
        })
      }
    
      handleTextBoxOnChange = e => {
    
        this.setState({
          newUser : {
            ...this.state.newUser,
            [e.target.name] : e.target.value
          }
        })
      }
    
      handleLoginButtonClick = () => {
    
        let user = this.state.newUser
    
        axios.post('https://theprofiledashboardserver.herokuapp.com/login', {
        user
        })
        .then((response) => {
          console.log(response)
          this.setState({
            message : response.data.message
          })
          if(response.data.isAuthenticated){
            this.props.isAuthenticated()
            this.props.sendUserInfo(response.data.user)
            this.props.history.push('/profile')
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
      validateEmail = () => {
    
        let newUser = this.state.newUser
    
        const regex = /[\w-]+@([\w-]+\.)+[\w-]+/
        const emailValid = regex.test(newUser.email)
    
        if(!emailValid){
          this.setState({
            message : 'Please enter a valid email...'
          })
        }
        else{this.validatePassword()}
      }
    
      validatePassword = () => {
    
        let newUser = this.state.newUser
    
        const regex = /\[0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+/
        const passwordValid = regex.test(newUser.password)
    
        if(passwordValid){
          this.registerUser()
        } else {
          this.setState({
            message : 'Please enter a valid password...'
          })
        }
      }
    
      registerUser = () => {
    
        let newUser = this.state.newUser
    
        if(newUser.confirmPassword === newUser.password){
          axios.post('https://theprofiledashboardserver.herokuapp.com/registerUser', {
          newUser
          })
          .then((response) => {
            this.setState({
              message : response.data.message
            })
          })
          .catch(function (error) {
            console.log(error);
          });
        } else {
          this.setState({
            message : 'Your passwords do not match...'
          })
        }
        }
    
      render() {
    
        let loginOption = null
    
        let loginRegisterButton = null
    
        let message = null
    
        if(this.state.message){
          message = <p>{this.state.message}</p>
        }
    
        if(this.state.login === true){
          loginRegisterButton = <button className="loginRegisterButton" onClick={this.toggleRegister}><u>Need to register?</u></button>
        } else {
          loginRegisterButton = <button className="loginRegisterButton" onClick={this.toggleRegister}>Click to <u>Login</u></button>
        }
    
        if(this.state.login === true){
          loginOption = <div className='loginRegister'>
            <h1 className="spacing">Login</h1>
              <div>
                <input type="email" name = "email" placeholder="Enter Email" onChange={this.handleTextBoxOnChange} /><br/>
                <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter Password" /><br/>
                <button onClick={this.handleLoginButtonClick}>Login</button>
              </div>
    
          </div>
        } else {
          loginOption = <div className='loginRegister'>
            <h1 className="spacing">Register</h1>
            <div>
              <input type="email" name = "email" placeholder="Enter Email" onChange={this.handleTextBoxOnChange} /><br/>
              <input onChange={this.handleTextBoxOnChange} name="password" type="password" placeholder="Enter Password" /><br/>
              <input onChange={this.handleTextBoxOnChange} name="confirmPassword" type="password" placeholder="Confirm Password" /><br/>
              <p className="spacing">Password must be a minimum of eight characters, at least one letter and one number.</p>
              <button onClick={this.validateEmail}>Register</button>
            </div>
    
          </div>
        }
    
        return (
            <div className='centered'>
              {loginOption}
              {message}
              {loginRegisterButton}
            </div>
        );
      }
    }
    

    const mapDispatchToProps = (dispatch) => {
      return {
        isAuthenticated : () => dispatch({ type : "LOG_IN_USER"}),
        sendUserInfo : (user) => dispatch({ type : "SEND_USER_INFO", user : user })
      }
    }
    
    export default connect(null, mapDispatchToProps)(withRouter(Login))