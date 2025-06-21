"use client";

import { useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalender";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const SingleTeacherPage = () => {
  const [about, setAbout] = useState(
    "This is a free-form description about the teacher. It can include personal background, teaching philosophy, or anything they'd like to share."
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempAbout, setTempAbout] = useState(about);

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="profile"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>

            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Leonard Snyder</h1>
                {role === "admin" && (
                  <FormModal
                    table="teacher"
                    type="update"
                    data={{
                      id: 1,
                      username: "deanguerrero",
                      email: "deanguerrero@gmail.com",
                      password: "password",
                      firstName: "Dean",
                      lastName: "Guerrero",
                      phone: "+1 234 567 89",
                      address: "1234 Main St, Anytown, USA",
                      bloodType: "A+",
                      dateOfBirth: "2000-01-01",
                      sex: "male",
                      img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                    }}
                  />
                )}
              </div>

              <div className="text-sm text-gray-500">
                {!isEditing ? (
                  <div className="flex justify-between gap-2">
                    <p>{about}</p>
                    {role === "admin" && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-blue-600 underline text-xs"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <textarea
                      value={tempAbout}
                      onChange={(e) => setTempAbout(e.target.value)}
                      rows={4}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setAbout(tempAbout);
                          setIsEditing(false);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 text-xs rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setTempAbout(about);
                          setIsEditing(false);
                        }}
                        className="bg-gray-300 px-3 py-1 text-xs rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>user@gmail.com</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+1 234 567</span>
                </div>
              </div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {[
              { icon: "/singleAttendance.png", label: "Attendance", value: "90%" },
              { icon: "/singleBranch.png", label: "Branches", value: "2" },
              { icon: "/singleLesson.png", label: "Lessons", value: "6" },
              { icon: "/singleClass.png", label: "Classes", value: "6" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]"
              >
                <Image src={item.icon} alt="" width={24} height={24} className="w-6 h-6" />
                <div>
                  <h1 className="text-xl font-semibold">{item.value}</h1>
                  <span className="text-sm text-gray-400">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teraphist&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* SHORTCUTS */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            {[
              { href: "/", label: "Teacher's Classes", bg: "bg-lamaSkyLight" },
              { href: "/", label: "Teacher's Students", bg: "bg-lamaPurpleLight" },
              { href: "/", label: "Teacher's Lessons", bg: "bg-lamaYellowLight" },
              { href: "/", label: "Teacher's Exams", bg: "bg-pink-50" },
              { href: "/", label: "Teacher's Assignments", bg: "bg-lamaSkyLight" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className={`p-3 rounded-md ${item.bg}`}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
