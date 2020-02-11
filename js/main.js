function resizeCircle(){
  var pw = $(window).outerWidth();
  var ph = $(window).outerHeight();
  
  var circle = Math.min(pw,ph) - 40;
  $('#parent').css({
    'width':circle + 'px',
    'height':circle + 'px'
  });
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

function get_current_degrees(now, go_to) {
  var time_so_far = now - start_time;
  var percentage = (time_so_far / countdown_milliseconds) * 100;
  var degrees = (percentage / 100) * 360;
  return degrees;
}

function minutes_left(now) {
  return Math.ceil(countdown_minutes - ((now - start_time) / 60000));
}

var interval;
var countdown_minutes = 5;
var countdown_milliseconds = countdown_minutes * 60000;
var start_time = Date.now();
var go_to = start_time + countdown_milliseconds;

var leftside = $('#left_pane');
var rightside = $('#right_pane');
var currentside = rightside;
var switched = 0;

$(function() {
  resizeCircle();
  interval = setInterval(countdown, 100);
  $('#countdown').html(minutes_left(start_time));

  var resize;
  $(window).on('resize',function(){
    clearTimeout(resize);
    resize = setTimeout(resizeCircle, 200);
  });

  function countdown() {
    var now = Date.now();
    if (now < go_to) {
      var degrees = get_current_degrees(now, go_to);

      if (degrees >= 180 && !switched) {
        console.log('switch')
        rotateElement(currentside, 180);
        currentside = leftside;
        switched = 1;
      }
      if (switched) {
        degrees -= 180;
      }
      rotateElement(currentside, degrees);
      $('#countdown').html(minutes_left(now));
    }
    else {
      clearInterval(interval);
      rotateElement(currentside, 180);
      $('#countdown').html('0');
    }
  }
});
