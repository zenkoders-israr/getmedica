import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { images } from "../../../assets/images";
import {
  cardContainer,
  cardHeader,
  avatar,
  nameAndSpecialization,
  specialization,
  infoRow,
  moveIconContainer,
  doctorName,
} from "./style";

function DoctorInformationCard({ data = {}, onCLick= () => {} }) {
  const {
    name = "Dr. Name",
    specialization: spec = "Specialization",
    availability = "Not specified",
    experience = "N/A",
    rating = "N/A",
    avatarInitial = "D", 
  } = data;

  return (
    <Box sx={cardContainer}>
      {/* Card Header */}
      <Box sx={cardHeader}>
        <Avatar aria-label={`${name} avatar`} sx={avatar}>
          {avatarInitial}
        </Avatar>

        <Box sx={nameAndSpecialization}>
          <Typography variant="title" sx={doctorName}>
            {name}
          </Typography>
          <Typography variant="subtitle" sx={specialization}>
            {spec}
          </Typography>
        </Box>
      </Box>

      {/* Info Rows */}
      <Box sx={{ mt: 1 }}>
        <InfoRow
          icon={images.Calendar}
          label={`Availability: ${availability}`}
        />
        <InfoRow icon={images.Teacher} label={`${experience} of Experience`} />
        <InfoRow icon={images.Star} label={`${rating} rating`} />
      </Box>

      <Box sx={moveIconContainer} onClick={onCLick}>
        <img src={images.MoveIcon} height={40} width={40} alt="Move icon" />
      </Box>
    </Box>
  );
}

const InfoRow = ({ icon, label }) => (
  <Box sx={infoRow}>
    <img src={icon} height={20} width={20} alt={`${label} icon`} />
    <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>{label}</Typography>
  </Box>
);

export default DoctorInformationCard;
