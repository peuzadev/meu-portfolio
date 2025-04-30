document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão de navegação

       
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

       
        const scrollToElement = () => {
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 100; 
            let startTime = null;

            function animation(currentTime) {
                if (!startTime) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const scrollAmount = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, scrollAmount);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

       
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        };

        
        scrollToElement();
    });
});

let slideIndex = 0;  // Inicia no primeiro slide

// Função para mover o slide
function moveSlide(n) {
  const slides = document.querySelectorAll('.card3');  // Todos os cards
  const totalSlides = slides.length;  // Número total de slides

  slideIndex += n;  // Atualiza o índice do slide

  // Impede o índice de ultrapassar os limites
  if (slideIndex < 0) {
    slideIndex = totalSlides - 1;  // Volta para o último slide
  } else if (slideIndex >= totalSlides) {
    slideIndex = 0;  // Vai para o primeiro slide
  }

  // Atualiza a posição do slider
  const sliderTrack = document.querySelector('.slider-track');
  
  // Calcula a largura dos cards
  const cardWidth = slides[0].offsetWidth;  // Largura de um card
  sliderTrack.style.transition = "transform 0.5s ease-in-out";  // Adiciona transição suave
  sliderTrack.style.transform = `translateX(-${slideIndex * cardWidth}px)`;  // Move a track
}


