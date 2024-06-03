import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';
import axios from 'axios';

const Mapa = ({ startPoint, endPoint }) => {
    const [startCoords, setStartCoords] = useState(null);
    const [endCoords, setEndCoords] = useState(null);
    const [routeCoords, setRouteCoords] = useState(null);

    const geoApiKey = 'a30acdc8-67eb-463f-9a2e-7160dd2aba67'; // API ключ для геокодирования

    useEffect(() => {
        const fetchCoords = async (address, setCoords) => {
            try {
                const response = await axios.get(
                    `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${geoApiKey}&geocode=${address}`
                );
                const coords = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
                setCoords([parseFloat(coords[1]), parseFloat(coords[0])]);
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            }
        };

        if (startPoint) fetchCoords(startPoint, setStartCoords);
        if (endPoint) fetchCoords(endPoint, setEndCoords);
    }, [startPoint, endPoint]);

    useEffect(() => {
        const fetchRoute = async () => {
            if (startCoords && endCoords) {
                try {
                    const response = await axios.post('http://localhost:5000/api/route', {
                        startCoords,
                        endCoords
                    });
                    const route = response.data.features[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                    setRouteCoords(route);
                } catch (error) {
                    console.error('Error fetching route:', error);
                }
            }
        };

        fetchRoute();
    }, [startCoords, endCoords]);

    const mapState = {
        center: startCoords || [55.751574, 37.573856],
        zoom: 10
    };

    return (
        <YMaps query={{ apikey: 'd4045940-53f3-4b12-b60d-2769f3ed6c13' }}>
            <Map state={mapState} width="100%" height="400px">
                {startCoords && <Placemark geometry={startCoords} properties={{ balloonContent: startPoint }} />}
                {endCoords && <Placemark geometry={endCoords} properties={{ balloonContent: endPoint }} />}
                {routeCoords && <Polyline geometry={routeCoords} options={{ strokeColor: '#0000FF', strokeWidth: 4 }} />}
            </Map>
        </YMaps>
    );
};

export default Mapa;