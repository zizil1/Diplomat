import React, { useState } from 'react';
import { YMaps, Map, RoutePanel, GeolocationControl, Placemark } from '@pbe/react-yandex-maps';
import {ZoomControl, Polyline} from '@pbe/react-yandex-maps';
import axios from 'axios';

const Mapa = () => {
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  const fetchRoute = async (endPointCoords) => {
    try {
      console.log('Start point:', startPoint);
      console.log('End point:', endPointCoords);
      const response = await axios.get(`https://api.routing.yandex.net/v2/route/?apikey=a30acdc8-67eb-463f-9a2e-7160dd2aba67&from=${startPoint[1]},${startPoint[0]}&to=${endPointCoords[1]},${endPointCoords[0]}&lang=ru_RU&results=1`);
      console.log('Response:', response.data);
      const routePoints = response.data.routes[0].geometry.coordinates;
      console.log('Route points:', routePoints);
      setRoutePoints(routePoints.map(coord => [coord[1], coord[0]]));
    } catch (error) {
      console.error('Ошибка при получении маршрута:', error);
    }
  };

  const handleMapClick = (event) => {
    const coords = event.get('coords');
    if (!startPoint) {
      setStartPoint(coords);
    } else if (!endPoint) {
      setEndPoint(coords);
      fetchRoute(coords);
    } else {
      setRoutePoints([...routePoints, coords]);
    }
  };

  // const fetchRoute = async (endPointCoords) => {
  //   try {
  //     const response = await axios.get(`https://api.routing.yandex.net/v2/route/?apikey=fa30acdc8-67eb-463f-9a2e-7160dd2aba67&from=${startPoint[1]},${startPoint[0]}&to=${endPointCoords[1]},${endPointCoords[0]}&lang=ru_RU&results=1`);
  //     const routePoints = response.data.routes[0].geometry.coordinates;
  //     setRoutePoints(routePoints.map(coord => [coord[1], coord[0]]));
  //   } catch (error) {
  //     console.error('Ошибка при получении маршрута:', error);
  //   }
  // };

  return (
    <YMaps apiKey="a30acdc8-67eb-463f-9a2e-7160dd2aba67">
      <div>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
          width={'100%'}
          height={'400px'}
          onClick={handleMapClick}
        >
          <GeolocationControl options={{ float: 'right' }} />
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
          <ZoomControl options={{ float: 'left' }} />
        </Map>
      </div>
    </YMaps>
  );
};
export default Mapa;