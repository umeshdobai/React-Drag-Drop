import React, { Component } from 'react'
import Draggable from 'react-draggable';

class DraggableDemo extends Component {
    render() {
        return (
        <Draggable
            axis="both"
            handle=".handle"
            defaultPosition={{x: 0, y: 0}}
            position={null}
            grid={[25, 25]}
            scale={1}
            positionOffset= {{x: '10%', y: '10%'}}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
            <div>
            <div className="handle">Drag from here</div>
            </div>
        </Draggable>
        )
    }
}

export default DraggableDemo
