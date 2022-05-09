import React from "react";

class Header extends React.Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark">
                     <a className="navbar-brand" href="/">Home: Consumo api mascotas php</a>
                    
                    <form className="form-block ">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 " type="submit">Search</button>
                    </form>
                    </nav>           
        );
    }
}

export default Header;