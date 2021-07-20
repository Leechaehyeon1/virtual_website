(function(){
  const header = document.querySelector('header');
  const goToTop = document.querySelector('.go-to-top');

  const gnb = document.querySelector('.gnb');
  const gnbLIst = document.querySelectorAll('.gnb li a');
  const trigger = document.querySelector('.trigger');

  // go-top, gnb
  window.addEventListener('scroll', () => {
    if( window.scrollY > 40 ){
      header.classList.add('active');
      goToTop.classList.add('active');
    } else {
      header.classList.remove('active');
      goToTop.classList.remove('active');
    }
  });

  // Trigger
  trigger.addEventListener('click', () => {
    gnb.classList.toggle('active');
    trigger.classList.toggle('active');
  });

  for(let i = 0; i < gnbLIst.length; i++){
    gnbLIst[i].addEventListener('click', () => {
      gnb.classList.remove('active');
      trigger.classList.remove('active');
    });
  }

  // slide
  const slideControls = document.querySelector('.slide-controls');
  const pagerBtn = document.querySelectorAll('.slide-controls li');
  const slider = document.querySelector('.slider');

  for(let i = 0; i < pagerBtn.length; i++){
    pagerBtn[i].addEventListener('click', function(e){
      let pagerNum = e.target.getAttribute('data-index');
      slider.style.transform = `translateX(${-16.6667*pagerNum}%)`;

      for(let j = 0; j < pagerBtn.length; j++){
        pagerBtn[j].classList.remove('active');
      }
      e.target.classList.add('active');
    });
  }
  
})();