import React, { useState, useEffect } from 'react';
import Stroop from './Stroop';
import Calibration from './Calibration';
import Results from './Results'
import BlockDesignImg from './images/posner_block_design.png'
//import Test from './test';



function createStudyData(numTrialsPerCondition) {
  const trialData = [];

  for (let i = 0; i < numTrialsPerCondition; i++) {
    const arrowCue = i < numTrialsPerCondition / 2 ? 'left' : 'right';
    trialData.push({ valid: true, arrowCue, targetSide: arrowCue });
  }

  for (let i = 0; i < numTrialsPerCondition; i++) {
    const arrowCue = i < numTrialsPerCondition / 2 ? 'left' : 'right';
    const targetSide = arrowCue === 'left' ? 'right' : 'left';
    trialData.push({ valid: false, arrowCue, targetSide });
  }

  // Shuffle array
  return trialData.slice().sort(() => Math.random() - 0.5);
}

function App() {
    const minWidthForContent = 1280; // Minimum width for content
    // State to track whether the screen width is sufficient for rendering content
    const [screenWidthSufficient, setScreenWidthSufficient] = useState(window.innerWidth >= minWidthForContent);
    const [numTrials, setNumTrials] = useState('');
    const [trialData, setTrialData] = useState([]);
    const [calibrationStarted, setCalibrationStarted] = useState(false);
    const [calibrationCompleted, setCalibrationCompleted] = useState(false);
    const [trialsStarted, setTrialsStarted] = useState(false);
    const [trialResults, setTrialResults] = useState([]);

    // Update the screenWidthSufficient state when the window size changes
    const handleResize = () => {
        setScreenWidthSufficient(window.innerWidth >= minWidthForContent);
    };

     // Attach event listener for window resize
    useEffect(() => {
       
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Set number of trials
    const handleNumTrialsChange = (event) => {
        const value = event.target.value;
        setNumTrials(value);
    };

    // Create trials based on inputted number of trials
    const handleGenerateData = () => {
        const studyData = createStudyData(numTrials);
        setTrialData(studyData);
    };

    const handleCalibrationStart = () => {
        alert(
            "This part requires video access to track your eye movements. No video is recorded.\n" +
            "\n" +
            "Click each red square 10 times until it turns green. " +
            "For best results, alternate your clicks on each square. " +
            "Do not just click 10 times on each square and move to the next."
        );
        
        
        setCalibrationStarted(true);
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });   // Scroll to bottom of page 
        }, 1);
    }
        
    const handleCalibrationComplete = () => setCalibrationCompleted(true);

    // startBtn starts the trials and shows Stroop component
    const handleStartTrials = () => {
        alert("This part requires video access to track your eye movements. No video is recorded.")
        setTrialsStarted(true); 
        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });   // Scroll to bottom of page 
        }, 1);
    }
    
    const handleTrialsCompleted = (trialResults) => {
        const combinedData = trialData.map((data, index) => ({
            ...data, // Copy the properties from trialData
            responseTime: trialResults[index] // Add responseTime from trialResults
        }));
        setTrialResults(combinedData);
    }
    
    
    if (!screenWidthSufficient) {
        return (
            <div className="viewport-error">
                To view this page, please use a device with a width greater or equal to 1280px.
            </div>
        );
    }

    else return (
    <div className='App'>
        <div className='readme'>
            <h1>Posner Cueing Task</h1>
            <p>The Posner cueing task (<a href="https://en.wikipedia.org/wiki/Posner_cueing_task">Michael Posner, 1980</a>) is a widely used experimental paradigm in psychology and cognitive neuroscience to study attention and the mechanisms underlying visual attention shifts. The task involves investigating how individuals respond to cues that predict the location of a subsequent target stimulus.</p>
            <h2>In the Posner cueing task</h2>
            <p>Participants are presented with a screen that typically contains two or more locations where stimuli can appear. At the beginning of each trial, a cue is presented at one of these locations. This cue can be either valid, invalid, or neutral:</p>
            <ul>
                <li><strong>Valid cue:</strong> The cue accurately predicts the location of the upcoming target stimulus. In this case, participants are faster and more accurate in detecting the target stimulus, as attention is efficiently directed to the cued location.</li>
                <li><strong>Invalid cue:</strong> The cue wrongly predicts the location of the target stimulus. Participants' reaction times are typically slower and their accuracy might decrease because their attention is drawn away from the cued location.</li>
                <li><strong>Neutral cue:</strong> The cue does not provide any information about the target's location. Participants' performance remains relatively consistent, as there's no predictive value to the cue.</li>
            </ul>
            <p><strong>Note: </strong>my experiment does not use neutral cues, only valid and invalid cues.</p>
            <h2>Purpose of the task</h2>
            <p>The main objective of the Posner cueing task is to measure how quickly and accurately participants respond to the target stimulus based on the different cue conditions. This helps researchers understand the mechanisms of attention, including the time course of attention shifts, the allocation of attentional resources, and the effects of cueing on perception and decision-making.</p>
            <p>In summary, the Posner cueing task is a foundational tool for studying attention and investigating how cues influence the allocation of attentional resources, providing insights into the cognitive and neural processes underlying visual perception and awareness.</p>
            <h1 className='experiment-instructions'>Experiment Instructions</h1>
            <h2>Calibration</h2>
            <ol>
                <li>Wait for your video feed to appear in the top-left of your screen, and wait for the rectangle inside to turn green and a dot to appear on the page. The dot represents where the eye-tracker thinks you are looking.</li>
                <li>To the best of your ability, match up your face to the face mesh generated in the video feed.</li>
                <li>Ignore the red dot, focus your eyes on your cursor and click the red rectangular boxes 10 times each until they all turn green. For better calibration, alternate your clicks on the rectangular boxes instead of clicking in one area all at once.</li>
            </ol>
            <h2>Experiment Procedure</h2>
            <ol>
                <li>Each trial begins with a fixation point '+' for a duration of 3 seconds. Fixate on this point until you see an arrow cue.</li>
                <li>After the fixation point, an arrow cue will appear for 5 seconds signaling which side to orient your eyes. Orient your eyes as the cue directs.</li>
                <li>After 5 seconds, a target will appear either on the left or right side for 10 seconds. </li>
                <li>The next trial starts immediately after the target is looked at, or after 10 seconds even if not looked at (no responses are recorded with a response time of 10,000ms).</li>
                <li>Repeat until all trials are complete.</li>
            </ol>
            <div className='block-design-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <img src={BlockDesignImg} alt="Experiment Block Design" style={{width: '700px'}}/>   
                <p style={{fontSize: '12px'}}>Block design of this experiment.<br/>Note: no neutral cues are used.</p>
            </div>
        </div>
        <form className='entry-data' style={{marginBottom: '40px'}}>
        <label>
            Number of Trials per Condition (enter even digit):  
            <input type='number' value={numTrials} disabled = {trialData.length > 0} onChange={handleNumTrialsChange} />
        </label>
        <button type='button' onClick={handleGenerateData} disabled={numTrials % 2 !== 0 || trialData.length > 0}>
            {numTrials % 2 !== 0 ? "Enter even digit" : "Generate Data"}
        </button>
        {<button className='calibrationBtn' type = 'button' disabled = {trialData.length === 0 || calibrationCompleted || calibrationStarted} onClick={handleCalibrationStart}>
            Calibrate eye tracker
        </button>}
        {calibrationCompleted && 
        <button className='startBtn' type='button' disabled= {trialsStarted} onClick={handleStartTrials}>
            Start trials
        </button>}
        </form>
        {calibrationStarted && !calibrationCompleted && <Calibration completeCalibration = {handleCalibrationComplete}/>}
        {trialsStarted && trialResults.length === 0 && <Stroop trialData={trialData} completeTrials = {handleTrialsCompleted} />}
        {trialResults.length > 0 && <Results results={trialResults}/>}
        {/* <Test/> */}
    </div>
    );


}

export default App;
