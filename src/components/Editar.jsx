import axios from "axios";
import React from "react";
import { Apiurl } from "../services/apirest";
import Header from "../template/Header";


class Editar extends React.Component{

    state={
        form:{
            "id": "",
            "name": "",
            "category": "",
            "status": "",
            "photoUrls":"",
            "tags":""
        },
        error:false,
        errorMsg:""

    }
    manejadorChange = async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }
    manejadorSubmit2 =e=>{
        e.preventDefault();        
    }

    put=()=>{
        console.log(this.state.form)
        let url = Apiurl + "pet.php";
        axios.put(url,this.state.form)
        .then(response=>{
            console.log(response)

        })
    }

    componentDidMount(){
        let id = this.props.match.params.id;
        let url = Apiurl + "pet.php?id=" + id;
        axios.get(url)
        .then(response=>{
            this.setState({
                form:{                    
                    category: response.data[0].category,
                    id: response.data[0].id,
                    name: response.data[0].name,
                    status: response.data[0].status,
                    tags:response.data[0].tags
                }
            })
        });

    }
    render(){
        const form=this.state.form;
        return(
            <React.Fragment>
                <Header/>
                <div class="container">
                    <br/>
                    <h3>Editar Mascota</h3>
                    <br/>
                    <form className= "form-horizontal" onSubmit={this.manejadorSubmit2}>
                    <div class="row">                    
                        <div class="form-group col-md-6">
                            <label className="col-md-3 control-label">ID</label>
                            <input type="text"  class="form-control" placeholder="ID" name="id"
                            value={form.id}/>
                            
                            <label className="col-md-2 control-label">CATEGORIA</label>
                            <input type="text" class="form-control"  placeholder="CATEGORIA" name="category"
                                value={form.category}                                       
                                onChange={this.manejadorChange}/>                            
                        </div>
                        <br />
                        <div class="form-group col-md-6">
                            <div className="col-md-10">
                                <label className="col-md-2 control-label">NOMBRE</label>
                                <input type="text" class="form-control" placeholder="NOMBRE" name="name"
                            value={form.name}                                       
                            onChange={this.manejadorChange}/>                                
                            </div>   
                                <label className="col-md-2 control-label">STATUS</label> 
                                <div className="col-md-10">
                                <input type="text" class="form-control"  placeholder="STATUS" name="status"
                                value={form.status}                                       
                                onChange={this.manejadorChange}/>
                            </div>           
                        </div>
                        <br />
                        <div class="col-sm-12"> 
                            <label className="col-md-2 control-label">TAGS</label>
                            <input type="text"  class="form-control" placeholder="TAGS" name="tags"
                            value={form.tags}                                       
                            onChange={this.manejadorChange}/>

                            <label for="formFileMultiple" class="col-md-2 control-label">FOTO</label>
                            <input class="form-control" type="file" name="photoUrls" 
                            value={form.photoUrls}                                                                    
                            onChange={this.manejadorChange} 
                            />
                            
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-primary m-1" onClick={(this.put)}>Editar</button>
                    <button className="btn btn-danger m-1">Eliminar</button>
                        <a href="/dashboard" className="btn btn-dark m-3">Salir</a>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
export default Editar;