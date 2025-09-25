import {NavLink} from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
const Header = ({onSearch}) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    onSearch(e.target.value);
  }


    return <><header className="navbar container">
        <nav><Link className="display-6 mx-2" to="/" style= {{fontFamily: "Brush Script MT"}}>Gatherly</Link></nav>
         <form className="d-flex" role="search">
        <input className="form-control mx-2 my-2" type="search" value={search} onChange={handleInputChange} placeholder="search by title and tags" aria-label="Search"/>
      </form>
        </header></>
};

export default Header;