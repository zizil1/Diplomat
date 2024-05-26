import React from 'react';
import styles from './DriverDetails.module.css';

const DriverDetails = ({ driverId, routes }) => {
    return (
        <div className={styles.detailsContainer}>
            <h2>Маршруты водителя №{driverId}</h2>
            <div className={styles.routesGrid}>
                {routes.map(route => (
                    <div key={route.id} className={styles.routeCard}>
                        <div className={styles.routeInfo}>
                            <div><strong>Маршрут:</strong> {route.route}</div>
                            <div><strong>Длительность:</strong> {route.duration}</div>
                            <div><strong>Время прибытия:</strong> {route.arrivalTime}</div>
                            <div><strong>Дни доставки:</strong> {route.days}</div>
                        </div>
                        <button className={styles.deleteButton}>Удалить маршрут</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DriverDetails;