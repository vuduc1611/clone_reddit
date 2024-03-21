import React from "react";
import { InputFields } from "../InputFields/InputFields";
import { AiOutlineMessage } from "react-icons/ai";
import banner from "../../assets/banner.png";
import { useSelector } from "react-redux";
import { Tooltip } from "../Tooltip/Tooltiip";

export const Header = () => {
  const user = useSelector((state) => state.user.user?.currentUser);
  const setOpen = () => {};
  return (
    <div className="t-0 h-20 flex border-b border-gray-400 items-center justify-between mx-2 fixed w-full z-50 bg-white">
      <img src={banner} alt="" className="ml-2 h-16" />
      <InputFields
        classStyle="ml-1 text-xl self-center w-4/12 h-10 bg-gray-200 rounded-full"
        placeholder=" &#x1F50D; Search for username"
      />
      <div className="flex items-center justify-between gap-10 h-20">
        <Tooltip message="Chat">
          <AiOutlineMessage size="2rem" />
        </Tooltip>
        <Tooltip message="Create post">
          <div className="flex justify-center items-center w-24 h-10 rounded-full cursor-pointer hover:bg-gray-300">
            <svg
              rpl=""
              fill="currentColor"
              height="20"
              icon-name="add-outline"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
            </svg>
            <span className="ml-2">Create</span>
          </div>
        </Tooltip>
        <Tooltip message="Profile">
          <img
            onClick={() => setOpen(true)}
            className="truncate cursor-pointer h-12 object-cover w-6 mr-8"
            src={user?.profilePicture}
            alt="info"
          />
        </Tooltip>
      </div>
    </div>
  );
};
