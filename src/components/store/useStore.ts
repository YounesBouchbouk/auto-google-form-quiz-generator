import { create } from 'zustand'

import createEnvSlice, { EnvSlice } from './envSlice'

export type MyState = EnvSlice
   
const useStore = create<MyState>()((...newState) => ({
  ...createEnvSlice(...newState),
}))


export default useStore
