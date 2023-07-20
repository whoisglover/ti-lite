/**
 * @jest-environment jsdom
 */

import { render, fireEvent, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import StationList from '../index'
import { Station as StationType } from '../../../types/station'

afterEach(() => {
  cleanup()
})

const mockStations: StationType[] = [
  {
    id: '1',
    name: 'Test Station 1',
    streamUrl: 'http://test.com/test1',
    imgUrl: 'http://test.com/test1.jpg',
    description: 'Test description 1',
    tags: ['tag1', 'tag2'],
    reliability: 3,
    popularity: 4,
  },
  {
    id: '2',
    name: 'Test Station 2',
    streamUrl: 'http://test.com/test2',
    imgUrl: 'http://test.com/test2.jpg',
    description: 'Test description 2',
    tags: ['tag3', 'tag4'],
    reliability: 5,
    popularity: 2,
  },
]

describe('StationList', () => {
  it('renders stations correctly', () => {
    jest.spyOn(store, 'getState').mockImplementation(() => ({
      stations: {
        stations: mockStations,
        currentStation: null,
        audioError: null,
        autoPlay: false,
        status: 'succeeded',
        error: null,
      },
    }))

    const { getByText } = render(
      <Provider store={store}>
        <StationList />
      </Provider>,
    )

    mockStations.forEach(station => {
      expect(getByText(station.name)).toBeInTheDocument()
    })
  })

  it('sorts stations correctly', () => {
    jest.spyOn(store, 'getState').mockImplementation(() => ({
      stations: {
        stations: mockStations,
        currentStation: null,
        audioError: null,
        autoPlay: false,
        status: 'succeeded',
        error: null,
      },
    }))
    const { getByText, getByDisplayValue } = render(
      <Provider store={store}>
        <StationList />
      </Provider>,
    )

    // Switch to "Reliability (decreasing)" sorting
    fireEvent.change(getByDisplayValue('Popularity (increasing)'), {
      target: { value: 'reliability-desc' },
    })

    // Assuming that the order of the stations in the DOM corresponds to the sorting,
    // Test Station 2 (with higher reliability) should now come before Test Station 1.
    const stations = [getByText('Test Station 2'), getByText('Test Station 1')]
    const stationList = stations[0].parentElement?.parentElement
    stations.forEach((station, index) => {
      expect(stationList?.children[index]).toBe(station.parentElement)
    })
  })
})
