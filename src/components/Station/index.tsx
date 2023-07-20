import React from 'react'
import { Station as StationType } from '../../types/station'
import styles from './Station.module.css'

interface StationProps {
  station: StationType
  currentStation: StationType | null
  setCurrentStation: (station: StationType | null) => void
}

const Station: React.FC<StationProps> = ({
  station,
  currentStation,
  setCurrentStation,
}) => {
  const handleClick = () => {
    if (currentStation?.id === station.id) {
      setCurrentStation(null)
    } else {
      setCurrentStation(station)
    }
  }

  return (
    <div className={styles.stationTile} onClick={handleClick}>
      <img
        className={styles.stationImage}
        src={station.imgUrl}
        alt={station.name}
      />
      <div className={styles.stationName}>{station.name}</div>
    </div>
  )
}

export default Station
