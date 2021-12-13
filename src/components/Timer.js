import { useState, useEffect } from 'react';

import './Timer.css';

const timerStates = {
  stopped: {
    label: 'Start'
  },
  running: {
    label: 'Stop'
  },
  finished: {
    label: 'Reset'
  }
};

const Timer = props => {
  const initSeconds = props.seconds;

  const [state,   setState  ] = useState(timerStates.stopped);
  const [seconds, setSeconds] = useState(initSeconds);

  const resetTimer = () => setSeconds(initSeconds);

  useEffect(() => {
    if (state === timerStates.stopped)    return;

    const interval = setInterval(() => {
      if (seconds > 0)    setSeconds(s => s - 1);

      if (seconds === 0) {
        clearInterval(interval);
        setState(timerStates.finished);
      } 
    }, 1000);

    return () => clearInterval(interval);
  }, [state, seconds]);

  const timerButtonClickHandler = () => {
    if (state === timerStates.stopped)    setState(timerStates.running);
    if (state === timerStates.running)    setState(timerStates.stopped);

    if (state === timerStates.finished) {
      resetTimer();
      setState(timerStates.stopped);
    }
  };

  return (
    <div className='timer'>
      <header className='timer__header'>
        <h1>Timer:</h1>
      </header>
      <div className='timer__time'>
          <span>{seconds}</span>
      </div>
      { state === timerStates.finished && <div>Timer has finished!</div> }
      <button className='timer__button' onClick={timerButtonClickHandler}>
        {state.label}
      </button>
    </div>
  );
}

export default Timer;
