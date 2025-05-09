import PropTypes from "prop-types";
import { memo } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

function LinearProgressWithLabel({ value, ...others }) {
  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: "primary.800" }}>
              Progress
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(
              value
            )}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <LinearProgress
          aria-label="progress of theme"
          variant="determinate"
          value={value}
          {...others}
          sx={{
            height: 10,
            borderRadius: 30,
            [`&.${linearProgressClasses.colorPrimary}`]: {
              bgcolor: "background.paper",
            },
            [`& .${linearProgressClasses.bar}`]: {
              borderRadius: 5,
              bgcolor: "primary.dark",
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
};

const MenuCard = () => {
  return (
    <Card
      sx={{
        bgcolor: "#545f92",
        mb: 2.75,
        overflow: "hidden",
        position: "relative",
        borderRadius: "15px",
        "&:after": {
          content: '""',
          position: "absolute",
          width: 280,
          height: 255,
          border: "1px solid",
          borderColor: "#7d88b5",
          borderRadius: "50%",
          bottom: -150,
          right: -170,
        },
      }}
    >
      <Box
        sx={{
          content: '""',
          position: "absolute",
          width: 235,
          height: 255,
          border: "1px solid",
          borderColor: "#7d88b5",
          borderRadius: "50%",
          bottom: -200,
          right: -165,
        }}
      />
      <Box
        sx={{
          content: '""',
          position: "absolute",
          width: 285,
          height: 255,
          border: "1px solid",
          borderColor: "#7d88b5",
          borderRadius: "50%",
          bottom: -170,
          right: -195,
        }}
      />
      <Box
        sx={{
          content: '""',
          position: "absolute",
          width: 285,
          height: 265,
          border: "1px solid",
          borderColor: "#7d88b5",
          borderRadius: "50%",
          bottom: -143,
          right: -150,
        }}
      />
      <Box
        sx={{
          content: '""',
          position: "absolute",
          width: 285,
          height: 260,
          border: "1px solid",
          borderColor: "#7d88b5",
          borderRadius: "50%",
          bottom: -120,
          right: -130,
        }}
      />
    </Card>
  );
};

export default memo(MenuCard);
