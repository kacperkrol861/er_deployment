<template>

<div class="page">


<section class="header">

<div>

<h1>
Smart Event ★
</h1>

<p>
Intelligent festival safety system
</p>

</div>

</section>








<VaCard class="events-card">


<VaCardContent>



<div class="event-header">


<h2>
Select event
</h2>


<p>
Choose an event to open Smart Event monitoring
</p>



</div>








<div class="event-list">



<div

v-for="event in events"

:key="event.id"

class="event-item"

:class="{
active:selectedEvent === event.id
}"

@click="selectEvent(event.id)"


>



<Icon icon="mdi:calendar-star"/>




<div>


<strong>
{{ event.title }}
</strong>


<span>
{{ event.location }}
</span>



</div>



</div>



</div>



</VaCardContent>


</VaCard>












<VaCard

v-if="smartData"

class="panel"

>


<VaCardContent>




<div class="selected-title">



<div>


<h2>

{{ smartData.event.title }}

</h2>


<p>

Smart monitoring dashboard

</p>


</div>





<VaChip color="success">


<Icon icon="mdi:access-point"/>


LIVE


</VaChip>



</div>









<section class="smart-grid">





<!-- STATUS + MAPA ZGLOSZEN -->


<RiskCard


:event="smartData.event"


:people="crowdCount"


:reports="reports"



/>









<!-- DODAWANIE RAPORTU -->


<EmergencyReport


:event="smartData.event"


@report-created="addReport"



/>









<!-- TLUM -->


<CrowdHeatmap


:event="smartData.event"


@crowd-update="updateCrowd"


/>









<!-- EWAKUACJA -->


<EvacuationMap


:event="smartData.event"


/>





</section>






</VaCardContent>


</VaCard>







</div>


</template>









<script setup>


import {

ref,

watch,

onMounted

} from "vue";



import {

Icon

} from "@iconify/vue";




import {

getEvents

} from "@/api/event.api";



import {

getSmartEvent

} from "@/api/smartEvent.api";





import RiskCard 

from "@/components/smartEvent/RiskCard.vue";


import CrowdHeatmap 

from "@/components/smartEvent/CrowdHeatmap.vue";


import EvacuationMap 

from "@/components/smartEvent/EvacuationMap.vue";


import EmergencyReport 

from "@/components/smartEvent/EmergencyReport.vue";








const events = ref([]);

const selectedEvent = ref(null);

const smartData = ref(null);





// liczba ludzi z heatmapy

const crowdCount = ref(0);





// wszystkie raporty

const reports = ref([]);









const loadEvents = async()=>{


try{


const response = await getEvents();


events.value=response.data;


}

catch(error){

console.log(error);

}


};









const selectEvent=(id)=>{


selectedEvent.value=id;


};









const loadSmart=async()=>{


if(!selectedEvent.value)

return;





try{


const response =
await getSmartEvent(

selectedEvent.value

);



smartData.value=response.data;



}

catch(error){

console.log(error);

}



};









const updateCrowd=(count)=>{


crowdCount.value=count;


};









const addReport=(report)=>{


reports.value.push({

...report,

createdAt:new Date(),


priority:"MEDIUM"

});


};









watch(

selectedEvent,

()=>{


// reset danych przy zmianie eventu

reports.value=[];

crowdCount.value=0;


loadSmart();


}

);








onMounted(()=>{


loadEvents();


});



</script>








<style scoped>


.page{

animation:fade .3s ease;

}




.header{

margin-bottom:25px;

}



.header h1{

font-size:32px;

font-weight:800;

margin:0;

}



.header p{

margin-top:8px;

color:#64748b;

}







.events-card{

border-radius:20px;

margin-bottom:25px;

}





.event-header h2{

margin:0;

font-size:22px;

}



.event-header p{

color:#64748b;

}







.event-list{


display:flex;


gap:15px;


margin-top:25px;


overflow-x:auto;


padding-bottom:5px;


}







.event-item{


min-width:240px;


display:flex;


align-items:center;


gap:14px;


padding:18px;


border-radius:18px;


background:#f8fafc;


cursor:pointer;


border:2px solid transparent;


transition:.25s;


}







.event-item svg{


font-size:30px;


color:var(--va-primary);


}





.event-item strong{


display:block;


}





.event-item span{


display:block;


font-size:13px;


color:#64748b;


}







.event-item:hover{


transform:translateY(-5px);


}







.event-item.active{


background:rgba(21,93,252,.08);


border-color:var(--va-primary);


box-shadow:0 10px 25px rgba(21,93,252,.15);


}









.selected-title{


display:flex;


justify-content:space-between;


align-items:center;


}





.selected-title h2{


margin:0;


font-size:26px;


}





.selected-title p{


color:#64748b;


}









.smart-grid{


display:grid;


grid-template-columns:

repeat(

auto-fit,

minmax(350px,1fr)

);


gap:25px;


margin-top:30px;


}








@keyframes fade{


from{


opacity:0;


transform:translateY(10px);


}


to{


opacity:1;


}


}



</style>