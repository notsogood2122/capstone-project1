"use client";
import { useState } from "react";
import Announcements from "@/components/Announcements";

const TeacherPage = () => {
  const [expandedDecks, setExpandedDecks] = useState<boolean[]>(
    Array(6).fill(true)
  );

  const toggleDeck = (index: number) => {
    setExpandedDecks((prev) =>
      prev.map((expanded, i) => (i === index ? !expanded : expanded))
    );
  };

  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-6">
      {/* LEFT: Collapsible Exercise Decks */}
      <div className="w-full xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                Exercise Deck {index + 1}
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

      {/* RIGHT: Announcements */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
