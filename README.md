# portifolio
adicionei a aba tecnológia e adicionei meu melhores trabalhos com o slider e slides + script em js para animação automática
adição de borda e troca de cores

##

Modificação 25/11
- Add: Redes Socias e aumento de margem-espaçamento e efeito do cursor nos icons da redes

    ![Alt text](images/image.png)

- e os botões seguem sem função ainda...

    ![Alt text](images/tela-bt.png)

- Add: bootstrap.min.css

##

Modificação 01/12
- Add: Função para os Botões para as páginas correspondente

    ![Alt text](images/botões.png)
    ![Alt text](images/trabalhos.png)

- Add: Quando um desses links é clicado, ele anima a rolagem para a seção correspondente usando a opção behavior: 'smooth'. Assim criando o efeito deslizante

    ![Alt text](images/efeito-deslizante.gif)

##

Modificação 08/12
- **Add:** Botão que muda o visual do site para modo escuro e modo normal

    ![Alt text](images/toggle%20mode.gif)

**- Add:** Novas cores ao design do portfólio, proporcionando uma aparência vibrante e atrativa

    --cor-primaria: #5901d8; /* Cor primária utilizada para destaques e elementos-chave */
    --cor-secundaria: #ffc409; /* Cor secundária, adiciona destaque e contraste */
    --cor-fundo: #1e1e1e; /* Cor de fundo principal, fundo do modo escuro */
    --cor-texto: #d0d0d0; /* Cor do texto principal, proporciona legibilidade no modo escuro */
    --cor-sombra: #ffffff25; /* Cor da sombra usada para elementos sombreados */

- Como Ficou:

![Alt text](images/image-6.png)

##

Modificação 12/12

**- Add:** Efeito RGB Animado

![Alt text](images/efeito%20rgb.png)

![Alt text](images/efeito%20rgb2.png)

O código CSS abaixo cria um efeito RGB animado, ideal para indicar processos de carregamento de forma estilizada e moderna. A classe "loading" contém barras verticais que apresentam uma transição dinâmica entre as cores preta e verde. A animação é aprimorada com o uso de sombras, rotações e um cálculo de atraso para criar um efeito pulsante cativante.

```css
.loading {
    position: relative;
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    height: 4vh;
}

.loading span {
    position: relative;
    width: 5px;
    height: 20px;
    background: #000;
}

.loading span::before {
    content: '';
    position: absolute;
    inset: 0;
    animation: animate 8s linear infinite;
    animation-delay: calc(var(--i) * 0.1s);
}

@keyframes animate {
    0% {
        background: #0f0;
        box-shadow: 0 0 5px #0f0, 0 0 15px #0f0, 0 0 30px #0f0, 0 0 50px #0f0;
        transform: rotate(0deg);
    }
    // ... (outros estágios da animação)
    90.1%, 100% {
        background: #000;
        box-shadow: none;
    }
}

```
HTML:
```html
<!-- Efeito RGB Final -->
<div class="loading">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
    <span style="--i:12;"></span>
    <span style="--i:13;"></span>
    <span style="--i:14;"></span>
    <span style="--i:15;"></span>
    <span style="--i:16;"></span>
    <span style="--i:17;"></span>
    <span style="--i:18;"></span>
    <span style="--i:19;"></span>
    <span style="--i:20;"></span>
</div>
<!-- Fim do Efeito RGB -->

```
```markdown
<!-- Efeito RGB Final -->
<div class="loading">
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
    <span style="--i:12;"></span>
    <span style="--i:13;"></span>
    <span style="--i:14;"></span>
    <span style="--i:15;"></span>
    <span style="--i:16;"></span>
    <span style="--i:17;"></span>
    <span style="--i:18;"></span>
    <span style="--i:19;"></span>
    <span style="--i:20;"></span>
</div>
<!-- Fim do Efeito RGB -->

```

Este é o html que cria o efeito RGB. Cada `<span>` representa uma faixa colorida, proporcionando um visual dinâmico e divertido