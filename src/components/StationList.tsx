import { useState, useMemo } from "react";
import Station from "./Station";
import StationDetails from "./StationDetails";
import { Station as StationType } from "../types/station";
import { selectCurrentStation, selectStations, setCurrentStation } from "../store/stations/stationsSlice";
import {useAppSelector, useAppDispatch} from "../hooks";
import styles from "../styles/StationList.module.css";

const StationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const stations = useAppSelector(selectStations);
    const currentStation = useAppSelector(selectCurrentStation);

    const [sortOption, setSortOption] = useState<string>("popularity-asc");

    const sortStations = (stations: StationType[]): StationType[] => {
        if(stations.length === 0) return [];
        return [...stations].sort((a, b) => {
            switch (sortOption) {
                case 'popularity-asc':
                  return a.popularity - b.popularity;
                case 'popularity-desc':
                  return b.popularity - a.popularity;
                case 'reliability-asc':
                  return a.reliability - b.reliability;
                case 'reliability-desc':
                  return b.reliability - a.reliability;
                default:
                  return 0;
              }
        });
    };

    console.log('here and stations is: ', stations);
    const sortedStations = useMemo(() => sortStations(stations), [stations, sortOption]);


    return (
        <div className={styles.stationListContainer}>
            {/* {currentStation && <StationDetails station={currentStation} />} */}
            <div className={styles.sortOptions}>
            <label>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="popularity-asc">Popularity (increasing)</option>
                    <option value="popularity-desc">Popularity (decreasing)</option>
                    <option value="reliability-asc">Reliability (increasing)</option>
                    <option value="reliability-desc">Reliability (decreasing)</option>
                </select>
            </label>
            </div>
            <div className={styles.stationGrid}>
                {sortedStations.map((station) => (
                    <Station
                        key={station.id}
                        station={station}
                        currentStation={currentStation}
                        setCurrentStation={(station) => dispatch(setCurrentStation(station))}
                    />
                ))}
            </div>
        </div>
    );
};

export default StationList;