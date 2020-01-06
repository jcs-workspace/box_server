/**
 * $File: index.js $
 * $Date: 2019-12-30 16:23:27 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

const env = require('./env');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: CONFIG.PORT, });

var sockets = [];
var playerCount = 0;

var Node = { };
Node = function (name, x, y) {
  this.name = name;
  this.x = x;
  this.y = y;
};

var players = [];


setInterval(function () {
  sendUpdateMapPacket();
},
            1 / CONFIG.FPS * 1000);

/* Packet event receiver. */
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    let json = JSON.parse(message);
    identifyPacket(ws, json);
  });
});

/**
 * Idenfity the packet with packet id and turn it into
 * the correct package handler.
 * @param { Socket } ws : Client that sent the request.
 * @param { JSON } packet : Packet message.
 */
function identifyPacket(ws, packet) {
  switch (packet.id) {
  case 0x01:  /*  */
    {
      // NOTE: preserve
    }
    break;
  case 0x11:  /* New Player */
    {
      /* First add new socket. */
      {
        sockets.push(ws);
        LOGGER.info("Player connected: %s", sockets.length);
      }

      LOGGER.info('New player connected!');
      let newName = giveName();

      let newPlayer = new Node(newName, packet.x, packet.y);
      players.push(newPlayer);

      sendNewNamePacket(ws, newName);
    }
    break;
  case 0x12:  /* Delete Player */
    {
      LOGGER.info('One player left!');
      for (let index = 0; index < players.length; ++index) {
        let p = players[index];
        if (p.name != packet.name)
          continue;
        players.splice(index , 1);
      }
    }
    break;
  case 0x15:  /* Update player position. */
    {
      let player = findPlayerByName(packet.name);
      if (player != null) {
        player.x = packet.x;
        player.y = packet.y;
      }
    }
    break;
  default:
    {
      LOGGER.warn("[WARNING] Unknown packet id, we maybe under attacked");
    }
    break;
  }
}

/**
 * Send a new name to the player.
 * @param { typename } ws : Websocket object.
 */
function sendNewNamePacket(ws, newName) {
  let msg = JSON.stringify( {
    id: 0x11,
    name: newName,
  });
  ws.send(msg);
}

/**
 * Send the update map packet..
 * @param { typename } ws : Websocket object.
 */
function sendUpdateMapPacket() {
  let msg = JSON.stringify({
    id: 0x13,
    players: players,
  });
  broadcast(msg);
}

function findPlayerByName(name) {
  for (let index = 0; index < players.length; ++index) {
    let p = players[index];
    if (p.name == name)
      return p;
  }
  return null;
}

/**
 * Broadcast to send message to all clients.
 * @param { typename } msg : Packet to send.
 */
function broadcast(msg)  {
  for (let index = 0; index < sockets.length; ++index) {
    let ws = sockets[index];
    ws.send(msg);
  }
}

/**
 * Generate a name for a new player.
 */
function giveName() {
  ++playerCount;
  let prefix = "[Player " + playerCount + "]";
  switch (playerCount) {
  case 1: return prefix + " Apple";
  case 2: return prefix + " Brain";
  case 3: return prefix + " Cathey";
  case 4: return prefix + " Dough";
  case 5: return prefix + " Zoo!";
  }
  return prefix;
}


console.log("Opend port on: %s", CONFIG.PORT);
