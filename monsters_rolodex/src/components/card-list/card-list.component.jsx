// alternative file names: card-list.jsx or index.js

import { Component } from "react";
import Card from "../card/card.component";
import "./card-list.styles.css";
import "../card/card.styles.css";

class CardList extends Component {

    render() {
        // render from CardList is called twice
        // components re-render when props different > when we first render our card list the monsters array is empty, after componentDidMount is called with setState the users are injected > props chaning > re-render
        console.log("render from CardList")

        // getting data passed from App.js with props with this.props.monsters 
        const { monsters } = this.props;
       
        return (
            <div className="card-list">
               { monsters.map ( (monster) => {
                    return (
                        <Card monster={monster} className="card-container" />
                    )
                })}
            </div>
        );
    }
}

export default CardList;

