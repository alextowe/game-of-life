import React from 'react'
import Cell from './Cell/Cell'

export default class Grid extends React.Component {
  makeNewGrid() {
    let grid = []
    for (let y = 0; y < this.props.rows; y++) {
      grid[y] = []
      for (let x = 0; x < this.props.cols; x++) {
        grid[y][x] = <Cell key={`${x},${y}`} x={x} y={y} step={10} />
      }
    }
    console.log(grid)
    return grid
  }

  render() {
    return (
      <section 
        className='Grid'
        style={{ width: window.innerWidth, height: window.innerHeight}}
        onClick={this.handleClick}        
        ref={(n) => { this.gridRef = n; }}
      >
        {this.makeNewGrid()}
      </section>
    )
  } 

}