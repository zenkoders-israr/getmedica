import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { TextField } from "../../controls";
import { images } from "../../../assets/images/index";
import { specializationOptions } from "../../../utils/constant";
import DoctorInformationCard from "./DoctorInformationCard";
import { useNavigate } from "react-router-dom";

function DoctorListening() {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  return (
    <Box
      sx={{
        mt: 5,
        ml: 2,
        mr: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 28,
          fontWeight: 500,
        }}
      >
        Doctor Listing
      </Typography>

      {/* Filtration Menu */}

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={3}>
          <Grid size={8}>
            <TextField
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={
                <img
                  src={images.Search}
                  width={40}
                  height={30}
                  alt="Search Icon"
                />
              }
              iconPosition="end"
              placeholder="Search..."
              label=""
              fullWidth
            />
          </Grid>
          <Grid size={0.5}></Grid>
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel id="specialization-label">Specialization</InputLabel>
              <Select
                labelId="specialization-label"
                value={selectedSpecialization || ""}
                label="Specialization"
                name="specialization"
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                fullWidth
              >
                {specializationOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* List Rendering */}

      <Grid container spacing={1} sx={{ mt: 5 }}>
        <Grid size={3}>
          <DoctorInformationCard
            onCLick={() => navigate("details", { state: { doc_id: 1 } })}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DoctorListening;
