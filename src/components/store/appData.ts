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
    globalStep : number
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
    incrementStep: () => void
    decrimentStep: () => void
  }


  const createAppDataSlice: StateCreator<appDataSlice> =  (set) => ({
    note: '',
    title:"" ,
    globalStep : 1,
    description :"" ,
    current_step : 1,
    questionaire : [
      {
          "question": "1. What is back-end development?",
          "options": [
              "The visual aspects of web development",
              "The server-side of web development",
              "The client-side of web development",
              "The design aspect of web development"
          ],
          "id": 1
      },
      {
          "question": "2. Which programming language is most commonly used for back-end development?",
          "options": [
              "Python",
              "JavaScript",
              "HTML",
              "PHP"
          ],
          "id": 2
      },
      {
          "question": "3. What is the role of a back-end developer?",
          "options": [
              "To design the appearance of a website",
              "To create interactive user interfaces",
              "To handle server-side logic and database management",
              "To optimize website speed"
          ],
          "id": 3
      },
      {
          "question": "4. Which database is widely used for back-end development?",
          "options": [
              "MySQL",
              "MongoDB",
              "Oracle",
              "Postgres"
          ],
          "id": 4
      },
      {
          "question": "5. What is API?",
          "options": [
              "A front-end development framework",
              "A protocol for communicating between applications",
              "A back-end development framework",
              "A programming language"
          ],
          "id": 5
      },
      {
          "question": "6. What is a server?",
          "options": [
              "A computer program",
              "A physical machine",
              "A piece of software that provides a service",
              "All of the above"
          ],
          "id": 6
      },
      {
          "question": "7. Which protocol is used for transferring files between servers and clients in back-end development?",
          "options": [
              "FTP",
              "HTTP",
              "SMTP",
              "TCP"
          ],
          "id": 7
      },
      {
          "question": "8. What is session management?",
          "options": [
              "Maintaining user sessions on the server-side",
              "Maintaining user sessions on the client-side",
              "Handling user authentication",
              "Handling website navigation"
          ],
          "id": 8
      },
      {
          "question": "9. Which programming language is most commonly used for creating web frameworks?",
          "options": [
              "Java",
              "Python",
              "Ruby",
              "PHP"
          ],
          "id": 9
      },
      {
          "question": "10. What is a caching?",
          "options": [
              "Speeding up responses by storing frequently requested data",
              "Storing database data in a cache to reduce load time",
              "Storing data on the client-side to reduce server requests",
              "All of the above"
          ],
          "id": 10
      }
  ],
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
    setAskForPhone : (askForPhone : boolean) => set({askForPhone}),
    incrementStep : () => set((state) => ({globalStep : state.globalStep + 1})),
    decrimentStep : () => set((state) => ({globalStep : state.globalStep - 1}))

  })
  
  export default createAppDataSlice