import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Cruise = {
    name: string;
    device_make: string;
    device_model: string;
    platform_id: string;
    year: string;
    gmrt_entry_id: string;
    entry_id: string;
    proc_data_set_uid: string;
    center_x: string;
    center_y: string;
    chief: string;
    flag_alt: string;
    url: string;
    public_notes: string;
    total_area: string;
    track_length: string;
    north: string;
    south: string;
    east: string;
    west: string;
} & Record<string, unknown>;

// Define a service using a base URL and expected endpoints
const gmrtApi = createApi({
    reducerPath: 'gmrtApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.gmrt.org/' }),
    endpoints: builder => ({
        getCruises: builder.query<Record<string, Cruise>, void>({
            query: () => `services/GmrtCruises.php`,
            // remove duplicates
            transformResponse: (cruiseData: Cruise[]) =>
                Object.fromEntries(
                    cruiseData
                        .filter((cruise, idx) => {
                            return (
                                cruiseData.findIndex(
                                    other =>
                                        other.gmrt_entry_id ===
                                        cruise.gmrt_entry_id
                                ) === idx
                            );
                        })
                        .map(cruise => [cruise.gmrt_entry_id, cruise])
                ),
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCruisesQuery } = gmrtApi;

export default gmrtApi;
