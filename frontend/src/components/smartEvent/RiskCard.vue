<template>

<VaCard class="risk-card">

<VaCardContent>


<div class="title">

<Icon icon="mdi:shield-check"/>

<h3>
Safety status
</h3>

</div>







<div

class="risk-level"

:class="riskClass"

>

{{ risk }}

</div>









<div class="stats">



<div class="stat">


<Icon icon="mdi:account-group"/>


<span>
Crowd
</span>


<strong>
{{ people }}
</strong>


</div>







<div class="stat">


<Icon icon="mdi:alert-circle"/>


<span>
Reports
</span>


<strong>
{{ reports.length }}
</strong>


</div>



</div>









<div class="recommendation">


<Icon icon="mdi:information-outline"/>


<p>

{{ recommendation }}

</p>



</div>







<h4>
Emergency map
</h4>






<div

ref="mapContainer"

class="map"

></div>









<div class="status">


<Icon icon="mdi:radar"/>


<span>
Monitoring active
</span>


</div>






</VaCardContent>

</VaCard>


</template>








<script setup>


import {

computed,

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


event:Object,


people:{


type:Number,


default:0


},



reports:{


type:Array,


default:()=>[]


}



});









const mapContainer=ref(null);



let map=null;


let markers=[];


let circles=[];









const risk=computed(()=>{


if(props.reports.length>=5)

return "HIGH";



if(props.reports.length>0)

return "MEDIUM";



if(props.people>700)

return "MEDIUM";



return "LOW";


});









const riskClass=computed(()=>{


return {


high:risk.value==="HIGH",


medium:risk.value==="MEDIUM",


low:risk.value==="LOW"


};


});









const recommendation=computed(()=>{


if(risk.value==="HIGH")

return "Multiple emergency reports detected. Immediate security response recommended.";



if(risk.value==="MEDIUM")

return "Attention required. Security team should monitor active reports.";



return "Event conditions are stable. Crowd density is within safe limits.";


});









const getIcon=(type)=>{


const icons={


Medical:"🏥",

Fire:"🔥",

Danger:"🚨",

"Lost person":"👤",

Other:"⚠️"


};



return icons[type] || "⚠️";


};









const getColor=(type)=>{


const colors={


Medical:"#2563eb",

Fire:"#dc2626",

Danger:"#f97316",

"Lost person":"#9333ea",

Other:"#eab308"


};


return colors[type] || "#ef4444";


};












// USUWANIE MAPY


const destroyMap=()=>{



markers.forEach(marker=>{

marker.remove();

});


markers=[];




circles.forEach(circle=>{

circle.remove();

});


circles=[];





if(map){


map.remove();


map=null;


}



};











// TWORZENIE MAPY


const createMap=()=>{


if(!props.event || !mapContainer.value)

return;





const city=cities[props.event.location];



if(!city)

return;








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










// OBSZAR EVENTU


L.circle(

[

city.lat,

city.lng

],

{

radius:500,

color:"#2563eb",

fillOpacity:.1

}

)

.addTo(map);








drawReports();



};











// MARKERY RAPORTOW


const drawReports=()=>{


if(!map)

return;







markers.forEach(m=>m.remove());

circles.forEach(c=>c.remove());



markers=[];

circles=[];








props.reports.forEach(report=>{


const emoji=getIcon(report.type);







const marker=L.marker(

[

report.lat,

report.lng

],

{

icon:L.divIcon({

className:"report-marker",

html:

`

<div class="report-icon">

${emoji}

</div>

`,

iconSize:[50,50],

iconAnchor:[25,25]

})

}

)

.addTo(map);







marker.bindPopup(

`

<h3>

${emoji}

${report.type}

</h3>


<p>

${report.message}

</p>


<b>

Priority:

${report.priority || "MEDIUM"}

</b>

`

);







markers.push(marker);









const circle=L.circle(

[

report.lat,

report.lng

],

{


radius:250,


color:getColor(report.type),


fillColor:getColor(report.type),


fillOpacity:.18


}

)

.addTo(map);





circles.push(circle);



});



};









// ZMIANA EVENTU


watch(

()=>props.event,

()=>{


destroyMap();


setTimeout(()=>{


createMap();


},100);



},

{

deep:true

}

);









// NOWE RAPORTY


watch(

()=>props.reports,

()=>{


drawReports();


},

{

deep:true

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


.risk-card{


border-radius:20px;


}





.title{


display:flex;


align-items:center;


gap:10px;


}



.title svg{


font-size:30px;


color:var(--va-primary);


}



.title h3{


margin:0;


font-size:20px;


}








.risk-level{


margin:25px 0;


padding:14px;


border-radius:16px;


text-align:center;


font-size:20px;


font-weight:900;


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








.stats{


display:flex;


gap:40px;


margin-top:20px;


}





.stat{


display:flex;


flex-direction:column;


align-items:center;


gap:5px;


}





.stat svg{


font-size:28px;


color:var(--va-primary);


}





.stat span{


font-size:13px;


color:#64748b;


}





.stat strong{


font-size:28px;


}








.recommendation{


margin-top:25px;


display:flex;


gap:12px;


background:#f8fafc;


padding:16px;


border-radius:16px;


}





.recommendation svg{


font-size:24px;


color:var(--va-primary);


}





.recommendation p{


margin:0;


font-size:14px;


}








.map{


height:300px;


border-radius:16px;


overflow:hidden;


margin-top:15px;


}








.status{


margin-top:20px;


display:flex;


align-items:center;


gap:10px;


padding:12px;


border-radius:12px;


background:#eff6ff;


color:#1d4ed8;


font-weight:700;


}








:deep(.report-marker){


background:none;


border:none;


}





:deep(.report-icon){


width:50px;


height:50px;


background:white;


border-radius:50%;


display:flex;


align-items:center;


justify-content:center;


font-size:32px;


box-shadow:0 5px 20px rgba(0,0,0,.35);


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