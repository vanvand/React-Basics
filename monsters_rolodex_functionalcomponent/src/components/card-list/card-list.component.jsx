import Card from "../card/card.component";
import "./card-list.styles.css";

// instead of this, we can also use destructuring
// export default function CardList(props, forwardRef) {
//      const { monsters } = props;

export default function CardList( { monsters } ) {
    return (
            <div className="card-list">
               { monsters.map ( (monster) => {
                    return(
                        <Card monster={monster} />
                        ) 
                })}
            </div>
            );
};

