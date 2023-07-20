/**
 * @jest-environment jsdom
 */

import { render, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import Station from '../index'
import { Station as StationType } from '../../../types/station'

afterEach(() => {
  cleanup()
})

const mockSetCurrentStation = jest.fn()
const mockStation: StationType = {
  id: 's306935',
  name: 'The Element West',
  description: 'The Element West is the first 24/7 West Coast station. ',
  imgUrl: 'https://cdn-profiles.tunein.com/s306935/images/logoq.jpg',
  streamUrl: 'http://tunein4.streamguys1.com/elmntfree1',
  popularity: 3,
  reliability: 64,
  tags: ['music', 'rock'],
}

const mockCurrentStation: StationType = {
  id: 's249995',
  name: 'Latin Hits',
  description: 'The Element West is the first 24/7 West Coast station. ',
  imgUrl: 'http://cdn-profiles.tunein.com/s249995/images/logoq.png',
  streamUrl:
    'http://tunein4.streamguys1.com/ltnhtfree1?aw_0_1st.age=34&aw_0_1st',
  popularity: 2.7,
  reliability: 34,
  tags: ['latin', 'pop latino', 'music'],
}

describe('Station', () => {
  it('should render a station component with the correct data', () => {
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <Station
          station={mockStation}
          currentStation={null}
          setCurrentStation={mockSetCurrentStation}
        />
      </Provider>,
    )
    const stationImage = getByAltText(mockStation.name)
    const stationName = getByText(mockStation.name)

    expect(stationImage).toBeInTheDocument()
    expect(stationImage).toHaveAttribute('src', mockStation.imgUrl)
    expect(stationName).toBeInTheDocument()
  })

  it('should call setCurrentStation with station data when clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Station
          station={mockStation}
          currentStation={mockCurrentStation}
          setCurrentStation={mockSetCurrentStation}
        />
      </Provider>,
    )
    const stationName = getByText(mockStation.name)
    fireEvent.click(stationName)
    expect(mockSetCurrentStation).toHaveBeenCalledWith(mockStation)
  })

  it('should call setCurrentStation with null when clicked and is currentStation', () => {
    const { getByText } = render(
      <Station
        station={mockStation}
        currentStation={mockStation}
        setCurrentStation={mockSetCurrentStation}
      />,
    )

    const stationName = getByText(mockStation.name)
    fireEvent.click(stationName)

    expect(mockSetCurrentStation).toHaveBeenCalledWith(null)
  })
})
