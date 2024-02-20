import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation hook
import { useInView } from 'react-intersection-observer';
import style from './map.module.css';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import jsonfile from '../../assets/features.json';

const Map = () => {
    const [isMapVisible, setIsMapVisible] = useState(false);
    const [areMarkersVisible, setAreMarkersVisible] = useState(false); // State to track if markers are visible
    const { ref, inView } = useInView({ threshold: 0 });
    const controls = useAnimation(); // Initialize controls for animations

    useEffect(() => {
        if (inView) {
            setIsMapVisible(true);
            controls.start({ opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } }); // Start map animation
            // After the map is fully visible, set a timeout to start animating markers after a delay
            const timeout = setTimeout(() => {
                setAreMarkersVisible(true);
            }, 1000); // Adjust the delay as needed
            return () => clearTimeout(timeout); // Clean up the timeout to prevent memory leaks
        }
    }, [inView, controls]);

    const markers = [
        { markerOffset: 15, name: "Indonesia", coordinates: [113.9213, 0.7893] },
        { markerOffset: 15, name: "India", coordinates: [77.1025, 28.7041] },
        { markerOffset: 15, name: "Kenya", coordinates: [36.8219, 1.2921] },
        { markerOffset: 15, name: "Oman", coordinates: [55.9754, 21.4735] },
    ];

    return (
        <div className={style.maindiv}>
            <div className='pt-5'>
                <h1 className={style.headingfont}>Our Locations</h1>
                <p className={style.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            </div>
            <motion.div
                className={style.mapContainer}
                ref={ref}
                whileInView={{opacity:1}}
                initial={{ opacity: 0, scale: 0.01 }}
                animate={controls} // Use controls for animation
            >
                <ComposableMap className={style.map}>
                    <Geographies geography={jsonfile}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const marker = markers.find(marker => marker.name === geo.properties.name);
                                const fill = marker ? '#0A407D' : '#BCD0E6';
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={fill}
                                    />
                                );
                            })
                        }
                    </Geographies>
                    {areMarkersVisible && markers.map(({ name, coordinates, markerOffset }, index) => (
                        <Marker key={name} coordinates={coordinates}>
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
                                transition={{ duration: 1, delay: index * 0.5, ease: [0.25, 1, 0.5, 1] }}
                            >
                                <motion.path
                                    fill='#F74445'
                                    d="M14 7C14 6.08075 13.8189 5.1705 13.4672 4.32122C13.1154 3.47194 12.5998 2.70026 11.9497 2.05025C11.2997 1.40024 10.5281 0.884626 9.67878 0.532843C8.8295 0.18106 7.91925 0 7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C1.40024 2.70026 0.884626 3.47194 0.532843 4.32122C0.18106 5.1705 -1.36979e-08 6.08075 0 7C0 8.387 0.409 9.677 1.105 10.765H1.097L7 20L12.903 10.765H12.896C13.6169 9.64158 14.0001 8.33481 14 7ZM7 10C6.20435 10 5.44129 9.68393 4.87868 9.12132C4.31607 8.55871 4 7.79565 4 7C4 6.20435 4.31607 5.44129 4.87868 4.87868C5.44129 4.31607 6.20435 4 7 4C7.79565 4 8.55871 4.31607 9.12132 4.87868C9.68393 5.44129 10 6.20435 10 7C10 7.79565 9.68393 8.55871 9.12132 9.12132C8.55871 9.68393 7.79565 10 7 10Z"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }} // Change color with opacity animation and custom easing
                                    transition={{ duration: 1, delay: index * 0.5, ease: [0.25, 1, 0.5, 1] }} // Delay each marker animation with easing
                                    whileInView={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
                                />
                            </motion.g>
                        </Marker>
                    ))}
                </ComposableMap>
            </motion.div>
        </div>
    );
}

export default Map;
