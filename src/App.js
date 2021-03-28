import React, {Component} from 'react' ;
import  { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ApiConn from './ApiConn';
import Home from './home';
import './App.css';
import axios from 'axios';
// App.js användes för att lära sig react. Egentligen är det kanske lämpligt att denna är en huvudkomponent men i mitt fall slutade det
// med att App.js helt enkelt bara är en component som alla andra. Istället kan man se Navbar.js som huvudkomponent.

class App extends Component {


  // STATE <-------------------------------------------------
  state = {
    myList : [],
    api_todos : [],
    myString : '',
    test: 'This is a test',

  }
  // JSONPlaceholder is a free online REST API that you can use whenever you need some fake data.
  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos').then(res => {
    const api_todos = res.data;
    this.setState({api_todos});
  })



        console.log("Component DID mount!");
         
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
    console.log('Event.target.value is: ' + event.target.value);
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

      // Reset av inputform med id #todoInput
      document.getElementById("todoInput").value = "";


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
      <div className="">

        <div className={"my-container"}>
        <h1>My ToDoApp!</h1>
          <form onSubmit={(event) => this.saveTodo(event)}>
            <input id="todoInput" onChange= {(event) => {this.handleNewTodo(event)}} type="text" />
            <button type="submit" >Add ToDoo</button>
          </form>
        </div>
              <ul>
                <div className={"big"}>

                  {this.state.myList.map(todo =>
                      {
                        return <div className={"flex-row movie-container"} onClick={ () => {
                          console.log(`clicked ${todo}`);
                          let myList = [...this.state.myList];

                          for (let i = 0; i < myList.length; i++) {
                            if (myList[i] == todo) {
                              myList.splice(i, 1);
                              this.setState({myList});
                            }
                            
                          }
                        
                        }}><li><h3>{todo}</h3></li></div>
                      }
                      )}
                  {this.state.api_todos.map(todo => {
                    return <div className={"flex-row movie-container"} onClick={ () => 
                      {
                        //alert(`clicked ${todo.title}`)
                        let temp = [...this.state.api_todos];
                        console.log(`0: ${temp[0].title}`)
                        for(var i = 0; i < temp.length; i++) {

                             if (temp[i].title == todo.title){
                               temp.splice(i, 1);
                               let api_todos = temp;
                               this.setState({api_todos});

                              //this.state.api_todos.splice(i, 1);
                             // let api_todos= {...this.state.api_todos, this.state.api_todos.splice(i, 1)};
                              // this.setState(old => {
                              //   api_todos : [...old.api_todos, old.api_todos.splice(i, 1)]
                              // })
                             // console.log(`LOGGING TEMP: \n ${temp[0].title}`);
                              //console.log(`removed: ${this.state.api_todos[i - 1].title}`)
                              //this.setState({api_todos});
                            }

                        }
                        
                      }}><div><li><h3>{todo.title}</h3></li></div></div>
                  })}
                </div>
              </ul>
      </div>
      
    );
  };
}

export default App;
