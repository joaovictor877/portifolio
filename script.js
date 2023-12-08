/* slider-es animação em carrosel tech */
let count = 1;
document.getElementById("radio1").checked = true;

setInterval( function(){
nextImage();
}, 5000)


function nextImage(){
    count++;
    if(count>4){
        count = 1;
}

document.getElementById("radio"+count).checked = true;

/*evento de clique a todos os link com # quando clicado correspondente a uma página de com efeito deslizante*/
}
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
