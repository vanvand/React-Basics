import "./from-input.style.scss"

const FormInput = ( {label, ...otherProps }) => {
    return (
    <div className="group">

        <input
            className="form-input" 
            // instead of this > use spread operator
            // type="text" required onChange={handleChange} name="displayName" value={displayName}
            { ...otherProps }
        />
        
        {/* if label exist, then render this */}
        { label && (  
        
        <label 
            // if value.length not zero, means it exists (=user typed sth) then I want the label to shrink
            className={`${
                otherProps.value.length ? "shrink" : ""
                } form-input-label`}
        >
            {label}
        </label>
        )}
        
    </div>
    );
};

export default FormInput