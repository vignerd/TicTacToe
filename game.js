var gameBoard = (function(){
    var _gameboard = [];
    return {
        gameboard: _gameboard
    };
})();

var displayController = (function(){
    var _gamestatus = "";
    const setStatus = (status) => {
        _gamestatus = status;
    }
    const getStatus =  () => _gamestatus;
    return {
        setStatus,
        getStatus
    };
})();

const Player = (name,marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    var isTurn = false;

    const setTurn = () => {
        if(isTurn == false)
            isTurn = true;
        else
            isTurn = false;
    }

    const getTurn = ()=> isTurn;

    return {getName,getMarker,setTurn,getTurn}
};

var divs = document.getElementById('gameboard').children;
const restartButton = document.getElementById('restart-button');
const humanButton = document.getElementById('human-button');
const aiButton = document.getElementById('ai-button');
var resultDisplay = document.getElementById('result-display');

restartButton.addEventListener('click',function(){
    window.location.reload();
});

humanButton.addEventListener('click',function(){
    gameBoard.gameboard = [];
    resultDisplay.textContent = "";
    displayController.setStatus("");
    render();
    play();
});

aiButton.addEventListener('click',function(){
    gameBoard.gameboard = [];
    resultDisplay.textContent = "";
    displayController.setStatus("");
    render();
    playVsAi();
});

function checkWin(){
    if(((divs[0].textContent == divs[1].textContent && divs[0].textContent == divs[2].textContent) && divs[0].textContent != "")
        || (divs[3].textContent == divs[4].textContent && divs[3].textContent == divs[5].textContent && divs[3].textContent!= "")
        || (divs[6].textContent == divs[7].textContent && divs[6].textContent == divs[8].textContent && divs[6].textContent!= "")
        || (divs[0].textContent == divs[3].textContent && divs[0].textContent == divs[6].textContent && divs[0].textContent!= "")
        || (divs[1].textContent == divs[4].textContent && divs[1].textContent == divs[7].textContent && divs[1].textContent!= "")
        || (divs[2].textContent == divs[5].textContent && divs[2].textContent == divs[8].textContent && divs[2].textContent!= "")
        || (divs[0].textContent == divs[4].textContent && divs[0].textContent == divs[8].textContent && divs[0].textContent!= "")
        || (divs[2].textContent == divs[4].textContent && divs[2].textContent == divs[6].textContent && divs[2].textContent!= "") ){
            displayController.setStatus("won");
            return true;
        } else if(divs[0].textContent != "" && divs[1].textContent != "" && divs[2].textContent != "" && divs[3].textContent != "" 
        && divs[4].textContent != "" && divs[5].textContent != "" && divs[6].textContent != "" 
        && divs[7].textContent != "" && divs[8].textContent != "" ){
            displayController.setStatus("tie");
            return false;
        }
}



function play(){
    const player1 = Player("P1","X");
    const player2 = Player("P2","O");
    player1.setTurn();
    
    Array.prototype.forEach.call(divs,div => {
    div.addEventListener('click',function _func(){
        if(this.textContent == "" && !checkWin() && displayController.getStatus() == ""){
            if(player1.getTurn()){
                div.textContent = player1.getMarker().toString();
                if(checkWin()){
                    
                    resultDisplay.textContent = "PLAYER1 WON!";
                    
                }else if(displayController.getStatus() == "tie"){
                     
                    resultDisplay.textContent = "ITS A TIE";
                    
                }
                player1.setTurn();
                player2.setTurn();
            }else{
                div.textContent = player2.getMarker().toString();
                if(checkWin()){
                    resultDisplay.textContent = "PLAYER2 WON!"; 
                }else if(displayController.getStatus() == "tie"){
                    resultDisplay.textContent = "ITS A TIE"; 
                }
                player2.setTurn();
                player1.setTurn();
            }
        }   
        div.removeEventListener('click',_func);
    });
    
});

}

function playVsAi(){
    const humanPlayer = Player("P1","X");
    const ai = Player("AI","O");
    humanPlayer.setTurn();
    Array.prototype.forEach.call(divs,div => {
        div.addEventListener('click',function _func(){
            if(this.textContent == "" && !checkWin() && displayController.getStatus() == ""){
                if(humanPlayer.getTurn()){
                    div.textContent = humanPlayer.getMarker().toString();
                    if(checkWin()){
                        
                        resultDisplay.textContent = "PLAYER1 WON!";
                        
                    }else if(displayController.getStatus() == "tie"){
                         
                        resultDisplay.textContent = "ITS A TIE";
                        
                    }else{
                        humanPlayer.setTurn();
                    ai.setTurn();
                    if(ai.getTurn()){
                        if(divs[0].textContent == "" || divs[1].textContent == "" || divs[2].textContent == "" || divs[3].textContent == "" || 
                    divs[4].textContent == "" || divs[5].textContent == "" || divs[6].textContent == "" || 
                     divs[7].textContent == "" || divs[8].textContent == "" ){
                        aiTurn();
                    }
                    }
                    }
                }

            }   
            div.removeEventListener('click',_func);
        });
        
    });

    function aiTurn(){
        
        while(true){
            let randSquare = Math.floor(Math.random() * 9);
            if(divs[randSquare].textContent == ""){
                divs[randSquare].textContent = ai.getMarker().toString();
                if(checkWin()){
                    resultDisplay.textContent = "AI WON!"; 
                }else if(displayController.getStatus() == "tie"){
                    resultDisplay.textContent = "ITS A TIE"; 
                }
                ai.setTurn();
                humanPlayer.setTurn();
                break;
            }
        }
        
        
    }

    


}

function render(){
    
    for(var i = 0; i<9;i++){
            divs[i].textContent = gameBoard.gameboard[i];
    }
}


//play();