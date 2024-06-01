import React, { useState, useEffect } from 'react';
import { YMaps, Map, GeolocationControl, Placemark, ZoomControl, Polyline } from '@pbe/react-yandex-maps';
import axios from 'axios';

const Mapa = ({ startPoint, endPoint }) => {
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    if (startPoint && endPoint) {
      fetchRoute(endPoint);
    }
  }, [startPoint, endPoint]);

  const fetchRoute = async (endPointCoords) => {
    try {
      const response = await axios.get(`https://api.routing.yandex.net/v2/route`, {
        params: {
          apikey: 'a30acdc8-67eb-463f-9a2e-7160dd2aba67',
          from: `${startPoint[1]},${startPoint[0]}`,
          to: `${endPointCoords[1]},${endPointCoords[0]}`,
          lang: 'ru_RU',
          results: 1
        }
      });

      const routePoints = response.data.routes[0].geometry.coordinates;
      setRoutePoints(routePoints.map(coord => [coord[1], coord[0]]));
    } catch (error) {
      console.error('Ошибка при получении маршрута:', error);
    }
  };

  return (
    <YMaps>
      <div>
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 9 }}
          width={'100%'}
          height={'400px'}
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