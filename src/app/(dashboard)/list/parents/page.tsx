import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";
import Toolbar from "@/components/Toolbar";
import { redirect } from "next/navigation";
import SortButton from "@/components/SortButton";

if (role === "parent") {
  redirect("/dashboard"); // redirect to dashboard
}

const parentSelect = role === "admin"
? {
  id: true,
  username: true,
  students: true,
  email: true,
  address: true,
  phone: true,
  img: true,
} :
{
  username: true,
  students: true,
  email: true,
  address: true,
  phone: true,
  img: true,
};

type SafeParent = {
  id: number;
  username: string;
  students: string;
  email: string;
  address: string;
  phone: string;
  img: string | null;
};

const baseColumns = [
  {
    header: "Info",
    accessor: "info",
  },
];

const adminColumns = [
  { header: "ID", accessor: "id", className: "hidden lg:table-cell" },
  { header: "Students", accessor: "students", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
];

const therapistColumns = [
  { header: "Students", accessor: "students", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
];

const columns = [
  ...baseColumns,
  ...(role === "admin" ? adminColumns : role === "therapist" ? therapistColumns : []),
  { header: "Actions", accessor: "action" },
];

const renderRow = (item: SafeParent) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 min-w-[200px]">
        <Image
          src={item.img || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="hidden sm:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}</h3>
          <p className="text-xs text-gray-500">{item.email}</p>
        </div>
      </td>
      <>
        {role === "admin" && (
          <>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.id}</td>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.students}</td>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.address}</td>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.phone}</td>
          </>
        )}
        {role === "therapist" && (
          <>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.students}</td>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.address}</td>
            <td className="hidden lg:table-cell px-4 py-2 text-left">{item.phone}</td>
          </>
        )}
      </>
    
        <td className="px-4 py-2">
          <div className="flex items-center gap-2">
            <Link href={`/list/parents/${item.id}`}>
              <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
          {role === "admin" && (
          <>
            <FormModal table="parent" type="update" data={item} />
            <FormModal table="parent" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
    </tr>
  );

const ParentsListPage = async ({
  searchParams
}:{
  searchParams:{ [key: string]: string | undefined};
}) => {

  if (role !== "admin" && role !== "therapist" && role !== "parent") {
    return <div className="text-red-500">Unauthorized access</div>;
  }

  const { page, parentId, search} = searchParams;
  const sort = searchParams.sort;

let orderBy: any = undefined;

if (sort === "username_asc") orderBy = { username: "asc"};
else if (sort === "username_desc") orderBy = { username: "desc"};
else if (sort === "id_asc") orderBy = { id: "asc"};
else if (sort === "id_desc") orderBy = { id: "desc"};

  const p = page ? parseInt(page) : 1;


   const whereClause = {
    ...(parentId && { id: parseInt(parentId) }),
    ...(search && {
      OR: [
        { username: { 
          contains: search,
           mode: "insensitive" as const,
          },
        },
        {
          students: {
          some: {
          username: {
          contains: search,
          mode: "insensitive" as const,
              },
            },
          },
        },
        { email: {
           contains: search,
            mode: "insensitive" as const,
          },
        },
        { address: {
           contains: search,
            mode: "insensitive" as const,
          },
        },
        { phone: {
           contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const [data, count] = await prisma.$transaction([
   prisma.parent.findMany({
    where: whereClause,
    include: {
      students: true
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
    orderBy,
    //select: parentSelect,
  
  }),
   prisma.parent.count({ where: whereClause}),
  ]);

  const safeData: SafeParent[] = data.map((parent) => ({
  id: parent.id,
  username: parent.username,
  email: parent.email ?? "N/A",
  address: parent.address,
  phone: parent.phone,
  img: parent.img,
  students: parent.students.map((s) => s.username).join(", "), // or `.length.toString()` for count
}));

  //console.log(count)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Toolbar role={role as "admin" | "therapist" | "parent"} table="therapist" />
            <SortButton sortCycle={["username_asc", "username_desc", "id_asc", "id_desc"]}/>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="overflow-x-auto w-full"> 
        <Table columns={columns} renderRow={renderRow} data={safeData} />
      </div>
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default ParentsListPage;