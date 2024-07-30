import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import InputWithLabel from "./ui/InputWithLabel";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import ButtonWithIcon from "./ui/ButtonWithIcon";
import { useState } from "react";

export default function SearchInputButton({ placeholderText, handleSearch }) {
  const [searchValue, setSearchValue] = useState("");

  function handleChangeInput(event) {
    setSearchValue(event.target.value);
  }

  function handleClickButton() {
    handleSearch(searchValue);
  }

  return (
    <>
      <InputWithLabel className="">
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
            type="button"
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
