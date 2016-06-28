var QUESTIONS = [
  {
    text: "<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$",
    answers: [
      "0815",
      "2B",
      "BAM128",
      "Barely"
    ],
    correct: 0
  },
  {
    text: "+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)",
    answers: [
      "0815",
      "2B",
      "BAM128",
      "Barely"
    ],
    correct: 1
  },
  {
    text: "*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p",
    answers: [
      "0815",
      "2B",
      "BAM128",
      "Barely"
    ],
    correct: 2
  },
  {
    text: "]xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~",
    answers: [
      "0815",
      "2B",
      "BAM128",
      "Barely"
    ],
    correct: 3
  }
];

var Model = function() {
  this.questions = QUESTIONS;
  this.resetState();
  this.initDisplayLink = null;
  this.updateDisplayLink = null;
}

Model.prototype.scoreQuestion = function(choice) {
  var i = this.index;
  var correctAnswer = this.questions[i].correct;
  if(correctAnswer === choice){
    this.score += 1;
  }
  this.index += 1;

  if(this.updateDisplayLink){
    this.updateDisplayLink(this.questions[this.index], this.index, this.score);
  }
}

Model.prototype.resetState = function() {
  this.index = 0;
  this.score = 0;
  if(this.initDisplayLink){
    this.initDisplayLink(this.questions[0], this.questions.length);
  }
}

var View = function() {
    this.questionsPageElement = $(".questions-page");
    this.resultsPageElement = $(".results-page");
    this.currentElement = $(".question-current");
    this.totalElement = $(".questions-total");
    this.questionElement = $(".question");
    this.answersElement = $(".answers");
    this.scoreElement = $(".score");
    this.restartElement = $(".restart-button");

    this.scoreLink = null;
    this.restartLink = null;

    this.setAnswer.bind(this);
    this.answersElement.on("click","button",this.getAnswer.bind(this));
    this.restartElement.on("click", this.restartQuiz.bind(this));
}

View.prototype.initDisplay = function(question, totalQuestions){
    this.totalElement.text(totalQuestions);
    this.setQuestion(question,0,0);
    this.showQuestions();
}

View.prototype.getAnswer = function(event) {
    //this is the button i pressed
    var chosenAnswer = parseInt(event.target.value);
    if(this.scoreLink) {
        this.scoreLink(chosenAnswer);
    }
}

View.prototype.updateDisplay = function(question, questionIndex, currentScore){
    this.currentElement.text(questionIndex); 
    this.scoreElement.text(currentScore);
    if(question){
        this.setQuestion(question,questionIndex);
    }
    else{
        this.showResults();
    }
}

View.prototype.setQuestion = function(question, questionIndex){
    this.currentElement.text(questionIndex);
    this.questionElement.text(question.text);

    this.answersElement.empty();
    for(var i = 0; i < question.answers.length; i+=1){
        this.setAnswer(question.answers[i],i);
    }
}

View.prototype.setAnswer = function(answerText,answerIndex) {
    this.answersElement.append("<li>" +
            "<button type=\"button\" value=\"" + answerIndex + "\">" + 
            answerText + "</button></li>");
}

View.prototype.showResults = function() {
    this.questionsPageElement.hide();
    this.resultsPageElement.show();
};

View.prototype.showQuestions = function() {
    this.resultsPageElement.hide();
    this.questionsPageElement.show();
};

View.prototype.restartQuiz = function() {
    if(this.restartLink){
        this.restartLink();
    }
}

var Controller = function(model, view) {
    model.initDisplayLink = view.initDisplay.bind(view);
    view.restartLink = model.resetState.bind(model);
    model.updateDisplayLink = view.updateDisplay.bind(view);
    view.scoreLink = model.scoreQuestion.bind(model);
}

$(document).ready(function() {
  var model = new Model();
  var view  = new View();
  var controller = new Controller(model, view);

  view.restartQuiz();
});
