import { Box, List, ListItem, Rating, Stack, Typography } from "@mui/material";
import { useGetUserQuery } from "../../../services/user/user";

const ReviewCard = ({ review }) => {
  const { data: reviewer } = useGetUserQuery(review.userId);
  const ratings =
    (review.behaviour +
      review.communication +
      review.priceNegotiation +
      review.responsiveness +
      review.technicalSkills) /
    5;

  return (
    <Box
      sx={{
        width: 300,
        minWidth: 300,
        height: "fit-content",
        borderRadius: "16px",
        backgroundColor: "#fff",
        border: "1px solid #8F98A5",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
        }}
      >
        <List
          sx={{
            listStyle: "none",
            padding: 0,
          }}
        >
          <ListItem
            sx={{
              padding: 0,
              marginBottom: "12px",
              ":last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            <Stack direction={"row"} gap={2}>
              <Box
                component={"img"}
                src="https://fastly.picsum.photos/id/413/200/200.jpg?hmac=e6w034LWyRaayerJY_efJywx28FwPjv-EC8F10jVtMQ"
                alt="Profile"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              ></Box>
              <Stack>
                <Typography
                  sx={{
                    color: "#161c2d",
                    fontSize: "1rem",
                    fontWeight: "600",
                    display: "block",
                  }}
                >
                  {reviewer?.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#64748B",
                    display: "block",
                    marginBottom: "8px",
                  }}
                >
                  {reviewer?.email}
                </Typography>
                <Rating
                  name="ratings"
                  precision={0.1}
                  value={ratings}
                  size="small"
                  readOnly
                />
              </Stack>
            </Stack>
          </ListItem>
          <ListItem
            sx={{
              padding: 0,
              marginBottom: "12px",
              ":last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            <Typography
              sx={{
                color: "#161c2d",
                marginTop: "8px",
                marginBottom: "8px",
                fontWeight: 400,
                lineHeight: 1.2,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 5,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {review.comments}
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              padding: 0,
              marginBottom: "12px",
              ":last-of-type": {
                marginBottom: 0,
              },
            }}
          >
            <Typography
              sx={{
                color: "#161c2d",
                fontSize: 12,
                fontWeight: 400,
                color: "#64748B",
                display: "block",
              }}
            >
              {new Date(review.createdAt).toDateString()}
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default ReviewCard;
