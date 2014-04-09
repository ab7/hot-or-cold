$(function(){
  // display or hide instructions
  function intructions() {
    $('#howTo').click(function() {
      $('#inputWrapper').hide();
      $('nav').hide();
      $('#instructions').fadeIn(1000);
    });
    $('#closeInstruc').click(function() {
      $('#instructions').hide();
      $('nav').fadeIn(1000);
      $('#inputWrapper').fadeIn(1000);
    });
  }

  // start a new game
  function newGame() {
    $('#correct').hide();
    $('#redBox').animate({width: '20px'}, 'slow');
    $('.userGuess').prop('placeholder', 'Enter');
    $('.userGuess').prop('disabled', false);
    $('.userGuess').focus();
    numToGuess = Math.floor((Math.random() * 100) + 1);
    $('.userGuess').keypress(function(e) {
      if (e.which === 13) {
        var guess = Number($(this).val());
        if (guess <= 100 && guess > 0) {
          var howFar = Math.abs(guess - numToGuess);
          if (guess === numToGuess) {
            $('#redBox').animate({width: '785px'}, 'slow');
            $('#correct').fadeIn();
            $('.userGuess').prop('disabled', true);
            $('.userGuess').prop('placeholder', 'Great!');
          } else if (howFar <= 10) {
            $('#veryHotHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '718px'}, 'slow');
          } else if (howFar <= 20 && howFar > 10) {
            $('#hotHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '630px'}, 'slow');
          } else if (howFar <= 30 && howFar > 20) {
            $('#warmHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '475px'}, 'slow');
          } else if (howFar <= 50 && howFar > 30) {
            $('#coldHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '295px'}, 'slow');
          } else {
            $('#iceColdHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '66px'}, 'slow');
          }
        } else {
          $('#error').fadeIn().finish().fadeOut(1000);
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