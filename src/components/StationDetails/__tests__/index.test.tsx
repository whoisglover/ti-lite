/**
 * @jest-environment jsdom
 */

import { render, cleanup } from '@testing-library/react'
import StationDetails from '../index'
import { Station as StationType } from '../../../types/station'

afterEach(() => {
  cleanup()
})

const mockStation: StationType = {
  id: 's306935',
  name: 'The Element West',
  description: 'Dannys favorite station',
  imgUrl: 'https://cdn-profiles.tunein.com/s306935/images/logoq.jpg',
  streamUrl: 'http://tunein4.streamguys1.com/elmntfree1',
  popularity: 3,
  reliability: 64,
  tags: ['music', 'rock'],
}

describe('StationDetails', () => {
  it('should render a station details component with the correct data', () => {
    const { getByText, getByAltText } = render(
      <StationDetails station={mockStation} />,
    )
    expect(getByText(mockStation.name)).toBeInTheDocument()
    expect(getByAltText(mockStation.name)).toHaveAttribute(
      'src',
      mockStation.imgUrl,
    )
    expect(getByText(mockStation.description)).toBeInTheDocument()
    mockStation.tags.forEach((tag: string) => {
      expect(getByText(tag)).toBeInTheDocument()
    })
    expect(
      getByText(`Reliability: ${mockStation.reliability}`),
    ).toBeInTheDocument()
    expect(
      getByText(`Popularity: ${mockStation.popularity}`),
    ).toBeInTheDocument()
  })
  it('should not render when station is null', () => {
    const { container } = render(<StationDetails station={null} />)
    expect(container.firstChild).toBeNull()
  })
})
