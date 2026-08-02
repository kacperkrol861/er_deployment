const prisma = require("../config/prisma");


const cities = require("../utils/cities");


const {
    generateCrowd
}=require("../services/crowd.service");


const {
    createHeatmap
}=require("../services/heatmap.service");


const {
    generateEvacuation
}=require("../services/evacuation.service");




const getSmartEvent = async(req,res)=>{


try{


    const eventId =
    Number(req.params.id);



    const event =
    await prisma.event.findUnique({

        where:{
            id:eventId
        }

    });



    if(!event){


        return res.status(404).json({

            message:"Nie znaleziono eventu"

        });


    }




    const location =
    cities[event.location];




    if(!location){


        return res.status(400).json({

            message:
            "Brak danych lokalizacji"

        });


    }





    const crowd =
    generateCrowd(location);



    const heatmap =
    createHeatmap(crowd);



    const evacuation =
    generateEvacuation(location);





    res.json({


        event:{


            id:event.id,

            title:event.title,

            location:event.location


        },


        crowd,


        heatmap,


        evacuation


    });



}
catch(error){


    res.status(500).json({

        error:error.message

    });


}



};





module.exports={

    getSmartEvent

};