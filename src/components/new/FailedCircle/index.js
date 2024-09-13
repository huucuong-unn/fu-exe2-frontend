import './styles.css';
import React from 'react';

class FailedCircle extends React.Component {
    render = () => {
        return (
            <div className="content">
                <svg width="150" height="150" viewBox="0 0 400 400">
                    {/* Circle */}
                    <circle
                        fill="none"
                        stroke="#FF0000"
                        strokeWidth="10"
                        cx="200"
                        cy="200"
                        r="100"
                        strokeLinecap="round"
                        transform="rotate(-90 200 200)"
                        className="circle"
                    />
                    <polyline
                        fill="none"
                        stroke="#FF0000"
                        points="150,150 250,250"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="tick"
                    />
                    <polyline
                        fill="none"
                        stroke="#FF0000"
                        points="250,150 150,250"
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

export default FailedCircle;
