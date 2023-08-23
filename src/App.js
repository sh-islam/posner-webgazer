import React, { useState } from 'react';
import Stroop from './Stroop';
import Calibration from './Calibration';
import Test from './test';


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
    const [numTrials, setNumTrials] = useState('');
    const [trialData, setTrialData] = useState([]);
    const [calibrationStarted, setCalibrationStarted] = useState(false);
    const [calibrationCompleted, setCalibrationCompleted] = useState(false);
    const [trialsStarted, setTrialsStarted] = useState(false);

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
    }
        
    const handleCalibrationComplete = () => setCalibrationCompleted(true);

    // startBtn starts the trials and shows Stroop component
    const handleStartTrials = () => {
        alert("This part requires video access to track your eye movements. No video is recorded.")
        setTrialsStarted(true); 
    }
    
    
    return (
    <div className='App'>
        <form className='entry-data'>
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
        <button className='startBtn' type='button' disabled={!calibrationCompleted || trialsStarted} onClick={handleStartTrials}>
            Start trials
        </button>}
        </form>
        {calibrationStarted && !calibrationCompleted && <Calibration completeCalibration = {handleCalibrationComplete}/>}
        {trialsStarted && <Stroop trialData={trialData} />}
        {/* <Test/> */}
    </div>
    );


}

export default App;
