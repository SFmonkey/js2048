//动画展示新生成的数字
function showNumberWithAnimation(x,y,randNum){
    var numCell = $('#number-cell-'+x+'-'+y);
    numCell.css('background-color',getTheNumberBackground(randNum));
    numCell.css('color',getTheNumberColor(randNum));
    numCell.text(randNum);
    numCell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(x,y),
        left:getPosLeft(x,y)
    },50);
}
//移动动画
function showMoveAnimation(fromx,fromy,tox,toy){
    var  numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200)
}