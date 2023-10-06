import React, { useEffect, useState } from 'react'
import QuizResult from './QuizResult';
import axios from "axios";

function Quiz() {
    const url = "http://localhost:8080/"
    const [data,setdata]=useState()

    const [currentQuestion,setCurrentQuestion]=useState(0);
    const [score,setScore] = useState(0);
    const [clickedOption,setClickedOption]=useState(0);
    const [showResult,setShowResult]=useState(false);
    const changeQuestion = ()=>{
        updateScore();
        if(currentQuestion< data.length-1){
            setCurrentQuestion(currentQuestion+1);
            setClickedOption(0);
        }else{
            setShowResult(true)
        }
    }
    const updateScore=()=>{
        if(clickedOption===data[currentQuestion].answer){
            setScore(score+1);
        }
    }
    const resetAll=()=>{
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
    }
    useEffect(()=>{axios.get(url).then((res)=>{ console.log(res.data) 
        setdata(res.data)})},[])
  return (
    <div>
        <p className="heading-txt">Quiz APP</p>
        <div className="container">
            {showResult ? (
                <QuizResult score={score} totalScore={data.length} tryAgain={resetAll}/>
            ):(
            <>
            <div className="question">
                <span id="question-number">{currentQuestion+1}. </span>
                <span id="question-txt">{data[currentQuestion].question}</span>
            </div>
            <div className="option-container">
             <input type="button"></input>
             <span id="question-txt">{data[currentQuestion].question}</span>
             <span id="question-txt">{data[currentQuestion].option1}</span>
             <span id="question-txt">{data[currentQuestion].option2}</span>
             <span id="question-txt">{data[currentQuestion].option3}</span> 
             <span id="question-txt">{data[currentQuestion].option4}</span>          
            </div>
            <input type="button" value="Next" id="next-button" onClick={changeQuestion}/>
            </>)}
        </div>
    </div>
  )
}

export default Quiz