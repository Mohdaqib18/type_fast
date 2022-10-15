
import React from "react";

 export default function App(){

	 const STARTING_TIME = 15;
	 const [text , setText] = React.useState("");
	 const [timeRemaining , setTimeRemaining] = React.useState(STARTING_TIME)
	 const [isTimeRunning, setIsTimeRunning] = React.useState(false);
   const [wordCount, setWordCount] = React.useState(0)
	 const textBoxRef = React.useRef();


	 function handleChange(event){

		const {value} = event.target;

		setText(value);
		 
	 }


	 function countWords(text){
		   const wordsArray = text.trim().split(" ");
			 const filteredArrayLength = wordsArray.filter( word => word !== "").length
			 return filteredArrayLength;
	 }
  
	 function startGame(){
    setIsTimeRunning(true);
		setTimeRemaining(STARTING_TIME)
		setText("")
    textBoxRef.current.disabled = false;
		textBoxRef.current.focus(); 
        setWordCount(0);
	 }
     
	 function endGame(){
		    setIsTimeRunning(false)
				setWordCount(countWords(text))
				
	 }
    

	  
	  React.useEffect(() => {
			if(timeRemaining !== 0  && isTimeRunning){
				setTimeout(()=>{
					setTimeRemaining( time => time - 1)
				},1000)
				
			} else if( timeRemaining === 0)
			{
				endGame();
			}
		

		},[timeRemaining, isTimeRunning])
	return(
			 <div>

				<h1>How fast do you type?</h1>
			<textarea
			ref={textBoxRef}
			disabled={isTimeRunning === false} 
			value={text}
			name="text"
			onChange={handleChange}/>
			<h4>Time remaining: {timeRemaining}</h4>
			<button disabled={isTimeRunning} onClick={startGame}>Start Game</button>
			<h4>Word Count: {wordCount}</h4>
			 </div>
	)
}

