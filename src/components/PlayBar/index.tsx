import { useAppDispatch, useAppSelector } from "../../hooks"
import { selectAudioError, selectCurrentStation, selectAutoPlay, setAutoPlay } from "../../store/stations/stationsSlice"
import AudioPlayer from "../AudioPlayer"
import styles from './PlayBar.module.css'


const PlayBar: React.FC = () => {
    const currentStation = useAppSelector(selectCurrentStation)
    const audioError = useAppSelector(selectAudioError)
    const autoPlay = useAppSelector(selectAutoPlay)
    const dispatch = useAppDispatch();

    const handlePlayStop = () => {
        dispatch(setAutoPlay(!autoPlay))
    };

    return (
        <div className={styles.playBarContainer} data-testid="playBar">
        <div className={styles.stationInfo}>
            {audioError 
                ? (
                    <div className={styles.stationError}> {currentStation ? currentStation.name : 'Station'} has encountered an error</div>
                )
                : currentStation 
                    ? `Now Playing: ${currentStation.name}` 
                    : 'No Station Selected'}
        </div>
        <button className={styles.playStopButton} onClick={handlePlayStop}>
            {autoPlay ? '| |' : 'Play'}
        </button>
        {currentStation && <AudioPlayer streamUrl={currentStation.streamUrl} autoPlay={autoPlay} />}
    </div>
    );
}

export default PlayBar;
