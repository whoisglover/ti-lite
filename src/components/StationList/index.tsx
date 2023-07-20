import { useState, useEffect, useMemo } from 'react'
import Station from '../Station'
import { Station as StationType } from '../../types/station'
import {
  selectCurrentStation,
  selectStations,
  setCurrentStation,
} from '../../store/stations/stationsSlice'
import { useAppSelector, useAppDispatch } from '../../hooks'
import styles from './StationList.module.css'

const StationList: React.FC = () => {
  const dispatch = useAppDispatch()
  const stations = useAppSelector(selectStations)
  const currentStation = useAppSelector(selectCurrentStation)

  const [sortOption, setSortOption] = useState<string>('popularity-asc')
  const [allTags, setAllTags] = useState<string[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const sortStations = (stations: StationType[]): StationType[] => {
    let filteredStations = stations

    if (selectedTag) {
      filteredStations = filteredStations.filter(station =>
        station.tags.includes(selectedTag),
      )
    }

    if (filteredStations.length === 0) return []
    return [...filteredStations].sort((a, b) => {
      switch (sortOption) {
        case 'popularity-asc':
          return a.popularity - b.popularity
        case 'popularity-desc':
          return b.popularity - a.popularity
        case 'reliability-asc':
          return a.reliability - b.reliability
        case 'reliability-desc':
          return b.reliability - a.reliability
        default:
          return 0
      }
    })
  }

  useEffect(() => {
    const tags = stations.reduce((acc: string[], station) => {
      return [...acc, ...station.tags.filter(tag => !acc.includes(tag))]
    }, [])

    setAllTags(tags)
  }, [stations])

  const sortedStations = useMemo(
    () => sortStations(stations),
    [stations, sortOption, selectedTag],
  )

  return (
    <div className={styles.stationListContainer}>
      <h2>Stations</h2>
      <div className={styles.sortOptions}>
        <label>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value='popularity-asc'>Popularity (increasing)</option>
            <option value='popularity-desc'>Popularity (decreasing)</option>
            <option value='reliability-asc'>Reliability (increasing)</option>
            <option value='reliability-desc'>Reliability (decreasing)</option>
          </select>
        </label>
      </div>
      <div className={styles.filterOptions}>
        <label>
          <select
            value={selectedTag || ''}
            onChange={e => setSelectedTag(e.target.value)}
          >
            <option value=''>All</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.stationGrid}>
        {sortedStations.map(station => (
          <Station
            key={station.id}
            station={station}
            currentStation={currentStation}
            setCurrentStation={station => dispatch(setCurrentStation(station))}
          />
        ))}
      </div>
    </div>
  )
}

export default StationList
