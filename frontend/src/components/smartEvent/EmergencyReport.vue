<template>

<VaCard class="report-card">

<VaCardContent>


<h3>
Report emergency
</h3>


<p class="subtitle">
Select problem type and mark location on map
</p>





<!-- TYPE SELECT -->

<div class="types">


<div

v-for="item in types"

:key="item.name"

class="type-card"

:class="{
active:type === item.name
}"

@click="type=item.name"

>


<Icon

:icon="item.icon"

/>


<span>

{{item.name}}

</span>


</div>


</div>









<VaTextarea

v-if="!sent"

v-model="message"

label="Description"

placeholder="Describe situation..."

class="textarea"

/>









<h4>
Select location
</h4>






<div

ref="mapContainer"

class="map"

></div>







<div

v-if="selectedLocation"

class="location-info"

>


<Icon icon="mdi:map-marker"/>


Selected:

{{selectedLocation.lat.toFixed(5)}},

{{selectedLocation.lng.toFixed(5)}}


</div>









<!-- SEND BUTTON -->


<VaButton

v-if="!sent"

block

:disabled="!selectedLocation"

@click="sendReport"

>


<Icon icon="mdi:alert-plus"/>

Send emergency report


</VaButton>









<!-- SUCCESS -->


<div

v-if="sent"

class="success-box"

>


<Icon icon="mdi:check-circle"/>


<div>


<strong>
Report sent
</strong>


<p>
Security team received your report
</p>


</div>


</div>









<VaButton

v-if="showNewReport"

block

color="secondary"

class="new-report"

@click="createNewReport"

>


<Icon icon="mdi:plus"/>


Create another report


</VaButton>







</VaCardContent>

</VaCard>


</template>









<script setup>

import {
ref,
watch,
onMounted,
onBeforeUnmount,
nextTick
} from "vue";


import {
Icon
} from "@iconify/vue";


import L from "leaflet";


import "leaflet/dist/leaflet.css";


import {
cities
} from "@/data/cities";





const props = defineProps({

event:Object

});





const emit = defineEmits([

"report-created"

]);






const mapContainer=ref(null);


let map=null;

let marker=null;

let eventCircle=null;






const type=ref("Medical");


const message=ref("");


const selectedLocation=ref(null);


const sent=ref(false);


const showNewReport=ref(false);






const types=[


{
name:"Medical",
icon:"mdi:hospital-box"
},


{
name:"Fire",
icon:"mdi:fire"
},


{
name:"Danger",
icon:"mdi:alert"
},


{
name:"Lost person",
icon:"mdi:account-search"
},


{
name:"Other",
icon:"mdi:help-circle"
}

];








const destroyMap=()=>{


if(map){


map.remove();


map=null;


}


marker=null;


eventCircle=null;


};








const createMap=async()=>{


if(!props.event)

return;



const city=cities[props.event.location];


if(!city)

return;



await nextTick();



destroyMap();





map=L.map(

mapContainer.value

)

.setView(

[
city.lat,
city.lng
],

16

);






L.tileLayer(

"https://tile.openstreetmap.org/{z}/{x}/{y}.png",

{

attribution:"© OpenStreetMap"

}

)

.addTo(map);









eventCircle=L.circle(

[
city.lat,
city.lng
],

{

radius:500,

color:"#2563eb",

fillOpacity:.12

}

)

.addTo(map);







map.on(

"click",

(e)=>{


if(sent.value)

return;



selectedLocation.value={

lat:e.latlng.lat,

lng:e.latlng.lng

};






if(marker){


marker.setLatLng(

[

e.latlng.lat,

e.latlng.lng

]

);


}

else{


marker=L.marker(

[

e.latlng.lat,

e.latlng.lng

],

{


icon:L.divIcon({

className:"report-marker",

html:`

<div class="report-pin">
🚨
</div>

`,

iconSize:[45,45],

iconAnchor:[22,22]

})


}

)

.addTo(map);


}




});



};








const sendReport=()=>{


if(!selectedLocation.value)

return;





const report={


id:Date.now(),


type:type.value,


message:

message.value ||

"Need assistance",



lat:selectedLocation.value.lat,


lng:selectedLocation.value.lng,



priority:"MEDIUM"



};





emit(

"report-created",

report

);






sent.value=true;





setTimeout(()=>{


showNewReport.value=true;


},1200);



};








const createNewReport=()=>{


sent.value=false;


showNewReport.value=false;


message.value="";


selectedLocation.value=null;


type.value="Medical";



if(marker){


marker.remove();


marker=null;


}



};








watch(

()=>props.event,

()=>{


createMap();


}

);








onMounted(()=>{


createMap();


});






onBeforeUnmount(()=>{


destroyMap();


});



</script>









<style scoped>


.report-card{

border-radius:20px;

}



.subtitle{

color:#64748b;

margin-bottom:20px;

}







.types{

display:grid;

grid-template-columns:

repeat(auto-fit,minmax(100px,1fr));

gap:12px;

margin-bottom:20px;

}







.type-card{


height:90px;


border-radius:18px;


background:#f8fafc;


display:flex;


flex-direction:column;


align-items:center;


justify-content:center;


gap:8px;


cursor:pointer;


border:2px solid transparent;


transition:.25s;


}







.type-card svg{


font-size:30px;


color:var(--va-primary);


}





.type-card:hover{


transform:translateY(-4px);


}





.type-card.active{


border-color:var(--va-primary);


background:rgba(37,99,235,.1);


}








.textarea{


margin:15px 0;


}







.map{


height:350px;


border-radius:18px;


overflow:hidden;


margin:15px 0;


}









.location-info{


display:flex;


align-items:center;


gap:8px;


background:#f8fafc;


padding:12px;


border-radius:12px;


margin-bottom:15px;


font-size:14px;


}









.success-box{


display:flex;


align-items:center;


gap:15px;


padding:18px;


margin-top:15px;


border-radius:16px;


background:#dcfce7;


color:#166534;


animation:success .5s ease;


}



.success-box svg{


font-size:38px;


animation:pop .5s ease;


}




.success-box p{


margin:5px 0 0;


font-size:14px;


}








.new-report{


margin-top:15px;


}









:deep(.report-marker){


font-size:35px;


background:none;


border:none;


}








@keyframes success{


from{


opacity:0;


transform:scale(.8);


}


to{


opacity:1;


transform:scale(1);


}


}








@keyframes pop{


0%{


transform:scale(0);


}


80%{


transform:scale(1.2);


}


100%{


transform:scale(1);


}


}



</style>