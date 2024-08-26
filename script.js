
/*evento de clique a todos os link com # quando clicado correspondente a uma página de com efeito deslizante*/

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    });
