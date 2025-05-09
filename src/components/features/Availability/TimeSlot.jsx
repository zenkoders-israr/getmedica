import { Grid, Typography, TextField, Box, IconButton } from "@mui/material";
import { Remove } from "@mui/icons-material";
import { colors } from "../../../theme/colors";
const TimeSlot = ({ slot, onTimeChange, onRemove }) => {
  return (
    <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }}>
      <Grid size={0.5}>
        <Typography color={colors.textMutedColor}>From</Typography>
      </Grid>
      <Grid size={3}>
        <TextField
          type="time"
          size="small"
          fullWidth
          value={slot.from}
          onChange={(e) => onTimeChange("from", e.target.value)}
          sx={{
            height: 51,
            mt: 1,
            "& .MuiOutlinedInput-root": {
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primaryColor,
                },
              },
            },
          }}
        />
      </Grid>
      <Grid size={0.5}>
        <Typography color={colors.textMutedColor}>to</Typography>
      </Grid>
      <Grid size={3}>
        <TextField
          type="time"
          size="small"
          fullWidth
          value={slot.to}
          onChange={(e) => onTimeChange("to", e.target.value)}
          sx={{
            height: 51,
            mt: 1,
            "& .MuiOutlinedInput-root": {
              "&:hover:not(.Mui-focused)": {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: colors.primaryColor,
                },
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={1}>
        {onRemove && (
          <Box
            sx={{
              height: 20,
              width: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid black",
              borderRadius: 1,
              ml: 2,
            }}
          >
            <IconButton onClick={onRemove} size="small">
              <Remove />
            </IconButton>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default TimeSlot
