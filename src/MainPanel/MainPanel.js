import React from 'react'
import './MainPanel.css'
import Grid from '../Grid'
import Cell from '../Cell/Cell'

export default class MainPanel extends React.Component {
  constructor(props) {
    super(props)
    this.rows = window.innerHeight / this.state.step
    this.cols = window.innerWidth / this.state.step
  }

  state = {
    step: 10,
    interval: 100,
    isRunning: false,
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
    
    const x = Math.floor(offsetX / this.state.step)
    const y = Math.floor(offsetY / this.state.step)

    if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
        this.grid[y][x] = !this.grid[y][x]
    }

    this.setState({ cells: this.makeCells() })
  }

  runGame = () => {
    this.setState({isRunning: true})
    this.runIteration()
  }

  stopGame = () => {
    this.setState({isRunning: false})
    if (this.timeoutHandler) {      
      window.clearTimeout(this.timeoutHandler)      
      this.timeoutHandler = null
    }
  }

  runIteration() {
    let newGrid = this.makeNewGrid()

    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        let neighbors = this.calculateNeighbors(this.grid, x, y)
        if (this.grid[y][x]) {
          if (neighbors === 2 || neighbors === 3) {
            newGrid[y][x] = true
          } else {
            newGrid[y][x] = false
          }
        } else {
          if (!this.grid[y][x] && neighbors === 3) {
            newGrid[y][x] = true
          }
        }
      }
    }
    this.grid = newGrid    
    this.setState({ cells: this.makeCells() })

    this.timeoutHandler = window.setTimeout(() => {      
      this.runIteration()    
    }, this.state.interval)  
  }

  calculateNeighbors(grid, x, y) {
    let neighbors = 0
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

    for (let i = 0; i < dirs.length; i++) {
      const dir = dirs[i]
      let y1 = y + dir[0]
      let x1 = x + dir[1]

      if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && grid[y1][x1]) {
        neighbors++
      }
    }

    return neighbors
  }

  handleStepChange = (event) => {
    this.setState({step: event.target.value})
  }

  handleIntervalChange = (event) => {
    this.setState({interval: event.target.value})
  }

  handleClear = () => {
    this.grid = this.makeNewGrid()
    this.setState({ cells: this.makeCells()})
  }

  handleRandom = () => {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.grid[y][x] = (Math.random() >= 0.5)
      }
    }
  }

  render() {
      
    const { step, interval, isRunning } = this.state
      return (
        <div className='MainPanel'>
          <section className='Controls'>
            <p className='control'>Grid size: <input value={step}  type="range" min="5" max="15" className="slider" id="stepSlider" onChange={this.handleStepChange}/></p>
            <p className='control'>Update every <input value={interval} onChange={this.handleIntervalChange}/> msec</p>
          
            {isRunning ? 
              <button className='button control' onClick={this.stopGame}>Stop</button> :
              <button className='button control' onClick={this.runGame}>Run</button>
            }

            <button className='button control' onClick={this.handleRandom}>Random</button>
            <button className='button control' onClick={this.handleClear}>Clear</button>
          </section>
          <Grid rows={this.rows} cols={this.cols} />
      </div>
      )
  }
}
