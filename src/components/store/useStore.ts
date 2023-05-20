import { create } from 'zustand'

import createEnvSlice, { EnvSlice } from './envSlice'
import createAppDataSlice, { appDataSlice } from './appData'

export type MyState = EnvSlice & appDataSlice
   
const useStore = create<MyState>()((...newState) => ({
  ...createEnvSlice(...newState),
  ...createAppDataSlice(...newState)
}))


export default useStore
