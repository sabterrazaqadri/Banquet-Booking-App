// components/Calendar.tsx
"use client";

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type EventDetails = {
  clientName: string;
  totalAmount: number;
  amountPaid: number;
  paymentStatus: 'Paid' | 'Due' | 'Partial';
  additionalDetails: string;
};

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    clientName: '',
    totalAmount: 0,
    amountPaid: 0,
    paymentStatus: 'Due',
    additionalDetails: '',
  });
  const [events, setEvents] = useState<Record<string, EventDetails>>({});

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleEventInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEventDetails((prev) => ({
      ...prev,
      [name]: name === 'totalAmount' || name === 'amountPaid' ? parseFloat(value) : value,
    }));
  };

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      const remainingAmount = eventDetails.totalAmount - eventDetails.amountPaid;
      const paymentStatus = remainingAmount === 0 ? 'Paid' : remainingAmount < eventDetails.totalAmount ? 'Partial' : 'Due';
      setEvents((prevEvents) => ({
        ...prevEvents,
        [selectedDate.toDateString()]: {
          ...eventDetails,
          paymentStatus,
        },
      }));
      setEventDetails({
        clientName: '',
        totalAmount: 0,
        amountPaid: 0,
        paymentStatus: 'Due',
        additionalDetails: '',
      });
    }
  };

  const handleDeleteEvent = (date: string) => {
    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents };
      delete updatedEvents[date];
      return updatedEvents;
    });
  };

  // Function to check if a date has an event
  const isDateBooked = (date: Date) => events[date.toDateString()] !== undefined;

  // Custom rendering function for each day in the calendar
  const renderDayContents = (day: number, date: Date) => {
    const isBooked = isDateBooked(date);
    return (
      <div className="relative flex justify-center items-center">
        <span>{day}</span>
        {isBooked && (
          <span
            className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"
            title="Event Booked"
          ></span>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-3xl font-semibold mb-8 text-gray-700 text-center underline">Select a Date</h2>
      <div className="flex justify-center mb-8">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          renderDayContents={renderDayContents} // Renders custom content for each day
          className="w-full max-w-md rounded-lg border border-gray-200 shadow-sm"
        />
      </div>

      {selectedDate && (
        <form onSubmit={handleEventFormSubmit} className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700 text-center">
            Event Details for {selectedDate.toDateString()}
          </h3>

          <label className="block mb-2 text-gray-600">Client Name:</label>
          <input
            type="text"
            name="clientName"
            value={eventDetails.clientName}
            onChange={handleEventInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <label className="block mb-2 text-gray-600">Total Amount:</label>
          <input
            type="number"
            name="totalAmount"
            value={eventDetails.totalAmount}
            onChange={handleEventInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            required
          />

          <label className="block mb-2 text-gray-600">Amount Paid:</label>
          <input
            type="number"
            name="amountPaid"
            value={eventDetails.amountPaid}
            onChange={handleEventInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />

          <label className="block mb-2 text-gray-600">Payment Status:</label>
          <select
            name="paymentStatus"
            value={eventDetails.paymentStatus}
            onChange={handleEventInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          >
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
            <option value="Partial">Partial</option>
          </select>

          <label className="block mb-2 text-gray-600">Additional Details:</label>
          <textarea
            name="additionalDetails"
            value={eventDetails.additionalDetails}
            onChange={handleEventInputChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />

          <button
            type="submit"
            className="px-4 py-2 w-full text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-transform transform hover:scale-105"
          >
            Save Event
          </button>
        </form>
      )}

      {selectedDate && events[selectedDate.toDateString()] && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-md font-semibold mb-4 text-gray-700">Saved Event</h3>
          <p><span className="font-medium">Client Name:</span> {events[selectedDate.toDateString()].clientName}</p>
          <p><span className="font-medium">Total Amount:</span> Rs {events[selectedDate.toDateString()].totalAmount}/=</p>
          <p><span className="font-medium">Amount Paid:</span> Rs {events[selectedDate.toDateString()].amountPaid}/=</p>
          <p><span className="font-medium">Remaining Balance:</span> Rs {events[selectedDate.toDateString()].totalAmount - events[selectedDate.toDateString()].amountPaid}/=</p>
          <p><span className="font-medium">Payment Status:</span> {events[selectedDate.toDateString()].paymentStatus}</p>
          <p><span className="font-medium">Additional Details:</span> {events[selectedDate.toDateString()].additionalDetails}</p>
          <button
            onClick={() => handleDeleteEvent(selectedDate.toDateString())}
            className="mt-4 px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-transform transform hover:scale-105"
          >
            Delete Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
