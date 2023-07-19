import React from "react";
import { Station as StationType } from "../../types/station";
import styles from "./StationDetails.module.css";

interface StationDetailsProps {
    station: StationType | null;
}

const StationDetails: React.FC<StationDetailsProps> = ({ station }) => {
    if(!station) return null;

    return (
        <div className={styles.stationDetailsContainer}>
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
