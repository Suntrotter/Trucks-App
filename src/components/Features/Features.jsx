import React from 'react';
import css from '../Features/Features.module.css';
import AC from '../../assets/pictures/buttons/AC.png';
import Bathroom from '../../assets/pictures/buttons/Bathroom.png';
import Kitchen from '../../assets/pictures/buttons/Kitchen.png';
import Radio from '../../assets/pictures/buttons/Radio.png';
import Refrigerator from '../../assets/pictures/buttons/Refrigerator.png';
import Microwave from '../../assets/pictures/buttons/Microwave.png';
import Gas from '../../assets/pictures/buttons/Gas.png';
import Water from '../../assets/pictures/buttons/Water.png';
import Automatic from '../../assets/pictures/buttons/Automatic.png';
import Petrol from '../../assets/pictures/buttons/Petrol.png';

const Features = ({ camper }) => {

    const featureButtons = {
        AC: { button: AC, label: 'AC' },
        bathroom: { button: Bathroom, label: 'Bathroom' },
        kitchen: { button: Kitchen, label: 'Kitchen' },
        radio: { button: Radio, label: 'Radio' },
        refrigerator: { button: Refrigerator, label: 'Refrigerator' },
        microwave: { button: Microwave, label: 'Microwave' },
        gas: { button: Gas, label: 'Gas' },
        water: { button: Water, label: 'Water' }
    };

    if (!camper) {
        return <p>No camper data available.</p>;
    }

    const hasFeatures = Object.keys(featureButtons).some(key => camper[key] === true);
    
    if (!hasFeatures) {
        return <p>No features available for this camper.</p>;
    }

    return (
        <div>
            <hr className={css.grayLine}></hr>
        
       <div className={css.container}>
        <div className={css.features}>
            {camper.transmission === 'automatic' && (
                <div className={css.featureItem}>
                    <img src={Automatic} alt="Automatic Transmission" className={css.button} />
                </div>
            )}

            {camper.engine === 'petrol' && (
                <div className={css.featureItem}>
                    <img src={Petrol} alt="Petrol Engine" className={css.button} />
                </div>
            )}

            {Object.keys(featureButtons).map((key) => {
                if (camper[key] === true) {
                    return (
                        <div key={key} className={css.featureItem}>
                            <img src={featureButtons[key].button} alt={featureButtons[key].label} className={css.button} />
                        </div>
                    );
                }
                return null;
            })}
                </div>
                <h3>Vehicle details</h3>
            <hr></hr>
            <div className={css.detail}>
                <p>Form</p>
            <p>{camper.form}</p>
            </div>
            <div className={css.detail}>
                <p>Length</p>
            <p>{camper.length}</p>
            </div>
            <div className={css.detail}>
                <p>Width</p>
            <p>{camper.width}</p>
            </div>
            <div className={css.detail}>
                <p>Height</p>
            <p>{camper.height}</p>
            </div>
            <div className={css.detail}>
                <p>Tank</p>
            <p>{camper.tank}</p>
            </div>
            <div className={css.detail}>
                <p>Consumption</p>
            <p>{camper.consumption}</p>
            </div>
            
            </div>
            </div>
    );
};

export default Features;
