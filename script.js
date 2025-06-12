var selectedRow = null;
function onFormSubmit(){
    event.preventDefault();
    var formData = readFormData();
    if(selectedRow == null){
        insertNewRecord(formData);
    }else{
        updateRecord(formData);
    }
    resetForm();
}


function readFormData(){
    var formData = {};
    formData["produtoCode"] = document.getElementById('produtoCode').value;
    formData["produto"] = document.getElementById('produto').value;
    formData["qty"] = document.getElementById('qty').value;
    formData["produtoPreco"] = document.getElementById('produtoPreco').value;
    return formData;
}

function insertNewRecord(data){
    var table = document.getElementById('storeList').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
        cell1.innerHTML = data.produtoCode;
    var cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.produto;
    var cell3 = newRow.insertCell(2);
        cell3.innerHTML = data.qty;
    var cell4 = newRow.insertCell(3);
        cell4.innerHTML = data.produtoPreco;
    var cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<button onclick='onEdit(this)'>Editar</button> <button>Delete</button>`
}

function onEdit(td){
    selectedRow = td.parentElement.parentElement;
    document.getElementById('produtoCode').value = selectedRow.cells[0].innerHTML;
    document.getElementById('produto').value = selectedRow.cells[1].innerHTML;
    document.getElementById('qty').value = selectedRow.cells[2].innerHTML;
    document.getElementById('produtoPreco').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.produtoCode;
    selectedRow.cells[1].innerHTML = formData.produto;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.produtoPreco;
}

function onDelete(td){
    if(confirm('Deseja apagar esté registro?')){
        row = td.parentElement.parentElement;
        document.getElementById('storeList').deleteRow(row.rowIndex);
    }
    resetForm();
}

function resetForm(){
    document.getElementById('produtoCode').value = '';
    document.getElementById('produto').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('produtoPreco').value = '';
}