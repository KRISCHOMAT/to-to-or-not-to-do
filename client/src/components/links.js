import {
  AiOutlineInfoCircle,
  AiOutlineUnorderedList,
  AiOutlinePlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";

export const links = [
  {
    id: 2,
    name: "Lists",
    to: "",
    icon: <AiOutlineUnorderedList className="icon" />,
  },
  {
    id: 3,
    name: "Add List",
    to: "add-list",
    icon: <AiOutlinePlusCircle className="icon" />,
  },
  {
    id: 4,
    name: "Friends",
    to: "friends",
    icon: <AiOutlineHeart className="icon" />,
    iconAlert: (
      <AiOutlineHeart className="icon" style={{ color: "var(--red-dark)" }} />
    ),
  },
  {
    id: 1,
    name: "User Info",
    to: "user-info",
    icon: <AiOutlineInfoCircle className="icon" />,
  },
];
