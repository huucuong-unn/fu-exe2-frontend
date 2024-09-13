import './styles.css';
import React from 'react';

class SuccessCircle extends React.Component {
    render = () => {
        return (
            <div className="content">
                <svg width="150" height="150" viewBox="0 0 400 400">
                    {/* Circle */}
                    <circle
                        fill="none"
                        stroke="#68E534"
                        strokeWidth="10"
                        cx="200"
                        cy="200"
                        r="100"
                        strokeLinecap="round"
                        transform="rotate(-90 200 200)"
                        className="circle"
                    />
                    {/* Tick */}
                    <polyline
                        fill="none"
                        stroke="#68E534"
                        points="160,210 185,235 240,180"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tick"
                    />
                </svg>
            </div>
        );
    };
}

export default SuccessCircle;
