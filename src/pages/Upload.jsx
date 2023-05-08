import React, {Component} from 'react';
//import "../App.css";
//import axios from "axios";

class Upload extends Component {    
    state = {
        selectedFile: null
    }
    //property holds arrow function
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0]
        })
      }

      fileUploadHandler = () => {

      }

    render() {
        return(
        <div className='Upload'>   
        <input type="file" onChange={this.fileSelectedHandler}/>
        <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
        );
    }
}
export default Upload;