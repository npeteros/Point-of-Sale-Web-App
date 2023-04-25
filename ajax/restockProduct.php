<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {

        include("includes/mysqli_connect.php");

        $pid = $_POST['id'];
        $qty = $_POST['qty'];

        $query = "UPDATE products SET qtyRemaining = $qty WHERE prodID = '$pid'";

        mysqli_query($dbc, $query);
        mysqli_close($dbc);

        echo 'Product restocked!';
    }
?>