class Player {
    constructor(){
      this.index = null;
      this.distance = 0;
      this.name = null;
      this.rank = null;
    }

    getCount(){ //this gets the amount of players from the firebase database.
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){ //this updates the playercount in the firebase database.
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){ //this updates the value of players in the firebase database.
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        distance:this.distance
      });
    }
  
    static getPlayerInfo(){ //this reads values from the players section in the firebase database.
      var playerInfoRef = database .ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }

    getCarsAtEnd() { //this is the function used to get the amount of cars at the end, and updates the count of the cars in the end of the game.
      database.ref('CarsAtEnd').on("value", (data)=>{
        this.rank = data.val();
      })
    }
    
    static updateCarsAtEnd(rank) { //it updates the amount of cars at the endn in the firebase database.
      database.ref('/').update({
        CarsAtEnd: rank
      });
    }

  }
  