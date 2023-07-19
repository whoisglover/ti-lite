import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

// Use throughout the app instead of plain `useDispatch` and `useSelector`
// ref: https://redux-toolkit.js.org/tutorials/typescript#define-root-state-and-dispatch-types

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector