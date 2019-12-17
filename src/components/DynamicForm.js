import React, { Component } from 'react'
import './DynamicForm.css'

class DynamicForm extends Component {
    
    constructor(props) {
        super(props)
        var temp;
    
        this.state = {
        }
    }    
    
    onChange = (e,key) =>{
        this.setState({
            [key]: e.target.value
        })
        
    }

    onSubmit = (e) => {
        e.preventDefault();

        if(this.props.onSubmit) this.props.onSubmit(this.state);
    }

    drag = (event) => {
        // event.dataTransfer.setData("text",event.target.id)
        var style = window.getComputedStyle(event.target, null);
        var str = (parseInt(style.getPropertyValue("left")) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top")) - event.clientY) + ',' + event.target.id;
        event.dataTransfer.setData("Text",str);
        console.log(str)
    }
    drop = (event) => {
        // event.preventDefault();
        // var data = event.dataTransfer.getData("text");
        // event.target.appendChild(document.getElementById(data).cloneNode(true));
        // this.temp = document.getElementById(data).value 
        // console.log(this.temp)
        // let model = this.props.model
        // model.map((m) => {
        //     if(document.getElementById(data).id === m.key){        
        //         m.value=this.temp    
        //         console.log(m);   
        //     }  
            
        //  })
            event.preventDefault();
            var offset = event.dataTransfer.getData("Text").split(',');
            this.temp = document.getElementById(offset[2]).value 
            var dm = document.getElementById(offset[2]);  
            console.log(offset[2])

            dm.style.position = "absolute";
            dm.style.left = (event.clientX ) + 'px';
            dm.style.top = (event.clientY ) + 'px';
            event.target.appendChild(document.getElementById(offset[2]));
            
            let model = this.props.model
            model.map((m) => {
                if(document.getElementById(offset[2]).id === m.key){        
                    m.value=this.temp    
                    console.log(m);   
                }      
            })
            
            return false;
    }
    allowDrop = (event) => {
        event.preventDefault();
        return false;
    }
   
    renderForm = () => {
        let model = this.props.model;
        let formUI = model.map((m) => {
            let key = m.key;
            let type = m.type || "text";
            let props = m.props || {};

            return (
                <div key={key} className="form-group">
                    <label className="form-label" 
                        key={m.key}
                        htmlFor={m.key}>
                        {m.label}
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
            );
        });
        return formUI;
    }

    render() {
        let title = this.props.title || "Dynamic Form";
        return (
            <div className={this.props.children}>
                <h3 className="form-group">{title}</h3>
                <form className="dynamic-form" onSubmit={(e) => {this.onSubmit(e)}}>
                    {this.renderForm()}
                    <div>
                        <button draggable
                            onDragStart={this.drag}
                            type="submit" 
                            id="button"
                            className="form-group">
                            submit
                        </button>
                    </div>
                    <hr />
                    <div id="div1" onDrop={this.drop} onDragOver={this.allowDrop}>
                       
                    </div>
                    <hr />
                </form>
            </div>
        )
    }
}

export default DynamicForm
