// Rover Object Goes Here
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [ ]
}

// surface where rover will move
// null = blank space, 1 = obstacle
var gridSurface = [
  [ null, null, 1, null, null, null, 1, 1, null, null ],
  [ null, null, null, null, null, null, null, null, null, 1 ],
  [ null, null, null, null, null, null, null, null, null, 1 ],
  [ null, 1, null, null, null, null, null, null, null, null ],
  [ null, null, 1, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, 1, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null, null, null, null ],
  [ null, null, null, null, 1, 1, null, null, null, null ]
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
function moveForward(rover){
  var movement = false;
  // show if rover gets a limit or obstacle
  var limit = false;
  var obstacle = false;

  switch( rover.direction ) {
    case "N":
      // check limit
      if( rover.y > 0 ) {
        // check if position is free
        if( gridSurface[(rover.y)-1][rover.x] == null ) {
          rover.y -= 1; 
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }           
      break;
    case "E":
      if( rover.x < 9 ) {
        if( gridSurface[rover.y][(rover.x)+1] == null ) {
          rover.x += 1;
          movement = true;
        } else {
          obstacle = true;
        }        
      } else {
        limit = true;
      }
      break;
    case "S":
      if( rover.y < 9 ) {
        if( gridSurface[(rover.y)+1][rover.x] == null ) {
          rover.y += 1; 
          movement = true;
        } else {
          obstacle = true;
        }               
      } else {
        limit = true;
      }
      break;
    case "W":
      if( rover.x > 0 ) {
        if( gridSurface[rover.y][(rover.x)-1] == null ) {
          rover.x -= 1;
          movement = true;
        } else {
          obstacle = true;
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
  }
}

/*
function to move rover backward
it checks limits, if rover is in a limit, it won't move
*/
function moveBackward(rover){
  switch( rover.direction ) {
    case "N":
      if( rover.y < 9 ) {
        rover.y += 1;
      }
      break;
    case "E":
      if( rover.x > 0 ) {
        rover.x -= 1;
      }
      break;
    case "S":
      if( rover.y > 0 ) {
        rover.y -= 1;
      }
      break;
    case "W":
      if( rover.x < 9 ) {
        rover.x += 1;
      }
      break;
  }

  // add movement to travel log
  rover.travelLog.push( [rover.x, rover.y] );
}

/*
 Function to enter a list of command
 Command valid: (f)orward, (b)ackward, (l)eft, (r)ight
*/
function commandList(command, rover) {
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
          moveForward(rover);
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