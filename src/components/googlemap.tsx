
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

type OfficeNode = {
  id: string;
  field_address: {
    locality: string;
    postal_code: string;
    address_line1: string;
    address_line2: string;
    latitude: number;
    longitude: number;
  };
};

export default function Google() {
  const offices = [
    {
      id: "1",
      field_address: {
        locality: "Gent",
        postal_code: "9000",
        address_line1: "Veldstraat 1",
        address_line2: "a",
        latitude: 51.053589,
        longitude: 3.72242
      }
    },
    {
      id: "2",
      field_address: {
        locality: "Brussel",
        postal_code: "1000",
        address_line1: "Nieuwstraat 1",
        address_line2: "a",
        latitude: 50.85061,
        longitude: 4.35403
      }
    },
    {
      id: "3",
      field_address: {
        locality: "Antwerpen",
        postal_code: "2000",
        address_line1: "Meir 1",
        address_line2: "a",
        latitude: 51.21878,
        longitude: 4.40559
      }
    }
  ];
  const mapRef = React.useRef<any>(null);
  const [selectedOffice, setSelectedOffice] = React.useState<
    OfficeNode | undefined | null
  >(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.GOOGLE_MAPS_API_KEY}`
  });
  const onLoad = React.useCallback(
    (mapInstance) => {
      const bounds = new google.maps.LatLngBounds();
      offices.forEach((office) => {
        bounds.extend(
          new google.maps.LatLng(
            office.field_address.latitude,
            office.field_address.longitude
          )
        );
      });
      mapRef.current = mapInstance;
      mapInstance.fitBounds(bounds);
    },
    [offices]
  );
  const onClickMarker = (officeId: string) => {
    setSelectedOffice(offices.find((office) => office.id === officeId));
  };
  return (
    <div className="App">
      <h1>Google maps + React</h1>
      {isLoaded && (
        <>
          <GoogleMap
            mapContainerClassName="c-office-overview__map"
            onLoad={onLoad}
          >
            {offices.map((office) => (
              <Marker
                key={office.id}
                onClick={() => onClickMarker(office.id)}
                position={{
                  lat: office.field_address.latitude,
                  lng: office.field_address.longitude
                }}
              />
            ))}
            {selectedOffice && (
              <InfoWindow
                position={{
                  lat: selectedOffice.field_address.latitude,
                  lng: selectedOffice.field_address.longitude
                }}
                onCloseClick={() => setSelectedOffice(null)}
              >
                <p>
                  {selectedOffice.field_address.address_line1}{" "}
                  {selectedOffice.field_address.address_line2} -{" "}
                  {selectedOffice.field_address.postal_code}{" "}
                  {selectedOffice.field_address.locality}
                </p>
              </InfoWindow>
            )}
          </GoogleMap>
        </>
      )}
    </div>
  );
}
  