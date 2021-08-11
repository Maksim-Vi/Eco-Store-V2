import React, { useState, useEffect } from 'react';

const Timer = ({children,hendlerNextClick, ...props}) => {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (props.settingsCmponent.isCounter && props.settingsCmponent.value === 'cycle') {
      
        interval = setInterval(() => {
          setSeconds(seconds => seconds + 1);
          hendlerNextClick()
          //console.log(seconds);
          if (seconds === 30) {
            clearInterval(interval);
            setSeconds(0)
          }
        }, props.settingsCmponent.isCounter_Speed);

    } else if (!props.settingsCmponent.isCounter && !props.settingsCmponent.value === 'cycle' && seconds !== 0) {
    
      clearInterval(interval);
      
    } 

    return () => clearInterval(interval);

  }, [props.settingsCmponent.isCounter, props.settingsCmponent.value, seconds]);


    return (
       <main>
            {children}
        </main>
    )
}

export default Timer