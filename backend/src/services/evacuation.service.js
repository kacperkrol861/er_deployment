const generateEvacuation = (location)=>{


    return {


        riskLevel:
        "MEDIUM",


        exits:[


            {

                name:"Main Exit",

                route:[

                    {
                        lat:location.lat,
                        lng:location.lng
                    },

                    {
                        lat:location.lat+0.004,
                        lng:location.lng+0.004
                    }

                ]

            },



            {

                name:"Emergency Exit",

                route:[

                    {
                        lat:location.lat,
                        lng:location.lng
                    },

                    {
                        lat:location.lat-0.003,
                        lng:location.lng-0.005
                    }


                ]

            }


        ]


    };


};



module.exports={

    generateEvacuation

};