<template>

<VaCard class="evac-card">

<VaCardContent>


<div class="header">


<div>

<h3>
Evacuation & Safety Map
</h3>


<p>
Emergency zones, exits and support points
</p>

</div>





<VaChip color="success">

<Icon icon="mdi:shield-check"/>

READY

</VaChip>


</div>







<div
ref="mapContainer"
class="map"
></div>







<div class="info-grid">



<div class="info-item">

<Icon icon="mdi:exit-run"/>

<div>

<strong>
Emergency exits
</strong>

<span>
3 available routes
</span>

</div>

</div>







<div class="info-item">

<Icon icon="mdi:hospital-box"/>

<div>

<strong>
Support points
</strong>

<span>
Medical & security
</span>

</div>

</div>







<div class="info-item">

<Icon icon="mdi:map-marker-radius"/>

<div>

<strong>
Safe zones
</strong>

<span>
Assembly areas
</span>

</div>

</div>



</div>








<div class="legend">


<div>

<span class="zone"></span>

Event zone

</div>



<div>

<span class="exit"></span>

Exit point

</div>




<div>

<span class="support"></span>

Support

</div>




<div>

<span class="safe"></span>

Safe zone

</div>




<div>

<span class="route"></span>

Evacuation route

</div>



</div>






</VaCardContent>


</VaCard>


</template>









<script setup>


import {

ref,

watch,

onMounted,

onBeforeUnmount

} from "vue";



import {

Icon

} from "@iconify/vue";



import L from "leaflet";


import "leaflet/dist/leaflet.css";



import {

cities

} from "@/data/cities";







const props=defineProps({

event:Object

});








const mapContainer=ref(null);


let map=null;


let layers=[];


let animationTimers=[];









const clearMap=()=>{


layers.forEach(layer=>{


layer.remove();


});



layers=[];





animationTimers.forEach(timer=>{


clearInterval(timer);


});



animationTimers=[];



};









const createIcon=(emoji,className)=>{


return L.divIcon({


className,


html:

`

<div class="custom-marker">

${emoji}

</div>

`,

iconSize:[45,45],

iconAnchor:[22,22]


});


};









const addMarker=(lat,lng,emoji,title,text)=>{


const marker=L.marker(

[lat,lng],

{


icon:createIcon(

emoji,

"custom-point"

)

}

)

.addTo(map);





marker.bindPopup(

`

<div>

<h3>
${emoji} ${title}
</h3>


<p>
${text}
</p>


</div>

`

);




layers.push(marker);



};









const createMap=()=>{


if(!props.event)

return;






const city=cities[props.event.location];



if(!city)

return;






if(map){


map.remove();


}






clearMap();








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











// GŁÓWNA STREFA EVENTU


const eventZone=L.circle(

[

city.lat,

city.lng

],

{

radius:700,

color:"#2563eb",

fillColor:"#3b82f6",

fillOpacity:.15,

weight:3


}

)

.addTo(map);



layers.push(eventZone);








eventZone.bindPopup(

`

<h3>
🎪 Event area
</h3>

<p>
Main crowd zone
</p>

`

);











// WYJŚCIA AWARYJNE


const exits=[


{

lat:city.lat+0.003,

lng:city.lng+0.004,

name:"North exit"

},



{

lat:city.lat-0.003,

lng:city.lng-0.003,

name:"South exit"

},



{

lat:city.lat+0.001,

lng:city.lng-0.006,

name:"West exit"

}



];









exits.forEach(exit=>{


addMarker(

exit.lat,

exit.lng,

"🚪",

exit.name,

"Emergency evacuation exit"

);






const route=L.polyline(

[


[city.lat,city.lng],


[exit.lat,exit.lng]


],

{

color:"#ef4444",

weight:7,

dashArray:"15,15",

opacity:.9

}

)

.addTo(map);






layers.push(route);






animateRoute(route);



});












// PUNKTY WSPARCIA


const supports=[


{

lat:city.lat+0.002,

lng:city.lng-0.002,

name:"Medical point"

},



{

lat:city.lat-0.001,

lng:city.lng+0.004,

name:"Security point"

}



];







supports.forEach(point=>{


addMarker(

point.lat,

point.lng,

"🏥",

point.name,

"Emergency support location"

);



});











// STREFA BEZPIECZNA


const safeZone=L.circle(

[

city.lat+0.005,

city.lng+0.005

],

{

radius:180,

color:"#16a34a",

fillColor:"#22c55e",

fillOpacity:.35,

weight:3


}

)

.addTo(map);



layers.push(safeZone);







safeZone.bindPopup(

`

<h3>
🟢 Safe zone
</h3>


<p>
Assembly point after evacuation
</p>

`

);







};









const animateRoute=(line)=>{


let offset=0;



const timer=setInterval(()=>{


offset-=10;



line.setStyle({

dashOffset:offset

});


},300);



animationTimers.push(timer);


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


animationTimers.forEach(timer=>{


clearInterval(timer);


});


if(map)

map.remove();


});



</script>

<style scoped>


.evac-card{

border-radius:20px;

}



.header{

display:flex;

justify-content:space-between;

align-items:center;

margin-bottom:20px;

}



.header h3{

margin:0;

}



.header p{

color:#64748b;

}



.map{

height:450px;

border-radius:18px;

overflow:hidden;

}




.legend{

display:flex;

gap:20px;

flex-wrap:wrap;

margin-top:15px;

font-size:13px;

}



.legend div{

display:flex;

align-items:center;

gap:8px;

}



.legend span{

width:18px;

height:18px;

border-radius:50%;

}



.exit{

background:#ef4444;

}



.route{

background:#dc2626;

}



.safe{

background:#22c55e;

}



.support{

background:#2563eb;

}



.danger{

background:#f97316;

}





:deep(.custom-marker){

background:none;

border:none;

}



:deep(.marker-icon){

width:50px;

height:50px;

display:flex;

align-items:center;

justify-content:center;

font-size:35px;

background:white;

border-radius:50%;

box-shadow:

0 5px 20px rgba(0,0,0,.35);

animation:pulse 1.5s infinite;

}



@keyframes pulse{


0%{

transform:scale(1);

}


50%{

transform:scale(1.15);

}


100%{

transform:scale(1);

}


}



</style>