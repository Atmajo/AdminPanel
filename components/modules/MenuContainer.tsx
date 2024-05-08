import React from "react";

import Menu from "./Menu";

const MenuContainer = () => {
  return (
    <div className="flex flex-col gap-3 border-2 border-[#FFAE35] rounded-lg py-3 px-2">
      <Menu title="Dashboard" icon="/images/dashboard.png" redirect="/dashboard" />
      <Menu title="Stock In" icon="/images/stockin.png" redirect="/stockin" />
      <Menu title="Stock Out" icon="/images/stockout.png" redirect="/stockout" />
      <Menu title="Orders" icon="/images/order.png" redirect="/orders" />
      <Menu title="Food" icon="/images/food.png" redirect="/food" />
      <Menu title="Accounting" icon="/images/account.png" redirect="/accounting" />
      <Menu
        title="Transaction"
        icon="/images/transaction.png"
        redirect="/transaction"
      />
      <Menu title="Users" icon="/images/users.png" redirect="/users" />
      <Menu title="Feedback" icon="/images/feedback.png" redirect="/feedback" />
    </div>
  );
};

export default MenuContainer;
