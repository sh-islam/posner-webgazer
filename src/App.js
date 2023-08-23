import React, { useState } from 'react';
import Stroop from './Stroop';


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

    // startBtn starts the trials and shows Stroop component
    const handleStartTrials = () => setTrialsStarted(true); 
   
    
    
    return (
    <div className='App'>
        <form className='entry-data'>
        <label>
            Number of Trials per Condition (enter even digit):  
            <input type='number' value={numTrials} onChange={handleNumTrialsChange} />
        </label>
        <button type='button' onClick={handleGenerateData} disabled={numTrials % 2 !== 0}>
            {numTrials % 2 !== 0 ? "Enter even digit" : "Generate Data"}
        </button>
        </form>
        <button className='startBtn' type='button' disabled={trialData.length === 0} onClick={handleStartTrials}>
            Start trials
        </button>
        {trialsStarted && <Stroop trialData={trialData} />}
    </div>
    );


}

export default App;
