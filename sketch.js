var tela = 1;
var largura = 150;
var altura = 50;
var xMenu = 75;
var yMenu1 = 85;
var yMenu2 = 145;
var yMenu3 = 205;
var xVoltar = 0;
var yVoltar = 230;
var xOb = 500;
var xO = 500;
var yOb = 159.5;
var yO;
var xMoeda = 600;
var yMoeda = 130;
var moedaVelocidade = 2;
var Run = [];
var contRun = 0;
var tempo = 0;
var score = 0;
var pX = 20;
var pY = 130;
var velocityY = 0;
var gravity = 0.8;
var jumpStrength = -9;
var onGround = true;
var xRestart = 150;
var yRestart = 200;
var xMenuButton = 275;
var yMenuButton = 200;
var xNextButton = 350;
var yNextButton = 200;
var somSalto;
var musicaMenu;
var moeda;
var obstacleCounter = 0;
var curiosidades = [
  "O período Mesozoico, também conhecido como a Era dos Dinossauros, durou cerca de 180 milhões de anos.",
  "O maior dinossauro conhecido é o Argentinosaurus, que poderia atingir até 35 metros de comprimento.",
  "Alguns dinossauros, como o Velociraptor, eram cobertos por penas.",
  "Os dinossauros surgiram há cerca de 230 milhões de anos e dominaram a Terra até o fim do período Cretáceo.",
  "O período Mesozoico pode ser em três principais períodos: Triássico, Jurassico e Cretácio.",
  "O Triássico começou com uma extinção que permitiu a ascensão dos dinossauros.",
  "No início do Triássico, os dinossauros eram pequenos e bípedes.",
  "O Plateosaurus foi um dos primeiros grandes herbívoros do Triássico.",
  "O Archaeopteryx, um dos primeiros pássaros, viveu no final do Jurássico.",
  "Os continentes começaram a se mover para as posições atuais durante o Jurássico.",
  "O Jurássico apresentou uma variedade de ecossistemas, influenciando a evolução dos dinossauros.",
  "O Argentinosaurus foi um dos maiores dinossauros herbívoros, com até 35 metros de comprimento.",
  "Dinossauros carnívoros como o Tyrannosaurus rex e o Velociraptor dominaram o Cretáceo.",
  "Uma extinção em massa no final do Cretáceo eliminou os dinossauros não aviários.",
  "Plantas com flores surgiram no Cretáceo e se tornaram alimentos importantes.",

  
];
var curiosidadeAtual = "";
var curiosidadeExibida = false;

function preload() {
  fontT = loadFont('Font/dogicapixelbold.ttf');
  Menu = loadImage('Background/Menu.png');
  Tutorial = loadImage('Background/Tutorial.png');
  Game = loadImage('Background/Game.png');
  Credits = loadImage('Background/Credits.png');
  edu = loadImage('Faces/Rummenigge.png');
  pro = loadImage('Faces/JoãoCarlos.png');
  back = loadImage('Voltar.png');
  obstacle = loadImage('Obstacle.png');
  clouds = loadImage('Clouds.png');
  moeda = loadImage('Coin1.png');
  Run[0] = loadImage('Dino/Run 1.png');
  Run[1] = loadImage('Dino/Run 2.png');
  Run[2] = loadImage('Dino/Run 3.png');
  Run[3] = loadImage('Dino/Run 4.png');
  Run[4] = loadImage('Dino/Run 5.png');
  Run[5] = loadImage('Dino/Run 6.png');
  Run[6] = loadImage('Dino/Run 7.png');
  Run[7] = loadImage('Dino/Run 8.png');
  soundFormats('wav');
  somSalto = loadSound('Sounds/jump.wav');
  soundFormats('ogg');
  musicaMenu = loadSound('Sounds/Opening.ogg');
  somMoeda = loadSound('Sounds/coin.ogg');
}

function setup() {
  createCanvas(500, 300);
  yO = random(85);
  resetGame();
}

function keyPressed() {
  if (keyCode === UP_ARROW ||' ' && onGround) { 
    velocityY = jumpStrength;
    onGround = false;
    somSalto.play();
  }
}

function draw() {
  textStyle(NORMAL);

  if (tela == 1) {
    background(Menu);
    if (musicaMenu && !musicaMenu.isPlaying()) {
      musicaMenu.loop();
    }

    textAlign(CENTER);
    textSize(30);

    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu1 && mouseY < yMenu1 + altura) {
      stroke(200);
      fill(139, 69, 19, 100);
      rect(xMenu, yMenu1, largura, altura, 15);
      if (mouseIsPressed) {
        tela = 2;
        resetGame();
      }
    }

    fill(255);
    stroke(20);
    text("DINO-RUN", 250, 50);
    textSize(18);
    textFont(fontT);
    fill(255, 215, 0, 200);
    stroke(20);
    text("START", 150, 120);

    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu2 && mouseY < yMenu2 + altura) {
      stroke(200);
      fill(139, 69, 19, 100);
      rect(xMenu, yMenu2, largura, altura, 15);
      if (mouseIsPressed) {
        tela = 3;
      }
    }

    fill(255, 215, 0, 200);
    stroke(20);
    text("TUTORIAL", 150, 180);

    if (mouseX > xMenu && mouseX < xMenu + largura && mouseY > yMenu3 && mouseY < yMenu3 + altura) {
      stroke(200);
      fill(139, 69, 19, 100);
      rect(xMenu, yMenu3, largura, altura, 15);
      if (mouseIsPressed) {
        tela = 4;
      }
    }

    fill(255, 215, 0, 200);
    stroke(20);
    text("CREDITS", 150, 240);
  }

  else if (tela == 2) {
    background(Game);

    textSize(14);
    fill(255);
    text("Level: 01", 440, 290);
    textSize(14);
    fill(255);
    text("Score: " + score, width / 2, 20);
    score++;

    var dinoRight = pX + 45;
    var dinoBottom = pY + 90;
    var moedaRight = xMoeda + 50;
    var moedaBottom = yMoeda + 50;

    if (dinoRight > xMoeda && pX < moedaRight && dinoBottom > yMoeda && pY < moedaBottom) {
      somMoeda.play();
      score += 500;
      xMoeda = -100;
    }

    if (xMoeda > -100) {
      if (pX < xMoeda) {
        xMoeda -= moedaVelocidade;
      }
    } else {
      xMoeda = random(400, 600);
    }

    image(clouds, xO, yO, 90, 90);
    xO = xO - 2;
    if (xO < -100) {
      yO = random(85);
      xO = 500;
    }

    var c = dist(pX, pY, xO, yO);
    if (c > 0 && c < 50) {
      tela = 5;
    }

    c = dist(pX + 25, pY + 45, xOb + 30, 157 + 55);
    if (c > 0 && c < 60) {
      tela = 5;
    }

    tempo++;
    image(Run[contRun % 8], pX, pY, 90, 90);
    if (tempo > 8) {
      contRun = contRun + 1;
      tempo = 0;
    }

    image(obstacle, xOb, 157, 60, 90);
    xOb = xOb - 5;
    if (xOb < -50) {
      obstacleCounter++;
      xOb = 500;

    }

    image(moeda, xMoeda, yMoeda, 50, 50);

    image(back, 0, 230, 70, 70);
    if (mouseX > xVoltar && mouseX < xVoltar + 70 && mouseY > yVoltar && mouseY < yVoltar + 70) {
      if (mouseIsPressed) {
        tela = 1;
        resetGame();
      }
    }

    if (!onGround) {
      pY += velocityY;
      velocityY += gravity;
      if (pY > 130) {
        pY = 130;
        velocityY = 0;
        onGround = true;
      }
    }

    if (score >=1000) { 
      tela = 6;
      if (!curiosidadeExibida) {
        curiosidadeAtual = random(curiosidades);
        curiosidadeExibida = true;
      }
    }
  }

  else if (tela == 3) {
    background(Tutorial);
    textSize(30);
    text("TUTORIAL", 250, 50);
    textSize(14);
    fill(255);
    text("°Evite colidir com as nuvens e os espinhos usando a tecla seta para cima ou a tecla de espaço;", 0, 100, 500);
    text("°Fique atento aos obstáculos que se aproximam rapidamente;", 0, 170, 500);
    text("°Divirta-se jogando e tente alcançar a maior pontuação possível, pois a dificuldade aumenta em cada nível!", 0, 220, 500);

    image(back, 0, 230, 70, 70);
    if (mouseX > xVoltar && mouseX < xVoltar + 70 && mouseY > yVoltar && mouseY < yVoltar + 70) {
      if (mouseIsPressed) {
        tela = 1;
      }
    }
  }

  else if (tela == 4) {
    background(Credits);
    textSize(30);
    text("CREDITS", 250, 50);
    textSize(18);
    fill(255);
    text("João Carlos", 250, 100);
    textSize(14);
    text("Função: programador", 300, 120);
    textSize(18);
    text("Rummenigge", 250, 200);
    textSize(14);
    text("Função: educador", 279, 220);
    image(pro, 60, 70, 80, 80);
    image(edu, 60, 170, 80, 80);

    image(back, 0, 230, 70, 70);
    if (mouseX > xVoltar && mouseX < xVoltar + 70 && mouseY > yVoltar && mouseY < yVoltar + 70) {
      if (mouseIsPressed) {
        tela = 1;
      }
    }
  }

  else if (tela == 5) {
    background(Game);

    textSize(30);
    fill(255);
    text("Game Over!", width / 2, 130);
    textSize(26);
    text("Score: " + score, width / 2, 170);

    fill(139, 69, 19, 100);
    rect(xRestart, yRestart, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Restart", xRestart + 50, yRestart + 30);

    fill(139, 69, 19, 100);
    rect(xMenuButton, yMenuButton, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Menu", xMenuButton + 50, yMenuButton + 30);

    if (mouseIsPressed) {
      if (mouseX > xRestart && mouseX < xRestart + 100 && mouseY > yRestart && mouseY < yRestart + 50) {
        resetGame();
        tela = 2;
      }
      if (mouseX > xMenuButton && mouseX < xMenuButton + 100 && mouseY > yMenuButton && mouseY < yMenuButton + 50) {
        tela = 1;
        resetGame();
      }
    }
  }

  else if (tela == 6) {
    background(Game);

    textSize(30);
    fill(255);
    text("You Win!", width / 2, 50);
    textSize(18);
    text("Score: " + score, width / 2, 80);

    textSize(14);
    fill(255, 215, 0, 200);
    text(curiosidadeAtual, 50, 120, 400, 100);

    fill(139, 69, 19, 100);
    rect(80, yRestart, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Restart", 80 + 50, yRestart + 30);

    fill(139, 69, 19, 100);
    rect(200, yMenuButton, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Menu", 200 + 50, yMenuButton + 30);
    
    fill(139, 69, 19, 100);
    rect(320, yMenuButton, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Next", 320 + 50, yMenuButton + 30);

    if (mouseIsPressed) {
      if (mouseX > 80 && mouseX < 80 + 100 && mouseY > yRestart && mouseY < yRestart + 50) {
        resetGame();
        tela = 2;
      }
      if (mouseX > 200 && mouseX < 200 + 100 && mouseY > yMenuButton && mouseY < yMenuButton + 50) {
        tela = 1;
        resetGame();
      }
            if (mouseX > 320 && mouseX < 320 + 100 && mouseY > yMenuButton && mouseY < yMenuButton + 50) {
        tela = 7;
        resetGame();
      }
    }
  }
  
  else if (tela == 7) {
    background(Game);

    textSize(14);
    fill(255);
    text("Level: 02", 440, 290);
    textSize(14);
    fill(255);
    text("Score: " + score, width / 2, 20);
    score++;

    var dinoRight = pX + 45;
    var dinoBottom = pY + 90;
    var moedaRight = xMoeda + 50;
    var moedaBottom = yMoeda + 50;

    if (dinoRight > xMoeda && pX < moedaRight && dinoBottom > yMoeda && pY < moedaBottom) {
      somMoeda.play();
      score += 500;
      xMoeda = -100;
    }

    if (xMoeda > -100) {
      if (pX < xMoeda) {
        xMoeda -= moedaVelocidade;
      }
    } else {
      xMoeda = random(400, 600);
    }

    image(clouds, xO, yO, 90, 90);
    xO = xO - 1;
    if (xO < -100) {
      yO = random(85);
      xO = 500;
    }

    var c = dist(pX, pY, xO, yO);
    if (c > 0 && c < 50) {
      tela = 5;
    }

    c = dist(pX + 25, pY + 45, xOb + 30, 157 + 55);
    if (c > 0 && c < 60) {
      tela = 5;
    }

    tempo++;
    image(Run[contRun % 8], pX, pY, 90, 90);
    if (tempo > 8) {
      contRun = contRun + 1;
      tempo = 0;
    }

    image(obstacle, xOb, 157, 60, 90);
    xOb = xOb - 10;
    if (xOb < -50) {
      obstacleCounter++;
      xOb = 500;

    }

    image(moeda, xMoeda, yMoeda, 50, 50);

    image(back, 0, 230, 70, 70);
    if (mouseX > xVoltar && mouseX < xVoltar + 70 && mouseY > yVoltar && mouseY < yVoltar + 70) {
      if (mouseIsPressed) {
        tela = 1;
        resetGame();
      }
    }

    if (!onGround) {
      pY += velocityY;
      velocityY += gravity;
      if (pY > 130) {
        pY = 130;
        velocityY = 0;
        onGround = true;
      }
    }

    if (score >= 1500) { 
      tela = 8;
      if (!curiosidadeExibida) {
        curiosidadeAtual = random(curiosidades);
        curiosidadeExibida = true;
      }
    }
  }
    else if (tela == 8) {
    background(Game);

    textSize(30);
    fill(255);
    text("You Win!", width / 2, 50);
    textSize(18);
    text("Score: " + score, width / 2, 80);

    textSize(14);
    fill(255, 215, 0, 200);
    text(curiosidadeAtual, 50, 120, 400, 100);

    fill(139, 69, 19, 100);
    rect(xRestart, yRestart, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Restart", xRestart + 50, yRestart + 30);

    fill(139, 69, 19, 100);
    rect(xMenuButton, yMenuButton, 100, 50, 10);
    fill(255);
    textSize(14);
    text("Menu", xMenuButton + 50, yMenuButton + 30);

    if (mouseIsPressed) {
      if (mouseX > xRestart && mouseX < xRestart + 100 && mouseY > yRestart && mouseY < yRestart + 50) {
        resetGame();
        tela = 2;
      }
      if (mouseX > xMenuButton && mouseX < xMenuButton + 100 && mouseY > yMenuButton && mouseY < yMenuButton + 50) {
        tela = 1;
        resetGame();
      }
    }
  }
}

function resetGame() {
  xOb = 500;
  xO = 500;
  yO = random(85);
  xMoeda = random(400, 600);
  yMoeda = 130;
  contRun = 0;
  tempo = 0;
  score = 0;
  pY = 130;
  velocityY = 0;
  onGround = true;
  obstacleCounter = 0;
  curiosidadeExibida = false; 

  if (musicaMenu) {
    musicaMenu.stop(); 
  }
}

/*
Créditos aos criadores que utilizei de seus trabalhos na criação desse jogo:

As imagens de fundo foram criadas e publicadas no site "freepik.com" pelo autor "stockgiu";

As imagens do dinossauro foram criadas e publicadas no site "opengameart.org" pelo autor "pzUH";

O som da moeda foi criado e publicado no site "opengameart.org" pelo autor "Aeva";

O som do salto foi criado e publicado no site "opengameart.org" pelo autor "flush";

A música de fundo foi criada e publicada no site "opengameart.org" pelo autor "AVGVSTA";

A fonte utilizada foi criada e publicada no site "dafont.com" pelo autor Roberto Mocci;

O obstáculo, o botão de voltar e as nuvens foram criados por mim: João Carlos;

*/