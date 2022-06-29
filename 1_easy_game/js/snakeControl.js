window.onload = function() {

    var palco = document.getElementById('palco');
    var ctx = palco.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game, 120);

    const velocidade = 1;

    let final = document.getElementById('final');

    var vx = vy = 0;
    var px = 10;
    var py = 15;

    var ax = ay = 15;

    var tamanhoP = 20;
    var quantiaP = 40;

    var trail = [];

    tail = 5;

    function game() {
        px += vx;
        py += vy;

        if (px < 0) {
            px = quantiaP-1;
        }
        if (px > quantiaP-1) {
            px = 0;
        }
        if (py < 0 ) {
            py = quantiaP-1;
        }
        if (py > quantiaP-1) {
            py = 0;
        }

        ctx.fillStyle = "#DBDBDB";
        ctx.fillRect(0,0, palco.width, palco.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tamanhoP, ay*tamanhoP, tamanhoP, tamanhoP);

        ctx.fillStyle = "#509BDC";

        for (var i = 0; i < trail.length; i++) {
             ctx.fillRect(trail[i].x * tamanhoP , trail[i].y * tamanhoP, tamanhoP-1, tamanhoP-1);

             if (trail[i].x == px && trail[i].y == py) {
                 vx = vy = 0;
                 tail = 5;
                 score = 0;
                 final.style.display = "block";
             }
             

        }
    
        trail.push({x:px, y:py}) 
        while (trail.length > tail) {
            trail.shift();
        }

        if (ax == px && ay == py) {
            tail++;
            score+=6;
            ax = Math.floor(Math.random()*quantiaP);
            ay = Math.floor(Math.random()*quantiaP);
        }

    }
    function keyPush (event) {
        final.style.display = "none";
        switch (event.keyCode) {
            case 37:
                vx = -velocidade;
                vy = 0;
                break
            case 38:
                vx = 0;
                vy = -velocidade;
                break
            case 39:
                vx = velocidade;
                vy = 0;
                break
            case 40:
                vx = 0;
                vy = velocidade;
                break
        }
    }

}		