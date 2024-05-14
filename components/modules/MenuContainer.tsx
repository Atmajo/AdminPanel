import React from "react";

import Menu from "./Menu";
import { useSession, signOut } from "next-auth/react";

const MenuContainer = ({ page }: menucontainer_type) => {
  const { data: session } = useSession();
  return (
    <div className={`flex flex-col gap-12 h-screen bg-slate-900 w-[15%]`}>
      <h1 className="text-2xl font-semibold px-10 py-4 border-b">{page}</h1>
      <div className="flex flex-col gap-10 px-10">
        <Menu title="Dashboard" icon="/images/dashboard.png" redirect="/" />
        <Menu title="Stock In" icon="/images/stockin.png" redirect="/stockin" />
        <Menu
          title="Stock Out"
          icon="/images/stockout.png"
          redirect="/stockout"
        />
        <Menu title="Orders" icon="/images/order.png" redirect="/orders" />
        <Menu title="Food" icon="/images/food.png" redirect="/food" />
        <Menu
          title="Accounting"
          icon="/images/account.png"
          redirect="/accounting"
        />
        <Menu
          title="Transaction"
          icon="/images/transaction.png"
          redirect="/transaction"
        />
        <Menu title="Users" icon="/images/users.png" redirect="/users" />
        <Menu
          title="Feedback"
          icon="/images/feedback.png"
          redirect="/feedback"
        />
      </div>
    </div>
  );
};

export default MenuContainer;
