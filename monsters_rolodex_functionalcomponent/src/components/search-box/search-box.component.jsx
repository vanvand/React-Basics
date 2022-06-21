import "./search-box.styles.css"

export default function SearchBox( { className, placeholder, onChangeHandler}) {
  return (
     <input
            // use props for all NON-STATIC values (dynamic values)
                className={`search-box ${className}`} 
                type="search" // will add x to clear the search box
                placeholder={placeholder}
                onChange={onChangeHandler}
            />
  )
}
