export const getIsLogged = state => state.auth.isLogged;
export const getUserId = state => state.auth.userId;
export const getUi = state => state.ui;

export const getLocations = state => state.locations;

export const getTravelById = id => state => {
  return state.travels.data.find(travel => travel._id === id);
};