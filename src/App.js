import React from 'react'
import './App.css'
import GameBoard from './GameBoard/GameBoard'

export default class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <GameBoard />
      </div>
    )
  }
}

