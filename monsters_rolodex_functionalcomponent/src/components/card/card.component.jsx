import "./card.styles.css";

// you can also further destructure and not define inside of function
    // export default function Card( { monster }) {
    // const { name, email, id } = monster;

export default function Card( { monster: { name, email, id } }) {

  return (
     <div className="card-container" key={id}>
        <img alt={`monster ${name}`} src={`https://robohash.org/${id}?set=set2&size=180x180`} />
        <h2>{name}</h2>
        <p>{email}</p>
    </div>  
  )
}
