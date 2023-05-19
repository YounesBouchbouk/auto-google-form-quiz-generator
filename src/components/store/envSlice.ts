import { StateCreator } from 'zustand'


export interface EnvSlice {
    apiURL: string
    openAPI : string 
    openAI_URL : string
    setApiURL: (url: string) => void
    getSavedEnv: () => boolean
    clearApiData: () => void
  }


  const createEnvSlice: StateCreator<EnvSlice> =  (set) => ({
    apiURL: 'https://script.google.com/macros/s/AKfycbyL8VmMxyBHNcRSW5nWMErsfy9Js5dUOllTY36kvia6zwbZKne_j4dPWnLfcK70DT7M/exec',
    openAI_URL : "https://api.openai.com/v1/chat/completions",
    openAPI : "" ,
    setApiURL: (apiURL :string) => set(() => ({ apiURL })),
    clearApiData: () => set({}),
    getSavedEnv: () => {
      try {
        const apiURL = localStorage.getItem('apiURL')
        const openAPI =  localStorage.getItem('openAPI')

        if (apiURL !== null) {
          set(() => ({ apiURL }))
        }

        if (openAPI !== null) {
            set(() => ({ openAPI }))
        }

        if (apiURL && openAPI) {
          return true
        } 
      } catch (e) {}
        return false
    },
  })
  
  export default createEnvSlice