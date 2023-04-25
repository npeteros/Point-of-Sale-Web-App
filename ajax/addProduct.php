<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        include("includes/mysqli_connect.php");

        $name = $_POST['name'];
        $price = $_POST['price'];
        $qty = $_POST['qty'];

        $query = "INSERT INTO products (prodName, prodPrice, qtyRemaining) VALUES ('$name', '$price', '$qty')";
        mysqli_query($dbc, $query);
        mysqli_close($dbc);
    }
?>