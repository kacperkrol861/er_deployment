import { cities } from "./cities";



export const generateCrowd = (
    location,
    amount = 250,
    radius = 0.003
)=>{


    const city = cities[location];


    if(!city){

        return [];

    }



    const people = [];



    // kilka stref tłumu
    const zones = [

        {
            name:"stage",
            latOffset:0,
            lngOffset:0
        },


        {
            name:"food",
            latOffset:0.002,
            lngOffset:0.002
        },


        {
            name:"entrance",
            latOffset:-0.002,
            lngOffset:-0.001
        }

    ];







    for(let i=0;i<amount;i++){


        const zone =
        zones[
            Math.floor(
                Math.random()*zones.length
            )
        ];



        const angle =
        Math.random()*Math.PI*2;



        const distance =
        Math.sqrt(
            Math.random()
        ) * radius;





        const lat =

        city.lat

        +

        zone.latOffset

        +

        Math.cos(angle)
        *
        distance;






        const lng =

        city.lng

        +

        zone.lngOffset

        +

        Math.sin(angle)
        *
        distance;







        people.push({

            lat,

            lng,


            intensity:

            0.4 +

            Math.random()*0.6



        });



    }





    return people;



};









export const moveCrowd = (
    people
)=>{


return people.map(person=>{


return {


lat:

person.lat

+

(Math.random()-0.5)

*

0.0003,




lng:

person.lng

+

(Math.random()-0.5)

*

0.0003,




intensity:

person.intensity



};



});


};