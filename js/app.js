$(function(){
  // display or hide instructions
  function intructions() {
    $('#howTo').click(function() {
      $('#inputWrapper').hide();
      $('#instructions').fadeIn(1000);
    });
    $('.close').click(function() {
      $('#instructions').hide();
      $('#inputWrapper').fadeIn(1000);
    });
  }

  // start a new game
  function newGame() {
    $('#correct').hide();
    $('.userGuess').prop('placeholder', 'Enter your Guess');
    $('.userGuess').prop('disabled', false);
    $('.userGuess').focus();
    numToGuess = Math.floor((Math.random() * 100) + 1);
    $('.userGuess').keypress(function(e) {
      if (e.which === 13) {
        var guess = Number($(this).val());
        if (guess <= 100 && guess > 0) {
          var howFar = Math.abs(guess - numToGuess);
          if (guess === numToGuess) {
            $('#correct').fadeIn();
            $('.userGuess').prop('disabled', true);
            $('.userGuess').prop('placeholder', 'Good Job!');
          } else if (howFar <= 10) {
            $('#redBox').animate({width: '500px'}, 'slow');
          } else if (howFar <= 20 && howFar > 10) {
            $('#redBox').animate({width: '500px'}, 'slow');
          } else if (howFar <= 30 && howFar > 20) {
            $('#redBox').animate({width: '500px'}, 'slow');
          } else if (howFar <= 50 && howFar > 30) {
            $('#redBox').animate({width: '500px'}, 'slow');
          } else {
            $('#redBox').animate({width: '500px'}, 'slow');
          }
        } else {
          $('#error').fadeIn().finish().fadeOut(2000);
        }
        $(this).val("");
      }
      e.stopImmediatePropagation();
    });
  }
  
  // start listeners
  var numToGuess;
  intructions();
  newGame();
  $('#new').click(function() {
    newGame();
  });
});