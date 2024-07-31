import TableScrollable from "./ui/TableScrollable";

export default function TableWithActionFeature({
  dataTable,
  heightTable,
  handleSelectedItem,
  resetSelected,
  children,
}) {
  return (
    <>
      <TableScrollable
        data={dataTable}
        heightTable={heightTable}
        handleSelectedItem={handleSelectedItem}
        resetSelected={resetSelected}
      >
        {children}
      </TableScrollable>
    </>
  );
}
