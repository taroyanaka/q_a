function move_to_portal(){
  window.location.href = 'portal.html';
};
let tapCount = 0;
let lastTapTime = 0;
document.addEventListener('touchend', function(event) {
  const currentTime = new Date().getTime();
  const tapTime = currentTime - lastTapTime;
  if (tapTime < 500 && tapCount === 2) {
    // トリプルタップ
    console.log('tripple tap');
    // confrmでOKが押されたらportal.htmlに遷移
    if(window.confirm('go to portal?')){
      move_to_portal();
    }
    tapCount = 0;
  } else if (tapTime < 500) {
    tapCount++;
  } else {
    tapCount = 1;
  }
  lastTapTime = currentTime;
});

