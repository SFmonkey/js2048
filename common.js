function getPosTop(i,j){
    return 20+i*120;
};
function getPosLeft(i,j){
    return 20+j*120;
};
function getTheNumberBackground(number){
    switch (number){
        case 2: return "#c4d8e3";break;
        case 4: return "#71bbbc";break;
        case 8: return "#a9c57a";break;
        case 16: return "#e5cd88";break;
        case 32: return "#d9955d";break;
        case 64: return "#de7863";break;
        case 128: return "#ca586f";break;
        case 256: return "#d5afd1";break;
        case 512: return "#7d68a1";break;
        case 1024: return "#5f81c3";break;
        case 2048: return "#5b5b5c";break;
        case 4096: return "#be933c";break;
        case 8192: return "#030200";break;
    }
    return 'black';
}
function getTheNumberColor(number){
    if(number <= 4){
        return '#776e65';
    };
    return 'white';
}

//是否还有可以随机的空间
function noSpace(data){
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
           if(data[i][j] == 0){
               return false;
           }
        }
    }
    return true;
}
//判断是否可以左移动
function canMoveLeft(data){
    for(var i = 0;i<4;i++){
        for(var j=1;j<4;j++){

            if(data[i][j] !=0){
                if(data[i][j-1] == 0 || data[i][j-1] == data[i][j]){
                    return true;
                }
            }
        }
    };
    return false;
}
//判断是否可以右移动
function canMoveRight(data){
    for(var i=0;i<4;i++){
        for(var j=2;j>=0;j--){
            if(data[i][j] != 0){
                if(data[i][j+1] == 0 || data[i][j+1] == data[i][j]){
                    return true;
                }
            }
        }
    };
    return false;
}
//判断是否可以向上移动
function canMoveUp(data){
    for(var j=0;j<4;j++){
        for(var i=1;i<4;i++){
            if(data[i][j] !=0){
                if(data[i-1][j] == 0 || data[i-1][j] == data[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
//判断是否可以向下移动
function canMoveDown(data){
    for(var j=0;j<4;j++){
        for(var i=0;i<3;i++){
            if(data[i][j]!=0){
                if(data[i+1][j]==0 || data[i+1][j] == data[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
}
//水平方向判断是否有障碍物
function noObstructorHorizontal(row,n1,n2,data){
    for(var i=n1 +1;i<n2;i++ ){
        if(data[row][i]!=0){
            return false;
        }
    }
    return true;
}
//垂直方向判断是否有障碍物
function noObstructorVertical(col,n1,n2,data){
    for(var i=n2+1;i<n1;i++){
        if(data[i][col] != 0){
            return false;
        }
    }
    return true;
}

function noMove(data){
    if(canMoveLeft(data) || canMoveRight(data) || canMoveUp(data) ||canMoveDown(data)){
        return false;
    }
    return true;
}

//跟新分数
function updataScore(score){
    $('#score').text(score);
}






