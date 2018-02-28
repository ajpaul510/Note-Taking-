import React, { Component } from 'react';
import './App.css';
import {About} from './About';
import {AddQ} from './AddQ';
import {ShowAll} from './ShowAll';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {mode: "About"};
    }
    
    aboutHandler(){
        this.setState({mode: "about"});
    }
    showHandler(){
        this.setState({mode: "showAll"});
    }
    addQHandler(){
        this.setState({mode: "addQ"});
    }
    
  render() {
      let contents;
      switch(this.state.mode){
            case "about":
              contents = <About />;
              break;
            case "showAll":
              contents = <ShowAll />;
              break;
            case "addQ":
              contents = <AddQ />;
              break;
            default:
              contents = null;
              
              
    }
    let buttonBar = <div>
        <button onClick = 
            {this.aboutHandler.bind(this)}>About</button>
        <button onClick = 
            {this.showHandler.bind(this)}>Show All</button>
        <button onClick = {this.addQHandler.bind(this)}
      >Add Q</button>
      </div>;
      
    return (
     <div>
        <h1>The Quizy 2000</h1>
        {contents}
        {buttonBar}
    </div>
      
    );
  }
}

export default App;
