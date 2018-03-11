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
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
];
// ======================

// ======================
function turnLeft(rover){
  switch( rover.direction ) {
    case "N":
      rover.direction = "W";
      break;
    case "E":
      rover.direction = "N";
      break;
    case "S":
      rover.direction = "E";
      break;
    case "W":
      rover.direction = "S";
      break;
  }
}

function turnRight(rover){
  switch( rover.direction ) {
    case "N":
      rover.direction = "E";
      break;
    case "E":
      rover.direction = "S";
      break;
    case "S":
      rover.direction = "W";
      break;
    case "W":
      rover.direction = "N";
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
  // show if rover gets a limit, obstacle or another rover
  var limit = false;
  var obstacle = false;
  var anotherRover = false;

  switch( rover.direction ) {
    case "N":
      // check limit
      if( rover.y < 9 ) {
        // check if position is free
        if( grid[(rover.y)+1][rover.x] == 0 ) {
          // set now position as free
          grid[rover.y][rover.x] = 0;

          // set next position as occupied
          grid[(rover.y)+1][rover.x] = 2;

          // update rover position
          rover.y += 1;

          movement = true;
        } else if( grid[(rover.y)+1][rover.x] == 1 ) {
          // an obstacle is found
          obstacle = true;
        } else if( grid[(rover.y)+1][rover.x] == 2 ) {
          // another rover is found
          anotherRover = true;
        }
      } else {
        // a limit is found
        limit = true;
      }
      break;
    case "E":
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
    case "S":
      if( rover.y > 0 ) {
        if( grid[(rover.y)-1][rover.x] == 0 ) {
          grid[rover.y][rover.x] = 0;
          grid[(rover.y)-1][rover.x] = 2;
          rover.y -= 1;
          movement = true;
        } else if( grid[(rover.y)-1][rover.x] == 1 ) {
          obstacle = true;
        } else if( grid[(rover.y)-1][rover.x] == 2 ) {
          anotherRover = true;
        }
      } else {
        limit = true;
      }
      break;
    case "W":
      if( rover.x < 9 ) {
        if( grid[rover.y][(rover.x)+1] == 0 ) {
          grid[rover.y][rover.x] = 0;
          grid[rover.y][(rover.x)+1] = 2;
          rover.x += 1;
          movement = true;
        } else if( grid[rover.y][(rover.x)+1] == 1 ) {
          obstacle = true;
        } else if( grid[rover.y][(rover.x)+1] == 2 ) {
          anotherRover = true;
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
  } else if( anotherRover ) {
    console.log("Error: Another rover was found");
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

/* Setup grid with obstacles */
function initGrid( grid, numObstacles ) {

  for( var i = 1; i <= numObstacles; i++ ) {
    //get a random row and col
    var row = Math.floor( Math.random() * 10 );
    var col = Math.floor( Math.random() * 10 );

    // check if position is free
    // if not repeat to get numObstacles
    if( grid[col][row] == 0 ) {
      grid[col][row] = 1;
    } else {
      i--;
    }
  }
}

/* Move 2 rovers by turns */
function play(grid, rover1, rover2) {
  var totalTurns = 6;
  var turn = 1;
  var movement = "rffflfrfff";

  // put rovers in grid
  grid[rover1.y][rover1.x] = 2;
  grid[rover2.y][rover2.x] = 2;

  // init grid with 20 obstacles
  initGrid( grid, 20 );

  while( turn <= totalTurns ) {
    if( turn % 2 != 0 ) {
      // rover1 turn
      commandList( movement, rover1, grid );
    } else {
      // rover2 turn
      commandList( movement, rover2, grid );
    }
    turn++;
  }
}

play( gridSurface, rover1, rover2 );