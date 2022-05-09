import React from "react";
import Header from "../template/Header";

import { Apiurl } from "../services/apirest";
import axios from "axios";


class Dashboard extends React.Component{

    state={
        pets:[]
    }

    clickPet(id){
        this.props.history.push("editar/"+id)
    }

    componentDidMount(){
        let url = Apiurl+"pet.php?page=1";
        axios.get(url)
        .then(response =>{
            this.setState({
                pets : response.data
            })
        })

    }

    render(){
        return(
            <React.Fragment>
                <Header></Header>
                <div className="container">
                    <br></br>
                <table className="table table-hover">
                    <thead>
                        <tr className="table-primary">   
                            <th scope="col">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">PHOTO</th>                          
                            <th scope="col">TAGS</th>                        
                            <th scope="col">CATEGORY</th>
                            <th scope="col">STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.pets.map((value,index)=>{
                            return(
                                <tr key={index} onClick={()=>this.clickPet(value.id)}>                                 
                                    <td>{value.id}</td>                                    
                                    <td>{value.name}</td>                                    
                                    <td>{value.photoUrls}</td>                                    
                                    <td>{value.tags}</td>                                    
                                    <td>{value.category}</td>                                    
                                    <td>{value.status}</td>
                                </tr>

                            )
                        })}                 
                        
                    </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}
export default Dashboard;