import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { ListSubheader } from "@mui/material";
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

export default function MultipleSelectChip({
  categories,
  onChange,
  fullWidth = undefined,
}) {
  const theme = useTheme();

  return (
    <FormControl fullWidth={fullWidth}>
      <Select
        multiple
        value={categories}
        onChange={onChange}
        placeholder="Select Categories"
        input={<OutlinedInput placeholder="Select Categories" />}
        renderValue={(selected) =>
          selected.length === 0 ? (
            <em>Placeholder</em>
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
              onClick={(e) => console.log(e)}
            >
              {name}
            </MenuItem>
          )),
        ])}
      </Select>
    </FormControl>
  );
}
