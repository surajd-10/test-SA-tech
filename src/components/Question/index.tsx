import React from "react";
import { IQuestionProps } from "./interfaces";
import "./index.css";

const Question =({question, handleYesButtonClick, handleNoButtonClick}: IQuestionProps)=>{
    return(
        <div className="questionContainer">
          <p className="question">{question}</p>
          <button className="responseButtons" onClick={handleYesButtonClick}>Yes</button>
          <button className="responseButtons" onClick={handleNoButtonClick}>No</button>
        </div>
    )
}

export default Question;