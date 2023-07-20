import { Station } from '../types/station';

const API_URL: string = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json';

export const fetchStations = async (): Promise<Station[]> => {
    try {
        const response = await fetch(API_URL);
        const responseBody = await response.json();
        // console.log("Fetched stations", responseBody.data)
        return responseBody.data;
    } catch (error) {
        // console.log('Error fetching stations', error);
        throw error;
    }
};