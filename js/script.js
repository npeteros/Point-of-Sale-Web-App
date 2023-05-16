const buttons = [
    ["#displayProducts", displayProducts],
    ["#displayCustomers", displayCustomers],
    ["#addProduct", addProduct],
    ["#addCustomer", addCustomer],
    ["#reloadBalance", reloadBalance],
    ["#processOrder", processOrder],
    ["#displayRestock", displayRestock],
    ["#restockProduct", restockProduct]
];

const table = $("#tableOutput");
const form = $("form");

function displayProducts() {
    $("#output").text("");
    $("#fieldOutput").show();
    table.html("");
    $("#fieldLegend").text("Product List");
    $.ajax({
        type: "GET",
        url: "ajax/getProducts.php",
        dataType: "json",
        success: function(data){

            var tableHead = $("<thead></thead>");
            var newRow = $("<tr></tr>");

            var idCell = $("<th></th>").text("Product ID");
            newRow.append(idCell);
            var nameCell= $("<th></th>").text("Product Name");
            newRow.append(nameCell);
            var priceCell= $("<th></th>").text("Product Price");
            newRow.append(priceCell);
            var qtyCell= $("<th></th>").text("Quantity Remaining");
            newRow.append(qtyCell);

            tableHead.append(newRow);
            table.append(tableHead);

            var tableBody = $("<tbody></tbody>");
            
            for(var i = 0; i < data.length; i++) {
                var id = data[i][0];
                var name = data[i][1];
                var price = data[i][2];
                var qtyRem = data[i][3];
                
                var newRow = $("<tr></tr>");

                idCell = $("<td></td>").text(id);
                newRow.append(idCell);
                nameCell= $("<td></td>").text(name);
                newRow.append(nameCell);
                priceCell= $("<td></td>").text(price);
                newRow.append(priceCell);
                qtyCell= $("<td></td>").text(qtyRem);
                newRow.append(qtyCell);

                tableBody.append(newRow);
                table.append(tableBody);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error retrieving data: " + error);
        }
    });
}

function displayCustomers() {
    $("#output").text("");
    $("#fieldOutput").show();
    table.html("");
    $("#fieldLegend").text("Customer List");
    $.ajax({
        type: "GET",
        url: "ajax/getCustomers.php",
        dataType: "json",
        success: function(data){
    
            var tableHead = $("<thead></thead>");
            var newRow = $("<tr></tr>");
    
            var idCell = $("<th></th>").text("Customer ID");
            newRow.append(idCell);
            var nameCell= $("<th></th>").text("Customer Name");
            newRow.append(nameCell);
            var balanceCell= $("<th></th>").text("Customer Balance");
            newRow.append(balanceCell);

            tableHead.append(newRow);
            table.append(tableHead);

            var tableBody = $("<tbody></tbody>");
            
            for(var i = 0; i < data.length; i++) {
                var id = data[i][0];
                var name = data[i][1];
                var balance = data[i][2];
                
                var newRow = $("<tr></tr>");
    
                idCell = $("<td></td>").text(id);
                newRow.append(idCell);
                nameCell= $("<td></td>").text(name);
                newRow.append(nameCell);
                balanceCell= $("<td></td>").text(balance);
                newRow.append(balanceCell);
    
                tableBody.append(newRow);
                table.append(tableBody);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error retrieving data: " + error);
        }
    });
}

function addProduct() {
    $("#output").text("");
    $("#theForm").hide();
    $("#generatedForm").html("");
    $("#generatedForm").prepend("<input type='button' value='Go Back' class='option' onclick='location.reload();'>");
    $("#generatedForm").prepend("<input type='button' value='Add Product' class='option' id='addProd'>");
    $("#generatedForm").prepend("<label for='quantity'>Product Quantity</label><input type='number' id='prodQty' min=1 required>");
    $("#generatedForm").prepend("<label for='price'>Product Price</label><input type='number' id='prodPrice' min=1 required>");
    $("#generatedForm").prepend("<label for='name'>Product Name</label><input type='text' id='prodName' required>");

    $("#addProd").on("click", ajax_addProduct);
}

function ajax_addProduct() {
    var name = $("#prodName").val();
    var price = $("#prodPrice").val();
    var qty = $("#prodQty").val();
    
    $.ajax({
        type: "POST",
        url: "ajax/addProduct.php",
        data: {
            name: name,
            price: price,
            qty: qty
        },
        success: function() {
            $("#output").text("Product added!");
            $("#generatedForm").html("");
            $("#theForm").show();
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

function addCustomer() {
    $("#output").text("");
    $("#theForm").hide();
    $("#generatedForm").html("");
    $("#generatedForm").prepend("<input type='button' value='Go Back' class='option' onclick='location.reload();'>");
    $("#generatedForm").prepend("<input type='button' value='Add Customer' class='option' id='addCust'>");
    $("#generatedForm").prepend("<label for='balance'>Customer Balance</label><input type='number' id='custBal' min=0 required>");
    $("#generatedForm").prepend("<label for='name'>Customer Name</label><input type='text' id='custName' required>");
    

    $("#addCust").on("click", ajax_addCustomer);
}

function ajax_addCustomer() {
    var name = $("#custName").val();
    var balance = $("#custBal").val();
    
    $.ajax({
        type: "POST",
        url: "ajax/addCustomer.php",
        data: {
            name: name,
            balance: balance
        },
        success: function() {
            $("#output").text("Customer added!");
            $("#generatedForm").html("");
            $("#theForm").show();
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

function reloadBalance() {
    $("#output").text("");
    $("#theForm").hide();
    $("#generatedForm").html("");
    $("#generatedForm").prepend("<input type='button' value='Go Back' class='option' onclick='location.reload();'>");
    $("#generatedForm").prepend("<input type='button' value='Reload Balance' class='option' id='reloadBal'>");
    $("#generatedForm").prepend("<label for='balance'>New Balance</label><input type='number' id='custBal' min=0 required>");
    $("#generatedForm").prepend("<label for='id'>Customer ID</label><input type='text' id='custID' required>");

    $("#reloadBal").on("click", ajax_reloadBalance);
}

function ajax_reloadBalance() {
    var id = $("#custID").val();
    var balance = $("#custBal").val();
    
    $.ajax({
        type: "POST",
        url: "ajax/reloadBalance.php",
        data: {
            id: id,
            balance: balance
        },
        success: function(response) {
            $("#output").text(response);
            $("#theForm").show();
            $("#generatedForm").html("");
            setActivityHeaders();
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

function processOrder() {
    $("#output").text("");
    $("#theForm").hide();
    $("#generatedForm").html("");

    $("#generatedForm").prepend("<input type='button' value='Go Back' class='option' onclick='location.reload();'>");
    $("#generatedForm").prepend("<input type='button' value='Process Order' class='option' id='procOrder'>");
    $("#generatedForm").prepend("<label for='qty'>Quantity to Order</label><input type='number' id='qty' min=1 required>");
    $("#generatedForm").prepend("<label for='pid'>Product ID</label><input type='text' id='prodID' required>");
    $("#generatedForm").prepend("<label for='cid'>Customer ID</label><input type='text' id='custID' required>");

    $("#procOrder").on("click", ajax_processOrder);
}

function ajax_processOrder() {
    var cid = $("#custID").val();
    var pid = $("#prodID").val();
    var qty = $("#qty").val();
    
    $.ajax({
        type: "POST",
        url: "ajax/processOrder.php",
        data: {
            cid: cid,
            pid: pid,
            qty: qty
        },
        success: function(response) {
            $("#output").text(response);
            $("#theForm").show();
            $("#generatedForm").html("");
            setActivityHeaders();
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

function displayRestock() {
    $("#output").text("");
    $("#fieldOutput").show();
    table.html("");
    $("#fieldLegend").text("Out of Stock Products");
    $.ajax({
        type: "GET",
        url: "ajax/displayRestock.php",
        dataType: "json",
        success: function(data){

            var tableHead = $("<thead></thead>");
            var newRow = $("<tr></tr>");

            var idCell = $("<th></th>").text("Product ID");
            newRow.append(idCell);
            var nameCell= $("<th></th>").text("Product Name");
            newRow.append(nameCell);
            var priceCell= $("<th></th>").text("Product Price");
            newRow.append(priceCell);
            var qtyCell= $("<th></th>").text("Quantity Remaining");
            newRow.append(qtyCell);

            tableHead.append(newRow);
            table.append(tableHead);

            var tableBody = $("<tbody></tbody>");
            
            for(var i = 0; i < data.length; i++) {
                var id = data[i][0];
                var name = data[i][1];
                var price = data[i][2];
                var qtyRem = data[i][3];
                
                var newRow = $("<tr></tr>");

                idCell = $("<td></td>").text(id);
                newRow.append(idCell);
                nameCell= $("<td></td>").text(name);
                newRow.append(nameCell);
                priceCell= $("<td></td>").text(price);
                newRow.append(priceCell);
                qtyCell= $("<td></td>").text(qtyRem);
                newRow.append(qtyCell);

                tableBody.append(newRow);
                table.append(tableBody);
            }
        },
        error: function(xhr, status, error) {
            console.error("Error retrieving data: " + error);
        }
    });
}

function restockProduct() {
    $("#output").text("");
    $("#theForm").hide();
    $("#generatedForm").html("");
    $("#generatedForm").prepend("<input type='button' value='Go Back' class='option' onclick='location.reload();'>");
    $("#generatedForm").prepend("<input type='button' value='Restock Product' class='option' id='restockProd'>");
    $("#generatedForm").prepend("<label for='balance'>New Quantity</label><input type='number' id='qty' min=1 required>");
    $("#generatedForm").prepend("<label for='id'>Product ID</label><input type='text' id='prodID' required>");

    $("#restockProd").on("click", ajax_restockProduct);
}

function ajax_restockProduct() {
    var id = $("#prodID").val();
    var qty = $("#qty").val();
    
    $.ajax({
        type: "POST",
        url: "ajax/restockProduct.php",
        data: {
            id: id,
            qty: qty
        },
        success: function(response) {
            $("#output").text(response);
            $("#theForm").show();
            $("#generatedForm").html("");
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

function setActivityHeaders() {
    $.ajax({
        type: "GET",
        url: "ajax/retrieveReloaded.php",
        dataType: "json",
        success: function(response){
            $("#reload").text(response);
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });

    $.ajax({
        type: "GET",
        url: "ajax/retrieveSold.php",
        dataType: "json",
        success: function(response){
            $("#sold").text(response);
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });

    $.ajax({
        type: "GET",
        url: "ajax/retrieveRevenue.php",
        dataType: "json",
        success: function(response){
            $("#revenue").text(response);
        },
        error: function(xhr, status, error) {
            console.error("Error updating row: " + error);
        }
    });
}

$(function() {
    for(var i = 0; i < buttons.length; i++) $(buttons[i][0]).on("click", buttons[i][1]);
    $("#fieldOutput").hide();

    setActivityHeaders();
});
