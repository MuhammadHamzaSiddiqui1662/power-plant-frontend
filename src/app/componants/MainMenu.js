"use client";
import { Menu } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../lib/features/authSlice";

const MainMenu = ({ onClose, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <Menu
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "rightx",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            width: 180,
            maxWidth: "100%",
            borderRadius: 2,
          },
        },
      }}
      onClose={onClose}
      {...props}
    >
      <MenuList>
        <MenuItem
          onClick={() => {
            router.push("/profile");
            onClose();
          }}
        >
          {/* <ListItemIcon>
            <Box component={"img"} src={SupportIcon} />
          </ListItemIcon> */}
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={async () => {
            await dispatch(logout());
            router.push("/auth-login");
            onClose();
          }}
        >
          {/* <ListItemIcon>
            <Box component={"img"} src={LockIcon} />
          </ListItemIcon> */}
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MainMenu;
