import { ReactNode } from "react";
import TableScrollable from "./TableScrollable";
import { UserDto } from "../users/users";

interface TableWithActionFeatureProps {
  dataTable: UserDto[];
  heightTable?: string;
  handleSelectedItem?: (item: any) => void;
  resetSelected?: boolean;
  children?: ReactNode;
}

export default function TableWithActionFeature({
  dataTable,
  heightTable,
  handleSelectedItem,
  resetSelected,
  children,
}: TableWithActionFeatureProps) {
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
