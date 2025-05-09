import { colors } from "../../../theme/colors";

export const cardContainer = {
  height: "20vh",
  width: "100%",
  border: `1px solid ${colors.primaryBorderColor}`,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  position: "relative",
  p: 2,
};

export const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

export const avatar = {
  height: 50,
  width: 50,
};

export const nameAndSpecialization = {
  display: "flex",
  flexDirection: "column",
};

export const doctorName = {
  fontSize: 16,
  fontWeight: 600,
};

export const specialization = {
    fontSize: 12,
    color: colors.primaryColor,
  }

export const infoRow = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  mt: 1,
};

export const infoText = {
  fontSize: "14px",
  fontWeight: 500,
};

export const moveIconContainer = {
  position: "absolute",
  bottom: 8,
  right: 10,
  cursor: "pointer"
};
