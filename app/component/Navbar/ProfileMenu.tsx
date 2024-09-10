// import React, { useState } from 'react';
// import Link from 'next/link';
// import { UserCircleIcon } from "@heroicons/react/24/solid";
// import { MdOutlineDelete } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   signOutUserStart,
//   deleteUserFailure,
//   deleteUserSuccess
// } from '../redux/user/userSlice';
// import { Menu, MenuHandler, MenuList, MenuItem, Button, Typography, Avatar } from '@material-tailwind/react'; 
// import { FaHome } from "react-icons/fa";

// const profileMenuItems = [
//   {
//     label: "My Profile",
//     icon: UserCircleIcon,
//     link: "/dashboard/profile"
//   },
//   {
//     label: "Properties",
//     icon: FaHome,
//     link: "dashboard/home"
//   },
//   {
//     label: "Delete Account",
//     icon: MdOutlineDelete,
//     link: "/dashboard/delete"
//   },
// ];

// const ProfileMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();

//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart());
//       const res = await fetch(`http://localhost:7000/api/v1/signout`);
//       const data = await res.json();
//       if (!data.success) {
//         dispatch(deleteUserFailure(data.message));
//         return;
//       }
//       dispatch(deleteUserSuccess(data));
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   };

//   return (
//     <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
//       <MenuHandler>
//         <Button
//           variant="text"
//           color="blue-gray"
//           className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
//         >
//           <Avatar
//             variant="circular"
//             size="sm"
//             alt="User Avatar"
//             className="border border-gray-900 p-0.5"
//             src={currentUser.avatar} />
//           <ChevronDownIcon
//             strokeWidth={2.5}
//             className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
//               }`}
//           />
//         </Button>
//       </MenuHandler>
//       <MenuList className="p-1">
//         {profileMenuItems.map(({ label, icon, link }, key) => {
//           const isLastItem = key === profileMenuItems.length - 1;
//           return (
//             <MenuItem
//               key={label}
//               onClick={() => setIsMenuOpen(false)}
//               className={`flex items-center gap-2 rounded ${isLastItem
//                 ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
//                 : ""
//                 }`}
//             >
//               {React.createElement(icon, {
//                 className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
//                 strokeWidth: 2,
//               })}
//               <Link href={link}>
//                 <Typography
//                   as="span"
//                   variant="small"
//                   className="font-normal"
//                   color="inherit"
//                 >
//                   {label}
//                 </Typography>
//               </Link>
//             </MenuItem>
//           );
//         })}
//         <button className="w-full text-start pl-4 p-2 hover:bg-red-100 hover:border-dashed">
//           <Typography
//             as="span"
//             variant="small"
//             className="font-normal text-red-500"
//             onClick={handleSignOut}
//           >
//             Sign Out
//           </Typography>
//         </button>
//       </MenuList>
//     </Menu>
//   );
// };

// export default ProfileMenu;
