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
}

Model.prototype.scoreQuestion = function(choice) {
  var i = this.index;
  var correctAnswer = this.questions[i].correct;
  if(correctAnswer === choice){
    this.score += 1;
  }
  this.index += 1;
}

Model.prototype.resetState = function() {
  this.index = 0;
  this.score = 0;
}

var View = function() {
    this.questionsPageElement = $(".questions-page");
    this.resultsPageElement = $(".results-page");
    this.currentElement = $(".question-current");
    this.totalElement = $(".question-total");
    this.questionElement = $(".question");
    this.answersElement = $(".answers");
    this.scoreElement = $(".score");
}

View.prototype.setQuestion = function(questionIndex){
    //don;t use this QUESTIONS directly, receive from model
    var question = QUESTIONS[questionIndex];
    this.currentElement.text(questionIndex);
    this.questionElement.text(question.text);

    //TODO fix this localAE
    //var localAE = this.answersElement;
    //localAE.empty();
    var that = this;
    that.answersElement.empty();
    question.answers.forEach(function(answer) {
        //localAE.append("<li><button type=\"button\">" + answer + "</button></li>");
        that.answersElement.append("<li><button type=\"button\">" + answer + "</button></li>");
    });
    //this.answersElement = localAE;
}


View.prototype.showResults = function() {
    this.questionsPageElement.hide();
    this.resultsPageElement.show();
};

View.prototype.showQuestions = function() {
    this.resultsPageElement.hide();
    this.questionsPageElement.show();
};


$(document).ready(function() {
  var model = new Model();
  var view  = new View();



  view.setQuestion(0);
  // model.scoreQuestion(0);
  // view.setQuestion(0);
  // model.scoreQuestion(1);
  // view.setQuestion(0);
  // model.scoreQuestion(1);
  // view.setQuestion(0);
  // model.scoreQuestion(3);

  model.resetState();
});
