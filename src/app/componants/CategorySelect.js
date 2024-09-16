import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ListSubheader, Typography } from "@mui/material";
import { CATEGORIES } from "../../config/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 250,
      width: "auto",
    },
  },
};

function getStyles(name, categories, theme) {
  return {
    fontWeight:
      categories.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function CategorySelect({
  categories,
  onChange,
  fullWidth = undefined,
  placeholder = "Select",
}) {
  const theme = useTheme();

  return (
    <FormControl fullWidth={fullWidth}>
      <Select
        multiple
        displayEmpty
        value={categories}
        onChange={onChange}
        input={<OutlinedInput />}
        renderValue={(selected) =>
          selected.length === 0 ? (
            <Typography>{placeholder}</Typography>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }
        MenuProps={MenuProps}
      >
        {Object.keys(CATEGORIES).map((category) => [
          <ListSubheader>{category}</ListSubheader>,
          ...CATEGORIES[category].map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, categories, theme)}
            >
              {name}
            </MenuItem>
          )),
        ])}
      </Select>
      <Typography fontSize={12} fontStyle={"italic"}>
        Add or remove options by toggling the selection from the dropdown menu.
      </Typography>
    </FormControl>
  );
}
