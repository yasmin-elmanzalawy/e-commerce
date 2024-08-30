import { createContext, useState } from "react";


export const CounterContext = createContext();
export default function CounterContextProvider(props){

    const [counter , setCounter] = useState(0);
    function changeCounter(){
        setCounter(Math.random)
    }


    return  (<CounterContext.Provider value={{counter:0}}>
        {props.children}
    </CounterContext.Provider>)
}