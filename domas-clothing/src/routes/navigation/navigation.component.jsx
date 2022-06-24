// instead of using an outside <div> wrapped around entire app (as parent) we use Fragement = component which renderes to nothing mounting to the DOM; usefull if you don't want to render a specific HTML element
import { Fragment, useContext } from "react";
// import to use nested routes
// Link behaves like an anchor tag
import { Outlet, Link } from "react-router-dom";

import { UserContext } from "../../contexts/user.context";

// Images can be imported as Component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"
import { signOutUser } from "../../utils/firebase/firebase.utils"; 

import "./navigation.styles.scss"

const Navigation = () => {

  // context - whenever UserContext updates > update currentUser > this hook is needed to re-render the page after user sign-in (render sing-out button instead of sign-in)
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log(currentUser)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <Fragment>
      <div className="navigation">

            {/* Logo */}
            <Link className="logo-container" to="/">
              <CrwnLogo className="logo"/>
            </Link>

            {/* Navigation Links */}
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">
                    SHOP
                </Link>
                
                {/* if the currentUser exist render Sign Out link, if not Sign In */}
                {currentUser ? (
                    <span className="nav-link" onClick={signOutHandler}>SIGN OUT</span> 
                  ): (
                    <Link className="nav-link" to="/auth">SIGN IN</Link>
                  )}
                
            </div>
      </div>
      {/* rendering of nested routes */}
      <Outlet />
    </Fragment>
  )
};

export default Navigation;