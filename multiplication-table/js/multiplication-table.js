// function responsible for producing data for multiplication table
function multiplicationTable(colStart, rowStart, size) {
    let tableArr = [];
    try{
        if (typeof colStart === 'number' && typeof rowStart === 'number' && typeof size === 'number' 
            && colStart > 0 && rowStart > 0 && size > 0) {
            for (let i = 0; i <= size; i++) {
                tableArr.push([])
                tableArr[i].push( new Array(size) );
        
                for (let k = 0; k <= size; k++) {
                    if (i !== 0 || k !== 0) {
                        if (i === 0) {
                            tableArr[i][k] = colStart++
                        }
                        if (k === 0) {
                            tableArr[i][k] = rowStart++
                        }
                        if (i !== 0 && k !== 0) {
                            tableArr[i][k] = tableArr[i][0] * tableArr[0][k];
                        }
                    } else {
                        tableArr[i][k] = null;
                    }
                }
            }
        }
        else {
            throw new Error ('Function requires three integer arguments that are greater or equalt than 1');
        }
    }
    catch (error) {
        console.log(error)
    }
    return tableArr;
}

// const table = multiplicationTable(1, 3, 4)
// console.log(table)
