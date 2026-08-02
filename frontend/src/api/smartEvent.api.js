import api from "./axios";


export const getSmartEvent = (id)=>{

    return api.get(`/smart-event/${id}`);

};