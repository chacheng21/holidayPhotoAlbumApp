/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useCallback } from 'react'
import {
  GoogleMap,
  LoadScript,
  Marker,
} from '@react-google-maps/api'
import securityCredentials from '../../../aws_info'

const Maps = ({ titleArr, coordinates }) => {
  const [center, setCenter] = useState({
    lat: 39.95611153801973,
    lng: -75.18532796873306,
  })
  const [coordinatesObj, setCoordinatesObj] = useState([])

  useEffect(() => {
    if (coordinates.length > 0) {
      let meanLat = 0
      let meanLng = 0

      coordinates.forEach(item => {
        meanLat += item[0]
        meanLng += item[1]
      })

      meanLat /= coordinates.length
      meanLng /= coordinates.length

      setCenter({ lat: meanLat, lng: meanLng })

      const coordinatesObjItem = []
      coordinates.forEach(item => {
        const itemObj = { lat: item[0], lng: item[1] }
        coordinatesObjItem.push(itemObj)
      })

      setCoordinatesObj(coordinatesObjItem)
    }
  }, [])

  const divStyle = {
    position: 'absolute', top: 150, left: 550,
  }

  const mapStyle = {
    maxWidth: 600, height: 500,
  }

  const containerStyle = {
    width: '800px',
    height: '600px',
  }

  return (
    <div style={divStyle}>
      <LoadScript
        googleMapsApiKey={`${securityCredentials.mapsAPIKey}`}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {coordinatesObj.map((item, i) => (
            <Marker position={item} label={titleArr[i]} />
          ))}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default Maps

// {
//   coordinates.map((item, i) => {
//     const latLng = { lat: item[0], lng: item[1] }
//     return (
//       <Marker key={i} position={latLng} />
//     )
//   })
// }
