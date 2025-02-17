"use client";
import { Menu } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserType } from "../../lib/features/authSlice";
import { UserStatus, UserType } from "../../types/user";
import ToastMessage from "./Toast";

const MainMenu = ({ onClose, ...props }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, userType } = useSelector((state) => state.auth);
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
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        {userType !== UserType.Innvestor && (
          <MenuItem
            onClick={async () => {
              await dispatch(setUserType(UserType.Innvestor));
              onClose();
            }}
          >
            <ListItemText>Switch To Innvestor</ListItemText>
          </MenuItem>
        )}
        {userType !== UserType.Broker && (
          <MenuItem
            onClick={async () => {
              if (user?.brokerStatus === UserStatus.Active) {
                await dispatch(setUserType(UserType.Broker));
                router.push("/investors");
              } else {
                ToastMessage({
                  message: "Your broker account is not active",
                  type: "error",
                });
              }
              onClose();
            }}
          >
            <ListItemText>Switch To Broker</ListItemText>
          </MenuItem>
        )}
        {userType !== UserType.Innovator && (
          <MenuItem
            onClick={async () => {
              await dispatch(setUserType(UserType.Innovator));
              onClose();
            }}
          >
            <ListItemText>Switch To Innovator</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={async () => {
            await dispatch(logout());
            router.push("/auth-login");
            onClose();
          }}
        >
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MainMenu;
