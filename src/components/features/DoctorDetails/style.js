import { colors } from "../../../theme/colors";

export const styles = {
  cardContainer: {
    mt: 4,
    maxHeight: "40vh",
    minHeight: "25vh",
    border: `1px solid ${colors.primaryBorderColor}`,
    borderRadius: "25px",
    overflow: "hidden",
  },
  headerSection: {
    p: 2,
    display: "flex",
    gap: 2,
  },
  avatar: {
    height: 57,
    width: 57,
  },
  name: {
    fontSize: 26,
    fontWeight: 500,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.primaryColor,
  },
  infoSection: {
    display: "flex",
    gap: 2,
    px: 2,
  },
  descriptionSection: {
    mt: 2,
    px: 2,
    pb: 2,
  },
  description: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.textColorGray70,
  },
};
