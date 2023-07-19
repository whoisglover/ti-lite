import { useAppDispatch, useAppSelector } from "../hooks"
import { selectAudioError, selectCurrentStation, selectAutoPlay, setAutoPlay } from "../store/stations/stationsSlice"
import AudioPlayer from "./AudioPlayer"



const PlayBar: React.FC = () => {
    const currentStation = useAppSelector(selectCurrentStation)
    const audioError = useAppSelector(selectAudioError)

    const autoPlay = useAppSelector(selectAutoPlay)
    const dispatch = useAppDispatch();

    const handlePlayStop = () => {
        dispatch(setAutoPlay(!autoPlay))
    };

    return (
        <div className="play-bar">
            <button onClick={handlePlayStop}>
                {autoPlay ? 'Stop' : 'Play'}
            </button>
            <div className="station-name">
                {currentStation ? `Now Playing: ${currentStation.name}` : 'No Station Selected'}
            </div>
            <div className="audio-error">
                {audioError && `Error: ${audioError}`}
            </div>
            {currentStation && <AudioPlayer streamUrl={currentStation.streamUrl} autoPlay={autoPlay} />}
        </div>
    );
}

export default PlayBar;
