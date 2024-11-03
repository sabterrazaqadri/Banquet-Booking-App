// pages/index.tsx

import Image from "next/image";
import Calendar from "../Components/Calendar";
import ExpenseTracker from "../Components/ExpenseTracker";
import i1 from "../Components/i1.webp"
import ExpenseForm from "../Components/ExpenseForm";

export default function Home() {
  return ( 
    <div className="relative bg-gray-100">
      <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 text-center">Banquet Booking System</h1>
        <Calendar/>
      <ExpenseTracker />
      </div>
    </div>
  );
}
