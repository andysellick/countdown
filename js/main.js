
$(function() {
  var count = 31;
  var timeout = 60000; //how long between each increment of time. 60000 is one minute
  var clocktimeout = 1500; //how long to display the actual number of minutes left, 1500 is good
  var warningcount = 0;
  var $c = $('#countdown');
  var $prog1 = $('.cdprog').find('.rpane .cover');
  var $prog2 = $('.cdprog').find('.lpane .cover');
  var $prog = $prog1;
  var deg = 0;
  var warnings = ['Stop','Done','End','Enough','Cease','Halt','Quit','Desist','Shut','up','FIN'];
  var timer1;
  var timer2;
  
  resizeCircle();
  
  function resizeCircle(){
    var pw = $(window).outerWidth();
    var ph = $(window).outerHeight();
    
    var circle = Math.min(pw,ph) - 40;
    $('#parent').css({
      'width':circle + 'px',
      'height':circle + 'px'
    });
  }

  var resize;
  $(window).on('resize',function(){
    //don't resize immediately
    clearTimeout(resize);
    resize = setTimeout(resizeCircle,200);
  });

  var timer = setTimeout(cd,0);
  
  //do countdown
  function cd(){
    count--;
    $c.html(count);
    if(count > -1){
      showTime(); //show the time
      if(count > 0){
        timer2 = setTimeout(showTime,clocktimeout); //hide the time again fairly quickly
      }

      if(deg > 180){
        deg = 12;
        $prog = $prog2;
      }

      rotateElement($prog,deg);
      deg += 12;
      timer1 = setTimeout(cd,timeout);
    }
    else {
      clearTimeout(timer2);
      $c.html(warnings[warningcount]);

      if(warningcount < warnings.length - 1){
        warningcount++;
        timer1 = setTimeout(cd,timeout);
      }
    }
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
});
