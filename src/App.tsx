import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { observer } from "mobx-react";

import { theme } from "./theme";
import { createRootStore, RootStore, RootStoreProvider } from "./store";

import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./theme/global";

const App = () => {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  useEffect(() => {
    setRootStore(createRootStore());
  }, []);

  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </RootStoreProvider>
  );
};

export default App;
