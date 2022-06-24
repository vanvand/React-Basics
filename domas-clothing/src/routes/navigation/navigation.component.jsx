// instead of using an outside <div> wrapped around entire app (as parent) we use Fragement = component which renderes to nothing mounting to the DOM; usefull if you don't want to render a specific HTML element
import { Fragment } from "react";
// import to use nested routes
// Link behaves like an anchor tag
import { Outlet, Link } from "react-router-dom";

// Images can be imported as Component
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg"

import "./navigation.styles.scss"

const Navigation = () => {
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
                <Link className="nav-link" to="/auth">
                    SIGN IN
                </Link>
            </div>
      </div>
      {/* rendering of nested routes */}
      <Outlet />
    </Fragment>
  )
};

export default Navigation;