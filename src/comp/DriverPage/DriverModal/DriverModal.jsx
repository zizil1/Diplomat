import React, { useState } from "react";

const DriverModal = ({ onClose, onAddDriver }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddDriver({ name, surname, phoneNumber, city });
    };

    return (
        <div>
            <div>Driver Modal</div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} placeholder="Surname" required />
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number" required />
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required />
                <button type="submit">Add Driver</button>
                <button onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default DriverModal;