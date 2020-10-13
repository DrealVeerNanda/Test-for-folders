class Form {

    constructor() {
      this.input = createInput("Name");
      this.button = createButton('Play');
      this.greeting = createElement('h2');
      this.reset = createButton('Reset'); // reset button
    }
    hide(){ //hiding the form(used in game.js).
      this.greeting.hide(); //hides the greeting
      this.button.hide(); //hides the button
      this.input.hide(); // hides the input
    }
  
    display(){ //used to display the form and code for how the form looks.
      //displaying things/formating.
      var title = createElement('h2')
      title.html("Car Racing Game");
      title.position(displayHeight/2 - 50, 0);
      //positions for buttons
      this.input.position(displayWidth/2 - 40, displayHeight/2 - 80);
      this.button.position(displayWidth/2 + 30, displayHeight/2);
      this.reset.position(displayWidth - 100, 20);
      this.button.mousePressed(()=>{ // reset button
        this.input.hide(); 
        this.button.hide();
        player.name = this.input.value();
        playerCount+=1;
        player.index = playerCount;
        player.update();
        player.updateCount(playerCount);
        this.greeting.html("Hello " + player.name)
        this.greeting.position(displayWidth/2 - 70, displayHeight/4);
      });
    this.reset.mousePressed(()=>{
      player.updateCount(0);
      game.update(0);
    })
    }
  }
  