import { Link, useLocation } from "react-router-dom";
import logoImage from '/src/assets/logos/heart-logo.PNG';
import "./Header.scss"

function Header() {
const location = useLocation();
    
  return (
    <div className="header">
        <Link to="/" className="header__logo">
            <img src = {logoImage} alt ="Logo" width ="35" height="30" /> 
        </Link>
        <div className="nav">
            <Link to="/" className={`nav__link ${
              location.pathname === "/" ? "nav--clicked" : ""
            }`}>
                <div>Home</div> 
            </Link>
            <Link to="/topic" className={`nav__link ${
              location.pathname === "/topic" || location.pathname.includes("topic") || location.pathname.includes("research") || location.pathname.includes("write") || location.pathname.includes("edit") 
              ? "nav--clicked" : ""
            }`}>
                <div>Write</div> 
            </Link>
            <Link to="/blogs" className={`nav__link ${
              location.pathname === "/blogs" ? "nav--clicked" : ""
            }`}>
                <div>Profile</div> 
            </Link>
        </div>
    </div>
    
  )
}

export default Header