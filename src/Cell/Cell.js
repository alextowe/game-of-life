import React from 'react'

export default class Cell extends React.Component {
  render() {
      const { x, y, cell, step } = this.props;
      return (
          <div className="Cell" style={{
              left: `${step * cell.x + 1}px`,
              top: `${step * cell.y + 1}px`,
              width: `${step - 1}px`,
              height: `${step - 1}px`,
          }} />
      );
  }
}
