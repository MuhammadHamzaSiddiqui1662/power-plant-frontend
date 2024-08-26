import { useEffect } from "react";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import Image from "next/image";
import { useGetAllNotificationsQuery } from "../../../services/notification/notification";
export default function NotificationMenu({ open, setOpen }) {
  const { data: notifications, refetch } = useGetAllNotificationsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // 1 minutes in milliseconds

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <Paper
      sx={{
        width: 430,
        position: "absolute",
        borderRadius: 5,
        maxHeight: 460,
        overflowY: "auto",
        scrollbarWidth: "none",
        display: `${open ? "block" : "none"}`,
      }}
    >
      <p className="px-8 pt-5 pb-4 font-medium text-2xl">Notifications</p>
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => (
          <Grid
            container
            key={notification._id}
            sx={{
              padding: 2,
              borderBottom: "1px solid #8F98A5",
              cursor: "pointer",
            }}
          >
            <Grid xs={2}>
              <div className="">
                <Image
                  src="/images/property/3.jpg"
                  className="h-16 rounded-md shadow dark:shadow-gray-800"
                  alt=""
                  width={200}
                  height={200}
                />
              </div>
            </Grid>
            <Grid xs={10}>
              <div className="ps-4">
                <p className="font-medium">{notification.message}</p>
                <p className="text-customGrayColor">
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            </Grid>
          </Grid>
        ))}
    </Paper>
  );
}
