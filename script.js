/* Evento de clique para links com # (âncoras) com efeito deslizante suave */

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os links com # (incluindo /#sobre, #contato, etc)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Verifica se é âncora na mesma página (#sobre) ou em outra página (/#sobre)
            const isExternalPage = href.includes('/');
            const hash = href.split('#')[1];
            
            // Se for âncora na mesma página
            if (hash && document.getElementById(hash)) {
                e.preventDefault();
                
                const targetElement = document.getElementById(hash);
                const headerOffset = 80; // Ajuste conforme altura do header fixo
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            // Se for link externo com âncora (ex: /#sobre), deixa o navegador lidar
        });
    });
    
    // Se a URL atual tem hash (#sobre), rola até o elemento ao carregar
    if (window.location.hash) {
        setTimeout(() => {
            const hash = window.location.hash.substring(1);
            const targetElement = document.getElementById(hash);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100); // Pequeno delay para garantir que a página carregou
    }
});
