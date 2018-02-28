import React, { Component } from 'react';
// To convert from ints to letters
const numAlpha = ["a", "b", "c", "d", "e", "f"];


function ChoiceLine(props) {
    // TODO add text input and radio button below
    return <div >
               
                <label>{numAlpha[props.i]}. </label>
                
                <label> 
                    <input type="radio" name="Choices" value={i} onChange={this.choiceHandler.bind(this)}/>
                </label>
    
            </div>;
}


 class AddQ extends Component {
     constructor(props) {
         super(props);
         /* Set up state here */
         this.state = {question: "", choices: ["", ""], answer: 0};
     }
     
     addChoice() {
         console.log("addChoice");
         //TODO: Update state here

     }
     
     answerHandler(evt) {
        console.log(evt.currentTarget.value);
        this.setState({answer: evt.currentTarget.value})
    }
     
     questionHandler(evt) {
         // TODO: Update question state here
         // new value is in evt.currentTarget.value
     }
     
     choiceHandler(i, evt) {
         // TODO: Update particular element of state choice array
         // new value is in evt.currentTarget.value
     }
     
     submitQ() {
         console.log("submitQ");
         // TODO:  fetch post here
     }
     questionChange(evt){
        console.log("questionChange");
     }

     choiceChange(i, evt){
        console.log("choiceChange");
     }
     
     render() {
         let buttonBar = <div>
                 <button onClick={this.addChoice.bind(this)}>Add Choice</button>
                 <button onClick={this.submitQ.bind(this)}>Submit Question</button></div>;
         // TODO: add choice and answer handlers as props
         // to <ChoiceLine />
         let choiceElements = this.state.choices.map(function(choice, i){
             return <ChoiceLine choice={choice} i={i} />;
         })
         // TODO: add question input below
         return <div>
            <h2>New Question</h2>
            {buttonBar}
            <p>Question: <input type="text" onChange={this.questionHandler.bind(this)} 
                    value={this.state.question}/></p>
            {choiceElements}
        </div>;
     }
}


export {AddQ}