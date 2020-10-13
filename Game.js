class Game {
    constructor(){}
  
    getState(){ //gets the gamestate so the game knows when to change from start to play to end.
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){ //changes gamestate in firebase database.
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){ //start command(adds the form).
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
      //images for the cars and the location of the cars.
      car1 = createSprite(100,200);
      car1.addImage("car1", car1_img);
      car2 = createSprite(300,200);
      car2.addImage("car2",car2_img);
      car3 = createSprite(500,200);
      car3.addImage("car3", car3_img);
      car4 = createSprite(700,200);
      car4.addImage("car4", car4_img);
      cars = [car1,car2,car3,car4];
    }
  
    play() { //this is what happens when the game starts(hide the form, add the players, makes the look of the cars(colors) the size of the game, and the distance between the cars. It also makes the camera of the game(if one player goes outside anothers players screen).).
      form.hide();
      //textSize(30);
      //text("Game Start", 120, 100)
      Player.getPlayerInfo();
      player.getCarsAtEnd();
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track,0,- displayHeight * 4, displayWidth, displayHeight * 5) //we did this so that it would fit the screen correctly, the first one was for keeping it centered, the second one was so that it would fit the screen, the third one was so that it would also fit the screen, but the other way.
        //var display_position = 130;
        var index = 0;  
        var x = 300;
        var y;

        for(var plr in allPlayers){
          index = index + 1;
          x = x + 260;
          y = displayHeight - allPlayers[plr].distance;
          cars[index - 1].x = x; 
          cars[index - 1].y = y; 
          if(index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x,y,60,60); //red circle around charactor
            cars[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index - 1].y;
          }
          
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){ //this moves the car upword when you press the up arrow and it updates it in the firebase database.
        player.distance += 10
        player.update();
        
      }

      if(player.distance > 5250) { //used to end the game once the player crosses the end line.
        gameState = 2;
        player.rank += 1;
        Player.updateCarsAtEnd(player.rank);
      }

      drawSprites();
    }

    end() { //what happens with game ends.
      console.log("game ended"); //tells you when game has ended.
      console.log(player.rank); //logging rank.
    }

  }