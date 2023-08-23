import React, { useEffect, useState } from 'react';
import rightCue from './images/right-arrow-cue.png';

console.log('right cue', rightCue);

function Stroop({ trialData }) {
    const [currentTrial, setCurrentTrial] = useState(0);
    const [currentHtml, setCurrentHtml] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [responseTimes, setResponseTimes] = useState([]);

    useEffect(() => {
        if (currentTrial < trialData.length) {
            const trial = trialData[currentTrial];
            const preTargetDelay = 2000; // 2-second pre-target delay
            const trialTimeout = 10000; // 10-second trial timeout
            
            // Prepare html content based on trial data
            const arrowCue = trial.arrowCue;
            console.log('arrow cue', arrowCue);
            const targetSide = trial.targetSide;
            let targetStyle = {};
            
            if (targetSide === 'left') {
                targetStyle = { left: '15%' };
            } else if (targetSide === 'right') {
                targetStyle = { right: '15%' };
            }
            
            setCurrentHtml(
                <div className='experiment'>
                    <div className='cue'>
                        <img
                            src={rightCue}
                            className={arrowCue === 'left' ? 'flipped' : ''}
                            alt="Arrow Cue"
                        />
                    </div>
                    <div className='target' style={{ ...targetStyle, display: 'none' }}> </div>
                </div>
            );

            // Start the timer for the pre-target delay
            const preTargetTimerId = setTimeout(() => {
                // Show the target by updating the CSS display property
                setCurrentHtml(
                    <div className='experiment'>
                        <div className='cue'>
                            <img
                                src={rightCue}
                                className={arrowCue === 'left' ? 'flipped' : ''}
                                alt="Arrow Cue"
                            />
                        </div>
                        <div className='target' style={targetStyle}></div>
                    </div>
                );

                // Start the trial timer
                const trialTimerId = setTimeout(() => {
                    // Handle timeout, record response time
                    setResponseTimes(prevResponseTimes => [...prevResponseTimes, trialTimeout]);
                    
                    // Move onto the next trial
                    setCurrentTrial(currentTrial + 1);
                }, trialTimeout);

                setStartTime(Date.now());

                // Clean up trial timer on unmount or when trial changes
                return () => {
                    clearTimeout(trialTimerId);
                };
            }, preTargetDelay);

            // Clean up pre-target timer on unmount or when trial changes
            return () => {
                clearTimeout(preTargetTimerId);
            };
        }
    }, [currentTrial]);

    return currentHtml;
}

export default Stroop;
