import React, {Component} from "react";
import axios from "axios";

class MovieRate extends Component {

    state = {
        movies : [],
        selectedMovie: {
            id : 0,
            title : "",
            rating : 0
            
        },
        editForm : false
        
    }
    componentDidMount() {
        axios.get("https://localhost:5001/api/Movies").then(res => {
            const movies = res.data ;
            console.log(movies);
           this.setState({movies}) 
        });
        
    }
    
    createMovie() {
        let title = prompt("Name of Movie?");
        let rating = prompt("Rate 1 to 10?");
        alert("<-- Created --> \n Movie: " + title + "\n Rating: " + rating);
        axios.post("https://localhost:5001/api/Movies/", {
            title,
            rating
        }).then(res => {
            
            // uppdaterar state så att man inte behöver göra refresh på sidan
            const movie = res.data;
            console.log(movie);
            this.setState( old => ({
                movies : [...old.movies, movie],
                
            }))
        })
        
    }
    clickedMovie(id) {
       // alert(id);
        console.log("Movie clicked with id " + id);
        axios.get("https://localhost:5001/api/Movies/" + id).then(res => {
            const selectedMovie = res.data ;
            console.log("Movie gotten: \n" + selectedMovie.title);
            this.setState({selectedMovie})
        })
        this.scrollToTop();
    }
    unselectMovie() {
        // setState för att uppdatera ett object
        this.setState(old => ({
            selectedMovie : {
                //skapar kopia av gamla
                ...old.selectedMovie,
                //uppdaterar state till 0 så att logical && inte visar knappar
                id : 0
            }
        }))
    }
    editMovieForm() {
        this.setState({editForm : !this.state.editForm});
        console.log("Editform is now: " + this.state.editForm)
        
    }
    editMovie(event) {
        event.preventDefault()
        //console.log(event.target[0].value);
        console.log(event.target.title.value);
        const editedMovie = {
            id : this.state.selectedMovie.id,
            title : event.target.title.value,
            rating : event.target.rating.value
        }
        axios.put("https://localhost:5001/api/Movies/" + this.state.selectedMovie.id, editedMovie).then(res => {
            console.log("PUT Success ");
            console.log(res.status);
        }).catch(res => {
            console.log("PUT Error");
            console.log(res.status);
        })
    }
    
    deleteMovie(id) {
        axios.delete("https://localhost:5001/api/Movies/" + id).then(res => {
            console.log("Success");
            console.log(res.data);
            
            // this.setState(old => ({
            //     movies : [...old.movies, old.movies.splice(id, 1)]
            // }))
            
        }).catch( res => {
            console.log("DELETION ERROR");
            console.log(res.data);
        })
        // TODO, fixa så att den refreshar ordentligt utan HÅRDrefresh
        this.unselectMovie(id);
        window.location.reload();
        
    }
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    render() {
        return(
            <div className={""}>
                <div className={"my-container"}>
                    <h1>MovieRate</h1>
                    <button onClick={() => {this.createMovie()}}>Add movie</button>
                    <h2>Selected Movie:</h2>
                    {/*Nedan används en logical && för att se om det finns en selectedMovie eller inte
                        om det inte finns så visas inte div och knappar
                    */}
                    {this.state.selectedMovie.id > 0 &&
                        <div className={"big"}>
                            <div class={"selected-movie-container"}>
                                <p>{this.state.selectedMovie.title}</p>
                                <p>{this.state.selectedMovie.rating}</p>
                                <button onClick={ () => {this.editMovieForm() }}>Edit</button>
                                <button onClick={ () => {this.deleteMovie(this.state.selectedMovie.id) }}>Delete</button>
                                <button onClick={ () => {this.unselectMovie() }}>Unselect</button>
                                
                                <div>
                                    {/*    Toggler för EditForm   */}
                                    {this.state.editForm &&
                                    <form onSubmit={(event) => this.editMovie(event)}>
                                        <p>Titel:</p>
                                        <input type={"text"} name={"title"} id={"title"}/>
                                        <br />
                                        <p>Rating:</p>
                                        <input type={"number"} name={"rating"}/>
                                        <br /> 
                                        
                                        <input type={"submit"} value={"OK"} />
                                        <button>Cancel</button>
                                    </form>
                                    }
                                </div>
                            </div>      
                        </div>
                    }
                    
                
                </div>
                    <ul>
                        <div className={"big"}>
                            
                            {this.state.movies.map(movie => 
                                <div className={"flex-row movie-container"} onClick={() => {this.clickedMovie(movie.id)}}>
                                   <div >
                                        <li><h3>{movie.title}</h3></li>
                                        <li> <p>Rating: {movie.rating}</p></li>
                                       
                                   </div>
                                </div>
                            )}
                        </div>
                    </ul>
            </div>
                
            
            
        );
    };


}

export default MovieRate;