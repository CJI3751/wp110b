var turn=0;  //初始值1代表黑方，2代表白方
var pass=0;  //初始值0表示尚未下棋
var board=[]; //初始值為空陣列
var piece=[];//儲存棋盤物件
var boardPiece; //儲存棋盤本體
var gameEnd=false; //遊戲結束
var debugLog=[];
var max;

//開始回合
//傳入值為下回合行動方
//1為黑棋,2為白棋
function startTurn(nextTurn){
  turn=nextTurn;
}

//檢查勝利
function checkWin(index){
  var y=Math.floor(index/15);
  var x=index%15;
  //橫向判定
  if(checkLine(x,y,0,1)+checkLine(x,y,0,-1)+1==5 ||
  //直向判定
  checkLine(x,y,1,0)+checkLine(x,y,-1,0)+1==5 ||
  //斜向左上右下判定
  checkLine(x,y,1,1)+checkLine(x,y,-1,-1)+1==5 ||
  //斜向右上左下判定
  checkLine(x,y,-1,1)+checkLine(x,y,1,-1)+1==5){
      if(turn == 2){
          addLog("白方勝");
      }else{
          addLog("黑方勝");
      }
         endGame();
  };
}

//遊戲結束
function endGame(){
//關閉所有棋格的點擊
  gameEnd=true;
}
//沒超出棋盤
function valid(x,y){
  return(x>=0 && y>=0 && x<15 && y<15);
}

//判定連線
function checkLine(x,y,dx,dy){
  //連線次數
  var link=0;
  for(var i=0;i<5;i++){
      //指向下個棋格
      x+=dx;
      y+=dy;
      //超出範圍或下個棋格非己方棋則結束連線
      if(!valid(x,y) || board[y*15+x] != turn){
          return link;
      }
      //追加連結次數
      link+=1;
  }
  return link;
}

//在同值的陣列成員中隨機取一索引
function selectRandomIndexByValue(arr,value){
  var indexs=[];
  for(var i=0;i<arr.length;i++){
      if(arr[i]==value){
          indexs.push(i);
      }
  }
  return indexs[Math.floor(Math.random()*indexs.length)];
}

//棋手下棋
function putChess(piece){
  //遊戲結束
  if(gameEnd){
      return;
  }
  if(turn==1){
      //當前行動方為黑
      piece.firstChild.src="black.png";
  }else{
      //當前行動方為白
      piece.firstChild.src="white.png";
  }
  //移除棋格點擊事件
  piece.style.pointerEvents = 'none';
  //記錄下棋點
  board[parseInt(eval(piece.name))]=turn;
  checkWin(parseInt(eval(piece.name)));
  //回合更換
  startTurn(3-turn);
}

//初始化棋盤物件
function init(){
  //取得棋盤本體
  boardPiece = document.getElementById("board");
  //依序取得棋盤本體內的元件，將之存入piece後並移除
  while(boardPiece.firstChild){
      //檢查是否為棋盤物件
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

//進行棋盤拼貼
function showBoard(){
  //用來儲存從piece中複製的棋盤元件
  var clonePiece;
  //以二重迴圈依序拼貼棋盤
  for(var y=0; y<17; y++){
      for(var x=0; x<17; x++){
          //左上邊界
          if(x==0 && y==0){
              clonePiece= piece[0].cloneNode(true);
          //右上邊界
          }else if(x==16 && y == 0){
              clonePiece = piece[1].cloneNode(true);
          //右下邊界
          }else if(x==16 && y == 16){
              clonePiece = piece[2].cloneNode(true);
          //左下邊界
          }else if(x==0 && y == 16){
              clonePiece = piece[3].cloneNode(true);
          //上邊界
          }else if(y==0){
              clonePiece = piece[4].cloneNode(true);
          //右邊界
          }else if(x==16){
              clonePiece = piece[5].cloneNode(true);
          //下邊界
          }else if(y==16){
              clonePiece = piece[6].cloneNode(true);
          //左邊界
          }else if(x==0){
              clonePiece = piece[7].cloneNode(true);
          //棋格
          }else{
              clonePiece = piece[8].cloneNode(true);
              //將棋格以x方向到y方向排列
              board[(y-1)*15+(x-1)]=0;
              //以棋格名稱作為儲存媒介
              clonePiece.name="("+y+"-1)*15+("+x+"-1)";
              //設定滑鼠事件
              clonePiece.onclick = function(){
                  //放棋動作
                  putChess(this);
              };
          }
          //設定棋格座標
          clonePiece.style.left=x*32+"px";
          clonePiece.style.top=y*32+"px";
          //將棋格加入棋盤本體
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
