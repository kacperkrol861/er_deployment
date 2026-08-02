const createHeatmap = (crowd)=>{


    return crowd.map(person=>{


        return [

            person.lat,

            person.lng,

            person.intensity / 100

        ];


    });



};



module.exports={

    createHeatmap

};