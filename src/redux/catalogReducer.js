const initialState = {
  campers: [],
  filteredCampers: [],
  selectedLocation: 'City',
  selectedFeatures: {
    AC: false,
    automatic: false,
    kitchen: false,
    TV: false,
    bathroom: false,
  },
  selectedVehicleType: '',
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CAMPERS':
      return { ...state, campers: action.payload };
    case 'SET_FILTERED_CAMPERS':
      return { ...state, filteredCampers: action.payload };
    case 'SET_LOCATION':
      return { ...state, selectedLocation: action.payload };
    case 'SET_FEATURES':
      return { ...state, selectedFeatures: action.payload };
    case 'SET_VEHICLE_TYPE':
      return { ...state, selectedVehicleType: action.payload };
    default:
      return state;
  }
};

export default catalogReducer;
