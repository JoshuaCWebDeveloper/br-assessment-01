import { GeoJson, Map } from 'pigeon-maps';
import { useGetCruisesQuery } from '../redux/modules/api/gmrt.api';

export const CruisesMap = () => {
    const { data } = useGetCruisesQuery();

    return (
        <Map height={700} defaultCenter={[50.879, 4.6997]} defaultZoom={4}>
            <GeoJson
                data={{
                    type: 'FeatureCollection',
                    features: Object.values(data ?? {}).map(cruise => {
                        const { north, south, east, west } = cruise;
                        return {
                            type: 'Feature',
                            properties: {},
                            geometry: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [north, west],
                                        [south, west],
                                        [south, east],
                                        [north, east],
                                        [north, west],
                                    ],
                                ],
                            },
                        };
                    }),
                }}
            />
        </Map>
    );
};
