 

var gameOfLife = {
  width: 18,
  height: 14,
  stepInterval: 300,
  running:-1,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    */
  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };
    
    for (var i=0;i<this.width;i++){
      for(var j=0;j<this.height;j++){
        var dimension=(i+"-"+j);
        var cell = document.getElementById(dimension);
        cell.onclick = onCellClick;
      }
    }
   
      document.getElementById('clear_btn').onclick = function(e){
        if(gameOfLife.running!=-1){
          gameOfLife.disableAutoPlay();
        };
        
          for (var i=0;i<gameOfLife.width;i++){
            for(var j=0;j<gameOfLife.height;j++){
              var dimension=(i+"-"+j);
              var cell = document.getElementById(dimension);
              cell.className = "dead";
              cell.setAttribute('data-status', 'dead');
              }
            }
          };
      
      document.getElementById('reset_btn').onclick = function(e){
          var probability = 0.3;
          for (var i=0;i<gameOfLife.width;i++){
            for(var j=0;j<gameOfLife.height;j++){
              var dimension=(i+"-"+j);
              var cell = document.getElementById(dimension);
              if (Math.random()<probability){
                cell.className = "alive";
                cell.setAttribute('data-status', 'dead');
              }
              else {
                cell.className = "dead";
                cell.setAttribute('data-status', 'dead');
              }
            }
          }
      };
      
      document.getElementById('step_btn').onclick = function(e){
          gameOfLife.step();
          };
          
      document.getElementById('play_btn').onclick = function(e){
          
          if(this.innerText == 'Play')
          {
            gameOfLife.enableAutoPlay();  
            this.innerText = "Pause";
          }
          else
          {
            gameOfLife.disableAutoPlay();
            this.innerText = "Play";
          }
      };
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    var livingNeighbors= function(row,column){
      var LN = 0;
      for (var i=row-1;i<row+2;i++){
        for (var j = column-1;j<column+2;j++){
              var dimension=(i+"-"+j);
              var cell = document.getElementById(dimension);
              if (!(j===column && i===row) && !!cell && cell.className === "alive"){
                  LN++;
              }
        }
      }
      return LN;
    };
    // 2. Set the next state of all cells based on their alive neighbors
    var willBeAlive= function(row,column){
      var dimension=(row+"-"+column);
      var cell = document.getElementById(dimension);
      var status=cell.getAttribute("data-status");
      var LN=livingNeighbors(row,column);
      
      if(status==='dead'){
        if (LN===3){
          return true;
        } else return false
      };
      
        if (status==='alive'){
            if(LN<2 || LN>3){
              return false;
            } else return true;
         }
    };// end of willBeAlive


var makeBirthArray=function(){
  var birthArray=[];  
    
     for (var i=0;i<gameOfLife.width;i++){
            for(var j=0;j<gameOfLife.height;j++){
              var dimension=(i+"-"+j);
              
              var aliveStatus=willBeAlive(i,j);
              
              birthArray.push([dimension,aliveStatus]);
            }  
      
    } 
    return birthArray;
};
    
var birthArray=makeBirthArray();

console.dir(birthArray);

for(var i = 0; i < birthArray.length; i++){
  var dim = birthArray[i][0];
  if(birthArray[i][1]) {
    document.getElementById(dim).setAttribute('data-status','alive');
    document.getElementById(dim).className = 'alive';
  }
  else {
    document.getElementById(dim).setAttribute('data-status','dead');
    document.getElementById(dim).className = 'dead';
  }
}

//console.dir(birthArray);

    //console.log(willBeAlive(0,0))
  },

  enableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
       this.running=setInterval(this.step,300);
    },
  
    disableAutoPlay: function () {
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval
       clearInterval(this.running);
       this.running=-1;
    }

};

  gameOfLife.createAndShowBoard();
