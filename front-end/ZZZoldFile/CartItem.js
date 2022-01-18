import "./CartItem.css";
import { Link } from "react-router-dom";
const CartItem = () => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img
          src="https://images.unsplash.com/photo-1641304266009-404efd34d401?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ1fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt="paint"
        />
      </div>
      <Link to={`/products/${111}`} className="cartitem__name">
        <p>picture 1</p>
      </Link>

      <p className="cartitem__price">$19.99</p>

      <select className="cartitem__select">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <button className="cartitem__deleteBtn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
