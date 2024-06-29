const start_btn = document.querySelector('.start_btn');
const box_quiz = document.querySelector('.box_quiz');
const next_btn = box_quiz.querySelector('.next_btn');
const bot_total_que = box_quiz.querySelector('.total_que');
const option_list = document.querySelector(".option_list");
const timecount = box_quiz.querySelector(".timecount");
const time_line = box_quiz.querySelector(".time_line");
const score_box = document.querySelector(".score");
const back_btn = score_box.querySelector(".back");

//jika tombol start di click
start_btn.onclick = ()=>{
    box_quiz.classList.add("activequiz");
    ShowQuestions(0);
    questionCount(1);
    startTime(15);
    startTimeLine(0);
    next_btn.style.display = "none";
}
let que_numb = 0;
let que_count = 1;
let counter;
let timevalue = 15;
let widthValue = 0;
let userscore = 0;
let scoreplayer = userscore * 20;

//ambil soal di soal.js
function ShowQuestions(index){
    const question_text = document.querySelector(".que_question");
    const opsi_list = document.querySelector(".option_list");
    let question = '<span>'+ questions[index].soal +'</span>';
    question_text.innerHTML = question;
    
    let option_tag = '<div class="option"><span>'+ questions[index].opsi[0] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].opsi[1] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].opsi[2] +'</span></div>'
                    + '<div class="option"><span>'+ questions[index].opsi[3] +'</span></div>';
    opsi_list.innerHTML = option_tag;

    const options = option_list.querySelectorAll(".option");
    for (let i = 0; i < options.length; i++){
        options[i].setAttribute("onclick","optionSelected(this)");
    }
}
//fungsi option
function optionSelected(ans){
    clearInterval(counter);
    clearInterval(counter_line); 
    let userans = ans.textContent;
    let correctrans = questions[que_numb].ans;
    let alloption = option_list.children.length;
    if(userans == correctrans){
        userscore += 1;
        ans.classList.add("correct");
        console.log("Answer is correct");
        console.log("Score Kamu = " + userscore);
    }
    else{
        ans.classList.add("incorrect");
        console.log("Answer is wrong");

        // jika jawaban salah
        for(let i = 0; i < alloption; i++){
            if(option_list.children[i].textContent == correctrans){
                option_list.children[i].setAttribute("class","option correct");
            }
        }
    }
    // disable untuk memilih jawaban lebih dari 1
    for (let i = 0; i < alloption; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}
//jika next button di click
next_btn.onclick = () =>{
    if(que_numb < questions.length -1){
        que_numb++;
        que_count++;
        ShowQuestions(que_numb);
        questionCount(que_count);
        clearInterval(counter);
        startTime(timevalue);
        clearInterval(counter_line);
        startTimeLine(widthValue);
        next_btn.style.display = "none";
    }
    else{
        console.log("Selesai");
        showScoreBox();
    }
}
//set timer
function startTime(time){
    counter = setInterval(timer,1000);
    function timer(){
        timecount.textContent = time;
        time--;
        if (time < 9 ){
            let addZero = timecount.textContent;
            timecount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
            timecount.textContent = "00";
        }
    }
}
function startTimeLine(time){
    counter_line = setInterval(timer,29);
    function timer(){
        timecount.textContent = time;
        time +=1;
        time_line.style.width = time + "px";
        if (time > 720){
            clearInterval(counter_line);
        }
    }
}
//jumlah soal
function questionCount(index){
    let totalquestion = '<span><p>'+ que_count +'</p>/<p>'+ questions.length+'</p>Soal</span>';
    bot_total_que.innerHTML = totalquestion;
}
//fungsi score
function showScoreBox(){
    box_quiz.classList.remove("activequiz");
    score_box.classList.add("activescorebox");
    const scoreText = score_box.querySelector(".result_score");
    const icon_sc = score_box.querySelector(".tired");
    let multipliedScore = userscore * 20;
    // jika score 
    if(userscore > 3){
        let scoretag = '<p>Score : <span>'+ multipliedScore +'</span></p>';
        scoreText.innerHTML = scoretag;
        let icon ='<i class="fa-solid fa-face-laugh-beam"></i>';
        icon_sc.innerHTML = icon
    }
    else if(userscore > 1){
        let scoretag = '<p>Score : <span>'+ multipliedScore +'</span></p>';
        scoreText.innerHTML = scoretag;
        let icon ='<i class="fa-solid fa-face-grin"></i>';
        icon_sc.innerHTML = icon
    }
    else{
        let scoretag = '<p>Score : <span>'+ multipliedScore +'</span></p>';
        scoreText.innerHTML = scoretag;
        let icon ='<i class="fa-solid fa-face-tired"></i>';
        icon_sc.innerHTML = icon
    }
}
//jika tombol "kembali" ditekan, reload
back_btn.onclick = ()=>{
    window.location.reload();
}


