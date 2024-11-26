import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import InputWithLabel from "./InputWithLabel";
import { Label } from "@/components/ui/label";
import ButtonWithIcon from "./ButtonWithIcon";
import { useState } from "react";

interface SearchInputButtonProps {
  placeholderText: string;
  handleSearch: (searchValue: string) => void;
}

export default function SearchInputButton({
  placeholderText,
  handleSearch,
}: SearchInputButtonProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  function handleChangeInput(event) {
    setSearchValue(event.target.value);
  }

  function handleClickButton(event) {
    event.preventDefault();
    console.log("searchValue", searchValue);
    handleSearch(searchValue);
  }

  return (
    <>
      <InputWithLabel>
        <Label>Search</Label>
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            id="searchbar"
            name="searchbar"
            placeholder={placeholderText}
            className="rounded-lg"
            onChange={handleChangeInput}
          />
          <ButtonWithIcon
            variant="outline"
            className="rounded-lg"
            onClickAction={handleClickButton}
          >
            <SearchIcon size={24} className="" />
          </ButtonWithIcon>
        </div>
      </InputWithLabel>
    </>
  );
}
