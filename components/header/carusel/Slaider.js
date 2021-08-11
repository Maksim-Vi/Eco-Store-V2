import { useState } from 'react'
import Timer from './Settings/Timer'
import SliderOneImage from './ViewSliders/SliderOneImage'

const Slaider = (props) => {

    const [currentClick, setCurrentClick] = useState(0)

    const hendlerPrevClick = () => {
        let newPrev = currentClick
        // from_beginning_to_end
        if (newPrev > 0 && props.settingsCmponent.value === 'from_beginning_to_end') {
            newPrev = currentClick - 1
        }

        // cycle
        if (newPrev >= 0 && props.settingsCmponent.value === 'cycle') {
            if (newPrev === 0) {
                newPrev = props.image.length - 1
            } else if (newPrev > 0) {
                newPrev = currentClick - 1
            }
        }

        setCurrentClick(newPrev)
    }

    const hendlerNextClick = () => {
        let newNext = currentClick
        // from_beginning_to_end
        if (newNext < props.image.length - 1 && props.settingsCmponent.value === 'from_beginning_to_end') {
            newNext = currentClick + 1
        }

        // cycle
        if (newNext < props.image.length && props.settingsCmponent.value === 'cycle') {
            if (newNext === props.image.length - 1) {
                newNext = 0
            } else {
                newNext = currentClick + 1
            }
        }

        setCurrentClick(newNext)
    }

return (
    <Timer settingsCmponent={props.settingsCmponent} hendlerNextClick={hendlerNextClick}>
        <SliderOneImage image={props.image} currentClick={currentClick} setCurrentClick={setCurrentClick} settingsCmponent={props.settingsCmponent} hendlerPrevClick={hendlerPrevClick} hendlerNextClick={hendlerNextClick} />
    </Timer>
)
}

export default Slaider