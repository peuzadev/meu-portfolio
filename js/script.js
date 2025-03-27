document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão de navegação

        // Seleciona a seção alvo
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        // Função de rolagem suave personalizada
        const scrollToElement = () => {
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 600; // Duração da animação em milissegundos
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

            // Função de easing (movimento suave)
            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        };

        // Aplica a rolagem suave
        scrollToElement();
    });
});