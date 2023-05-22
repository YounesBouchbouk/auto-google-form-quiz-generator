import { StateCreator } from 'zustand'


 export type quastionListType = {
    question: string;
    options: string[];
    id: number;
  };

export type generatedForms = {
    title : string ,
    link : string,
    description : string ,
    createdAt : Date
}

export interface appDataSlice {
    note: string
    current_step : number 
    title : string
    description: string
    questionaire : quastionListType[]
    generatedForms : generatedForms[]
    askForFullName : boolean
    askForEmail : boolean
    askForPhone : boolean
    setGeneratedForms : (generatedForms : generatedForms[]) => void
    setNote: (note: string) => void
    setCurrentStep: (val : number) => void
    setQuestionaire: (questionaire : quastionListType[]) => void
    setTitle: (title : string) => void
    setDescription: (title : string) => void
    setAskForFullName : (state : boolean) => void
    setAskForEmail : (state : boolean) => void
    setAskForPhone : (state : boolean) => void
  }


  const createAppDataSlice: StateCreator<appDataSlice> =  (set) => ({
    note: '',
    title:"" ,
    description :"" ,
    current_step : 1,
    questionaire : [],
    askForFullName : false,
    askForEmail : false,
    askForPhone : false,
    generatedForms : [],
    setNote: (note :string) => set(() => ({ note })),
    setCurrentStep: (current_step : number) => set({current_step}),
    setQuestionaire: (questionaire : quastionListType[]) => set({questionaire})  , 
    setGeneratedForms : (generatedForms : generatedForms[]) => set({generatedForms}) ,
    setTitle : (title : string) => set({title}),
    setDescription : (description : string) => set({description}),
    setAskForFullName : (askForFullName : boolean) => set({askForFullName}),
    setAskForEmail : (askForEmail : boolean) => set({askForEmail}),
    setAskForPhone : (askForPhone : boolean) => set({askForPhone})
  })
  
  export default createAppDataSlice