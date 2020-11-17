import React from 'react'

export default class Cell extends React.Component {
  render() {
      const { x, y, step } = this.props;
      return (
          <div className="Cell" style={{
              left: `${step * x + 1}px`,
              top: `${step * y + 1}px`,
              width: `${step - 1}px`,
              height: `${step - 1}px`,
          }} />
      );
  }
}
