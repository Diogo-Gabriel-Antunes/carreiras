import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import React from "react";
import HeroisProvider from "./context/HeroisContext";
import AppRoutes from "./Routes";

function App() {
  return (
    <HeroisProvider>
      <ChakraProvider>
        <CSSReset />
        <AppRoutes />
      </ChakraProvider>
    </HeroisProvider>
  );
}

export default App;
