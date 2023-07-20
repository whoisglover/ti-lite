import { fetchStations } from '../api'
import { Station as StationType } from '../../types/station'
import fetchMock from 'jest-fetch-mock'

const mockData: StationType[] = [
  {
    id: '1',
    description: 'mock station',
    name: 'mock station 1',
    imgUrl: 'http://example.com',
    streamUrl: 'http://example.com/stream',
    reliability: 100,
    popularity: 100,
    tags: ['tag1', 'tag2'],
  },
]

describe('fetchStations', () => {
  afterEach(() => {
    fetchMock.resetMocks()
  })

  it('fetches stations successfully', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: mockData }))

    const stations = await fetchStations()
    expect(stations).toEqual(mockData)
    expect(fetchMock.mock.calls.length).toEqual(1)
    expect(fetchMock.mock.calls[0][0]).toEqual(
      'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json',
    )
  })

  it('throws an error when the fetch fails', async () => {
    fetchMock.mockRejectOnce(new Error('fetch failed'))

    await expect(fetchStations()).rejects.toThrow('fetch failed')
  })
})
