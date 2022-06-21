// useState hook gives us a ability to encapsulate local state in a functional component
import { useState, useEffect } from "react";

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

// React is running the entire function (functional component) from top to bottom whenenver it renders or re-renders every single time (determiners for re-render: props change or state changes) (not only render part like within class component)
// state changes when value of useState is different to initial / previous value
export default function App() {

  // array desructuing from useState > assign variables to values inside of an array
    // const arr = [2,4] 
    // const [a,b] = arr
    // >> now a is equal to 2, b equal to 4
  // useState gives us back an array with two variables [value, setValue] > value = value we want to store, setValue is a function
  // in useState pass the initial value > here searchFiled which is empty string

  const [ searchField, setSearchField ] = useState("a"); 
  const [ monsters, setMonsters ] = useState([]);
  const [ filteredMonsters, setFilteredMonsters ] = useState(monsters);


  // data from outside give different array in memory > so react it re-rendering entire function ongoing (circular loop) > so we need to stop fetching data inside of functional component > we need to use side effects >> useEffect

  // useEffect hooks take two arguments: 
  // 1) callback function > code for the effect that we want to happen inside our functional component
  // 2) array of dependency > state values (searhField or monsters) or prop value > whenever any of the values change, callback function is run and with every re-render only the callback function is called
  useEffect( () => {
     fetch("https://jsonplaceholder.typicode.com/users")
      .then( (response) => response.json())
      .then( (users) => setMonsters(users));
  }, []); // passing no dependencies > so nothing should trigger to re-call this function ever again, only when function mounts. So now function will only run once (mounting) > data only retrieved once.

  // we only want to change the array of monsters when monsters or searchField change
  useEffect( () => {
    const newFilteredMonsters = monsters.filter( (monster)=> {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [ monsters, searchField]);


  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString)
  };


  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      
      <SearchBox 
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          classeName="monsters-search-box"
        />

        <CardList 
          monsters={filteredMonsters}
        />
      
    </div>
  )
}


// export default class App extends Component {

//   // whenever this app is build/initiated run this constructor function first
//   constructor() {
//     super();

//     // state object
//     this.state = {

//       // hardcoded data - not dynamic
//         //   monsters: [
//         //     {name: "Linda", id: "100"},
//         //     {name: "Frank", id: "101"},
//         //     {name: "Jacky", id: "102"},
//         //     {name: "Andrei", id: "103"},
//         //  ]

//      // dynamic data via API call > give back array of JSON objects
//      // initalize as empty array and fetch data in componentDidMount lifecycle method
//      monsters: [],

//     // whenever you're filtering down a list, you always want to filter from the full list. So we keep track of that in the state here
//      searchField: ""

//     };
//     // console.log("constructor")
//   }

//   // ### LIFECYCLE METHODS ####
//   // we want to get data the moment the app is mounted / rendered by react to display users as soon as possible
  
//   // Whatever is written in componentDidMount function will run after the component mount
//   // Mounting = first time a component gets placed onto the DOM (=renders component to page) only happens once throughout a components life
//   componentDidMount() {
//     // console.log("componentDidMount")

//     // once we fetch data it is a promise
//     fetch("https://jsonplaceholder.typicode.com/users")
//     // converting response over to json
//     .then( (response) => response.json())
//     // return another promise > whatever got returned from response.json is going to get passed to this users as the argument of our callback
//     .then( (users) => 
//       this.setState( 
//         () => {
//         return {monsters: users};
//         },
//         // () => {
//         //   console.log(this.state);
//         // }
//     ))
//   };

//   // try to avoid rendering anonymous function
//   // callback for anonymous function from onChange > to optimize performance, because when outside of render it is only initialized and called once. When in render it is initalized with every run.
//   onSearchChange = (event) => {
//           console.log(event.target.value);
//           // includes method is not case sensitive >> so put searchTerm and name to lower case
//           const searchField = event.target.value.toLocaleLowerCase();

//           this.setState( () => {
//             // return { monsters: filteredMonsters };
//             return { searchField };
//           })
//         }


//   render() {
//     // console.log("render from App.js")

//     // destructuring to get rid of "this.state." & "this." in our variable declaration > better readability
//     // instead of this.state.monsters > just monsters ...
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;


//     // filter on the monsters > if name includes searchString keep it, if it doesn't get rid of it. filteredMonsters will give us back a new array 
//     // important that it is new array, so that react consider it as change and re-render.     If you just increase or decrease the number of arrays in existing object, place in    memory won't change >> always use non-modifiying methods > concept called   immutability (create new array with modification)
//     // filer, map, reduce method
//     const filteredMonsters = monsters.filter( (monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });


//     return (
//       <div className="App">

//         <h1 className="app-title">Monster Rolodox</h1>

//         {/* ############## search bar ############## */}
//         <SearchBox 
//           onChangeHandler={onSearchChange} // recommended to call it Handler (optional > you can also call it onChange)
//           placeholder="search monsters"
//           classeName="monsters-search-box"
//         />

//         {/* ############## list of monsters ############## */}
//         {/* with props pass monster list to component */}
//         <CardList 
//           monsters={filteredMonsters}
//         />

//       </div>
//     )
//   }
// }

// // ##### order of running: ####
// // run constructor
// // run initial render (return search bar & card list with empty monsters array) > mounting of component 
// // trigger run componentDidMount > fetch users > call setState (update state triggers re-rendering)
// // call render again to re-render > monsters new updates user list
