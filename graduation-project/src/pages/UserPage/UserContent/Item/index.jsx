import React, { Component } from 'react'
import "./index.css"
export class Item extends Component {
    render() {
        return (
            <div className='item'>
                {this.props.label}
            </div>
        )
    }
}

export default Item
