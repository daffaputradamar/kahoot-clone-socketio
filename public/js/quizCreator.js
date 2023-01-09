var socket = io();
var questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase(){
    var questions = [];
    var name = document.getElementById('name').value;
    for(var i = 1; i <= questionNum; i++){
        var question = document.getElementById('q' + i).value;
        var answer1 = document.getElementById(i + 'a1').value;
        var answer2 = document.getElementById(i + 'a2').value;
        var answer3 = document.getElementById(i + 'a3').value;
        var answer4 = document.getElementById(i + 'a4').value;
        var correct = document.getElementById('correct' + i).value;
        var answers = [answer1, answer2, answer3, answer4];
        questions.push({"question": question, "answers": answers, "correct": correct})
    }
    
    var quiz = {id: 0, "name": name, "questions": questions};
    socket.emit('newQuiz', quiz);
}

function addQuestion(){
    questionNum += 1;
    
    var questionsDiv = document.getElementById('allQuestions');
    var randColor = randomColor();
    questionsDiv.insertAdjacentHTML('beforeend',`
    <div id="question-field" class="py-4 px-5 rounded mb-3" style="border-color:${randColor}; background-color:${randColor}26;">
        <div class="form-group">
            <label class="form-sm-2 col-form-label fw-bold">Pertanyaan ${String(questionNum)}: </label>
            <div class="col">
                <input class = "question form-control" id = "q${String(questionNum)}" type = "text" autofocus/>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col">
                <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Jawaban 1: </label>
                    <div class="col">
                        <input id = "${String(questionNum)}a1" type = "text" autofocus class="form-control"/>
                    </div>
                </div>
                <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Jawaban 2: </label>
                    <div class="col">
                        <input id = "${String(questionNum)}a2" type = "text" autofocus class="form-control"/>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Jawaban 3: </label>
                    <div class="col">
                        <input id = "${String(questionNum)}a3"  type = "text"autofocus class="form-control"/>
                    </div>
                </div>
                <div class="form-group row mb-3">
                    <label class="col-sm-3 col-form-label">Jawaban 4: </label>
                    <div class="col">
                        <input id = "${String(questionNum)}a4"  type = "text" autofocus class="form-control"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label">Kunci Jawaban (1-4) :</label>
            <div class="col-1">
                <input class = "correct form-control" id = "correct${String(questionNum)}"  type = "number" min="1" max="4" autofocus/>
            </div>
        </div>
    </div>
    `)
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Apakah kamu yakin ingin kembali, semua progress yang dibuat tidak akan tersimpan")) {
        window.location.href = "../";
    }
}

socket.on('startGameFromCreator', function(data){
    window.location.href = "../../host/?id=" + data;
});

function randomColor(){
    
    var colors = ['#4CAF50', '#f94a1e', '#3399ff', '#ff9933'];
    var randomNum = Math.floor(Math.random() * 4);
    return colors[randomNum];
}

function setBGColor(){
    var randColor = randomColor();
    document.getElementById('question-field').style.borderColor = randColor;
    document.getElementById('question-field').style.backgroundColor = randColor + '26';

}









