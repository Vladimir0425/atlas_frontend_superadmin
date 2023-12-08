import MuiBox from "@mui/material/Box";

import { styled } from "@mui/material/styles";

import styles from "./style";

const Box = styled(MuiBox)(styles.root);

export function Footer() {
  return <Box>@Copyright 2023</Box>;
}
