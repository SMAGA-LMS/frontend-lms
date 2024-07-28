import TableScrollable from "./ui/TableScrollable";

export default function TableWithSearchFeature({
  dataTable,
  children,
  heightTable,
}) {
  return (
    <>
      {children}
      <TableScrollable data={dataTable} heightTable={heightTable} />
    </>
  );
}
