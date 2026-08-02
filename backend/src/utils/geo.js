const random = (min,max)=>{

    return Math.random()*(max-min)+min;

};



const generatePoint = (center)=>{


    return {

        lat:
        center.lat + random(-0.005,0.005),


        lng:
        center.lng + random(-0.005,0.005)

    };


};



module.exports={

    generatePoint

};