import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks'
import {
  selectCurrentStation,
  fetchStations,
} from './store/stations/stationsSlice'
import StationList from './components/StationList'
import PlayBar from './components/PlayBar'
import styles from './App.module.css'
import StationDetails from './components/StationDetails'

const App: React.FC = () => {
  const stationState = useAppSelector(state => state.stations)
  const currentStation = useAppSelector(selectCurrentStation)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])

  return (
    <div className='App'>
      {stationState.status === 'failed' && (
        <div>Failed to load stations. Error: {stationState.error}</div>
      )}
      {stationState.status === 'loading' && <div>Loading stations...</div>}
      {stationState.status === 'succeeded' && (
        <>
          <div className={styles.appContainer}>
            {currentStation && <StationDetails station={currentStation} />}
            <StationList />
            <PlayBar />
          </div>
        </>
      )}
    </div>
  )
}

export default App
