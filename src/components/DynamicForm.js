import React, { Component } from 'react'
import './DynamicForm.css'

class DynamicForm extends Component {
    
    constructor(props) {
        super(props)
        var temp;
        var res;
        var resArray = [];
    
        this.state = {
            status: false,
            res: res,
            resArray: resArray
        }
    }    
    
    onChange = (e,key) =>{
        this.setState({
            [key]: e.target.value
        })
        
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        // if(this.props.onSubmit) this.props.onSubmit(this.state);
    }

    drag = (event) => {
        console.log(event.target)
        event.dataTransfer.setData("textId",event.target.id)    
        // event.target.id = "newId";
        // var tempId = event.target.id
        // console.log(event.target)

        var style = window.getComputedStyle(event.target, null);
        var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
        event.dataTransfer.setData("text",str);
        console.log(str)
    }
    drop = (event) => {
        // event.preventDefault();
        var data = event.dataTransfer.getData("textId");
        console.log(data)
        console.log(document.getElementById(data))
        var cln = document.getElementById(data).cloneNode(true);
        console.log(cln)
        document.getElementById("test").appendChild(cln)
        console.log(event.target)

        
        // event.target.append(document.getElementById(data).cloneNode(true));
        // this.temp = document.getElementById(data).value 
        //console.log(this.temp)
        //let model = this.props.model
        // model.map((m) => {
        //     if(document.getElementById(data).id === m.key){        
        //         m.value=this.temp    
        //         console.log(m);
        //         this.res = m;

        //     }  
            
        //  })

            event.preventDefault();
            var offset = event.dataTransfer.getData("text").split(',');
            this.temp = document.getElementById(offset[2]).value 
            var dm = document.getElementById(offset[2]);

            dm.style.position = "absolute";
            dm.style.left = (event.clientX ) + 'px';
            dm.style.top = (event.clientY ) + 'px';
            event.target.appendChild(document.getElementById(offset[2]));
            
            let resArray1 = [];
            resArray1 = this.state.resArray;
            let model = this.props.model
            model.map((m) => {
                if(document.getElementById(offset[2]).id == m.key){        
                    m.value=this.temp    
                    this.res = m;
                    console.log(m)
                    this.state.resArray.push(m)   
                }      
            })
            this.setState({resArray : resArray1})
            
            this.setState({status: true})
            return false;
        
    }
    allowDrop = (event) => {
        event.preventDefault();
        return false;
    }

    previewForm = () => {
        console.log(this.state.resArray)
        let previewFormUI = this.state.resArray.map( (m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};

            return (
                <div key={key}>
                    <label className="form-label" 
                        key={m.key}
                        htmlFor={m.key}>
                        {m.label}
                    </label>
                    
                    <input {...props}
                        ref={(key) => {this[m.key]=key}} 
                        style={{left: 0, top : 0}}
                        type={type}
                        id={key}
                        onChange={(e) => {this.onChange(e,key)}}
                    />
                </div>
            );
        })
        return previewFormUI;
    }
   
    renderForm = () => {
        let model = this.props.model;
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};

            return (
                <React.Fragment>
                <div key={key} className="form-group" id = "test">
                    <label className="form-label" 
                        key={m.key}
                        htmlFor={m.key}>
                        <b>{m.label}</b>
                    </label>
                    
                    <input {...props}
                        ref={(key) => {this[m.key]=key}} 
                        className="handle"
                        style={{left: 0, top : 0}}
                        type={type}
                        id={key}
                        onChange={(e) => {this.onChange(e,key)}}
                        draggable = "true"
                        onDragStart={this.drag}
                    />
                </div>
                <div>
                <button 
                    draggable = "true"
                    onDragStart={this.drag}
                    type={type} 
                    id={key}
                    className="form-group">
                    submit
                </button>
            </div>
            </React.Fragment>
            );
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Dynamic Form";
        return (
            <div>
            <div className={this.props.children}>
                <h3 className="form-group">{title}</h3>
                <form className="dynamic-form" onSubmit={(e) => {this.onSubmit(e)}}>
                    {this.renderForm()}
                    
                    <hr />
                    <div className="container" id="div1" onDrop={this.drop} onDragOver={this.allowDrop}>
                        
                    </div>
                    <hr />  
                </form>  
                
            </div>
            <div  className="previewForm">
                <u>Rendering dropped element:</u>
                {
                    this.state.status ? (<React.Fragment>{this.previewForm()}</React.Fragment>) : (<React.Fragment></React.Fragment>)
                }
            </div>
        </div>
        )
    }
}

export default DynamicForm
