var body = document.body;
var table = document.createElement('table');
var table1 = document.createElement('table');
var row = [];
var ary = [];
var sudoku = [];
var startTime = new Date().getTime();
function change2SquareIdx(x, y){
    return parseInt(x / 3) * 3 + parseInt(y / 3);
}

var check_row = new Array(9);
for(i = 0; i < 9; i++){
    check_row[i] = new Array(10);
    for(j = 1; j <= 9; j++)
        check_row[i][j] = false;
}

var check_col = new Array(9);
for(i = 0; i < 9; i++){
    check_col[i] = new Array(10);
    for(j = 1; j <= 9; j++)
        check_col[i][j] = false;
}

var check_square = new Array(9);
for(i = 0; i < 9; i++){
    check_square[i] = new Array(10);
    for(j = 1; j <= 9; j++)
        check_square[i][j] = false;
}

function f(){
    var x = row.indexOf(event.target.parentNode);
    var y = ary[x].indexOf(event.target);
    var num = ary[x][y].textContent;
    
    do{
        var input = prompt('Input Message', '1 ~ 9 사이의 숫자를 입력해주세요.');
        var flag = false;
        if(input == null) break;
        k = Number(input);
        if(check_row[x][k] || check_col[y][k] || check_square[change2SquareIdx(x, y)][k]) {
            flag = true;
            continue;
        }
        check_row[x][k] = true;
        check_col[y][k] = true;
        check_square[change2SquareIdx(x, y)][k] = true;
    }while(k < 1 || k > 9 || flag);
    if(input != null) {
        ary[x][y].textContent = k;
        if(1 <= num && num <= 9){
            check_row[x][num] = false;
            check_col[y][num] = false;
            check_square[change2SquareIdx(x, y)][num] = false;
        }
    }
};

var End = 0;
function solve(n){
    var endTime = new Date().getTime();
    var time = endTime - startTime;
    if(End) return;
    if(n == 81){
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++)
                ary[i][j].textContent = sudoku[i][j];
        }
        console.log(time);
        console.log('Finished');
        End = 1;
        return;
    }

    var x = parseInt(n / 9);
    var y = parseInt(n % 9);
    if(sudoku[x][y] > 0) solve(n + 1);
    else{
        for(var k = 1; k <= 9; k++){
            if(!check_row[x][k] && !check_col[y][k] && !check_square[change2SquareIdx(x, y)][k]){
                sudoku[x][y] = k;
                check_row[x][k] = true;
                check_col[y][k] = true;
                check_square[change2SquareIdx(x, y)][k] = true;
                solve(n + 1);
                sudoku[x][y] = 0;
                check_row[x][k] = false;
                check_col[y][k] = false;
                check_square[change2SquareIdx(x, y)][k] = false;
            }
        }
    }
}

function cal(){
    for(var i = 0; i < 9; i++){
        sudoku[i] = [];
        for(var j = 0; j < 9; j++){
            if(1 <= ary[i][j].textContent && ary[i][j].textContent <= 9){
                sudoku[i][j] = ary[i][j].textContent;
            }
            else{
                sudoku[i][j] = Number(0);
            }
        }
    }
    startTime = new Date().getTime();
    solve(0);
}

var start
for(var i = 0; i < 9; i++){
    var line = document.createElement('tr');
    row.push(line);
    ary.push([]);
    for(var j = 0; j < 9; j++){
        var blank = document.createElement('td');
        blank.addEventListener('click', f);
        ary[i].push(blank);
        line.appendChild(blank);
    }
    table.appendChild(line);
}
body.appendChild(table);

var button = document.createElement('button');
button.textContent = 'Complete';
button.addEventListener('click', cal);

body.appendChild(button);