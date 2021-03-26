import React, {Component} from 'react';
import axios from 'axios';
class ApiConn extends Component {

    state= {
        persons:[]
    }

    // För att få detta att fungera måste du aktivera proxy, något med CORS!

    //kolla i kursvideon hur man gör.

    componentDidMount() {
        axios.get('http://informatik12.ei.hv.se/grupp5v2/api/Activities').then(res =>{
        // axios.get('http://localhost:64014/api/Activities').then(res => {
         // axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
            console.log(res.status);
            console.log(res.data);
            const persons = res.data
            this.setState({
                persons
            });

        })
        console.log("Component DID mount!");
          
    }


    render(){
        return (
            <div className="my-container">
              <ul>
                  {/* <h4>Hämtat från http://localhost:64014/api/Activities</h4> */}
                  {/* {this.state.persons.map(person => <li>{person.description}</li>)} */}
                  
                  <h4>Hämtas från Hotell Seasharp: Aktiviteter på hotellet</h4>
                  {this.state.persons.map(person => <li>{person.description}</li>)}
              </ul>              
            </div>
        )
    }
}


export default ApiConn;