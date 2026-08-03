import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";


function Reports(){


const [loading,setLoading]=useState("");



const createPDF = (
title,
headers,
rows,
filename
)=>{


const doc=new jsPDF();


doc.setFontSize(18);

doc.text(
"Insurance Management System",
14,
18
);


doc.setFontSize(14);

doc.text(
title,
14,
30
);


doc.setFontSize(10);

doc.text(
`Generated Date: ${new Date().toLocaleDateString()}`,
14,
38
);



autoTable(doc,{

startY:45,

head:[headers],

body:rows

});



doc.save(filename);



};






const downloadCustomers=async()=>{


try{

setLoading("customers");


const res=
await axios.get(
"http://127.0.0.1:5000/customers"
);



createPDF(

"Customer Report",

[
"ID",
"Name",
"DOB",
"Phone",
"Email"
],

res.data.map(c=>[

c.id,
c.name,
c.dob,
c.phone,
c.email

]),

"Customers_Report.pdf"

);


}

catch(err){

alert("Unable to generate report");

}

finally{

setLoading("");

}


};







const downloadPolicies=async()=>{


try{

setLoading("policies");


const res=
await axios.get(
"http://127.0.0.1:5000/policies"
);



createPDF(

"Policy Report",

[
"ID",
"Customer ID",
"Type",
"Policy Number",
"Premium",
"Status"
],

res.data.map(p=>[

p.id,
p.customer_id,
p.policy_type,
p.policy_number,
`₹ ${p.premium_amount}`,
p.status

]),

"Policies_Report.pdf"

);


}

catch{

alert("Unable to generate report");

}

finally{

setLoading("");

}

};








const downloadClaims=async()=>{


try{


setLoading("claims");


const res=
await axios.get(
"http://127.0.0.1:5000/claims"
);



createPDF(

"Claims Report",

[
"ID",
"Policy ID",
"Amount",
"Reason",
"Status"
],


res.data.map(c=>[

c.id,
c.policy_id,
`₹ ${c.claim_amount}`,
c.reason,
c.status

]),


"Claims_Report.pdf"

);


}

catch{

alert("Unable to generate report");

}

finally{

setLoading("");

}


};







const downloadPayments=async()=>{


try{


setLoading("payments");


const res=
await axios.get(
"http://127.0.0.1:5000/payments"
);



createPDF(

"Premium Payments Report",

[
"ID",
"Policy ID",
"Amount",
"Date",
"Status"
],


res.data.map(p=>[

p.id,
p.policy_id,
`₹ ${p.amount}`,
p.payment_date,
p.status

]),


"Premium_Payments_Report.pdf"

);


}

catch{

alert("Unable to generate report");

}

finally{

setLoading("");

}


};








const Button=({type,children,click})=>(

<button

className="btn btn-primary"

onClick={click}

disabled={loading===type}

>

{

loading===type

?

"Generating..."

:

children

}


</button>

);






return(


<div className="container mt-4">


<div className="card shadow-lg border-0">


<div className="card-header bg-primary text-white">

<h2>
📄 Reports Center
</h2>

</div>



<div className="card-body">


<p className="text-muted">

Generate downloadable PDF reports.

</p>



<div className="row g-4">



<ReportCard

title="👥 Customers"

desc="Customer details report"

button={
<Button
type="customers"
click={downloadCustomers}
>
Download PDF
</Button>
}

/>




<ReportCard

title="📜 Policies"

desc="Policy information report"

button={
<Button
type="policies"
click={downloadPolicies}
>
Download PDF
</Button>
}

/>




<ReportCard

title="📝 Claims"

desc="Claim details report"

button={
<Button
type="claims"
click={downloadClaims}
>
Download PDF
</Button>
}

/>





<ReportCard

title="💰 Payments"

desc="Premium payment history"

button={
<Button
type="payments"
click={downloadPayments}
>
Download PDF
</Button>
}

/>



</div>


</div>


</div>


</div>


);


}






function ReportCard({title,desc,button}){


return(

<div className="col-md-6">


<div className="card shadow-sm h-100">


<div className="card-body text-center">


<h4>
{title}
</h4>


<p className="text-muted">
{desc}
</p>


{button}


</div>


</div>


</div>

);


}




export default Reports;