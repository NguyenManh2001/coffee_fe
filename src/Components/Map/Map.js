import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export function MapContainer(props) {
    const onMarkerClick = (e) => {
        // Thực hiện xử lý khi đánh dấu được nhấp vào đây
        console.log('Marker Clicked!');
    };
    return (
        <Map
            google={props.google}
            zoom={14}
            initialCenter={{ lat: 37.7749, lng: -122.4194 }} // Vị trí ban đầu
        >
            <Marker onClick={onMarkerClick} name={'Current location'} />
        </Map>
    );
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB6FE0qcROl8cK_ofvMUSkxaL2AGC6LYac', // Điền khóa API của bạn ở đây
})(MapContainer);
