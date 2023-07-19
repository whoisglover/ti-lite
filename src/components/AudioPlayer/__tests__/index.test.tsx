/**
 * @jest-environment jsdom
 */

import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import AudioPlayer from '../index'

const mockDispatch = jest.fn()

jest.mock('../../../hooks', () => ({
  useAppDispatch: () => mockDispatch,
}))

afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})

describe('AudioPlayer', () => {
  let playSpy: jest.SpyInstance
  let pauseSpy: jest.SpyInstance

  beforeEach(() => {
    playSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, 'play')
      .mockImplementation(() => Promise.resolve())
    pauseSpy = jest
      .spyOn(window.HTMLMediaElement.prototype, 'pause')
      .mockImplementation(() => {})
  })

  it('should render an audio element', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AudioPlayer streamUrl={'testStreamUrl'} autoPlay={true} />
      </Provider>,
    )
    const playBar = getByTestId('audioPlayer')
    expect(playBar).toBeInTheDocument()
  })

  it('plays audio when autoPlay is true', () => {
    render(
      <Provider store={store}>
        <AudioPlayer streamUrl={'testStreamUrl'} autoPlay={true} />
      </Provider>,
    )
    expect(playSpy).toHaveBeenCalled()
  })

  it('pauses audio when autoPlay prop is false', () => {
    render(
      <Provider store={store}>
        <AudioPlayer streamUrl='testStreamUrl' autoPlay={false} />
      </Provider>,
    )

    expect(pauseSpy).toHaveBeenCalled()
  })
})
