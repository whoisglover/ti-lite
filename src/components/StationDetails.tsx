import { Station as StationType } from "../types/station";

interface StationDetailsProps {
    station: StationType | null;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station }) => {
    if(!station) return null;

    return (
        <div>
            <h1>{station.name}</h1>
            <img src={station.imgUrl} alt={station.name} />
            <p>{station.description}</p>
            <ul>
                {station.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <p>Reliability: {station.reliability}</p>
            <p>Popularity: {station.popularity}</p>
        </div>
    );
};

export default StationDetails;
