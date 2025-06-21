const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <div className="overflow-x-auto w-full">
    <table className="min-w-full table-fixed text-sm text-left border-collapse">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} className={`px-4 py-2 text-gray-500 font-medium ${col.className ?? ""}`}>
            {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
    </div>
  );
};

export default Table;
