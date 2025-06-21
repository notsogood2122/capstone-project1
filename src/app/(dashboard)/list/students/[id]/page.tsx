"use client";

import { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const presetGoals = [
  "Communication skills",
  "Emotional regulation",
  "Social interaction",
  "Self-help skills",
  "Behavior management",
];

const SingleStudentPage = () => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const [assessmentData, setAssessmentData] = useState([
    {
      domain: "Communication",
      score: "",
      scoreNote: "",
      midpoint: "",
      midpointNote: "",
      post: "",
      postNote: "",
    },
    {
      domain: "Cognition",
      score: "",
      scoreNote: "",
      midpoint: "",
      midpointNote: "",
      post: "",
      postNote: "",
    },
  ]);

  const [achievements, setAchievements] = useState([
    "Star of the Week",
    "Completed 10 Lessons",
    "Perfect Attendance - March",
  ]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (recording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recording]);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const secs = (sec % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleAddGoal = () => {
    const goal = customGoal || selectedGoal;
    if (goal && !goals.includes(goal)) {
      setGoals((prev) => [...prev, goal]);
      setCustomGoal("");
      setSelectedGoal("");
    }
  };

  const handleAssessmentChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...assessmentData];
    (updated[index] as any)[field] = value;
    setAssessmentData(updated);
  };

  const handleAddRow = () => {
    setAssessmentData([
      ...assessmentData,
      {
        domain: "",
        score: "",
        scoreNote: "",
        midpoint: "",
        midpointNote: "",
        post: "",
        postNote: "",
      },
    ]);
  };

  const downloadCSV = () => {
    const csv = [
      [
        "Domain",
        "Baseline",
        "Baseline Note",
        "Midpoint",
        "Midpoint Note",
        "Post Assessment",
        "Post Note",
      ],
      ...assessmentData.map((row) => [
        row.domain,
        row.score,
        row.scoreNote,
        row.midpoint,
        row.midpointNote,
        row.post,
        row.postNote,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "assessment.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* USER INFO + CARDS */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Cameron Moran</h1>
              <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet.</p>
              <div className="flex flex-wrap gap-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {[
              { icon: "/singleAttendance.png", label: "Attendance", value: "90%" },
              { icon: "/singleBranch.png", label: "Grade", value: "6th" },
              { icon: "/singleLesson.png", label: "Lessons", value: "18" },
              { icon: "/singleClass.png", label: "Class", value: "6A" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%]">
                <Image src={item.icon} alt="" width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold">{item.value}</h1>
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>

        {/* Session Notes */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold mb-4">Session Notes</h1>
          <textarea
            placeholder="Write your notes here..."
            className="w-full p-2 border border-gray-300 rounded-md h-32 resize-none"
          ></textarea>
        </div>

        {/* Recording */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold mb-4">Record Session</h1>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => setRecording(true)}
              disabled={recording}
              className="bg-lamaSky text-black px-4 py-2 rounded-md disabled:opacity-50"
            >
              Start
            </button>
            <button
              onClick={() => setRecording(false)}
              disabled={!recording}
              className="bg-lamaPurple text-black px-4 py-2 rounded-md disabled:opacity-50"
            >
              Stop
            </button>
            <div className="text-sm text-gray-600">Duration: {formatTime(seconds)}</div>
          </div>
        </div>

        {/* Therapy Goals */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold mb-4">Therapy Goals</h1>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <select
              className="border border-gray-300 rounded-md p-2 w-full md:w-1/2"
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
            >
              <option value="">Select a goal</option>
              {presetGoals.map((goal, idx) => (
                <option key={idx} value={goal}>
                  {goal}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Or enter a custom goal"
              className="border border-gray-300 rounded-md p-2 w-full md:w-1/2"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
            />
            <button
              onClick={handleAddGoal}
              className="bg-lamaYellow text-black px-4 py-2 rounded-md mt-2 md:mt-0"
            >
              Add Goal
            </button>
          </div>
          {goals.length > 0 && (
            <ul className="mt-4 list-disc list-inside text-sm text-gray-700 space-y-1">
              {goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Assessment Table */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold mb-4">Assessment Table</h1>
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 text-left">Assessment Category</th>
                <th className="border p-2 text-left">Baseline</th>
                <th className="border p-2 text-left">Midpoint</th>
                <th className="border p-2 text-left">Post Assessment</th>
              </tr>
            </thead>
            <tbody>
              {assessmentData.map((row, idx) => (
                <tr key={idx}>
                  <td className="border p-2">
                    <input
                      className="w-full border border-gray-200 p-1 rounded"
                      value={row.domain}
                      onChange={(e) => handleAssessmentChange(idx, "domain", e.target.value)}
                    />
                  </td>
                  {["score", "midpoint", "post"].map((field) => (
                    <td key={field} className="border p-2 space-y-1">
                      <input
                        className="w-full border border-gray-200 p-1 rounded"
                        value={(row as any)[field]}
                        placeholder="Score"
                        onChange={(e) =>
                          handleAssessmentChange(idx, field, e.target.value)
                        }
                      />
                      <textarea
                        className="w-full border border-gray-200 p-1 rounded text-xs"
                        placeholder="Add note..."
                        value={(row as any)[`${field}Note`] || ""}
                        onChange={(e) =>
                          handleAssessmentChange(idx, `${field}Note`, e.target.value)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-2 mt-4">
            <button onClick={handleAddRow} className="bg-lamaSky text-black px-4 py-2 rounded-md">
              Add Row
            </button>
            <button
              onClick={downloadCSV}
              className="bg-lamaPurple text-black px-4 py-2 rounded-md"
            >
              Download CSV
            </button>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-4 bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold mb-4">Achievements</h1>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            {achievements.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Lessons
            </Link>
            <Link className="p-3 rounded-md bg-lamaPurpleLight" href="/">
              Student&apos;s Teachers
            </Link>
            <Link className="p-3 rounded-md bg-pink-50" href="/">
              Student&apos;s Exams
            </Link>
            <Link className="p-3 rounded-md bg-lamaSkyLight" href="/">
              Student&apos;s Assignments
            </Link>
            <Link className="p-3 rounded-md bg-lamaYellowLight" href="/">
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
