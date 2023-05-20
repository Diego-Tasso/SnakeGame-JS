window.onload = function () {
    var palco = document.getElementById('palco');
    var ctx = palco.getContext("2d");
    document.addEventListener("keydown", keyPush);
    var intervaloAtual = setInterval(game, 100); // Intervalo inicial de 100ms

    const velocidade = 1;

    var vx = vy = 0;
    var px = 10;
    var py = 15;

    var ax = ay = 15;

    var tamanhoP = 20;
    var quantiaP = 40;

    var trail = [];

    var tail = 5;
    var score = 0;

    var fase = 1;

    let final = document.getElementById('final');
    let fase2 = document.getElementById('fase2');
    let fase3 = document.getElementById('fase3');
    let allOut = document.getElementById("allOut");
    let finalt = document.getElementById ("final-text");
    let fase2t = document.getElementById("fase2-text");
    let fase3t = document.getElementById("fase3-text");

    function game() {
        px += vx;
        py += vy;

        if (px < 0) {
            px = quantiaP - 1;
        }
        if (px > quantiaP - 1) {
            px = 0;
        }
        if (py < 0) {
            py = quantiaP - 1;
        }
        if (py > quantiaP - 1) {
            py = 0;
        }

        ctx.fillStyle = "#DBDBDB";
        ctx.fillRect(0, 0, palco.width, palco.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax * tamanhoP, ay * tamanhoP, tamanhoP, tamanhoP);

        ctx.fillStyle = "#509BDC";

        for (var i = 0; i < trail.length; i++) {
            ctx.fillRect(trail[i].x * tamanhoP, trail[i].y * tamanhoP, tamanhoP - 1, tamanhoP - 1);

            if (trail[i].x === px && trail[i].y === py) {
                vx = vy = 0;
                score = 0;
                if (fase == 1) {
                    tail = 5;
                }
                else if (fase == 2) {
                    tail = 8;
                }
                else if (fase == 3) {
                    tail = 12;
                }
                if (fase2.style.display === 'block' || fase3.style.display === 'block') {
                    final.style.display = 'none';
                }
                else if (fase3.style.display === 'block') {
                    fase2.style.display = 'none';
                }
                else {
                    final.style.display = 'block';
                }
            }
        }

        trail.push({ x: px, y: py });
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax === px && ay === py) {
            tail++;
            score += 5;
            ax = Math.floor(Math.random() * quantiaP);
            ay = Math.floor(Math.random() * quantiaP);
        }
        document.getElementById('pontuacao').textContent = score;
        document.getElementById('fase').textContent = fase;

        if (score >= 100 && fase === 1) {
            trocarFase(2, 80); // Trocar para a fase 2 com intervalo de 70ms
            fase2.style.display = "block";
        }  
        else if (score >= 150 && fase === 2) {
            trocarFase(3, 60); // Trocar para a fase 3 com intervalo de 60ms
            fase3.style.display = "block";
        }
        else if (score >= 200 && fase === 3) {
            trocarFase(4, 60); // Trocar para a tela final,
        }
    }

    function trocarFase(novaFase, novoIntervalo) {
        fase = novaFase;

        // Atualizar elementos do jogo com base na nova fase
        if (fase === 2) {
            tail = 8; // Aumentar o tamanho da cauda na fase 2
            vx = vy = 0;
            score = 0;
            final.style.display = "none";
        } 
        else if (fase === 3) {
            tail = 12; // Aumentar o tamanho da cauda na fase 3
            vx = vy = 0;
            score = 0;
            final.style.display = "none";
        }
        else if (fase === 4) {
            zerou.style.display = "block";
            palco.style.display = "none";
            allOut.style.display = "none";
            finalt.style.color = "black";
            fase2t.style.color = "black";
            fase3t.style.color = "black";
        }

        // Reiniciar a posição da cobra e da fruta
        px = py = 10;
        ax = ay = 15;

        clearInterval(intervaloAtual); // Limpar o intervalo atual
        intervaloAtual = setInterval(game, novoIntervalo); // Criar um novo setInterval com o novo intervalo de tempo
    }

    function keyPush(event) {
        final.style.display = "none";
        fase2.style.display = "none";
        fase3.style.display = "none";
        switch (event.keyCode) {
            case 37:
                vx = -velocidade;
                vy = 0;
                break;
            case 38:
                vx = 0;
                vy = -velocidade;
                break;
            case 39:
                vx = velocidade;
                vy = 0;
                break;
            case 40:
                vx = 0;
                vy = velocidade;
                break;
        }
    }
}
