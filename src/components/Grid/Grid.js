import React from 'react'
import './Grid.css'

const WIDTH = 800
const HEIGHT = 600
const CELL_WIDTH = 20

export default class Grid extends React.Component {
    render() {
        return (
            <div 
                className='Grid'
                style={{width: WIDTH, height: HEIGHT}}> 
            </div>
        )
    }
}