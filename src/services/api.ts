import { Station } from '../types/station';

//future improvements
// Env variable for API_URL constant
// More robust error handling based on http error code (right now everything just caught in redux slice)
// More sophisticated type checking for response body, maybe not everything required all the time


const API_URL: string = 'https://s3-us-west-1.amazonaws.com/cdn-web.tunein.com/stations.json';

export const fetchStations = async (): Promise<Station[]> => {
    try {
        const response = await fetch(API_URL);
        const responseBody = await response.json();
        // validate the structure of the response against the Station type defined in src/types/station.ts
        // console.log("Response body", responseBody);
        if (!Array.isArray(responseBody.data) || !responseBody.data.every(isStation)) {
            throw new Error('Invalid response data shape from API');
        }
        // console.log("Fetched stations", responseBody.data)
        return responseBody.data;
    } catch (error) {
        // console.log('Error fetching stations', error);
        throw error;
    }
};


function isStation(arg: any): arg is Station {
    return (    
        arg.id !== undefined && typeof(arg.id) === 'string' &&
        arg.description !== undefined && typeof(arg.description) === 'string' &&
        arg.name !== undefined && typeof(arg.name) === 'string' &&
        arg.imgUrl !== undefined && typeof(arg.imgUrl) === 'string' &&
        arg.streamUrl !== undefined && typeof(arg.streamUrl) === 'string' &&
        arg.reliability !== undefined && typeof(arg.reliability) === 'number' &&
        arg.popularity !== undefined && typeof(arg.popularity) === 'number' &&
        arg.tags !== undefined && Array.isArray(arg.tags) && arg.tags.every((tag: any) => typeof(tag) === 'string')
    );
}