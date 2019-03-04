import React, { Component } from 'react';
import axios from "axios";

class Profile extends Component{

    state = {
        profile: {}
      }

      handleTextBoxOnChange = e => {
    
        this.setState({
          profile : {
            ...this.state.profile,
            [e.target.name] : e.target.value
          }
        })
      }

      fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        })
      }

      fileUploadHandler = () => {
          const fd = new FormData()
          fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
          axios.post('http://localhost:8080/upload', fd, {
              onUploadProgress: progressEvent => {
                  console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
              }
          })
          .then(res => {
              console.log(res)
          })
      }

    render(){

        return(
        <div>
            <p>Name</p>
            <input type="text" name = "name" placeholder="Name" onChange={this.handleTextBoxOnChange}/>
            <p>Profile Picture</p>
            <input type="file" name = "image" onChange={this.fileSelectedHandler}/>
            <button onClick={this.fileUploadHandler}>Upload</button>
            <p>Description</p>
            <input type="text" name = "name" placeholder="Name" onChange={this.handleTextBoxOnChange}/>
        </div>
        );
    }
}

export default Profile;

