import React from 'react';
import styles from './Archive.module.css';

const Archive = (driver, routes) => {
    // Пример данных для архива
   

    return (
        <div className={styles.archiveContainer}>
            <h1>Архив маршрутов</h1>
            <div className={styles.archiveList}>
               
                    <div key={routes.id} className={styles.routeItem}>
                        <div>
                            <div> <strong>Откуда:</strong> {routes.route}</div>
                            <div>Расстояние: {routes.distance}</div>
                            <div>Время в пути: {routes.estimatedTime}</div>
                            <div>Назначенный водитель: {routes.driver}</div>
                            <div>Дни доставки: {routes.deliveryDays}</div>
                            <div>Время доставки: {routes.deliveryTime}</div>
                        </div>
                        <div className={styles.status}>
                            {/* Иконка для активности маршрута */}
                            {/* Подумайте о том, как лучше реализовать логику для определения активности маршрута */}
                        </div>
                    </div>
             
            </div>
        </div>
    );
};

export default Archive;