import React, {Component} from 'react' ;
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApiConn from './ApiConn';
import Home from './home';
import './App.css';

class App extends Component {

  
  // STATE <-------------------------------------------------
  state = {
    myList : [],
    myString : '',
    test: 'This is a test',

  }

  handleNewTodo(event) {
    this.setState({
      myString : event.target.value,
    })
    console.log(event.target.value);
  }
  saveTodo(event) {
    // preventDefault gör så att en POST-form inte refreshar sidan.
    event.preventDefault();
    console.log('Form Submitted!');
    console.log('Event.target.value is: ' + event.target.vaule);
    console.log('state.myString: ' + this.state.myString);

    if (this.state.myString !== null || this.state.myString.length !== 0) {
      // Sparar hur många som finns i state.mylist
      let count  = this.state.myList.length; 

      // Lägger till ny todo i state.mylist
      // this.state.myList.push(this.state.myString)
      //använder setState istället för att göra det async
      this.setState({
        // ... betyder att vi skapar en kopia av den gamla arrayen och lägger till det nya, har med immutable och göra tror jag
        myList : [...this.state.myList,  this.state.myString]
        
      });
      // Kolla om  det lagts till ny i state.myList
      if (this.state.myList.length > count) {
        console.log('ToDo added to state.myList!');
        console.log(this.state.myList);
      }
    } else {
      console.log('Error! Could not add new todo to list ');
    }

    this.reprMyList();
  }
  reprMyList() {
    // console.log(this.state.myList.map());
    
  }
  // RENDER <----------------------------------------------
  render() {

    return (
      <div className="my-container">
        <div>
          {/* Event hämtar texten från input */}
          <form onSubmit={(event) => this.saveTodo(event)}>
            <input onChange= {(event) => {this.handleNewTodo(event)}}type="text" />
            <button type="submit" >Add ToDo</button>
          </form>
        </div>
        <h2>
          <ul>
            {this.state.myList.map(todo => 
                {
                return <li>{todo}</li> 
                }
              )}
          </ul>
        </h2>

      </div>
    );
  };
}

export default App;
