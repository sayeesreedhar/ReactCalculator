import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import React, { useState,useReducer } from 'react';
import Display from './Display';

var y="";
const TASKS={DIGIT:"dig",CLEAR:"cls",OPERATION:"opr",EQUAL:"eq",SCIENCE:"sci"}

const reducer=(state,action)=>{
  switch(action.type){
    case TASKS.DIGIT:
      if(action.payload==="."&&state.current==null)return state
      if(action.payload==="0"&&state.current==="0")return state
      if(action.payload==="."&&state.current.includes("."))return state
      
      return{...state,
        current:`${state.current||""}${action.payload}`,
    }
    case TASKS.CLEAR:
      return{...state,
        current:null,previous:null,operation:null
    }
    case TASKS.OPERATION:
    if(state.current==null&&state.previous==null)return state
    
      if(state.previous==null)
      
      return{...state,
        operation:action.payload,
        previous:state.current,
        current:null,
    }
    if(state.previous.includes("="))
      return {...state,operation:action.payload,previous:state.current,current:null}
      if(state.previous.includes("^2"))
      return {...state,operation:null,previous:state.current,current:calculate(state)}
    return{...state,previous:calculate(state),operation:action.payload,current:null}

    case TASKS.EQUAL:
      if(state.previous==null)return state
      return{...state,previous:`${state.previous}${state.operation}${state.current}${"="}`,operation:null,current:calculate(state)}

      case TASKS.SCIENCE:
        if(action.payload=="sin"&&state.previous==null)
        return{...state,current:Math.sin((22/7*180)*state.current).toString(),previous:calculate(state),operation:action.payload,}
        //if(state.current==null)return state
        
        return{...state,previous:state.current,operation:action.payload,current:calculate(state)}
        
  }
  
}
const science=({current,previous,operation})=>{
  let prev=parseFloat(previous);
  let cur=parseFloat(current);let r=""
  if(isNaN(cur))
  switch(operation){
    case "^2":
      {r=Math.pow(prev,2);break;}
  }return r.toString();
}
const calculate=({current,previous,operation})=>{
  let prev=parseFloat(previous);
  let cur=parseFloat(current);
  if(isNaN(prev)/*||isNaN(cur)*/)return "";
  let r=""
  switch(operation){
    case "+":
      {r=prev+cur;break;}
      case "-":
      {r=prev-cur;break;}
      case "*":
      {r=prev*cur;break;}
      case "/":
      {r=prev/cur;break;}
      case "^2":
        {r=Math.pow(prev,2);break;}
        case "^3":
        {r=Math.pow(prev,3);break;}
        case "^1/2":
        {r=Math.pow(prev,1/2);break;}
        case "^1/3":
        {r=Math.pow(prev,1/3);break;}
        case "sin":
          {r=Math.sin((22/7*180)*cur);break;}
          case "cos":
          {r=Math.cos((22/7*180)*cur);break;}
          case "tan":
          {r=Math.tan((22/7*180)*cur);break;}
  }
  return r.toString();
}
const Button = () => {
    const [{current,previous,operation},dispatch]=useReducer(reducer,{});
    
    //dispatch({type:TASKS.DIGIT,payload:{digt}})
    const[digt,setdigt]=React.useState("");
    
  return <div className='calc-grid'>
      <Display x={previous} y={current} z={operation}/>
      <button className='but' onClick={()=>{dispatch({type:TASKS.CLEAR})}}>C</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"sin"})}}>sin</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"cos"})}}>cos</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"tan"})}}>tan</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"^2"})}}>x^2</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"^3"})}}>x^3</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"^1/2"})}}>x^1/2</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.SCIENCE,payload:"^1/3"})}}>x^1/3</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"1"})}}>1</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"2"})}}>2</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"3"})}}>3</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.OPERATION,payload:"/"})}}>/</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"4"})}}>4</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"5"})}}>5</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"6"})}}>6</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.OPERATION,payload:"*"})}}>*</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"7"})}}>7</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"8"})}}>8</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"9"})}}>9</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.OPERATION,payload:"-"})}}>-</button>
      <button className='but' onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"."})}}>.</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.DIGIT,payload:"0"})}}>0</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.EQUAL,payload:"="})}}>=</button>
      <button className='but'onClick={()=>{dispatch({type:TASKS.OPERATION,payload:"+"})}}>+</button>
  </div>;
};

export default Button;
