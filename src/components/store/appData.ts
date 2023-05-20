import { StateCreator } from 'zustand'


 export type quastionListType = {
    question: string;
    options: string[];
    id: number;
  };

export type generatedForms = {
    title : string ,
    link : string,
    createdAt : Date
}

export interface appDataSlice {
    note: string
    current_step : number 
    questionaire : quastionListType[]
    generatedForms : generatedForms[]
    setGeneratedForms : (generatedForms : generatedForms[]) => void
    addNewGeneratedFrom? :  (generatedForms : generatedForms) => void
    setNote: (note: string) => void
    setCurrentStep: (val : number) => void
    setQuestionaire: (questionaire : quastionListType[]) => void
  }


  const createAppDataSlice: StateCreator<appDataSlice> =  (set) => ({
    note: '',
    current_step : 1,
    questionaire : [],
    setNote: (note :string) => set(() => ({ note })),
    setCurrentStep: (current_step : number) => set({current_step}),
    setQuestionaire: (questionaire : quastionListType[]) => set({questionaire})  , 
    setGeneratedForms : (generatedForms : generatedForms[]) => set({generatedForms}) ,
    generatedForms : [],
  })
  
  export default createAppDataSlice