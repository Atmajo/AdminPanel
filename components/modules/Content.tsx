import React from "react";
import Dashboard from "../pages/Dashboard";
import StockIn from "../pages/StockIn";
import StockOut from "../pages/StockOut";
import Orders from "../pages/Orders";
import Food from "../pages/Food";
import Accounting from "../pages/Accounting";
import Transaction from "../pages/Transaction";
import Users from "../pages/Users";
import Feedback from "../pages/Feedback";

function Content({ page }: { page: string }) {
  return (
    <>
      <div>{page === "Dashboard" && <Dashboard />}</div>
      <div>{page === "Stock In" && <StockIn />}</div>
      <div>{page === "Stock Out" && <StockOut />}</div>
      <div>{page === "Orders" && <Orders />}</div>
      <div>{page === "Food" && <Food />}</div>
      <div>{page === "Accounting" && <Accounting />}</div>
      <div>{page === "Transaction" && <Transaction />}</div>
      <div>{page === "Users" && <Users />}</div>
      <div>{page === "Feedback" && <Feedback />}</div>
    </>
  );
}

export default Content;
