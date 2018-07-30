//Adapted from the answer found on StackOverflow
//url: https://stackoverflow.com/questions/48976310/evaluating-expressions-individually-using-jquery-query-builder#


function parseQueryBuilder(rulesUnparsed){
var lastOperator = [];
var rulesLengths = [];
var ruleLevel = 0;
var equationString = '';

return checkDisplayLogic(rulesUnparsed);

    function checkDisplayLogic(rulesData) {
        if (rulesData['rules'] !== undefined) {
            ruleLevel++;
            var operator = rulesData['condition'];
            lastOperator.push(operator);
            rulesLengths.push(rulesData.rules.length);
            equationString += '(';

            rulesData.rules.forEach((elem, idx) => {
                checkDisplayLogic(elem);
                if (rulesLengths[rulesLengths.length - 1] == idx + 1) {
                    equationString += ')';
                    rulesLengths.pop();
                    ruleLevel--;
                    lastOperator.pop();
                }
                else {
                    if (lastOperator.length !== 0)
                        equationString += ' ' + (operator === 'AND' ? '&&' : '||' ) + ' ';
                }
            });
        }
        else {
            if(rulesData.operator === "equal")
                    equationString += (rulesData.id + " === " + rulesData.value);
            else if(rulesData.operator === "not_equal"){
                equationString += (rulesData.id + " !== " + rulesData.value);
            }else if(rulesData.operator === "less"){
                equationString += (rulesData.id +" < " + rulesData.value);
            }else if(rulesData.operator === "less_or_equal"){
                equationString += (rulesData.id + " <= " + rulesData.value);
            }else if(rulesData.operator === "greater"){
                equationString += (rulesData.id + " > " + rulesData.value);
            }else{//"greater_or_equal"
                equationString += (rulesData.id + " >= " + rulesData.value);
            }
        }

        return equationString;
    }
}