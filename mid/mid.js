var turn=0;
var pass=0; 
var board=[]; 
var piece=[];
var boardPiece; 
var gameEnd=false; 
var debugLog=[];
var max;

function startTurn(nextTurn){
  turn=nextTurn;
}

function checkWin(index){
  var y=Math.floor(index/15);
  var x=index%15;
  if(checkLine(x,y,0,1)+checkLine(x,y,0,-1)+1==5 ||
  checkLine(x,y,1,0)+checkLine(x,y,-1,0)+1==5 ||
  checkLine(x,y,1,1)+checkLine(x,y,-1,-1)+1==5 ||
  checkLine(x,y,-1,1)+checkLine(x,y,1,-1)+1==5){
      if(turn == 2){
          addLog("白方勝");
      }else{
          addLog("黑方勝");
      }
         endGame();
  };
}

function endGame(){
  gameEnd=true;
}
function valid(x,y){
  return(x>=0 && y>=0 && x<15 && y<15);
}

function checkLine(x,y,dx,dy){
  var link=0;
  for(var i=0;i<5;i++){
      x+=dx;
      y+=dy;
      if(!valid(x,y) || board[y*15+x] != turn){
          return link;
      }
      link+=1;
  }
  return link;
}

function selectRandomIndexByValue(arr,value){
  var indexs=[];
  for(var i=0;i<arr.length;i++){
      if(arr[i]==value){
          indexs.push(i);
      }
  }
  return indexs[Math.floor(Math.random()*indexs.length)];
}

function putChess(piece){
  if(gameEnd){
      return;
  }
  if(turn==1){
      piece.firstChild.src="black.png";
  }else{
      piece.firstChild.src="white.png";
  }
  piece.style.pointerEvents = 'none';
  board[parseInt(eval(piece.name))]=turn;
  checkWin(parseInt(eval(piece.name)));
  startTurn(3-turn);
}

function init(){
  boardPiece = document.getElementById("board");
  while(boardPiece.firstChild){
      if (typeof boardPiece.firstChild.id != 'undefined'){
          piece.push(boardPiece.firstChild);
      }
      boardPiece .removeChild(boardPiece.firstChild);
  }
}

function addLog(log){
  debugLog.push(log+"<br>");
  if(debugLog.length>6){
      debugLog.shift();
  }
  log="<span style='color:#ffffff'>"
  for(var index in debugLog){
      log+=debugLog[index];
  }
  document.getElementById("log").innerHTML=log+"</span>"
}

function showBoard(){
  var clonePiece;
  for(var y=0; y<17; y++){
      for(var x=0; x<17; x++){
          if(x==0 && y==0){
              clonePiece= piece[0].cloneNode(true);
          }else if(x==16 && y == 0){
              clonePiece = piece[1].cloneNode(true);
          }else if(x==16 && y == 16){
              clonePiece = piece[2].cloneNode(true);
          }else if(x==0 && y == 16){
              clonePiece = piece[3].cloneNode(true);
          }else if(y==0){
              clonePiece = piece[4].cloneNode(true);
          }else if(x==16){
              clonePiece = piece[5].cloneNode(true);
          }else if(y==16){
              clonePiece = piece[6].cloneNode(true);
          }else if(x==0){
              clonePiece = piece[7].cloneNode(true);
          }else{
              clonePiece = piece[8].cloneNode(true);
              board[(y-1)*15+(x-1)]=0;
              clonePiece.name="("+y+"-1)*15+("+x+"-1)";
              clonePiece.onclick = function(){
                  putChess(this);
              };
          }
          clonePiece.style.left=x*32+"px";
          clonePiece.style.top=y*32+"px";
          boardPiece .appendChild(clonePiece);
      }
  }
}
onload=function(){
  startTurn(1);
  init();
  showBoard();
}
function click1(){
  turn=1;
  gameEnd=false;
  boardPiece = document.getElementById("board");
  while(boardPiece.firstChild){
      if (typeof boardPiece.firstChild.id != 'undefined'){
          piece.push(boardPiece.firstChild);
      }
      boardPiece .removeChild(boardPiece.firstChild);
  }

    var clonePiece;
    for(var y=0; y<17; y++){
        for(var x=0; x<17; x++){
            if(x==0 && y==0){
                clonePiece= piece[0].cloneNode(true);
            }else if(x==16 && y == 0){
                clonePiece = piece[1].cloneNode(true);
            }else if(x==16 && y == 16){
                clonePiece = piece[2].cloneNode(true);
            }else if(x==0 && y == 16){
                clonePiece = piece[3].cloneNode(true);
            }else if(y==0){
                clonePiece = piece[4].cloneNode(true);
            }else if(x==16){
                clonePiece = piece[5].cloneNode(true);
            }else if(y==16){
                clonePiece = piece[6].cloneNode(true);
            }else if(x==0){
                clonePiece = piece[7].cloneNode(true);
            }else{
                clonePiece = piece[8].cloneNode(true);
                board[(y-1)*15+(x-1)]=0;
                clonePiece.name="("+y+"-1)*15+("+x+"-1)";
                clonePiece.onclick = function(){
                    putChess(this);
                };
            }
            clonePiece.style.left=x*32+"px";
            clonePiece.style.top=y*32+"px";
            boardPiece .appendChild(clonePiece);
        }
    }
}
function click2(){
    if(turn == 1){
        addLog("白方勝 請按重新開始 開始下一局");
    }else{
        addLog("黑方勝 請按重新開始 開始下一局");
    }
       endGame();
}
