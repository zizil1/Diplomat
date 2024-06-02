import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Polyline } from '@pbe/react-yandex-maps';
import axios from 'axios';


const Mapa = ({ startPointAddress, endPointAddress }) => {
  const geoApiKey = 'a30acdc8-67eb-463f-9a2e-7160dd2aba67'; // API ключ для геокодирования
  const routeApiKey = 'd4045940-53f3-4b12-b60d-2769f3ed6c13'; // API ключ для маршрутизации

  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);



  useEffect(() => {
 
    geocodeAddress(startPointAddress, setStartPoint, geoApiKey);
    geocodeAddress(endPointAddress, setEndPoint, geoApiKey);
  }, [startPointAddress, endPointAddress]); // Вызовется каждый раз при изменении начальной или конечной точки

  const geocodeAddress = async (address, setter, apiKey) => {
    try {
      const response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${encodeURIComponent(address)}`);
      const featureMember = response.data.response.GeoObjectCollection.featureMember;
      if (featureMember && featureMember.length > 0) {
        const coords = featureMember[0].GeoObject.Point.pos.split(' ').map(parseFloat);
        setter({ latitude: coords[1], longitude: coords[0] }); // Изменено для объекта с координатами
      } else {
        console.error('Ошибка при геокодировании адреса: Отсутствует ожидаемый объект GeoObject');
      }
    } catch (error) {
      console.error('Ошибка при геокодировании адреса:', error);
    }
};
  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute(startPoint, endPoint, routeApiKey);
    }
  }, [startPoint, endPoint]);

  const fetchRoute = async (start, end, apiKey) => {
    try {
      const response = await axios.get(`https://api.routing.yandex.net/v2/route/?apikey=${apiKey}&from=${start.longitude},${start.latitude}&to=${end.longitude},${end.latitude}&lang=ru_RU&results=1`);
      const routePoints = response.data.routes[0].geometry.coordinates;
      setRoutePoints(routePoints.map(coord => [coord[1], coord[0]]));
    } catch (error) {
      console.error('Ошибка при получении маршрута:', error);
    }
  };

  return (
    <YMaps apiKey={geoApiKey}>
      <Map
        defaultState={{ center: startPoint || [55.751574, 37.573856], zoom: 9 }}
        width={'100%'}
        height={'400px'}
      >
        {startPoint && <Placemark geometry={startPoint} />}
        {endPoint && <Placemark geometry={endPoint} />}
        {routePoints.length > 0 && (
          <Polyline
            geometry={routePoints}
            options={{
              balloonCloseButton: false,
              strokeColor: '#000',
              strokeWidth: 3,
              strokeOpacity: 0.5,
            }}
          />
        )}
      </Map>
    </YMaps>
  );
};

export default Mapa;