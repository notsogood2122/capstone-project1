"use client";

import { useState } from "react";
import Announcements from "@/components/Announcements";
// Removed BigCalendar import since we're replacing it
// import BigCalendar from "@/components/BigCalender";

const ParentPage = () => {
  const [expandedDecks, setExpandedDecks] = useState<boolean[]>(
    Array(6).fill(true)
  );

  const toggleDeck = (index: number) => {
    const newExpanded = [...expandedDecks];
    newExpanded[index] = !newExpanded[index];
    setExpandedDecks(newExpanded);
  };

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* Therapy Decks (Collapsible) - replacing the calendar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                  Therapy Deck {index + 1}
                </h2>
                <button
                  onClick={() => toggleDeck(index)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {expandedDecks[index] ? "Hide" : "Show"}
                </button>
              </div>
              {expandedDecks[index] && (
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 10 }).map((_, subIndex) => (
                    <div
                      key={subIndex}
                      className="bg-gray-100 p-3 rounded-lg text-center text-sm font-medium"
                    >
                      Sub Card {subIndex + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Request Therapist Transfer */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">Request Therapist Transfer</h2>
          <p className="text-sm text-gray-600 mb-2">
            Choose a therapist below to request a transfer. Your request will be reviewed by the admin.
          </p>
          <div className="space-y-2">
            <div className="flex justify-between items-center border p-2 rounded-md">
              <span className="text-sm">Therapist Jane Smith</span>
              <button className="text-white bg-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                Request Transfer
              </button>
            </div>
            <div className="flex justify-between items-center border p-2 rounded-md">
              <span className="text-sm">Therapist Mark Lee</span>
              <button className="text-white bg-blue-500 px-3 py-1 rounded-md text-sm hover:bg-blue-600">
                Request Transfer
              </button>
            </div>
          </div>
        </div>

        {/* Official Session Schedules */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">Official Session Schedules</h2>
          <p className="text-sm text-gray-600 mb-2">
            These are the schedules officially assigned by the admin.
          </p>
          <ul className="text-sm space-y-2">
            <li className="p-2 bg-gray-50 border rounded-md">
              July 1, 2025 - 9:00 AM with Therapist Jane Smith
            </li>
            <li className="p-2 bg-gray-50 border rounded-md">
              July 5, 2025 - 10:30 AM with Therapist Mark Lee
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        {/* Announcements */}
        <Announcements />

        {/* Therapy Recommendations */}
        <div className="bg-white p-4 rounded-md shadow">
          <h2 className="text-lg font-semibold mb-2">Therapy Recommendations</h2>
          <p className="text-sm text-gray-600 mb-2">
            A list of therapy notes provided by your therapist.
          </p>
          <ul className="space-y-3">
            <li className="border rounded-md p-3 bg-gray-50 text-sm">
              <div className="font-semibold">June 20, 2025 – 10:00 AM</div>
              <div className="text-gray-700 mt-1">
                Practice fine motor skills with stacking activities.
              </div>
            </li>
          </ul>
        </div>

        {/* Feedback Section (Disabled) */}
        <div className="bg-gray-100 p-4 rounded-md opacity-50 pointer-events-none">
          <h2 className="text-lg font-semibold mb-2">Feedback</h2>
          <p className="text-sm text-gray-600 mb-4">
            This section will be enabled once the therapy cycle is complete.
          </p>
          <div className="flex items-center space-x-1 mb-2">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
          <textarea
            className="w-full p-2 border rounded-md text-sm"
            rows={3}
            placeholder="Leave your feedback here..."
            disabled
          ></textarea>
          <button
            className="mt-2 bg-blue-400 text-white px-4 py-1 rounded-md text-sm"
            disabled
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
