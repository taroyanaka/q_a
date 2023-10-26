let tapCount = 0;
let lastTapTime = 0;
document.addEventListener('touchend', function(event) {
  const currentTime = new Date().getTime();
  const tapTime = currentTime - lastTapTime;
  if (tapTime < 500 && tapCount === 2) {
    // トリプルタップ
    console.log('トリプルタップ');
    window.location.href = 'portal.html';
    tapCount = 0;
  } else if (tapTime < 500) {
    tapCount++;
  } else {
    tapCount = 1;
  }
  lastTapTime = currentTime;
});
