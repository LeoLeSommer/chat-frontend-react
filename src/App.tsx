import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Root from "./Root";
import { store } from "./store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Root />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
