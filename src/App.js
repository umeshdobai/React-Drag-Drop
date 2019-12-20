import React, { Component } from 'react';
import './App.css';
import DynamicForm from './components/DynamicForm';
import DraggableDemo from './components/DraggableDemo';




class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       data: [
         {id: 1, name:"a", age: 23, qualification: "Btech", rating: 5},
         {id: 2, name:"b", age: 24, qualification: "BSc", rating: 4},
         {id: 3, name:"c", age: 25, qualification: "BCom", rating: 3},
       ]
    }
  }
  

  onSubmit = (model) => {
      model.id = + new Date();
      alert(JSON.stringify(model));
      console.log(this.state.data)
      this.setState({
        data: [model, ...this.state.data]
      })
      console.log(model)
  }

  render(){
      return (
        <div>
        <div className="App">
            <DynamicForm className="form"
                title="Registration"
                model = {[
                  {key: "name", label: "Name",  type:"text" , props: {required: true},value:""},  
                  {key: "rating", label: "Rating", type: "number", props: {min: 0,max: 5},value:""},
                  {key: "age", label: "Age", type: "number",value:""},
                  {key: "qualification", label: "Qualification", type:"text",value:""},
                  {key: "submit", type: "submit"}
                ]}
                onSubmit = { (model) => {this.onSubmit(model)}}
            />
        </div>
        <DraggableDemo />
        </div>
      );
    }
}

export default App;
