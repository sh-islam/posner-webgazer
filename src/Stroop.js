import React, { useEffect, useState } from 'react';
import rightCue from './images/right-arrow-cue.png';


const webgazer = window.webgazer;

function Stroop({ trialData, completeTrials}) {
    const [currentTrial, setCurrentTrial] = useState(0);
    const [currentHtml, setCurrentHtml] = useState(null);
    const [responseTimes, setResponseTimes] = useState([]);
    const [trialStartTime, setTrialStartTime] = useState(null); // Store trial start time

    // Gaze collision detection logic
    useEffect(() => {
        if (currentTrial === trialData.length) {
            completeTrials(responseTimes);
            return; // No need to check collision if we've exhausted all trials
        }
        let collisionHandled = false;
        let collisionTimeoutId;

        const gazeListener = (data) => {
            if (collisionHandled) return;

            const gazeX = data.x;
            const gazeY = data.y;

            const targetElement = document.querySelector('.target');
            const targetRect = targetElement.getBoundingClientRect();

            const expandedWidth = targetRect.width * 2;
            const expandedHeight = targetRect.height * 2;

            const expandedLeft = targetRect.left - (expandedWidth - targetRect.width) / 2;
            const expandedTop = targetRect.top - (expandedHeight - targetRect.height) / 2;

            if (
                gazeX >= expandedLeft &&
                gazeX <= expandedLeft + expandedWidth &&
                gazeY >= expandedTop &&
                gazeY <= expandedTop + expandedHeight
            ) {
                // console.log("Collision");
                const collisionTime = Date.now();
                const responseTime = collisionTime - trialStartTime;
                setResponseTimes(prevResponseTimes => [...prevResponseTimes, responseTime]);
                clearTimeout(collisionTimeoutId); // Clear the timeout if a collision occurs
                collisionHandled = true;
                webgazer.clearGazeListener();
                setCurrentTrial(currentTrial + 1);
            }
        };

        webgazer.setGazeListener(gazeListener);

        // Set a timeout for 10 seconds to handle cases where no collision occurs
        collisionTimeoutId = setTimeout(() => {
            if (!collisionHandled) {
                const noCollisionResponseTime = 10000; // 10 seconds in milliseconds
                setResponseTimes(prevResponseTimes => [...prevResponseTimes, noCollisionResponseTime]);
                webgazer.clearGazeListener();
                setCurrentTrial(currentTrial + 1);
            }
        }, 10000); // 10 seconds in milliseconds

        // Clean up gaze listener and timeout on component unmount
        return () => {
            webgazer.clearGazeListener();
            clearTimeout(collisionTimeoutId);
        };
    }, [trialStartTime, currentTrial, trialData, completeTrials, responseTimes]);


 // Trial logic
 useEffect(() => {
    if (currentTrial < trialData.length) {
        const trial = trialData[currentTrial];
        const preCueDelay = 3000; // 3-second pre-cue delay/ duration of fixation point
        const preTargetDelay = 3000; // 3-second pre-target delay

        // Prepare html content based on trial data
        const arrowCue = trial.arrowCue;
        const targetSide = trial.targetSide;
        let targetStyle = {};

        if (targetSide === 'left') {
            targetStyle = { left: '15%' };
        } else if (targetSide === 'right') {
            targetStyle = { right: '15%' };
        }

        // Prepare the content for the pre-cue phase (showing fixation pt, hiding cue and targets)
        const preCueHtml = (
            <div className='experiment'>
                <div className='cue'>
                    <p>+</p>
                </div>
                <div className='target' style={{ ...targetStyle, display: 'none' }}></div>
            </div>
        );
        setCurrentHtml(preCueHtml);
        webgazer.resume();

        // Start the timer for the pre-cue delay (showing cue, hiding fixation pt and targets)
        const preCueTimerId = setTimeout(() => {
            // Prepare the content for the pre-target phase
            const preTargetHtml = (
                <div className='experiment'>
                    <div className='cue'>
                        <img
                            src={rightCue}
                            className={arrowCue === 'left' ? 'flipped' : ''}
                            alt="Arrow Cue"
                        />
                    </div>
                    <div className='target' style={{ ...targetStyle, display: 'none' }}></div>
                </div>
            );
            setCurrentHtml(preTargetHtml);

            // Start the timer for the pre-target delay.
            const preTargetTimerId = setTimeout(() => {
                // Prepare the content for the target phase 
                const targetHtml = (
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
                setCurrentHtml(targetHtml);

                // Start the trial
                const startTime = Date.now();
                setTrialStartTime(startTime);

            }, preTargetDelay);

            // Clean up pre-target timer on unmount or when trial changes
            return () => {
                clearTimeout(preTargetTimerId);
            };

        }, preCueDelay);

        // Clean up pre-cue timer on unmount or when trial changes
        return () => {
            clearTimeout(preCueTimerId);
        };

    } else {
        webgazer.end();
    }
}, [currentTrial, trialData]);

    // console.log('RT state array:', responseTimes);

    return currentHtml;
}

export default Stroop;
