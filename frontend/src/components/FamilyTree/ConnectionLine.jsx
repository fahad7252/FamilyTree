

import React from 'react';
import './ConnectionLine';

const ConnectionLine = ({ start, end, isDashed = false }) => {
    return (
        <svg 
            className="connection-line"
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                pointerEvents: 'none',
                overflow: 'visible',
                zIndex: 0
            }}
        >
            
            <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="white"
                strokeWidth="4"
            />
          
            <line
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#000000"
                strokeWidth="2"
                strokeDasharray={isDashed ? "5,5" : ""}
            />
           
            <circle cx={start.x} cy={start.y} r="4" fill="#000000" />
            <circle cx={end.x} cy={end.y} r="4" fill="#000000" />
        </svg>
    );
};

export default ConnectionLine;