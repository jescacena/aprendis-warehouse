import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1, //include lat lgn in the results of each job
    radius: 10,   //miles
    q: 'javascript'
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

export const likeJob = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    };
};

export const clearLikedJobs = () => {
    return { type: CLEAR_LIKED_JOBS };
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
        console.log(data);
        callback();
    } catch (error) {
        console.log(error);
    }
};
