import {Station as StationType} from "../types/station";

interface StationProps {
    station: StationType;
    currentStation: StationType | null;
    setCurrentStation: (station: StationType | null) => void;
}

const Station: React.FC<StationProps> = ({station, currentStation, setCurrentStation}) => {
    const handleClick = () => {
        if(currentStation?.id === station.id){
            setCurrentStation(null);
        } else {
            setCurrentStation(station);
        }
    };

    return (
        <div
         style={{backgroundColor: currentStation?.id === station.id ? 'lighblue' : 'white'}}
         onClick={handleClick}
         >
            <h2>{station.name}</h2>
            <img src={station.imgUrl} alt={station.name} />
            <p>{station.description}</p>
        </div>
    );
}

export default Station;