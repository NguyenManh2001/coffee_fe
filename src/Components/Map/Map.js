import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useDispatch } from 'react-redux';
import listsMenuSlice from '~/Redux/list/list';

const MapContainer = (props) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [address, setAddress] = useState('');
    const dispatch = useDispatch();

    const { google, temporaryAddress } = props;
    const getGeocodeDetails = (mapProps, map, center) => {
        const geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: center }, (results, status) => {
            if (status === 'OK') {
                if (results[0]) {
                    const placeInfo = results[0];
                    handleLocationSelection(placeInfo);
                } else {
                    console.log('No results found');
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    };

    // Thay đổi vị trí khi có sự kiện hoặc hành động nào đó từ người dùng
    const changeLocation = (newLat, newLng) => {
        setCurrentLocation({ lat: newLat, lng: newLng });
    };

    useEffect(() => {
        // Lấy vị trí hiện tại khi component được tải
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setCurrentLocation({ lat, lng });
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                },
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    const handleLocationSelection = (placeInfo) => {
        console.log('Place Information:', placeInfo);
        setAddress(placeInfo.formatted_address);
        dispatch(listsMenuSlice.actions.addAddress(placeInfo.formatted_address));
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '400px' }}>
            {currentLocation && (
                <Map
                    google={props.google}
                    zoom={14}
                    initialCenter={currentLocation}
                    center={currentLocation}
                    onClick={(t, map, c) => {
                        // Thay đổi vị trí khi người dùng nhấp vào bản đồ
                        changeLocation(c.latLng.lat(), c.latLng.lng());
                        getGeocodeDetails(t, map, c.latLng);
                    }}
                >
                    <Marker position={currentLocation} name={'Your Location'} />
                </Map>
            )}
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCzNP5qQql2a5y8lOoO-1yj1lj_tzjVImA', // Điền khóa API của bạn ở đây
})(MapContainer);
