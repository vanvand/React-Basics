// Monster Rolodex shows you a bunch of user profiles (monsters)

// we render a search bar and a list of monsters. Both are tied together. To make them reusable we can put them in components


import { Component } from 'react'
import './App.css';


export default class App extends Component {

  // whenever this app is build/initiated run this constructor function first
  constructor() {
    super();

    // state object
    this.state = {

      // hardcoded data - not dynamic
        //   monsters: [
        //     {name: "Linda", id: "100"},
        //     {name: "Frank", id: "101"},
        //     {name: "Jacky", id: "102"},
        //     {name: "Andrei", id: "103"},
        //  ]

     // dynamic data via API call > give back array of JSON objects
     // initalize as empty array and fetch data in componentDidMount lifecycle method
     monsters: [],

    // whenever you're filtering down a list, you always want to filter from the full list. So we keep track of that in the state here
     searchField: ""

    };
    console.log("constructor")
  }

  // ### LIFECYCLE METHODS ####
  // we want to get data the moment the app is mounted / rendered by react to display users as soon as possible
  
  // Whatever is written in componentDidMount function will run after the component mount
  // Mounting = first time a component gets placed onto the DOM (=renders component to page) only happens once throughout a components life
  componentDidMount() {
     console.log("componentDidMount")

    // once we fetch data it is a promise
    fetch("https://jsonplaceholder.typicode.com/users")
    // converting response over to json
    .then( (response) => response.json())
    // return another promise > whatever got returned from response.json is going to get passed to this users as the argument of our callback
    .then( (users) => 
      this.setState( 
        () => {
        return {monsters: users};
        },
        () => {
          console.log(this.state);
        }
    ))
  };

  // try to avoid rendering anonymous function
  // callback for anonymous function from onChange > to optimize performance, because when outside of render it is only initialized and called once. When in render it is initalized with every run.
  onSearchChange = (event) => {
          console.log(event.target.value);
          // includes method is not case sensitive >> so put searchTerm and name to lower case
          const searchField = event.target.value.toLocaleLowerCase();

          this.setState( () => {
            // return { monsters: filteredMonsters };
            return { searchField };
          })
        }


  render() {
    console.log("render from App.js")

    // destructuring to get rid of "this.state." & "this." in our variable declaration > better readability
    // instead of this.state.monsters > just monsters ...
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;


    // filter on the monsters > if name includes searchString keep it, if it doesn't get rid of it. filteredMonsters will give us back a new array 
    // important that it is new array, so that react consider it as change and re-render.     If you just increase or decrease the number of arrays in existing object, place in    memory won't change >> always use non-modifiying methods > concept called   immutability (create new array with modification)
    // filer, map, reduce method
    const filteredMonsters = monsters.filter( (monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });


    return (
      <div className="App">

        {/* ############## search bar ############## */}
        <input 
        className="search-box" 
        type="search" 
        placeholder="search monsters" 
        onChange={onSearchChange}/>


        {/* ############## display ob monsters ############## */}
        {/* Anytime you use the map() function inside of render, or you have a list of the same jsx elements one after another, they need a key attribute (and CRA will warn you about it if you miss it) */}
        {/* key property should be some unique string/integer value (will transform it in string value)*/}
        {/* react uses key to optimise (re-)rendering to just re-render the specific updated value - differentiate value by unique key value*/}


        {/* {this.state.monsters.map( (monster) => { */}
          {filteredMonsters.map( (monster) => {
          return (
          <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>
          );
          })}


      </div>
    )
  }
}

// ##### order of running: ####
// run constructor
// run initial render > mounting of component 
// trigger run componentDidMount > fetch users > call setState (update state triggers re-rendering)
// call render again to re-render > monsters new updates user list
