import React, {useEffect, useState} from 'react';
//state are any type of information that will be changed/manipulated in the component,  if the component will change this variable we'll need the state
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

//orphanage doesn't know the data type of the variables, so we need to create this interface
interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


const OrphanagesMap = () => {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    //<Orphanage> = it's a typing parameter, says that Orphanage is a vector Orphanage configuration

    //useEffect receives two parameters, it will exercute the function {} when [] changes
    //if the [] is empty this function will execute only one time for showing some data on the screen
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data)
            //the variabl orphanages will have the value returned by response.data 
        });
    }, []);
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita! :)</p>
                </header>

                <footer>
                    <strong>Belo Horizonte</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>

            <Map
            // Array with longitude and latitude
                center = {[-19.9223924,-43.9419179]}
                zoom = {15}
                style = {{ width: '100%', height: '100%'}}

            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                {orphanages.map(orphanage =>{
                    return(
                        <Marker 
                    icon = {mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                    key={orphanage.id}
                >
                    <Popup closeButton = {false} minWidth={240} maxWidth={240} className="map-popup">
                        {orphanage.name}
                        <Link to={`/orphanages/${orphanage.id}`}>
                           <FiArrowRight size = {20} color = "#FFF" />
                        </Link>
                    </Popup>
                </Marker>
                    )
                })}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size = {32} color = "#FFF" />
            </Link>
        </div>
    );
}


export default OrphanagesMap;