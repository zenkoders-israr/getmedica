import {
  Typography,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";
import { TextField } from "../../controls";
import { images } from "../../../assets/images/index";
import { specializationOptions } from "../../../utils/constant";
import DoctorInformationCard from "./DoctorInformationCard";
import { useNavigate } from "react-router-dom";
import { useGetDoctors } from "../../../api/user/useUserQuery";
import debounce from "lodash.debounce";

function DoctorListening() {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    name: "",
    specialty: "",
  });
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const { data } = useGetDoctors(params);

  const debouncedSearch = useCallback(
    debounce((keyword) => {
      setParams((prev) => ({ ...prev, name: keyword }));
    }, 500),
    []
  );

  useEffect(() => {
    setDoctors(data ?? []);
  }, [data]);


  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);



  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleSpecializationChange = (e) => {
    setParams({ ...params, specialty: e.target.value });
  };

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
              onChange={handleSearch}
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
                value={params.specialty || ""}
                label="Specialization"
                name="specialty"
                onChange={handleSpecializationChange}
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
        {doctors.length ? (
          doctors.map((doctor) => (
            <Grid size={3} key={doctor.id}>
              <DoctorInformationCard
                data={doctor}
                onCLick={() =>
                  navigate("details", { state: { doc_id: doctor.id } })
                }
              />
            </Grid>
          ))
        ) : (
          <Grid size={12}>
            <Typography>No doctors found</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default DoctorListening;
