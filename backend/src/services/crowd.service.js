const {
    generatePoint
}=require("../utils/geo");



const generateCrowd = (location)=>{


    const people=[];



    for(let i=0;i<300;i++){


        const point =
        generatePoint(location);



        people.push({

            id:i+1,

            lat:point.lat,

            lng:point.lng,


            intensity:
            Math.floor(
                Math.random()*100
            )


        });


    }



    return people;


};



module.exports={

    generateCrowd

};