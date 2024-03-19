import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import style from './map.module.css';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import jsonfile from '../../assets/features.json';
import axios from 'axios';

const Map = ({ setTooltipContent }) => {
    const [areMarkersVisible, setAreMarkersVisible] = useState(false);
    const { ref, inView } = useInView({ threshold: 0 });
    const controls = useAnimation();
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [locationMain, setLocationMain] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/location`);
                setIsDataFetched(true);
                const formattedData = response?.data?.data?.map((item) => ({
                    locationname: item?.locationname,
                    coordinates: [item?.coordinates?.lat, item?.coordinates?.long] // Assuming your API response contains latitude and longitude fields
                }));

                setMarkers(formattedData);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };
        const fetchDataLocationMain = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/locationmain`);
                setLocationMain(response?.data?.data)
                setIsDataFetched(true);
            } catch (error) {
                console.error('Error fetching map data:', error);
            }
        };
        if (!isDataFetched) {
            fetchData();
            fetchDataLocationMain()
        }
    }, [isDataFetched]);

    useEffect(() => {
        if (inView) {
            controls.start({ opacity: 1, scale: 1, transition: { duration: 1, ease: [0.25, 1, 0.5, 1] } });
            const timeout = setTimeout(() => {
                setAreMarkersVisible(true);
            }, 1000);
            return () => clearTimeout(timeout);
        } else {
            setAreMarkersVisible(false);
            controls.start({ opacity: 0, scale: 0.01 });
        }
    }, [inView, controls]);

    return (
        <div className={style.maindiv}>
            <div className={style.ourlocation}>
                <h1 className={style.headingfont}>{locationMain?.locationTitle}</h1>
                <p className={style.content}>{locationMain?.locationDescription}</p>
            </div>
            <div className={style.map}>
                <motion.div
                    className={style.mapContainer}
                    ref={ref}
                    data-tip=""
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0, scale: 0.01 }}
                    animate={controls}
                >
                    <ComposableMap
                        height={700}
                        width={1000}
                        projection="geoMercator"
                        projectionConfig={{
                            rotate: [-10, 0, 0],
                            center: [0, 30]
                        }}

                        className='h-100'
                    >
                        <Geographies geography={jsonfile}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const marker = markers.find(marker => marker?.locationname === geo.properties?.name);
                                    const fill = marker ? '#0A407D' : '#BCD0E6';
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill={fill}
                                            data-tooltip-id={marker ? "my-tooltip" : ""}
                                            onMouseEnter={(event) => {
                                                setTooltipContent(geo.properties.name, event);
                                            }}
                                            onMouseLeave={() => {
                                                setTooltipContent("");
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                        {areMarkersVisible && markers.map(({ locationname, coordinates }, index) => (
                            <Marker
                                key={locationname}
                                coordinates={coordinates}>
                                <motion.g
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
                                    transition={{ duration: 1, delay: index * 0.5, ease: [0.25, 1, 0.5, 1] }}
                                >
                                    <motion.path
                                        d="M14 7C14 6.08075 13.8189 5.1705 13.4672 4.32122C13.1154 3.47194 12.5998 2.70026 11.9497 2.05025C11.2997 1.40024 10.5281 0.884626 9.67878 0.532843C8.8295 0.18106 7.91925 0 7 0C6.08075 0 5.17049 0.18106 4.32122 0.532843C3.47194 0.884626 2.70026 1.40024 2.05025 2.05025C1.40024 2.70026 0.884626 3.47194 0.532843 4.32122C0.18106 5.1705 -1.36979e-08 6.08075 0 7C0 8.387 0.409 9.677 1.105 10.765H1.097L7 20L12.903 10.765H12.896C13.6169 9.64158 14.0001 8.33481 14 7ZM7 10C6.20435 10 5.44129 9.68393 4.87868 9.12132C4.31607 8.55871 4 7.79565 4 7C4 6.20435 4.31607 5.44129 4.87868 4.87868C5.44129 4.31607 6.20435 4 7 4C7.79565 4 8.55871 4.31607 9.12132 4.87868C9.68393 5.44129 10 6.20435 10 7C10 7.79565 9.68393 8.55871 9.12132 9.12132C8.55871 9.68393 7.79565 10 7 10Z"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }} 
                                        transition={{ duration: 1, delay: index * 0.5, ease: [0.25, 1, 0.5, 1] }}
                                        whileInView={{ opacity: 1, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }}
                                    />
                                </motion.g>
                            </Marker>
                        ))}
                    </ComposableMap>
                </motion.div>
            </div>
        </div>
    );
}

export default Map;