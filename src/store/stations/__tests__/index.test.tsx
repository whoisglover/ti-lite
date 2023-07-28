import { configureStore } from '@reduxjs/toolkit'
import { RootState } from '../../../store'
import stationsSlice, {
  setStations,
  setCurrentStation,
  setAutoPlay,
  setAudioError,
  selectStations,
  selectCurrentStation,
  selectAutoPlay,
  fetchStations,
} from '../stationsSlice'
import { Station as StationType } from '../../../types/station'
import * as api from '../../../services/api'

jest.mock('../../../services/api')

describe('stationsSlice', () => {
  let store: ReturnType<typeof configureStore<RootState>>
  let mockStationss: StationType[]

  beforeEach(() => {
    mockStationss = [
      {
        id: 's306935',
        name: 'The Element West',
        description: 'The Element West is the first 24/7 West Coast station. ',
        imgUrl: 'https://cdn-profiles.tunein.com/s306935/images/logoq.jpg',
        streamUrl: 'http://tunein4.streamguys1.com/elmntfree1',
        popularity: 3,
        reliability: 64,
        tags: ['music', 'rock'],
      },
      {
        id: 's249995',
        name: 'Latin Hits',
        description: 'The Element West is the first 24/7 West Coast station. ',
        imgUrl: 'http://cdn-profiles.tunein.com/s249995/images/logoq.png',
        streamUrl:
          'http://tunein4.streamguys1.com/ltnhtfree1?aw_0_1st.age=34&aw_0_1st',
        popularity: 2.7,
        reliability: 34,
        tags: ['latin', 'pop latino', 'music'],
      },
    ]
    store = configureStore({
      reducer: {
        stations: stationsSlice,
      },
    })
  })
  it('should have empty initial state', () => {
    const stations = selectStations(store.getState())
    const currentStation = selectCurrentStation(store.getState())
    const autoPlay = selectAutoPlay(store.getState())
    expect(stations).toEqual([])
    expect(currentStation).toEqual(null)
    expect(autoPlay).toEqual(false)
  })
  it('should set stations', () => {
    store.dispatch(setStations(mockStationss))
    const stations = selectStations(store.getState())
    expect(stations).toEqual(mockStationss)
  })
  it('should set current station', () => {
    store.dispatch(setCurrentStation(mockStationss[0]))
    const currentStation = selectCurrentStation(store.getState())
    const autoPlay = selectAutoPlay(store.getState())
    expect(autoPlay).toEqual(true)
    expect(currentStation).toEqual(mockStationss[0])
  })
  it('should set auto play', () => {
    store.dispatch(setAutoPlay(true))
    const autoPlay = selectAutoPlay(store.getState())
    expect(autoPlay).toEqual(true)
  })
  it('should set audio error', () => {
    store.dispatch(setAudioError('plackback error'))
    const autoPlay = selectAutoPlay(store.getState())
    expect(autoPlay).toEqual(false)
    expect(store.getState().stations.audioError).toEqual('plackback error')
  })
  it('should handle fetchStations', async () => {
    const spy = jest.spyOn(api, 'fetchStations')
    spy.mockResolvedValue(mockStationss)
    await store.dispatch(fetchStations())
    const stations = selectStations(store.getState())
    expect(stations).toEqual(mockStationss)
    expect(spy).toHaveBeenCalled()
  })
})
