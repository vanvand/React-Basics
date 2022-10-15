import { Component } from 'react';
import "./card.styles.css";

class Card extends Component {
    render() {

        // as soon as two keys are used it is good practice to destructure it, to reuse it easily > for that cast it as variable
        const { name, email, id } = this.props.monster;
        
        return (
              <div className={this.props.className} key={id}>
                       <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
                       <h2>{name}</h2>
                       <p>{email}</p>
                   </div>  
        );
    }
}

export default Card;