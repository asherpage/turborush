import React, { useEffect } from 'react';
import './styles.css';
import enemy1 from "./enemy1.png";
import enemy2 from "./enemy2.png";
import enemy3 from "./enemy3.png";

function MyComponent() {
  useEffect(() => {
    const score = document.querySelector(".score");
    const banner = document.querySelector(".banner");
    const ban = document.querySelector(".ban");
    const playbtn = document.querySelector(".play-again");
    const gameArea = document.querySelector(".gameArea");

    let player = { speed: 6, score: 0 };
    let keys = {
      ArrowUp: false,
      ArrowDown: false,
      ArrowRight: false,
      ArrowLeft: false,
    };
    
    const enemyImages = [
      enemy1,
      enemy2,
      enemy3
    ];

    function moveLines() {
      let lines = document.querySelectorAll(".line");
      lines.forEach(function (item) {
        if (item.y > 1500) {
          item.y -= 1500;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
      });
    }

    function isCollide(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function moveEnemy(car) {
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
        if (item.y > 1500) {
          item.y = -600;
          item.style.left = Math.floor(Math.random() * 350) + "px";
          // Randomly select one of the three images for the enemy
          item.style.backgroundImage = "url(" + enemyImages[Math.floor(Math.random() * enemyImages.length)] + ")";
        }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

    function playGame() {
      let car = document.querySelector(".car");
      let road = gameArea.getBoundingClientRect();

      moveLines();
      moveEnemy(car);
      if (player.score === 1000 && !player.speedIncreased) {
        player.speed += 3;
        player.speedIncreased = true; // Set flag to indicate speed increase
      }

       if (player.score >= 800 && !player.enemiesTripled || player.score >= 200 && !player.enemiesTripled) {
        // Generate two additional enemies for each initial enemy
        let initialEnemyCount = 2; // Initial number of enemies
        let additionalEnemyCount = initialEnemyCount + 2;
        let totalEnemyCount = initialEnemyCount + additionalEnemyCount; // Total number of enemies
        
        // Generate additional enemies
        for (let x = 0; x < additionalEnemyCount; x++) {
          let enemy = document.createElement("div");
          enemy.classList.add("enemy");
          enemy.y = (x + 1) * 300 * -1; // Adjust the distance between enemies if needed
          enemy.style.top = enemy.y + "px";
          enemy.style.left = Math.floor(Math.random() * 350) + "px";
          // Randomly select one of the three images for the enemy
          enemy.style.backgroundImage = "url(" + enemyImages[Math.floor(Math.random() * enemyImages.length)] + ")";
          gameArea.appendChild(enemy);
        }
        
        // Update player state to prevent additional spawning
        player.enemiesTripled = true;
      }
      
      if (player.start) {
        if (keys.ArrowUp && player.y > road.top - 542) {
          player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.bottom - 237) {
          player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
          player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < road.width - 54) {
          player.x += player.speed;
        }
        car.style.left = player.x + "px";
        car.style.top = player.y + "px";
        window.requestAnimationFrame(playGame);
        player.score++;
        score.innerText = "Score: " + player.score;
      }
    }

    function pressOn(e) {
      e.preventDefault();
      keys[e.key] = true;
    }

    function pressOff(e) {
      e.preventDefault();
      keys[e.key] = false;
    }

    function endGame() {
      player.start = false;
      ban.innerHTML = "Game Over<br>Score was " + player.score;
      banner.classList.remove("hide");
      // startScreen.classList.remove("hide");

      // Reset player's speed
      player.speed = 6;
      player.speedIncreased = false; // Reset the flag for speed increase
    }

    function start() {
  // Reset player state
  player.start = true;
  player.score = 0;
  player.enemiesTripled = false; // Reset the flag
  
  banner.classList.add("hide");
  gameArea.innerHTML = "";

  // Generate lines
  for (let x = 0; x < 10; x++) {
    let div = document.createElement("div");
    div.classList.add("line");
    div.y = x * 150;
    div.style.top = x * 150 + "px";
    gameArea.appendChild(div);
  }

      window.requestAnimationFrame(playGame);

      // Create player's car
      let car = document.createElement("div");
      car.setAttribute("class", "car");
      gameArea.appendChild(car);
      player.x = 200;
      player.y = car.offsetTop;

      // Generate initial enemy cars
      for (let x = 0; x < 3; x++) {
        let enemy = document.createElement("div");
        enemy.classList.add("enemy");
        enemy.y = (x + 1) * 600 * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * 350) + "px";
        // Randomly select one of the three images for the enemy
        enemy.style.backgroundImage = "url(" + enemyImages[Math.floor(Math.random() * enemyImages.length)] + ")";
        gameArea.appendChild(enemy);
      }
    }

    // Event listeners
    // startScreen.addEventListener("click", start);
    playbtn.addEventListener("click", start);
    document.addEventListener("keydown", pressOn);
    document.addEventListener("keyup", pressOff);

    return () => {
      document.removeEventListener("keydown", pressOn);
      document.removeEventListener("keyup", pressOff);
    };
  }, []);

  return (
    <div>
      {/* Use Link component for navigation */}
      {/* <Link to="./homescreen.html" className="home-button">Home</Link> */}
      <div className="score"></div>
      <div className="game">
        <div className="banner">
          <div className="ban"></div>
          <button className="play-again">Play again</button>
        </div>
        <div className="special-item"></div>
        {/* <div className="startScreen">
          {/* Use JSX for line breaks */}
          {/* Press here to Start<br />Arrow keys to move<br />Don't hit the other cars!
        </div> */}
        <div className="gameArea"></div>
      </div>
    </div>
  );
}

export default MyComponent;
