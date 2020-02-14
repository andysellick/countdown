var countdown = {
  interval: 0,
  resize: 0,

  countdown_minutes: 5,
  countdown_milliseconds: 0,
  start_time: 0,
  go_to: 0,

  leftside: 0,
  rightside: 0,
  currentside: 0,
  switched: 0,

  init: function(countdown_to) {
    this.countdown_minutes = this.checkIsNumber(countdown_to);
    this.countdown_milliseconds = this.countdown_minutes * 60000;
    this.start_time = Date.now();
    this.go_to = this.start_time + this.countdown_milliseconds;
    this.leftside = $('#left_pane');
    this.rightside = $('#right_pane');
    this.currentside = this.rightside;

    this.resizeCircle();
    this.interval = setInterval(this.countdown, 100);
    $('#countdown').html(this.minutesLeft(this.start_time));

    $(window).on('resize',function(){
      clearTimeout(this.resize);
      this.resize = setTimeout(countdown.resizeCircle, 100);
    });
  },

  checkIsNumber: function(suspect) {
    if (!isNaN(suspect) && suspect > 0) {
      return Math.floor(suspect);
    }
    return 5;
  },

  resizeCircle: function(){
    var pw = $(window).outerWidth();
    var ph = $(window).outerHeight();

    var circle = Math.min(pw,ph) - 40;
    $('#parent').css({
      'width':circle + 'px',
      'height':circle + 'px'
    });
  },

  rotateElement: function(elem, degrees){
    elem.css({
      'transform': 'rotate(' + degrees + 'deg)',
      '-ms-transform': 'rotate(' + degrees + 'deg)',
      '-moz-tranform': 'rotate(' + degrees + 'deg)',
      '-webkit-transform': 'rotate(' + degrees + 'deg)',
      '-o-transform': 'rotate(' + degrees + 'deg)'
    });
  },

  getCurrentDegrees: function(now) {
    var time_so_far = now - this.start_time;
    var percentage = (time_so_far / this.countdown_milliseconds) * 100;
    var degrees = (percentage / 100) * 360;
    return degrees;
  },

  minutesLeft: function(now) {
    return Math.ceil(this.countdown_minutes - ((now - this.start_time) / 60000));
  },

  countdown: function() {
    var now = Date.now();
    if (now < countdown.go_to) {
      var degrees = countdown.getCurrentDegrees(now);

      if (degrees >= 180 && !countdown.switched) {
        countdown.rotateElement(countdown.currentside, 180);
        countdown.currentside = countdown.leftside;
        countdown.switched = 1;
      }
      if (countdown.switched) {
        degrees -= 180;
      }
      countdown.rotateElement(countdown.currentside, degrees);
      $('#countdown').html(countdown.minutesLeft(now));
    }
    else {
      clearInterval(countdown.interval);
      countdown.rotateElement(countdown.currentside, 180);
      $('#countdown').html('0');
    }
  }
}
