let expr;
let i = 0,j = 0, idx = 0;
let k = 0, id = 0;
let endResult = 0; 
let fs = require('fs');
let arg = process.argv;

expr = fs.readFileSync(arg[2]);
expr = expr.toString();
let constOperation = '-+/*^';
let constNumbers = '0123456789';

let stack = [];
let polishString = [];

//расстановка приоритетов операций
function priority(operation){
	if(operation == '+' || operation == '-'){
		return 0;
	}
	else if(operation == '/' || operation == '*'){
		return 1;
	}
	else if(operation == '^'){
		return 2;
	}
}
//выполнение операций 
function calculation(operand1,operand2,operation){
	operand1 = Number(operand1);
	operand2 = Number(operand2);
	switch (operation){
		case '+':
			result = operand1 + operand2;
			return result;
		case '*':
			result = operand1 * operand2;
			return result;
		case '-':
			result = operand1 - operand2;
			return result;
		case '^':
			result = Math.pow(operand1,operand2);
			return result;
		case '/':
			if(operand2 == 0){
				console.log('	!Внимание вы поделили на 0! \n            ай-ай-ай-ай-ай-ай');
				return Infinity;
				break;
			}
			result = operand1 / operand2;
			return result;
	}
}

//составление стека и обратная польская нотация
while(i < expr.length){
	if(expr[i] == '('){
		stack.push('(')
		i++;
	}
	if(expr[i] == ')'){
		while(stack[stack.length-1] != '('){
			polishString.push(stack.pop());
		}
		stack.splice(stack.length-1,1);
		i++;
	}
	if(constOperation.includes(expr[i])){
		stack.push(expr[i]);
		i++;
		j++;
	}
	if(!(constOperation.includes(expr[i]))){
		k = 0;
		let numb = '';
		for(let t = i;(constNumbers.includes(expr[t])); ++t){
			numb += expr[t]; 
			k++;
		}
		polishString.push(numb);
	}
	i += k;
	if(constOperation.includes(expr[i])){
		if(priority(stack[stack.length-1]) == priority(expr[i])){
			polishString.push(stack.pop());
			stack.push(expr[i]);
			i++;
		}
		else if (priority(stack[stack.length-1]) < priority(expr[i])){
			stack.push(expr[i]);
			i++;
		}
		else if (priority(stack[stack.length-1]) > priority(expr[i])){
			while (stack.length != 0){
				polishString.push(stack.pop());
			}
			
		}
		j++;
	}
	
}

while (stack.length != 0){
	polishString.push(stack.pop());
}
//исключение ошибки пустго элемента
for(let t = 0; t < polishString.length; ++t){
	if(polishString[t] != ''){
		true;
	}
	else{
		polishString.splice(t,1);
	}
}

let polish = polishString.slice();
//подсчёт примера 
while(id <= j+1){
	if(!(constOperation.includes(polish[idx+2]))){
		idx++;
		id++;
		continue;
	}
	endResult = calculation(polish[idx],polish[idx+1],polish[idx+2]);
	polish.splice(idx,3,String(endResult));
	idx = 0;
	id++;
}

let polishStr = '';
for(let t = 0; t < polishString.length; ++t){
	polishStr += polishString[t];
}

//для корректной работы eval() 
for(let t = 0; t <expr.length; ++t){
	expr = expr.replace("^","**");
}

console.log('Подсчёт произведённый с помощью "eval():"',eval(expr));
console.log('Польская запись введённого вами примера: ',polishStr);
console.log('Ответ:',endResult);