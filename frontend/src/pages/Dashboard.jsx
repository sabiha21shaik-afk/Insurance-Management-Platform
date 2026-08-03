import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Pie, Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);



function Dashboard() {

const [customers,setCustomers]=useState([]);
const [policies,setPolicies]=useState([]);
const [claims,setClaims]=useState([]);
const [payments,setPayments]=useState([]);

const [loading,setLoading]=useState(true);
const [error,setError]=useState("");



useEffect(()=>{

loadDashboard();

},[]);



const loadDashboard = async()=>{

try{

setLoading(true);


const [
customersRes,
policiesRes,
claimsRes,
paymentsRes

]=await Promise.all([

axios.get("http://127.0.0.1:5000/customers"),

axios.get("http://127.0.0.1:5000/policies"),

axios.get("http://127.0.0.1:5000/claims"),

axios.get("http://127.0.0.1:5000/payments")

]);


setCustomers(customersRes.data);
setPolicies(policiesRes.data);
setClaims(claimsRes.data);
setPayments(paymentsRes.data);


}

catch(error){

console.log(error);
setError("Unable to load dashboard data");

}

finally{

setLoading(false);

}

};





if(loading)
return(

<h2 style={{
textAlign:"center",
marginTop:"100px"
}}>
⏳ Loading Dashboard...
</h2>

);



if(error)
return(

<h2 style={{
color:"red",
textAlign:"center"
}}>
{error}
</h2>

);





const totalRevenue =
payments.reduce(
(sum,payment)=>
sum+
Number(
payment.amount ||
payment.premium_amount ||
0
),
0
);





const activePolicies =
policies.filter(
p=>p.status==="Active"
).length;



const expiredPolicies =
policies.filter(
p=>p.status==="Expired"
).length;





// Monthly revenue

const months={

Jan:0,
Feb:0,
Mar:0,
Apr:0,
May:0,
Jun:0,
Jul:0,
Aug:0,
Sep:0,
Oct:0,
Nov:0,
Dec:0

};



payments.forEach(payment=>{


if(payment.payment_date){

const month =
new Date(payment.payment_date)
.toLocaleString(
"default",
{
month:"short"
}
);


months[month]+=Number(
payment.amount ||
payment.premium_amount ||
0
);


}

});





const lineData={

labels:Object.keys(months),

datasets:[{

label:"Monthly Premium Revenue",

data:Object.values(months),

tension:0.4

}]

};






// Policy chart

const policyCount={};


policies.forEach(policy=>{

let type =
policy.policy_type || "Other";


policyCount[type]
=
(policyCount[type]||0)+1;


});



const pieData={

labels:Object.keys(policyCount),

datasets:[{

label:"Policies",

data:Object.values(policyCount)

}]

};





// Claim chart


const claimCount={};


claims.forEach(claim=>{


let status =
claim.status || "Pending";


claimCount[status]
=
(claimCount[status]||0)+1;


});



const barData={


labels:Object.keys(claimCount),


datasets:[{

label:"Claims",

data:Object.values(claimCount)

}]


};







return(

<div style={{

padding:"25px",

background:"#f8faff",

minHeight:"100vh"

}}>



<h1 style={{
color:"#374151"
}}>
🏢 Insurance Management Dashboard
</h1>





<div style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px",

marginTop:"30px"

}}>


<Card
title="Customers"
value={customers.length}
icon="👥"
/>


<Card
title="Policies"
value={policies.length}
icon="📜"
/>


<Card
title="Active Policies"
value={activePolicies}
icon="✅"
/>


<Card
title="Expired Policies"
value={expiredPolicies}
icon="⌛"
/>


<Card
title="Claims"
value={claims.length}
icon="📝"
/>


<Card
title="Revenue"
value={`₹ ${totalRevenue}`}
icon="💰"
/>


</div>






<div style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(350px,1fr))",

gap:"25px",

marginTop:"35px"

}}>



<ChartBox title="📈 Monthly Premium Revenue">

<Line data={lineData}/>

</ChartBox>



<ChartBox title="🥧 Policy Distribution">

<Pie data={pieData}/>

</ChartBox>



<ChartBox title="📊 Claim Status">

<Bar data={barData}/>

</ChartBox>


</div>






<div style={{

display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(300px,1fr))",

gap:"25px",

marginTop:"35px"

}}>


<RecentBox
title="👥 Recent Customers"
data={customers.slice(-5)}
field="name"
/>



<RecentBox
title="📜 Recent Policies"
data={policies.slice(-5)}
field="policy_type"
/>



<RecentBox
title="💰 Recent Payments"
data={payments.slice(-5)}
field="amount"
/>



</div>



</div>

);

}







function Card({title,value,icon}){

return(

<div style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 8px 25px rgba(0,0,0,0.08)"

}}>


<h1>{icon}</h1>

<h3 style={{
color:"#6b7280"
}}>
{title}
</h3>


<h2 style={{
color:"#2563eb"
}}>
{value}
</h2>


</div>

);

}







function ChartBox({title,children}){

return(

<div style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 8px 25px rgba(0,0,0,0.08)"

}}>


<h3>{title}</h3>

{children}


</div>

);

}







function RecentBox({title,data,field}){


return(

<div style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 8px 25px rgba(0,0,0,0.08)"

}}>


<h3>{title}</h3>


{

data.length===0 ?

<p>No data available</p>


:

data.map((item,index)=>(

<p key={index}>
• {item[field]}
</p>

))

}


</div>

);

}




export default Dashboard;