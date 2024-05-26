import React, { useState } from 'react';
import styles from './DriverProfile.module.css';

const DriverProfile = ({ driver, routes }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);



    const messengers = {
        Viber: driver.phone,
        Telegram: driver.phone,
        WhatsApp: driver.phone,
    };

    const deleteDriver = async (driverId) => {
        try {
            // Здесь должна быть логика удаления водителя из базы данных
            // Например, отправка запроса на сервер с указанием id водителя для удаления
            const response = await fetch(`/api/drivers/${driverId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            // Проверяем успешность выполнения запроса
            if (!response.ok) {
                throw new Error('Ошибка удаления водителя');
            }
            // Если запрос выполнен успешно, возвращаем данные ответа (обычно не требуется)
            return response.json();
        } catch (error) {
            // Если произошла ошибка, выбрасываем исключение, чтобы обработать ее в вызывающем коде
            throw new Error('Ошибка при удалении водителя');
        }
    };

    const handleDeleteDriver = () => {
        // Предположим, у вас есть функция deleteDriver, которая принимает id водителя и удаляет его из базы данных
        deleteDriver(driver.id)
            .then(() => {
                console.log(`Водитель ${driver.name} успешно удален`);
                // Закрываем модальное окно после успешного удаления
                setShowDeleteModal(false);
                // Можно также выполнить другие действия после удаления, например, обновить список водителей
            })
            .catch((error) => {
                console.error(`Ошибка при удалении водителя ${driver.name}:`, error);
                // Здесь можно обработать ошибку удаления, например, отобразить сообщение об ошибке пользователю
            });
    };

    return (
        <div className={styles.profileContainer}>
            <h2>Профиль водителя</h2>
            <div className={styles.profileContent}>
                <img src={driver.avatar} alt={driver.name} className={styles.avatar} />
                <div className={styles.info}>
                    <div className={styles.infoItem}><strong>Имя:</strong> {driver.name}</div>
                    <div className={styles.infoItem}><strong>Город:</strong> Минск</div> {/* This could be dynamic based on actual data */}
                    <div className={styles.infoItem}><strong>Телефон:</strong> {driver.phone}</div>
                    <div className={styles.infoItem}><strong>Мессенджеры:</strong>
                        <ul className={styles.messengers}>
                            {Object.entries(messengers).map(([messenger, number]) => (
                                <li key={messenger}>{messenger}: {number}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles.infoItem}><strong>Количество маршрутов:</strong> {routes.length}</div>
                    <div className={styles.infoItem}><strong>Дата рождения:</strong> 01.01.1980</div> {/* Example additional data */}
                    <div className={styles.infoItem}><strong>Стаж работы:</strong> 5 лет</div> {/* Example additional data */}
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button className={styles.editButton}>Редактировать профиль</button>
                <div className={styles.burgerButton}>
                    <button className={styles.deleteButton} onClick={() => setShowDeleteModal(true)}>Удалить профиль</button>
                    {showDeleteModal && (
                        <div className={styles.modal}>
                            <div className={styles.modalContent}>
                                <p>Вы уверены, что хотите удалить профиль водителя {driver.name}?</p>
                                <div className={styles.modalButtons}>
                                    <button className={styles.cancelButton} onClick={(handleDeleteDriver) }>Удалить</button>
                                    <button className={styles.confirmButton} onClick={() => setShowDeleteModal(false)}>Отмена</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

          
        </div>
    );
};

export default DriverProfile;