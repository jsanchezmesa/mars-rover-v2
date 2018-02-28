// Rover Object Goes Here
var rover = {
  direction: "N",
  x: 0,
  y: 0,
  travelLog: [ ]
}
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

function moveForward(rover){
  switch( rover.direction ) {
    case "N":
      rover.y -= 1;      
      break;
    case "E":
      rover.x += 1;
      break;
    case "S":
      rover.y += 1;
      break;
    case "W":
      rover.x -= 1;
      break;
  }
  
  //console.log( "Rover moved to (" + rover.x + ", " + rover.y + ")" );
  rover.travelLog.push( [rover.x, rover.y] );
}

function commandList(command, rover) {
  command = command.toLowerCase();

  for(var i = 0; i < command.length; i++) {
    switch( command.charAt(i) ) {
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
}