import { useState } from "react";
import ButtonWithIcon from "./ButtonWithIcon";
import { Label } from "../ui/label";

interface Data {
  fullName: string;
  userCode: string;
  username: string;
}

interface PopUpCardProps {
  isDisplayed: boolean;
  data: Data;
}

export default function PopUpCard({ isDisplayed, data }: PopUpCardProps) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(isDisplayed);
  const closeModal = (): void => setModalIsOpen(false);
  console.log(data);
  console.log(isDisplayed);
  return (
    <>
      {modalIsOpen && (
        <div>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-lg">
              <h2 className="text-xl font-bold text-center">
                User Information
              </h2>
              <div className="flex justify-between items-center"></div>
              <div>
                <p className="p-4 bg-secondary text-gray-400 rounded-lg text-wrap">
                  Full Name: {data.fullName}
                  <br />
                  User Code: {data.userCode}
                </p>
                <p className="p-4 bg-secondary mt-2 font-bold rounded-lg">
                  Username: {data.username}
                  <br />
                  Password: {data.username}
                </p>
              </div>
              <ButtonWithIcon
                onClickAction={closeModal}
                size="icon"
                className=" my-5 rounded-lg w-full"
              >
                <Label className="font-sans font-bold text-base">Close</Label>
              </ButtonWithIcon>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
