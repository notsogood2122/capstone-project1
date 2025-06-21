//TherapistList
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Therapist } from "@/generated/prisma";
import { role, therapistsData } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";
import Toolbar from "@/components/Toolbar";
import SortButton from "@/components/SortButton";

//type TherapistList = Therapist

const therapistSelect = role === "admin"
? {
  id: true,
  username: true,
  email: true,
  phone: true,
  address: true,
  img: true,
} :
{
  username: true,
  email: true,
  phone: true,
  address: true,
  img: true,
};

type SafeTherapist = {
  id: number;
  username: string;
  email: string;
  phone: string;
  address: string;
  img: string | null;
};

//dynamic columns
const baseColumns = [
  {
    header: "Info",
    accessor: "info",
  },
  { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
];

const adminColumns = [
  { header: "ID", accessor: "id", className: "hidden lg:table-cell" },
  { header: "Address", accessor: "address", className: "hidden lg:table-cell" },
];

const columns =
  role === "admin"
    ? [
        ...baseColumns,
        ...adminColumns,
        {
          header: "Actions",
          accessor: "action",
        },
      ]
    : [...baseColumns];

  const renderRow = (item: SafeTherapist) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4 min-w-[200px]">
        <Image
          src={item.img || "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="sm:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.username}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden lg:table-cell px-4 py-2">{item.phone}</td>
      {role === "admin" && (
        <>
        <td className="hidden lg:table-cell px-4 py-2">{item.id}</td>
        <td className="hidden lg:table-cell px-4 py-2">{item.address}</td>
        </>
      )}
      {role === "admin" && (
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <Link href={`/list/therapists/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            // <button className="w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            // </button>
            <>
              <FormModal table="event" type="update" data={item} />
              <FormModal table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
      )}
    </tr>
  );

const TherapistListPage = async ({
  searchParams
}:{
  searchParams:{ [key: string]: string | undefined};
}) => {

  if (role !== "admin" && role !== "therapist" && role !== "parent") {
    return <div className="text-red-500">Unauthorized access</div>;
  }

  const { page, therapistId, search} = searchParams;
  const sort = searchParams.sort;

let orderBy: any = undefined;

if (sort === "username_asc") orderBy = { username: "asc"};
else if (sort === "username_desc") orderBy = { username: "desc"};
else if (sort === "id_asc") orderBy = { id: "asc"};
else if (sort === "id_desc") orderBy = { id: "desc"};

  const p = page ? parseInt(page) : 1;


   const whereClause = {
    ...(therapistId && { id: parseInt(therapistId) }),
    ...(search && {
      OR: [
        { username: { 
          contains: search,
           mode: "insensitive" as const,
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
        { phone: 
          { contains: search,
           mode: "insensitive" as const,
           }
          },
      ],
    }),
  };

  const [data, count] = await prisma.$transaction([
   prisma.therapist.findMany({
    where: whereClause,
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
    orderBy,
    select: therapistSelect,
  }),
   prisma.therapist.count({ where: whereClause}),
  ]);

  //console.log(count)

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Therapists</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-4 self-end">
            <Toolbar role={role as "admin" | "therapist" | "parent"} table="therapist" />
            <SortButton sortCycle={["username_asc", "username_desc", "id_asc", "id_desc"]}/>
          </div>
        </div>
      </div>
      {/* LIST */}
      <div className="overflow-x=auto w-full">
      <Table columns={columns} renderRow={renderRow} data={data as SafeTherapist[]} />
      </div>
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default TherapistListPage;
