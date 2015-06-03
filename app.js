var data = new Array();
var score = 0;
var hasAdd = new Array();//用于记录一个格子是否已经累加过了

$(document).ready(function(){
    newGame();
});

function newGame(){
    //初始化格子
    init();
    //在随机2个格子生成数字
    randomOneNumber();
    randomOneNumber();

};
function init(){
    for(var i= 0;i<4;i++){
        for(var j = 0;j<4;j++){
            var gridCell = $('#grid-cell-'+i+'-'+j);
            gridCell.css('top',getPosTop(i,j));
            gridCell.css('left',getPosLeft(i,j));
        }
    };
    for(var i=0;i<4;i++){
        data[i] =new Array();
        hasAdd[i] =new Array();
        for(var j=0;j<4;j++){
            data[i][j]=0;
            hasAdd[i][j]=false;
        }
    }
    console.log(data);
    updateDataView();
    score =0;
    updataScore(score);
};

//数据改变后跟新视图
function updateDataView(){
    //删除原先存在的数字
    $('.number-cell').remove();
    //遍历生成更新后的数字
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            $('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')
            var thisNumberCell = $('#number-cell-'+i+'-'+j);

            if(data[i][j] == 0){ //格子数字为0的情况
                thisNumberCell.css('width','0px');
                thisNumberCell.css('height','0px');
                thisNumberCell.css('top',getPosTop(i,j)+50);
                thisNumberCell.css('left',getPosLeft(i,j)+50);
            }else{
                thisNumberCell.css('width','100px');
                thisNumberCell.css('height','100px');
                thisNumberCell.css('top',getPosTop(i,j));
                thisNumberCell.css('left',getPosLeft(i,j));
                thisNumberCell.css('background-color',getTheNumberBackground(data[i][j]));
                thisNumberCell.css('color',getTheNumberColor(data[i][j]));
                thisNumberCell.text(data[i][j]);

            }
            hasAdd[i][j] = false;
        }
    }
}
function randomOneNumber(){
    if(noSpace(data)){
        return false;
    };
    //随机一个位置
    var randx =parseInt( Math.floor(Math.random()*4));
    var randy =parseInt( Math.floor(Math.random()*4));
    var num = 0;

    while(num < 50){
        if(data[randx][randy] === 0){
            break;
        };
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));

        num++;
    }
    if(num == 50){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(data[i][j] == 0){
                    randx = i;
                    randy =j;
                }
            }
        }
    }
    //随机一个数字
    var randNum = Math.random()<0.5 ? 2:4;


    //在随机的位置显示随机的数字
    data[randx][randy] = randNum;
    showNumberWithAnimation(randx,randy,randNum);
    return true;
}

//处理按键
$(document).keydown(function(event){
    switch (event.keyCode){
        case 37: //左
            if(moveLeft()){
                setTimeout('randomOneNumber()',220);
                //判断游戏是否结束
                setTimeout('isGameOver()',300);
            }
            break;
        case 38: //上
            if(moveUp()){
                setTimeout('randomOneNumber()',210);
                //判断游戏是否结束
                setTimeout('isGameOver()',300);
            }
            break;
        case 39: //右
            if(moveRight()){
                setTimeout('randomOneNumber()',210);
                //判断游戏是否结束
                setTimeout('isGameOver()',300);
            }
            break;
        case 40: //下
            if(moveDown()){
                console.log(noMove(data))
                setTimeout('randomOneNumber()',210);
                //判断游戏是否结束
                setTimeout('isGameOver()',300);
            }
            break;
        default : //default
            break;
    }
});

function isGameOver(){
    if(noSpace(data) && noMove(data)){
        gameOver();
    }
}
function gameOver(){
    alert('game over!')
}

function moveLeft(){
    //不能移动的情况下直接返回false
    if(!canMoveLeft(data)){
        return false;
    };
    //左移动
    //三重循环判断
    for(var i =0;i<4;i++){
        for(var j=1;j<4;j++){//因为最左侧这列肯定不能移动所以j从1开始
            if(data[i][j] !=0 ){
                for(var k=0;k<j;k++){//k用来循环j左侧的数字
                    //ik这个位置为空并且ik到ij之间没有阻隔的数字
                    if(data[i][k]== 0 && noObstructorHorizontal(i,k,j,data)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        data[i][k] = data[i][j];
                        data[i][j] = 0;
                        continue;
                    }else if(data[i][k] == data[i][j] && noObstructorHorizontal(i,k,j,data) && !hasAdd[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //合并俩个数字
                        data[i][k] += data[i][j];
                        data[i][j] = 0;
                        //分数累加
                        score +=data[i][k];
                        updataScore(score);

                        //发生累加后这个格子就表示不能再累加
                        hasAdd[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateDataView()',200);
    return true;
}

function moveRight(){
    //不能移动的情况下直接返回false
    if(!canMoveRight(data)){
        return false;
    };
    //右移动
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){//因为最右侧一列肯定不能移动，so  j=2
            if(data[i][j] != 0){
                for(var k=3;k>j;k--){
                    if(data[i][k] == 0 && noObstructorHorizontal(i,j,k,data)){//因为是从右往左循环也就是从大往小，此时k>j,所以传入i,j,k,data
                        //move
                        showMoveAnimation(i,j,i,k);
                        data[i][k] = data[i][j];
                        data[i][j] = 0;
                        continue;
                    }else if(data[i][k] == data[i][j] && noObstructorHorizontal(i,j,k,data) &&!hasAdd[i][k]){
                        //move
                        showMoveAnimation(i,j,i,k);
                        //hebing
                        data[i][k] +=data[i][j];
                        data[i][j] = 0;
                        score +=data[i][k];
                        updataScore(score);

                        hasAdd[i][k]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateDataView()',200);
    return true;
}

function moveUp(){
    //不能移动的情况下直接返回false
    if(!canMoveUp(data)){
        return false;
    };
    //向上移动
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(data[i][j] !=0){
                for(var k=0;k<i;k++){
                    if(data[k][j] == 0 && noObstructorVertical(j,i,k,data)){
                        showMoveAnimation(i,j,k,j);
                        data[k][j] = data[i][j];
                        data[i][j]=0;
                        continue;
                    }else if(data[k][j] == data[i][j] && noObstructorVertical(j,i,k,data)&& !hasAdd[k][j]){
                        showMoveAnimation(i,j,k,j);

                        data[k][j] *=2;
                        data[i][j]=0;
                        score +=data[k][j];
                        updataScore(score);

                        hasAdd[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateDataView()',200);
    return true;
}

function moveDown(){
    //不能移动的情况下直接返回false
    if(!canMoveDown(data)){
        return false;
    };

    for(var j=0;j<4;j++){
        for(var i=2;i>=0;i--){
            if(data[i][j] != 0){
                for(var k=3;k>i;k--){
                    if(data[k][j] == 0 && noObstructorVertical(j,i,k,data)){
                        showMoveAnimation(i,j,k,j);
                        data[k][j] =data[i][j];
                        data[i][j]=0;
                        continue;
                    }else if(data[k][j] == data[i][j] && noObstructorVertical(j,k,i,data) && !hasAdd[k][j]){
                        showMoveAnimation(i,j,k,j);
                        data[k][j] +=data[i][j];
                        data[i][j]=0;
                        score +=data[k][j];
                        updataScore(score);

                        hasAdd[k][j]=true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateDataView()',200);
    return true;
}




