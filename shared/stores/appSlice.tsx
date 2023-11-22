import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type Option = { value: string; label: string };

type APP_STATE = {
  isLogined: boolean;
  isCollapseMenu: boolean;
  isExpandDrawer: boolean;
  isRouteLoading: boolean;
};

const initialState: APP_STATE = {
  isLogined: false,
  isCollapseMenu: false,
  isRouteLoading: false,
  isExpandDrawer: false,

};

export const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    toggleMenu: (state, action: PayloadAction<boolean>) => {
      state.isCollapseMenu = action.payload;
    },
    toggleExpandDrawer: (state, action: PayloadAction<boolean>) => {
      state.isExpandDrawer = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isRouteLoading = action.payload;
    },
  },
});
export const {
  toggleExpandDrawer,
  toggleMenu,
  setLoading,
} = appSlice.actions;

export default appSlice.reducer;
