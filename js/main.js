function resizeCircle(){
  var pw = $(window).outerWidth();
  var ph = $(window).outerHeight();
  
  var circle = Math.min(pw,ph) - 40;
  $('#parent').css({
    'width':circle + 'px',
    'height':circle + 'px'
  });
}

$(function() {
  var countdown_mins = 5;
  var countdown_secs = countdown_mins * 600; // 60,000 is one minute
  var increment_degrees = 360 / countdown_secs; // how many degrees to rotate each second
  var current_degrees = 0;
  var total_degrees = 0;

  resizeCircle();

  var leftside = $('#left_pane');
  var rightside = $('#right_pane');
  var currentside = rightside;
  $('#countdown').html(countdown_mins);
  var timer = setInterval(move_countdown, 60);

  function move_countdown() {
    console.log(total_degrees);
    if (total_degrees <= 360) {
      if (current_degrees > 180) {
        currentside = leftside;
        current_degrees = increment_degrees;
      }

      rotateElement(currentside, current_degrees);
      current_degrees += increment_degrees;
      total_degrees += increment_degrees;
    }
    else {
      clearInterval(timer);
    }
  }

  function rotateElement(elem, degrees){
    elem.css({
      'transform': 'rotate('+degrees+'deg)',
      '-ms-transform': 'rotate('+degrees+'deg)',
      '-moz-tranform': 'rotate('+degrees+'deg)',
      '-webkit-transform': 'rotate('+degrees+'deg)',
      '-o-transform': 'rotate('+degrees+'deg)'
    });
  }

/*
  //var count = 6;
  var timeout = 1000; //how long between each increment of time. 60000 is one minute
  var clocktimeout = 1500; //how long to display the actual number of minutes left, 1500 is good
  var warningcount = 0;
  //var degrees = 12; //degrees to rotate the timer by for each increment
  //var degree_counter = degrees;
  var $c = $('#countdown');
  var $prog1 = $('.cdprog').find('.rpane .cover');
  var $prog2 = $('.cdprog').find('.lpane .cover');
  var $prog = $prog1;
  var deg = 0;
  var warnings = ['Stop','Done','End','Cease','Halt','Quit','Desist','FIN'];
  var timer1;
  var timer2;

  var timer = setTimeout(move_countdown, 60);

  function move_countdown(){
    $c.html(countdown_mins);
    if(countdown_mins > -1){
      showTime(); //show the time
      if(countdown_mins > 0){
        timer2 = setTimeout(showTime, clocktimeout); //hide the time again fairly quickly
      }

      if(deg > 180){
        deg = degrees;
        $prog = $prog2;
      }

      rotateElement($prog,deg);
      deg += degrees;
      timer1 = setTimeout(move_countdown, timeout);
    }
    else {
      clearTimeout(timer2);
      $c.html(warnings[warningcount]);

      if(warningcount < warnings.length - 1){
        warningcount++;
        timer1 = setTimeout(cd,timeout);
      }
    }
    count--;
  }

  function showTime(){
    $('.countdown').toggleClass('visible');
    $('.cdprog').toggleClass('active');
    $('.logowrap').toggleClass('invisible');
  }

  function rotateElement(elem,deg){
    console.log(deg);
    elem.css({
      'transform': 'rotate('+deg+'deg)',
      '-ms-transform': 'rotate('+deg+'deg)',
      '-moz-tranform': 'rotate('+deg+'deg)',
      '-webkit-transform': 'rotate('+deg+'deg)',
      '-o-transform': 'rotate('+deg+'deg)'
    });
  }
*/
  var resize;
  $(window).on('resize',function(){
    clearTimeout(resize); //don't resize immediately
    resize = setTimeout(resizeCircle,200);
  });
});

