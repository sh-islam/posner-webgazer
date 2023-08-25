import React, { useEffect, useState } from 'react';
import './Calibration.css';
window.saveDataAcrossSessions = true;

function Calibration({ completeCalibration }) {
    const [divClicks, setDivClicks] = useState(Array(9).fill(0));

    const handleDivClick = (index) => {
        if (divClicks[index] < 10) {
            const newClicks = [...divClicks];
            newClicks[index]++;
            setDivClicks(newClicks);
        }
    };

    const allDivsComplete = divClicks.every(clicks => clicks === 10);

    const webgazer = window.webgazer;
    useEffect(() => {
        webgazer.setGazeListener((data, clock) => {
            webgazer.showVideo(true);
            
            window.saveDataAcrossSessions = true; // save data for real experiment
        }).begin();

        return () => {
            webgazer.pause(); // Cleanup function to stop webgazer when component unmounts
        };
    }, []);

    
    return (
        <div className='calibration'>
            <button
                className={`top-left ${divClicks[0] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(0)}
            ></button>
            <button
                className={`top-mid ${divClicks[1] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(1)}
            ></button>
            <button
                className={`top-right ${divClicks[2] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(2)}
            ></button>
            <button
                className={`mid-left ${divClicks[3] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(3)}
            ></button>
            <button
                className={`mid-mid ${divClicks[4] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(4)}
            ></button>
            <button
                className={`mid-right ${divClicks[5] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(5)}
            ></button>
            <button
                className={`bot-left ${divClicks[6] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(6)}
            ></button>
            <button
                className={`bot-mid ${divClicks[7] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(7)}
            ></button>
            <button
                className={`bot-right ${divClicks[8] === 10 ? 'complete' : ''}`}
                onClick={() => handleDivClick(8)}
            ></button>
            {allDivsComplete && (
                <button className='completeCalibrationBtn' type="button" onClick={completeCalibration}>
                    Complete calibration
                </button>
            )}
        </div>
    );
}

export default Calibration;
