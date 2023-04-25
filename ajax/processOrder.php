<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        include("includes/mysqli_connect.php");

        $cid = $_POST['cid'];
        $pid = $_POST['pid'];
        $qty = $_POST['qty'];

        $query = "SELECT prodPrice FROM products WHERE prodID = '$pid'";
        $r = mysqli_query($dbc, $query);
        $prodprice = mysqli_fetch_array($r)[0];
        
        $query = "SELECT qtyRemaining FROM products WHERE prodID = '$pid'";
        $r = mysqli_query($dbc, $query);
        $qtyRemaining = mysqli_fetch_array($r)[0];

        $query = "SELECT custBalance FROM customers WHERE custID = '$cid'";
        $r = mysqli_query($dbc, $query);
        $custbalance = mysqli_fetch_array($r)[0];

        $totalprice = ($prodprice * $qty);

        if($custbalance < $totalprice){
            echo "Insufficient balance!";
        } else if($qtyRemaining < $qty) {
            echo "Out of stock!";
        } else {
            $query = "INSERT INTO orders (custID, prodID, orderQty, totalPrice) VALUES ('$cid', '$pid', '$qty', '$totalprice')";
            mysqli_query($dbc, $query);

            $query = "UPDATE products SET qtyRemaining = qtyRemaining - $qty WHERE prodID = '$pid'";
            mysqli_query($dbc, $query);

            $query = "UPDATE customers SET custBalance = custBalance - $totalprice WHERE custID = '$cid'";
            mysqli_query($dbc, $query);

            $query = "UPDATE global SET sold = sold + $qty, revenue = revenue + $totalprice WHERE unique_key = 1";
            mysqli_query($dbc, $query);

            echo "Order processed!";

            mysqli_close($dbc);
    
        }
    }
?>