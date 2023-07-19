import React, { useState } from "react";
import Station from "./Station";
import StationDetails from "./StationDetails";
import { Station as StationType } from "../types/station";
import { selectCurrentStation, selectStations, setCurrentStation } from "../store/stations/stationsSlice";
import {useAppSelector, useAppDispatch} from "../hooks";


const StationList: React.FC = () => {
    const dispatch = useAppDispatch();
    const stations = useAppSelector(selectStations);
    const currentStation = useAppSelector(selectCurrentStation);

    const [sortOption, setSortOption] = useState<string>("none");

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
    const sortedStations = sortStations(stations);

    return (
        <div>
            {currentStation && <StationDetails station={currentStation} />}
            <label>
                Sort by:
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="none">None</option>
                    <option value="popularity-asc">Popularity (increasing)</option>
                    <option value="popularity-desc">Popularity (decreasing)</option>
                    <option value="reliability-asc">Reliability (increasing)</option>
                    <option value="reliability-desc">Reliability (decreasing)</option>
                </select>
            </label>
            {sortedStations.map((station) => (
                <Station
                    key={station.id}
                    station={station}
                    currentStation={currentStation}
                    setCurrentStation={(station) => dispatch(setCurrentStation(station))}
                />
            ))}
        </div>
    );
};

export default StationList;