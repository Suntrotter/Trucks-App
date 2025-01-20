
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import CamperCard from '../../CamperCard/CamperCard';
import css from './/CatalogPage.module.css';
import wind from '../../../assets/pictures/icons/wind.png';
import diagram from '../../../assets/pictures/icons/diagram.png';
import cupHot from '../../../assets/pictures/icons/cup-hot.png';
import tv from '../../../assets/pictures/icons/tv.png';
import shower from '../../../assets/pictures/icons/shower.png';
import oneTwoGrid from '../../../assets/pictures/icons/oneTwoGrid.png';
import twoTwoGrid from '../../../assets/pictures/icons/twoTwoGrid.png';
import threeThreeGrid from '../../../assets/pictures/icons/threeThreeGrid.png';
import map from '../../../assets/pictures/icons/map.png';
import Header from '../../Header/Header';
import { setCampers, setFilteredCampers, setLocation, setFeatures, setVehicleType } from '../../../redux/actions';

const Catalog = () => {
  const dispatch = useDispatch();
  const {
    campers,
    filteredCampers,
    selectedLocation,
    selectedFeatures,
    selectedVehicleType,
  } = useSelector((state) => state.catalog);

  const [visibleCampers, setVisibleCampers] = useState(4);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const locations = [
    'Ukraine, Kyiv', 'Ukraine, Poltava', 'Ukraine, Lviv', 'Ukraine, Odesa',
    'Ukraine, Kharkiv', 'Ukraine, Sumy', 'Ukraine, Dnipro'
  ];

  useEffect(() => {
    axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers')
      .then(response => {
        if (Array.isArray(response.data.items)) {
          dispatch(setCampers(response.data.items));
          dispatch(setFilteredCampers(response.data.items));
        } else {
          console.error('Expected an array but got:', response.data);
        }
      })
      .catch(error => console.error('Error fetching campers:', error));
  }, [dispatch]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleLocationChange = (location) => {
    dispatch(setLocation(location));
    setIsDropdownOpen(false);
  };

  const handleFeatureToggle = (feature) => {
    const updatedFeatures = { ...selectedFeatures, [feature]: !selectedFeatures[feature] };
    dispatch(setFeatures(updatedFeatures));
  };

  const handleVehicleTypeChange = (vehicleType) => {
    dispatch(setVehicleType(vehicleType));
  };

  const mapVehicleTypeToAPI = (vehicleType) => {
    switch (vehicleType) {
      case 'Van':
        return 'panelTruck';
      case 'Fully integrated':
        return 'fullyIntegrated';
      case 'Alcove':
        return 'alcove';
      default:
        return '';
    }
  };

  const handleSearch = () => {
    if (!selectedLocation || selectedLocation === 'City') {
      alert('Please select the location!');
      return;
    }

    const vehicleTypeAPI = mapVehicleTypeToAPI(selectedVehicleType);

    const filtered = campers.filter(camper => {
      const matchesLocation = camper.location === selectedLocation;
      const matchesVehicleType = !vehicleTypeAPI || camper.form === vehicleTypeAPI;

      const matchesFeatures = Object.entries(selectedFeatures).every(([feature, selected]) => {
        if (!selected) return true;
        if (feature === 'automatic') {
          return camper.transmission === 'automatic';
        }
        return camper[feature];
      });

      return matchesLocation && matchesVehicleType && matchesFeatures;
    });

    dispatch(setFilteredCampers(filtered));
    setVisibleCampers(4);
  };

  const handleLoadMore = () => {
    setVisibleCampers(prevVisibleCampers => prevVisibleCampers + 4);
  };

  return (
    <div>
      <Header />
      <div className={css.catalog}>
        <div className={css.sidebar}>
          <p className={css.locationTitle}>Location</p>
          <ul className={css.location}>
            <li><img src={map} alt="map" className={css.map} /></li>
            <li className={css.dropdown}>
              <button className={css.dropdownButton} onClick={handleDropdownToggle}>
                {selectedLocation}
              </button>
              {isDropdownOpen && (
                <ul className={css.dropdownContent} ref={dropdownRef}>
                  {locations.map((location) => (
                    <li key={location} onClick={() => handleLocationChange(location)}>
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          <p className={css.filterTitle}>Filters</p>
          <h3>Vehicle equipment</h3>
          <hr className={css.catalogHr} />
          <div className={css.containers}>
            <div
              className={`${css.filterItem} ${selectedFeatures.AC ? css.selected : ''}`}
              onClick={() => handleFeatureToggle('AC')}
            >
              <img src={wind} alt="wind" className={css.icon} />
              <p className={css.text}>AC</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedFeatures.automatic ? css.selected : ''}`}
              onClick={() => handleFeatureToggle('automatic')}
            >
              <img src={diagram} alt="diagram" className={css.icon} />
              <p className={css.text}>Automatic</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedFeatures.kitchen ? css.selected : ''}`}
              onClick={() => handleFeatureToggle('kitchen')}
            >
              <img src={cupHot} alt="hot cup" className={css.icon} />
              <p className={css.text}>Kitchen</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedFeatures.TV ? css.selected : ''}`}
              onClick={() => handleFeatureToggle('TV')}
            >
              <img src={tv} alt="TV" className={css.icon} />
              <p className={css.text}>TV</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedFeatures.bathroom ? css.selected : ''}`}
              onClick={() => handleFeatureToggle('bathroom')}
            >
              <img src={shower} alt="shower" className={css.icon} />
              <p className={css.text}>Bathroom</p>
            </div>
          </div>

          <h3>Vehicle type</h3>
          <hr className={css.catalogHr}></hr>
          <div className={css.containers}>
            <div
              className={`${css.filterItem} ${selectedVehicleType === 'Van' ? css.selected : ''}`}
              onClick={() => handleVehicleTypeChange('Van')}
            >
              <img src={oneTwoGrid} alt="grid one by two" className={css.icon} />
              <p className={css.text}>Van</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedVehicleType === 'Fully integrated' ? css.selected : ''}`}
              onClick={() => handleVehicleTypeChange('Fully integrated')}
            >
              <img src={twoTwoGrid} alt="grid two by two" className={css.icon} />
              <p className={css.text}>Fully integrated</p>
            </div>
            <div
              className={`${css.filterItem} ${selectedVehicleType === 'Alcove' ? css.selected : ''}`}
              onClick={() => handleVehicleTypeChange('Alcove')}
            >
              <img src={threeThreeGrid} alt="grid three by three" className={css.icon} />
              <p className={css.text}>Alcove</p>
            </div>
          </div>
          <button className={css.sidebarBtn} onClick={handleSearch}>Search</button>
        </div>

        <div className={css.campersList}>
          {Array.isArray(filteredCampers) && filteredCampers.length > 0 ? (
            filteredCampers.slice(0, visibleCampers).map(camper => (
              <CamperCard key={camper.id} camper={camper} />
            ))
          ) : (
            <p>No campers available.</p>
          )}

          {visibleCampers < filteredCampers.length && (
            <button className={css.loadMoreBtn} onClick={handleLoadMore}>Load more</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
