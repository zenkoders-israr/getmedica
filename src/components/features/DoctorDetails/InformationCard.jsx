import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { colors } from "../../../theme/colors";
import { images } from "../../../assets/images";
import { infoRow } from "../DoctorListening/style";
import { SPECIALIZATION_MAPPER } from "../../../utils/constant";

function InformationCard({ data = {} }) {
  const {
    image = "I",
    name = "Israr Ansari",
    specialty = "SSS",
    description = `   Dr. Patel has dedicated over 8 years to orthopedic care, focusing on
          treating musculoskeletal injuries, joint disorders, and sports
          injuries. Known for his patient-centered approach, he tailors
          treatment plans to fit individual needs, from preventative care to
          surgical solutions.`,
    availability = "N/A",
  } = data || {};
  return (
    <Box
      sx={{
        mt: 4,
        maxHeight: "40vh",
        minHeight: "25vh",
        border: `1px solid ${colors.primaryBorderColor}`,
        borderRadius: "25px",
      }}
    >
      {/* Name Section */}

      <Box
        sx={{
          p: 2,
          display: "flex",
          gap: "20px",
        }}
      >
        <Avatar
          aria-label={` avatar`}
          sx={{
            height: 57,
            width: 57,
          }}
        >
          {image}
        </Avatar>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="title" sx={{ fontSize: 24, fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography
            variant="subtitle"
            sx={{ fontSize: 14, fontWeight: 500, color: colors.primaryColor }}
          >
            {SPECIALIZATION_MAPPER[specialty]}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", gap: "20px", px: 2 }}>
        <InfoRow icon={images.Calendar} label={`Availability: ${availability}`} />
        <InfoRow icon={images.Teacher} label={`N/A of Experience`} />
        <InfoRow icon={images.Star} label={`N/A rating`} />
      </Box>

      <Box sx={{ mt: 2, px: 2 }}>
        <Typography
          sx={{ fontSize: 18, fontWeight: 400, color: colors.textColorGray70 }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
}

const InfoRow = ({ icon, label }) => (
  <Box sx={infoRow}>
    <img src={icon} height={23} width={23} alt={`${label} icon`} />
    <Typography sx={{ fontSize: "20px", fontWeight: 500 }}>{label}</Typography>
  </Box>
);

export default InformationCard;
