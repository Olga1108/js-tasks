// table creation and interactions
window.addEventListener('DOMContentLoaded', (event) =>{
    event.preventDefault()
    const fragment = document.createDocumentFragment();
    const form = document.querySelector('.config-group');
    const mainTable = document.querySelector('.table');
    function getInputValue() {
        let colsValue = Number(document.querySelector('.js-config-output-cols').value);
        let rowsValue = Number(document.querySelector('.js-config-output-rows').value);
        let sizesValue = Number(document.querySelector('.js-config-output-size').value);
        const tableProps = multiplicationTable(colsValue, rowsValue, sizesValue);
        mainTable.innerHTML = '';
        return renderTable(tableProps)
    }

    function renderTable(arr) {
        let th;
        let tr;
        let td;
        let tbody = document.createElement('tbody');
        for (let i = 0; i < arr.length; i++) {
            tr = document.createElement('tr');
            for (let j = 0; j < arr[i].length; j++) {
                if (i === 0 || j === 0) {
                    th = document.createElement('th')
                    th.textContent = arr[i][j];
                    tr.append(th);
                }
                else {
                    td = document.createElement('td');
                    td.textContent = arr[i][j];
                    tr.append(td);
                }
            }
            if (i === 0) {
                let thead = document.createElement('thead');
                thead.append(tr);
                fragment.append(thead)
            }
            else {
                tbody.appendChild(tr)
            }
        }
        fragment.appendChild(tbody);
        mainTable.append(fragment)
    }
    form.addEventListener('submit', function (event) {
        event.preventDefault()
        getInputValue();
    })
    mainTable.addEventListener('mouseover', function(event) {
      let target = event.target; 
        if (target.tagName === 'TD') {
            let cells = Array.from(target.parentNode.children);
            let theader = cells[0];
            let index = target.cellIndex;
            let mainCells = Array.from(event.currentTarget.children);
            let headerTable = mainCells[0];
            let allHeadersTr = headerTable.children;
            let headTr = allHeadersTr[0];
            let allTh = headTr.children;
            for (let key of allTh) {
                if (key.cellIndex === index) {
                highlight(target, theader, key);
                }
            } 
        }
    })
    function highlight(td, th, title) {
        selectedTd = td;
        selectedTh = th;
        selectedTitle = title;
        selectedTd.classList.add('hovered');
        selectedTh.classList.add('parent-hovered');
        selectedTitle.classList.add('hovered-title');
    }  
    mainTable.addEventListener('mouseout', function() {
        if (selectedTd)
            selectedTd.classList.remove('hovered');
            selectedTh.classList.remove('parent-hovered');
            selectedTitle.classList.remove('hovered-title');
    })
    mainTable.addEventListener('click', function(event) {
        let target = event.target; 
        let tRow = target.closest('tr');
        if (!tRow) return;
        if (!mainTable.contains(tRow)) return;
        if (!event.ctrlKey) {
            let tRowUpper = tRow.previousSibling;
            tRow.parentNode.insertBefore(tRow,tRowUpper);
        }
        if (event.ctrlKey) {
            let titleRow = mainTable.children[0];
            if (tRow.parentNode !== titleRow)
            tRow.textContent = '';
        }
    });
 })