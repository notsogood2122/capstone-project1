"use client";

import TableSearch from "@/components/TableSearch";
import FormModal from "./FormModal";
import Image from "next/image";
import { role } from "@/lib/data";

type Toolbarprops = {
    role: "admin" | "therapist" | "parent";
    table: "therapist" | "parent" | "student";
};

const Toolbar = ({ role, table }: Toolbarprops) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
      <TableSearch />
      <div className="flex items-center gap-4 self-end">
        {table === "student" && (
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
            <Image src="/filter.png" alt="Filter" width={14} height={14} />
          </button>
        )}
        {role === "admin" && <FormModal table={table} type="create" />}
      </div>
    </div>
  );
};

export default Toolbar;
