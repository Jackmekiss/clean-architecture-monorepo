import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@core/initReduxStore';
import { AppDispatch } from '../app';

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
