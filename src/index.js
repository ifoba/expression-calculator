function eval() {
    // Do not use eval!!!
    return;
}

function sum (a, b) {
    return Number(a) + Number(b);
}

function diff (a, b) {
    return Number(a) - Number(b);
}

function mul (a, b) {
    return Number(a) * Number(b);
}

function del (a, b) {
    if (b == 0) {
        throw new Error('TypeError: Division by zero.');
    }
    else {
    return Number(a) / Number(b);}
}

function expressionCalculator(expr) {
    let openTest = /\(/;
    let closeTest = /\)/;
    
    if (openTest.test(expr) == true || closeTest.test(expr) == true) {   
        let openBrackets = expr.match(/\(/g) || [];
        let closeBrackets = expr.match(/\)/g) || [];
        if (openBrackets.length != closeBrackets.length) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
    }
        

    let re = /\s+/;
    let arr;
    if ( re.test(expr) == false){
        arr = expr.trim().split('');
    }
    else {
        arr = expr.trim().split(' ');
    }
    let countScobs = 0;
    let start = 0;
    while (arr.indexOf('(') != -1) {
        for ( let i = 0; i < arr.length; i++) {
            if (arr[i] == '(') {
                if ( countScobs == 0) {
                    start = i;
                }
                countScobs++
            }
            if (arr[i] == ')' && countScobs > 1) {
                countScobs--
            }
            if (arr[i] == ')' &&  countScobs == 1) {
                arr.splice(start, i-start+1, expressionCalculator(arr.slice(start+1, i).join(' ')))
            }
        }
    }


    for( let i = 0; i < arr.length; i++) {
        if (arr[i]=='*') {
            arr.splice(i-1,3, mul(arr[i-1], arr[i+1]));
            i--      
        }
        if (arr[i]=='/') {
            arr.splice(i-1,3, del(arr[i-1], arr[i+1]))
            i--            
        }
    
    }
    for( let i = 0; i < arr.length; i++) {
        if (arr[i]=='+') {
            arr.splice(i-1,3, sum(arr[i-1], arr[i+1]));
            i--      
        }
        if (arr[i]=='-') {
            arr.splice(i-1,3, diff(arr[i-1], arr[i+1]))
            i--            
        }
    
    }
    
    return Number(arr.join(''));
}


module.exports = {
    expressionCalculator
}