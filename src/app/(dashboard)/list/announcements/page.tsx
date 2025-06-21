import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import Toolbar from "@/components/Toolbar";
import SortButton from "@/components/SortButton";

const announcementSelect = role === "admin"
? {
  id: true,
  title: true,
  description: true,
  date: true,
} :
{
  title: true,
  description: true,
  date: true,
};

type Announcement = {
  id: number;
  title: string;
  description: string;
  date: Date;
};

const baseColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  { header: "Title", accessor: "title", className: "hidden lg:table-cell" },
  { header: "Description", accessor: "description", className: "hidden lg:table-cell" },
  { header: "Date", accessor: "date", className: "hidden lg:table-cell" },
];

const columns =
  role === "admin"
    ? [
        ...baseColumns,
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : [...baseColumns];

const AnnouncementListPage = async ( {
  searchParams
}:{ 
  searchParams: { [key: string]: string | undefined};
}) => {

  if (role !== "admin" && role !== "therapist" && role !== "parent") {
    return <div className="text-red-500">Unauthorized access</div>;
  }
  
    const { page, announcementId, search} = searchParams;
      const sort = searchParams.sort;
    
    let orderBy: any = undefined;
    
    if (sort === "title_asc") orderBy = { title: "asc"};
    else if (sort === "title_desc") orderBy = { title: "desc"};
    else if (sort === "date_asc") orderBy = { date: "asc"};
    else if (sort === "date_desc") orderBy = { date: "desc"};
    
      const p = page ? parseInt(page) : 1;
    
    
       const whereClause = {
        ...(announcementId && { id: parseInt(announcementId) }),
        ...(search && {
          OR: [
            { title: { 
              contains: search,
               mode: "insensitive" as const,
              },
            },
            { description: { 
              contains: search,
               mode: "insensitive" as const,
              },
            },
          ],
        }),
      };
    
      const [data, count] = await prisma.$transaction([
       prisma.announcement.findMany({
        where: whereClause,
        take: ITEM_PER_PAGE,
        skip: ITEM_PER_PAGE * (p - 1),
        orderBy,
        select: announcementSelect,
      }),
       prisma.announcement.count({ where: whereClause}),
      ]);

  const renderRow = (item: Announcement) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="hidden md:table-cell">{new Date(item.date).toLocaleDateString()}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Announcements
        </h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Toolbar role={role as "admin" | "therapist" | "parent"} table="therapist" />
            <SortButton sortCycle={["title_asc", "title_desc", "date_asc", "date_desc"]}/>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data as Announcement[]} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default AnnouncementListPage;
