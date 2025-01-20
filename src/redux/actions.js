export const setCampers = (campers) => ({
  type: 'SET_CAMPERS',
  payload: campers,
});

export const setFilteredCampers = (filteredCampers) => ({
  type: 'SET_FILTERED_CAMPERS',
  payload: filteredCampers,
});

export const setLocation = (location) => ({
  type: 'SET_LOCATION',
  payload: location,
});

export const setFeatures = (features) => ({
  type: 'SET_FEATURES',
  payload: features,
});

export const setVehicleType = (vehicleType) => ({
  type: 'SET_VEHICLE_TYPE',
  payload: vehicleType,
});
