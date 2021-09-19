export const getPositionOffsets = (position) => {
  switch (position) {
    case "center":
      return { offsetX: 0, offsetY: 0 };
    case "top-left":
      return { offsetX: -500, offsetY: -500 };
    case "top-center":
      return { offsetX: 0, offsetY: -500 };
    case "top-right":
      return { offsetX: 500, offsetY: -500 };
    case "middle-left":
      return { offsetX: -500, offsetY: 0 };
    case "middle-right":
      return { offsetX: 500, offsetY: 0 };
    case "bottom-left":
      return { offsetX: -500, offsetY: 500 };
    case "bottom-center":
      return { offsetX: 0, offsetY: 500 };
    case "bottom-right":
      return { offsetX: 500, offsetY: 500 };
    default:
      return {
        offsetX: 0,
        offsetY: 0,
      };
  }
};
