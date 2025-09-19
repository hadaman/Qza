// ========= Topic Selection =========
if(window.location.pathname.includes("index.html")){
  const container = document.getElementById("topicList");
  Object.keys(quizData).forEach(topic => {
    const btn = document.createElement("button");
    btn.innerText = topic;
    btn.onclick = () => {
      localStorage.setItem("selectedTopic", topic);
      window.location.href = "quiz.html";
    }
    container.appendChild(btn);
  });
}

// ========= Quiz Logic =========
let currentIndex = 0;
let score = 0;
let questions = [];
let timer;
const timePerQuestion = 15;

if(window.location.pathname.includes("quiz.html")){
  const currentTopic = localStorage.getItem("selectedTopic");
  questions = quizData[currentTopic];
  showQuestion();

  document.getElementById("nextBtn").onclick = () => {
    currentIndex++;
    if(currentIndex >= questions.length){
      localStorage.setItem("score", score);
      localStorage.setItem("total", questions.length);
      window.location.href = "result.html";
    } else {
      showQuestion();
    }
  }
}

function showQuestion(){
  clearInterval(timer);
  let q = questions[currentIndex];
  document.getElementById("questionText").innerText = q.question;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      if(opt === q.answer) score++;
      document.querySelectorAll("#optionsContainer button").forEach(b=>b.disabled=true);
      clearInterval(timer);
    }
    container.appendChild(btn);
  });
  startTimer();
}

function startTimer(){
  let timeLeft = timePerQuestion;
  document.getElementById("timeLeft").innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").innerText = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timer);
      document.querySelectorAll("#optionsContainer button").forEach(b=>b.disabled=true);
    }
  }, 1000);
}

// ========= Result Page =========
if(window.location.pathname.includes("result.html")){
  const scoreText = document.getElementById("scoreText");
  const score = localStorage.getItem("score");
  const total = localStorage.getItem("total");
  scoreText.innerText = `Your Score: ${score}/${total}`;
}
