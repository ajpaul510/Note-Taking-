import React, { Component } from 'react';

// I've built a Question component below that takes two properties
//      mcq: a multiple choice question
//      short: a boolean indicating, don't show choices.
// The Question component renders a single question

function Question(props) {
    let choiceList = null;
    let listStyle = {listStyleType: "lower-alpha"};
    if (!props.short) { //
        // Use map to create an array of items
        let items = props.mcq.choices.map(function(choice, i){
            // Finish this function and use the result
            return <li key = {"choices" + i}> {choice}</li>;
        });
        choiceList = <ol style={listStyle}>{items}</ol>;
    }
    return <div>
            <p>{props.mcq.question}</p>
            {choiceList}
        </div>;

}

class ShowAll extends Component {
    
    constructor(props) {
        super(props);
        this.state = {questions: [], short: true};
    }
    
    componentDidMount() {
        let that = this;
        console.log("Show All 'did mount'");
        // Always use fetch with full error handling to
        // at least aid debugging.
        fetch('/allQs')
        .then(function(response) {
            if(response.ok) {
                return response.json();
            } else {
                let info = `Status code: ${response.status}, ${response.statusText}`;
                console.log(response);
                return Promise.reject(info);
            }
        })
        .then(function(data) {
            that.setState({questions: data.questions});
            })
        .catch(function(msg){
            console.log("Something bad: " + msg);
        });
    }
    
    shortHandler(event){
        this.setState({short: event.currentTarget.checked})
    }
    
    render() {
        let that = this;
        let qs = this.state.questions;
        // Using the Question component with the map function
        // to render a list of components.
        let qElements = qs.map(function(mcq, i){
            return <Question key={i} 
                       short={that.state.short} 
                       mcq={mcq} />;
        })

        // Note that you still need to add a checkbox and handler
        // to update the state.short.
        let buttonBar = <div>
            <input onChange = {this.shortHandler.bind(this)}
                checked = {this.state.short}
                type = "checkbox" /> Short Form </div>
        
        
    return <div>
        <h2>All Questions</h2>
        <p>Short or long list of Qs.</p>
        {buttonBar}
        {qElements}
    </div>
    }
}

export {ShowAll}