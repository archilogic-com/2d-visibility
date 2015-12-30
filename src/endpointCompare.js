export const endpointCompare = (a, b) => {
  if (a.angle > b.angle) return 1;
  if (a.angle < b.angle) return -1;
  if (!a.begin && b.begin) return 1;
  if (a.begin && !b.begin) return -1;
  return 0;
};
