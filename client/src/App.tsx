import { ChakraProvider } from "@chakra-ui/react";

import theme from "@/assets/theme/theme";
import Sidebar from "@/shared/components/Sidebar";

const App = () => {
  return (
    <ChakraProvider value={theme}>
      <Sidebar />
    </ChakraProvider>
  );
};

export default App;
