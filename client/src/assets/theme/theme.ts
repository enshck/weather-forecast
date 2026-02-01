import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

import globalCss from "./global";

const config = defineConfig({
  globalCss,
});

export default createSystem(defaultConfig, config);
