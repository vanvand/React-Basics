// When button gets clicked by user change name from Vanessa to Andrei

import React, { Component } from 'react'

export default class App extends Component {

  // whenever this app is build/initiated run this constructor function first
  constructor() {
    super();
    this.state = {
      name: {firstname: "Vanessa", lastname: "Domas"},
      company: "DreamFactory"
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}

          <p>Hi {this.state.name.firstname} {this.state.name.lastname}, I work at {this.state.company}</p>


          <button onClick={ () => {
            // a class component decides that it needs to re-render when the state is different, the way that it determines that the state is different is, when it sees that the state object is now a different object in memory.

                // this is not working because NOT a different moment in memory
                // this.state.name = "Andrei";
                
            // setState is a method > basic way to use it: give it an object which you want to shallow merge with your current state object
            // shallow merge = whichever value you pass to me inside this object, I am going to check through the state object to see if there are same keys > if there are same keys, I'm going to update your state keys with the new value.
            // React shallow merge does not pay attention to complexity of value, so if type/shape of updated object is different React will just update regardless of information/data loss, e.g. state object looks like this: {name: {firstName: "Yihua", lastName: "Zhang"}} and updated object looks like this: {name: "Andrei"} >> then it will just pass the single name value "Andrei"
              // this.setState({name: "Andrei"})
            this.setState({name: {firstname: "Andrei", lastname: "Neaogie"},});
            console.log(this.state)

            // ###########  ideal way to write setState in class component   ###########

            // once this console.log ran, we still seeing our old object values (Vanessa Domas) in the console, although the UI is rerendered and showing correct values (Andrei Neaogie)
            // JavaScript code typically happens in synchronous manner, meaning that it runs one by one, so in our callback function we're expecting we update the state and THEN console.log this start state
            // BUUUT state is not updated when console.log runs >> React batches these different setState calls so that is can determine what's the most optimal strategy for re-rendering the website is going to be (more performant) >> because one interaction might update the state of multiple components > run in asynchronous manner

            // we can pass two different arguments to setState: a function and a callback >> with that you are able to get a more consistent synchronous behavior
            // first function will perform the shallow merge
            // 2nd function = callback function make sure that the console.log is run AFTER the state is updated
            this.setState( 
              // 1st function
              (state, props) => { // state here is equal to current state, both optional
              return {
                name: {firstname: "Andrei", lastname: "Neaogie"},
              }
            },
            // 2nd function = callback (entirely optional)
            () => {
              console.log(this.state)
            })

          }}>Change Name</button>
        </header>
      </div>
    )
  }
}
