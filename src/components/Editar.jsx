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

    convertirB64=(archivo)=>{
        Array.from(archivo).forEach(archivo=>{
            var reader = new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload= function(){
                var base64 = reader.result;
                console.log(base64);
            }
        })
    }

    put=()=>{
        let url = Apiurl + "pet.php";
        axios.put(url,this.state.form)
        .then(response=>{
            console.log(response)            
            this.props.history.push("/dashboard");
        })
    }

    delete=()=>{
        let url = Apiurl + "pet.php";        
        let id = this.props.match.params.id;
        let datos ={
            "id":id
        }
        axios.delete(url,{headers:datos})
        .then(response=>{
            this.props.history.push("/dashboard");
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
                    tags:response.data[0].tags,
                    photoUrls:response.data[0].photoUrls
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
                            <input type="text"  className="form-control" placeholder="ID" name="id"
                            defaultValue={form.id}/>
                            
                            <label className="col-md-2 control-label">CATEGORIA</label>
                            <input type="text" className="form-control"  placeholder="CATEGORIA" name="category"
                                defaultValue={form.category}                                       
                                onChange={this.manejadorChange}/>                            
                        </div>
                        <br />
                        <div class="form-group col-md-6">
                            <div className="col-md-10">
                                <label className="col-md-2 control-label">NOMBRE</label>
                                <input type="text" className="form-control" placeholder="NOMBRE" name="name"
                            defaultValue={form.name}                                       
                            onChange={this.manejadorChange}/>                                
                            </div>   
                                <label className="col-md-2 control-label">STATUS</label> 
                                <div className="col-md-10">
                                <input type="text" className="form-control"  placeholder="STATUS" name="status"
                                defaultValue={form.status}                                       
                                onChange={this.manejadorChange}/>
                            </div>           
                        </div>
                        <br />
                        <div class="col-sm-12"> 
                            <label className="col-md-2 control-label">TAGS</label>
                            <input type="text"  className="form-control" placeholder="TAGS" name="tags"
                            defaultValue={form.tags}                                       
                            onChange={this.manejadorChange}/>

                            <label for="formFileMultiple" className="col-md-2 control-label">FOTO</label>
                            <input className="form-control" type="file" name="photoUrls" 
                            onChange={(e)=>this.convertirB64(e.target.files)}
                            />
                            
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-primary m-1" onClick={(this.put)}>Editar</button>
                    <button className="btn btn-danger m-1" onClick={(this.delete)}>Eliminar</button>
                        <a href="/dashboard" className="btn btn-dark m-3">Salir</a>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}
export default Editar;