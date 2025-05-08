import { Suspense } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

const Loader = () => (
  <Box sx={{ position: "fixed", top: 0, left: 0, zIndex: 1301, width: "100%" }}>
    <LinearProgress color="primary" />
  </Box>
);

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
