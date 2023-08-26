const container = document.querySelector(".container"),
    questionBox = document.querySelector(".question"),
    choiceBox = document.querySelector(".choice"),
    nextbtn = document.querySelector(".nextbtn"),
    scoreCard = document.querySelector(".scoreCard"),
    alert = document.querySelector(".alert");


const quiz = [

    {
        question: `( n power 2 = 4) then n equal ?`,
        choice: ["A. 2", "B. 3", "C. 4", "D. 5"],
        answer: "A. 2"
    }
    ,
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice: ["&lt;script&gt;", "&lt;javascript&gt;", "&lt;scripting&gt;", "&lt;js&gt;"],
        answer: "&lt;script&gt;"
    }
    ,
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice: ["The head section", "The &lt;body&gt; section", "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"],
        answer: "Both the &lt;head&gt; section and the &lt;body&gt; section are correct"
    }
    // ,
    // {
    //     question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    //     choice: ["&ltscript href=&quot;xxx.js&quot;>", "&lt;script name=&quot;xxx.js&quot;&gt;", "&lt;script src=&quot;xxx.js&quot;&gt;"],
    //     answer: "&lt;script src=&quot;xxx.js&quot;&gt;"
    // }
    // ,
    // {
    //     question: "The external JavaScript file must contain the &lt;script&gt; tag.",
    //     choice: ["True", "False"],
    //     answer: "False"
    // }
    // ,
    // {
    //     question: "How do you write &quot;Hello World&quot; in an alert box?",
    //     choice: ["alertBox(&quot;Hello World&quot;);",
    //         "msg(&quot;Hello World&quot;);",
    //         "alert(&quot;Hello World&quot;);",
    //         "msgBox(&quot;Hello World&quot;);"],
    //     answer: "alert(&quot;Hello World&quot;);"
    // }

];

let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choiceBox.textContent = "";
    for (let i = 0; i < questionDetails.choice.length; i++) {
        const currentChoice = questionDetails.choice[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choices');
        choiceBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        })
    }
}

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice .selected');
    if (selectedChoice.textContent == quiz[currentQuestionIndex].answer) {
        
        displayAlert('Correct Answer');
        score++
    }
    else {
      
        displayAlert('Wrong Answer')
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {

        showQuestions();
    }
    else {
        showScore();
        quizOver = true;
    }
}


const showScore = () => {
    questionBox.textContent = "";
    choiceBox.textContent = "";
    scoreCard.textContent = `You Score ${score} out of ${quiz.length}`;
    displayAlert("You have completed this quiz")
    nextbtn.textContent = "Play Again ";
  
}


const displayAlert = (msg)=>{
    alert.style.display="block"
    alert.textContent = msg;
}


showQuestions();
nextbtn.addEventListener('click', () => {
    const selectedChiose = document.querySelector(".choice .selected");
    if (!selectedChiose && nextbtn.textContent === "Next ") {
        
        displayAlert("Select Your Answer")
        return;
    }
    if (quizOver) {
        nextbtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        showQuestions();
        quizOver = false ; 
        score = 0 ;
    }
    else {
        checkAnswer();
    }
})