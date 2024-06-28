let sharedPayload = null;

export const setPayload = (payload) => {
  sharedPayload = payload;
};

export const getPayload = () => {
  return sharedPayload;
};
