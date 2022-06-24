// to track input fields
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import Button from "../button/button.component";


// initalized form values
const defaultFormFields = {
    email: "",
    password: "",
}

const SignInForm = () => {

    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields; 

    console.log(formFields)

    const resetFormField = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);

            resetFormField();

        } catch(error) {
            // there is no compiled list of possible error codes within firebase
            switch(error.code) {
                case "auth/user-not-found":
                    alert("no user associated with this email");
                    break
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break
                default:
                    console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields( {...formFields, [name]: value} )

    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
                {/* further checked, e.g lenght go here in inpt */}


            <div className="buttons-container">               
                {/* when button with type submit is clicked run onSubmit callback */}
                {/* here you can enter the buttonType if needed, without it will be default button */}
                <Button type="submit">Sign In</Button>

                {/* type="button" needs to be added to prevent browser throwing errors behind the google sign in window */}
                <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google sign In</Button>
            </div>
            
            </form>
        </div>
    )
}

export default SignInForm