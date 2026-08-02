<template>

<VaCard class="map-card">

<VaCardContent>


<div class="header">


<div>

<h3>
Crowd Heatmap
</h3>


<p class="subtitle">
Live crowd movement simulation
</p>


</div>





<div class="stats">


<div class="stat">

<Icon icon="mdi:account-group"/>

<strong>
{{ crowdCount }}
</strong>

<span>
People
</span>

</div>






<div
class="risk"
:class="riskClass"
>

{{ densityLevel }}

</div>



</div>


</div>








<div
ref="mapContainer"
class="map"
></div>





</VaCardContent>

</VaCard>

</template>









<script setup>


import {

onMounted,

onBeforeUnmount,

watch,

ref,

nextTick,

computed

} from "vue";



import {

Icon

} from "@iconify/vue";



import L from "leaflet";


import "leaflet/dist/leaflet.css";


import "leaflet.heat";



import {

generateCrowd,

moveCrowd

} from "../../data/crowdGenerator.js";



import {

cities

} from "@/data/cities";








const props = defineProps({

event:Object

});









const emit = defineEmits([

"crowd-update"

]);









const mapContainer = ref(null);



let map=null;


let heat=null;


let crowdTimer=null;


let crowd=[];






const crowdCount=ref(0);









const densityLevel=computed(()=>{


if(crowdCount.value>700)

return "HIGH";



if(crowdCount.value>400)

return "MEDIUM";



return "LOW";


});









const riskClass=computed(()=>{


return {


high:densityLevel.value==="HIGH",


medium:densityLevel.value==="MEDIUM",


low:densityLevel.value==="LOW"


};


});









const createMap=async()=>{


if(!props.event)

return;





const city =
cities[props.event.location];



if(!city)

return;






await nextTick();






map=L.map(

mapContainer.value

)

.setView(

[

city.lat,

city.lng

],

15

);







L.tileLayer(

"https://tile.openstreetmap.org/{z}/{x}/{y}.png",

{

attribution:"© OpenStreetMap"

}

)

.addTo(map);








// MOCK FESTIVAL CROWD


crowd=generateCrowd(

props.event.location,

250,

0.003

);






crowdCount.value=crowd.length;



emit(

"crowd-update",

crowd.length

);









const points=crowd.map(person=>[

person.lat,

person.lng,

person.intensity

]);









heat=L.heatLayer(

points,

{

radius:45,

blur:35,

maxZoom:17,

max:1

}

)

.addTo(map);






startCrowdMovement();



};









const startCrowdMovement=()=>{


if(crowdTimer)

clearInterval(crowdTimer);







crowdTimer=setInterval(()=>{


crowd=moveCrowd(crowd);







const points=crowd.map(person=>[


person.lat,


person.lng,


person.intensity


]);








if(heat){


heat.setLatLngs(points);


}





},3000);



};









const destroyMap=()=>{


if(crowdTimer){


clearInterval(crowdTimer);


crowdTimer=null;


}





if(heat){


heat.remove();


heat=null;


}






if(map){


map.remove();


map=null;


}


};









watch(

()=>props.event,

()=>{


destroyMap();


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


.map-card{

border-radius:20px;

overflow:hidden;

}



.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:20px;

}



.subtitle{

color:#64748b;

font-size:14px;

}



.stats{

display:flex;

gap:15px;

align-items:center;

}





.stat{

display:flex;

align-items:center;

gap:8px;

background:#f8fafc;

padding:10px 14px;

border-radius:12px;

}





.stat svg{

font-size:22px;

color:var(--va-primary);

}





.stat span{

font-size:12px;

color:#64748b;

}





.risk{

padding:8px 18px;

border-radius:20px;

font-weight:800;

font-size:13px;

}





.low{

background:#dcfce7;

color:#166534;

}





.medium{

background:#fef3c7;

color:#92400e;

}





.high{

background:#fee2e2;

color:#991b1b;

}





.map{

height:450px;

border-radius:16px;

}



</style>