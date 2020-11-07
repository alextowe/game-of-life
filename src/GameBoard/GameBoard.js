import React from 'react'
import './GameBoard.css'

//temporary values for the board until controls are setup
const WIDTH = 800
const HEIGHT = 600
const CELL_WIDTH = 20

class Cell extends React.Component {

  render() {
      const { x, y } = this.props;
      return (
          <div className="Cell" style={{
              left: `${CELL_WIDTH * x + 1}px`,
              top: `${CELL_WIDTH * y + 1}px`,
              width: `${CELL_WIDTH - 1}px`,
              height: `${CELL_WIDTH - 1}px`,
          }} />
      );
  }
}

export default class GameBoard extends React.Component {
  constructor(props) {
    super(props)
    this.rows = HEIGHT / CELL_WIDTH
    this.cols = WIDTH / CELL_WIDTH
    this.grid = this.makeEmptyGrid()
  }

  state = {
    cells: [],
    interval: 100,
    isRunning: false,
  }

  makeEmptyGrid() {
    let grid = []
    for (let y = 0; y < this.rows; y++) {
      grid[y] = []
      for (let x = 0; x < this.cols; x++) {
        grid[y][x] = false
      }
    }
    return grid
  }

  makeCells() {
    let cells = []
    for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            if (this.grid[y][x]) {
                cells.push({ x, y })
            }
        }
    }
    return cells
  }

  getElementOffset() {
    const rect = this.gridRef.getBoundingClientRect()
    const doc = document.documentElement;

    return {
        x: (rect.left + window.pageXOffset) - doc.clientLeft,
        y: (rect.top + window.pageYOffset) - doc.clientTop,
    }
  }

  handleClick = (event) => {

    const elemOffset = this.getElementOffset()
    const offsetX = event.clientX - elemOffset.x
    const offsetY = event.clientY - elemOffset.y
    
    const x = Math.floor(offsetX / CELL_WIDTH)
    const y = Math.floor(offsetY / CELL_WIDTH)

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
        this.grid[y][x] = !this.grid[y][x]
    }

    this.setState({ cells: this.makeCells() })
  }

  runGame = () => {
    this.setState({isRunning:true});
  }

  stopGame = () => {
    this.setState({isRunning: false});
  }

  handleIntervalChange = (event) => {
    this.setState({interval: event.target.value})
  }

  render () {
    const { cells } = this.state
    return (
      <>
        <div className='GameBoard'
          style={{ width: WIDTH, height: HEIGHT,
          backgroundSize: `${CELL_WIDTH}px ${CELL_WIDTH}px`}}
          onClick={this.handleClick}        
          ref={(n) => { this.gridRef = n; }}
        >
          {cells.map(cell => (
            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
          ))}
        </div>
        <div className='controls'>
            Update every <input value={this.state.interval} onChange={this.handleIntervalChange}/>
            {isRunning ? 
              <button className='button'>Stop</button> :
              <button className='button'>Run</button>
            }
            

        </div>
      </>
    )
  }
}

