import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import NavigationScroll from "./layout/NavigationScroll";
import { Loader, Toast } from "./components/controls";
import AppRouter from "./routes";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <NavigationScroll>
          <AppRouter />
          <Toast />
          <Loader />
        </NavigationScroll>
      </QueryClientProvider>
    </StyledEngineProvider>
  );
};

export default App;
