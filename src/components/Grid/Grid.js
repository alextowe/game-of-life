import React from 'react'
import './Grid.css'
import Cell from '../Cell/Cell'

const WIDTH = 800
const HEIGHT = 600
const CELL_WIDTH = 20

export default class Grid extends React.Component {
    constructor() {    
        super();    
        this.rows = HEIGHT / CELL_WIDTH;    
        this.cols = WIDTH / CELL_WIDTH;    
        this.grid = this.makeEmptyGrid();
    }

    state = {    
        cells: [],  
    }

    makeEmptyGrid() {
        let grid = [];
        for (let y = 0; y < this.rows; y++) {
            grid[y] = [];
            for (let x = 0; x < this.cols; x++) {
                grid[y][x] = false;
            }
        }

        return grid;
    }

    getElementOffset() {
        const rect = this.gridRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    makeCells() {    
        let cells = [];    
        for (let y = 0; y < this.rows; y++) {      
            for (let x = 0; x < this.cols; x++) {        
                if (this.grid[y][x]) {          
                    cells.push({ x, y });        
                }      
            }    
        }    
        return cells;  
    }

    handleClick = (event) => {
        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_WIDTH);
        const y = Math.floor(offsetY / CELL_WIDTH);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.grid[y][x] = !this.grid[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    render() {
        const { cells } = this.state;
        return (
            <div 
                className='Grid'
                style={{
                    width: WIDTH, 
                    height: HEIGHT, 
                    backgroundSize: `${CELL_WIDTH}px ${CELL_WIDTH}px`}}
                    onClick={this.handleClick}        
                    ref={(n) => { this.gridRef = n; }}> 

                {cells.map(cell => (
                    <Cell CELL_WIDTH={CELL_WIDTH} x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                ))}
            </div>
        )
    }
}