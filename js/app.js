$(function(){
  // duplicate plugin
  $.fn.duplicate = function(count, cloneEvents) {
    var tmp = [];
    for ( var i = 0; i < count; i++ ) {
        $.merge( tmp, this.clone( cloneEvents ).get() );
    }
    return this.pushStack( tmp );
  };
  
  // single firework explosion
  function explode(elem_id) {
    $('.particle').remove();
    var fwArea = $(elem_id);
    var colors = [  '#ffffff', '#ff0000', '#00ff00', '#ffff00',
                '#00ffff', '#ff00ff', '#ffee00' ]
    var emitter = $('<div></div>').addClass('particle');
    var multicolor = Math.floor(Math.random()*10);
    emitter.css({
      left: Math.floor((800-2)*Math.random()) + 3 + 'px',
      top: Math.floor((200-2)*Math.random()) + 3 + 'px',
      background: colors[Math.floor(Math.random()*colors.length)]
    });
    fwArea.append(emitter.duplicate(55));
    $('div', fwArea).each(function() {
      var xoffset = Math.floor((10- -11)*Math.random()) + -10;
      var yoffset = Math.floor((10- -11)*Math.random()) + -10;
      if(multicolor > 5) {
        $(this).css('background', colors[Math.floor(Math.random()*colors.length)]);
      }
      $(this).animate({
        "left": "+=" + xoffset*15 + "px",
        "top": "+=" + yoffset*15 + "px",
      },  1100);
      $(this).animate({
        "opacity": "0.1",
        "top": "+=25"
        }, "slow");
      });
  }
  
  // fireworks loop
  function fireworksLoop(count, container) {
    $(container).show()
    explode(container);
    var i = 0;
    function myLoop () {
     setTimeout(function () {
        explode(container);
        i++;
        if (i < count) {
          myLoop();
        } else {
          $(container).hide()
        }
      }, 1500)
    }
    myLoop();
  }
  
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
    $('body').hide().fadeIn('slow');
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
            fireworksLoop(10, '#fireworkWrapper');
          } else if (howFar <= 5) {
            $('#veryHotHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '718px'}, 'slow');
          } else if (howFar <= 15 && howFar > 5) {
            $('#hotHint').fadeIn().finish().fadeOut(1000);
            $('#redBox').animate({width: '630px'}, 'slow');
          } else if (howFar <= 30 && howFar > 15) {
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