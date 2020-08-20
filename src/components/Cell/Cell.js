import React from 'react'
import './Cell.css'

export default class Cell extends React.Component {

    render() {
        const { x, y, CELL_WIDTH } = this.props;
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