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
  // add title - was added to show re-rendering with changing the page flow > whole page is reloading when first letter of title is entered, due h1 is their as element, but has no height, so then it gets height and therewith is added to pageflow 
  // what is re-rendered can be seen with "paint flashing...find in inspect tool > three dots > more tools > rendering
  const [ title, setTitle ] = useState("");
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

  const onTitleChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setTitle(searchFieldString)
  };

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      
      <SearchBox 
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          classeName="monsters-search-box"
        />

      <br />

      <SearchBox 
          onChangeHandler={onTitleChange}
          placeholder="search title"
          classeName="title-search-box"
        />

        <CardList 
          monsters={filteredMonsters}
        />
      
    </div>
  )
}