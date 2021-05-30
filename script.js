"use strict";

const gameBoard = (() => {
   let gameboard = [null,null,null,null,null,null,null,null,null];
   

   const boardRender = (() => {
      const init = () => {
         const gameBoardDiv = document.getElementById('game-board');
         for(let i = 0; i<gameboard.length; i++){
            const elm = document.createElement('div');
            elm.classList.add('game-box');
            elm.setAttribute('id', (i));
            elm.innerText = gameboard[i];
            gameBoardDiv.appendChild(elm);
            if(i < 3){
               elm.style = "border-top: none";
            }
            if(i > 5){
               elm.style = "border-bottom: none";
            }
         }
      }
      init();

      const render = () => {
         for(let i = 0; i<gameboard.length; i++){
            const gameBoxElm = document.getElementsByClassName('game-box');
            gameBoxElm[i].innerText = gameboard[i];
         }
      }
      return { render }
   })();

   // PLAYER FACTORY METHOD
   const Player = (name, symbol) => {
      const getName = () => name;

      return { getName, symbol, }
   };

   const player1 = Player('Player 1', "X");
   const player2 = Player('Player 2', "O");


   // DISPLAY CONTROLLER
   const DisplayController = (() => {
      const message = document.getElementById('message');
      const messageCont = (winner) => {
         message.innerText = `${winner} Wins!`;
      }

      const resetGame = () => {
         gameboard = [null,null,null,null,null,null,null,null,null];
         boardRender.render();
         setTimeout(function() {
            message.innerText = "Player 1's Turn!"
         },1400);
         message.innerText = "Game Restarted";   
      }
      const resetButton = document.getElementById('reset-button');
      resetButton.addEventListener('click', resetGame);

      return { messageCont }
   })();


   // GAME CONTROLLER
   const GameController = (() => {
      let turn = true;
      const gameBoxArray = document.getElementsByClassName('game-box');
      const play = () => {
         for(let i = 0; i < gameBoxArray.length; i++){
            gameBoxArray[i].addEventListener('click', function(){
               if(gameboard[i] === null){
                  turn === true ? gameboard[i] = player1.symbol : gameboard[i] = player2.symbol;
                  turn === false ? message.innerText = "Player 1's Turn" : message.innerText = "Player 2's Turn";
                  boardRender.render();
                  console.log(gameboard);
                  turn === true ? turn = false : turn = true;            
               }
                  
            })
         }
      };
      play(player1);      
      const gameBoard = document.getElementById('game-board');
      gameBoard.addEventListener('click', function(){
         play();
         checkwinner(); 
      })

      let checkwinner = () => {
         if( gameboard[0] == 'X' && gameboard[1] == 'X' && gameboard[2] == 'X' ||
             gameboard[0] == 'X' && gameboard[3] == 'X' && gameboard[6] == 'X' ||
             gameboard[0] == 'X' && gameboard[4] == 'X' && gameboard[8] == 'X' ||
             gameboard[1] == 'X' && gameboard[4] == 'X' && gameboard[7] == 'X' ||
             gameboard[2] == 'X' && gameboard[5] == 'X' && gameboard[8] == 'X' ||
             gameboard[3] == 'X' && gameboard[4] == 'X' && gameboard[5] == 'X' ||
             gameboard[6] == 'X' && gameboard[7] == 'X' && gameboard[8] == 'X' ||
             gameboard[2] == 'X' && gameboard[4] == 'X' && gameboard[6] == 'X'){
               console.log("Player 1 Wins");
               DisplayController.messageCont(player1.getName());
         } else if ( gameboard[0] == 'O' && gameboard[1] == 'O' && gameboard[2] == 'O' ||
                     gameboard[0] == 'O' && gameboard[3] == 'O' && gameboard[6] == 'O' ||
                     gameboard[0] == 'O' && gameboard[4] == 'O' && gameboard[8] == 'O' ||
                     gameboard[1] == 'O' && gameboard[4] == 'O' && gameboard[7] == 'O' ||
                     gameboard[2] == 'O' && gameboard[5] == 'O' && gameboard[8] == 'O' ||
                     gameboard[3] == 'O' && gameboard[4] == 'O' && gameboard[5] == 'O' ||
                     gameboard[6] == 'O' && gameboard[7] == 'O' && gameboard[8] == 'O' ||
                     gameboard[2] == 'O' && gameboard[4] == 'O' && gameboard[6] == 'O'){
                         console.log('Player 2 Wins');
                        DisplayController.messageCont(player2.getName());
                     }
         else if (!gameboard.includes(null)) {
            console.log("It's a tie!")
            message.innerText = "It's a tie!";
         }
     }

   })();


   // return boardRender;
})();
