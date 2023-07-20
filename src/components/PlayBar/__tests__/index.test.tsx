/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../../../store'
import PlayBar from '../index'

jest.mock('../../../hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}))

describe('PlayBar', () => {
  it('should render playBar component', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PlayBar />
      </Provider>,
    )
    const playBar = getByTestId('playBar')
    expect(playBar).toBeInTheDocument()
  })
})
