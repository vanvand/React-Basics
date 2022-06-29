import { useContext } from "react";
import { useNavigate } from "react-router-dom"

import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

import CartItem from "../cart-item/cart-item.component";

import "./cart-dropdown.styles.scss";


const CartDropdown = () => {

    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout")
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {/* we need to map over some kind of array and for every item that we map through we want to pass it to CartItem. The array is not just products, it has quantity */}
                {cartItems.map(item => (
                <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown