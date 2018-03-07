// Rover Object Goes Here
var rover1 = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [ ]
}

var rover2 = {
  direction: "N",
  x: 0,
  y: 9,
  travelLog: [ ]
}

// surface where rover will move
// 0 = blank space, 1 = obstacle, 2 = rover
var gridSurface = [
  [ 0, 0, 1, 0, 0, 0, 1, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 0, 0, 0, 0 ]
];
// ======================

// ======================
function turnLeft(rover){
  switch( rover.direction ) {
    case "N":
      rover.direction = "W";
      //console.log("Rover has turned to west");
      break;
    case "E":
      rover.direction = "N";
      //console.log("Rover has turned to north");
      break;
    case "S":
      rover.direction = "E";
      //console.log("Rover has turned to east");
      break;
    case "W":
      rover.direction = "S";
      //console.log("Rover has turned to south");
      break;
  }
}

function turnRight(rover){
  switch( rover.direction ) {
    case "N":
      rover.direction = "E";
      //console.log("Rover has turned to east");
      break;
    case "E":
      rover.direction = "S";
      //console.log("Rover has turned to south");
      break;
    case "S":
      rover.direction = "W";
      //console.log("Rover has turned to west");
      break;
    case "W":
      rover.direction = "N";
      //console.log("Rover has turned to north");
      break;
  }
}

/*
function to move rover forward
it checks limits, if rover is in a limit, it won't move
*/
function moveForward(rover, grid){
  var movement = false;
  // show if rover gets a limit, obstacle or another rover
  var limit = false;
  var obstacle = false;
  var anotherRover = false;

  switch( rover.direction ) {
    case "N":
      // check limit
      if( rover.y > 0 ) {
        // check if position is free
        if( grid[(rover.y)-1][rover.x] == 0 ) {
          // set now position as free
          grid[rover.y][rover.x] = 0;

          // set next position as occupied
          grid[(rover.y)-1][rover.x] = 2;

          // update rover position
          rover.y -= 1; 

          movement = true;
        } else if( grid[(rover.y)-1][rover.x] == 1 ) {
          // an obstacle is found
          obstacle = true;
        } else if( grid[(rover.y)-1][rover.x] == 2 ) {
          // another rover is found
          anotherRover = true;
        }   
      } else {
        // a limit is found
        limit = true;
      }           
      break;
    case "E":
      if( rover.x < 9 ) {
        if( grid[rover.y][(rover.x)+1] == 0 ) {
          grid[rover.y][rover.x] = 0;
          grid[rover.y][(rover.x)+1] = 2;
          rover.x += 1;
          movement = true;
        } else if( grid[rover.y][(rover.x)+1] == 1 ) {
          obstacle = true;
        } else if( grid[rover.y][(rover.y)+1] == 2 ) {
          anotherRover = true;
        }    
      } else {
        limit = true;
      }
      break;
    case "S":
      if( rover.y < 9 ) {
        if( grid[(rover.y)+1][rover.x] == 0 ) {
          grid[rover.y][rover.x] = 0;
          grid[(rover.y)+1][rover.x] = 2;
          rover.y += 1; 
          movement = true;
        } else if( grid[(rover.y)+1][rover.x] == 1 ) {
          obstacle = true;
        } else if( grid[(rover.y)+1][rover.x] == 2 ) {
          anotherRover = true;
        }
      } else {
        limit = true;
      }
      break;
    case "W":
      if( rover.x > 0 ) {
        if( grid[rover.y][(rover.x)-1] == 0 ) {
          grid[rover.y][rover.x] = 0;
          grid[rover.y][(rover.x)-1] = 2;
          rover.x -= 1;
          movement = true;
        } else if( grid[rover.y][(rover.x)-1] == 1 ) {
          obstacle = true;
        } else if( grid[rover.y][(rover.x)-1] == 2 ) {
          anotherRover = true;
        }
      } else {
        limit = true;
      }
      break;
  }
  
  //console.log( "Rover moved to (" + rover.x + ", " + rover.y + ")" );
  // add movement to travel log if rover has moved
  if( movement ) {
    rover.travelLog.push( [rover.x, rover.y] );
  } else if( limit ) {
    console.log("Error: Rover got a surface limit");
  } else if( obstacle ) {
    console.log("Error: Rover cannot move, there is an obstacle");
  } else if( anotherRover ) {
    console.log("Error: Another rover was found");
  }
}

/*
function to move rover backward
it checks limits, if rover is in a limit, it won't move
*/
function moveBackward(rover, grid){
  var movement = false;
  // show if rover gets a limit or obstacle
  var limit = false;
  var obstacle = false;

  switch( rover.direction ) {
    case "N":
      // check limit
      if( rover.y < 9 ) {
        // check if position is free
        if( grid[(rover.y)+1][rover.x] == 0 ) {
          rover.y += 1;
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }
      break;
    case "E":
      if( rover.x > 0 ) {
        if( grid[rover.y][(rover.x)-1] == 0 ) {
          rover.x -= 1;
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }
      break;
    case "S":
      if( rover.y > 0 ) {
        if( grid[(rover.y)-1][rover.x] == 0 ) {
          rover.y -= 1;
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }
      break;
    case "W":
      if( rover.x < 9 ) {
        if( grid[rover.y][(rover.x)+1] == 0 ) {
          rover.x += 1;
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }
      break;
  }

  // add movement to travel log if rover has moved
  if( movement ) {
    rover.travelLog.push( [rover.x, rover.y] );
  } else if( limit ) {
    console.log("Error: Rover got a surface limit");
  } else if( obstacle ) {
    console.log("Error: Rover cannot move, there is an obstacle");
  }
}

/*
 Function to enter a list of command
 Command valid: (f)orward, (b)ackward, (l)eft, (r)ight
*/
function commandList(command, rover, grid) {
  var validCommand = true;
  command = command.toLowerCase();

  // check if command list is valid
  for(var i = 0; i < command.length; i++) {
    if( command[i] != "f" && command[i] != "b" && command[i] != "l" && command[i] != "r" ) {
      validCommand = false;
    }
  }


  // if command list is valid, it executes commands
  // if not, it shows an error
  if( validCommand ) {
    for(var i = 0; i < command.length; i++) {
      switch( command[i] ) {
        case "f":
          moveForward(rover, grid);
          break;
        case "b":
          moveBackward(rover, grid);
          break;
        case "r":
          turnRight(rover);
          break;
        case "l":
          turnLeft(rover);
          break;
      }
    }

    // print rover travel log
    for(var i = 0; i < rover.travelLog.length; i++) {
      console.log( "Rover moved to (" + rover.travelLog[i][0] + ", " + rover.travelLog[i][1] + ")");
    }
  } else {
    console.log( "Command list not valid" );
    console.log( "Command must be (f)orward, (b)ackward, (l)eft, (r)ight" );
  }  
}


/* Move 2 rovers by turns */
function play(grid, rover1, rover2) {
  var totalTurns = 6;
  var turn = 1;
  var movement = "rfffrbrfff";

  while( turn <= totalTurns ) {
    if( turn % 2 != 0 ) {
      // rover1 turn
      console.log("Rover1 turn");
    } else {
      // rover2 turn
      console.log("Rover2 turn");
    }
    turn++;
  }
}

play( gridSurface, rover1, rover2 );