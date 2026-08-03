import { useEffect, useState } from "react";
import axios from "axios";


function Documents(){


const [documents,setDocuments]=useState([]);

const [customers,setCustomers]=useState([]);


const [formData,setFormData]=useState({

customer_id:"",
document_type:"",
file:null

});



useEffect(()=>{

loadDocuments();
loadCustomers();

},[]);





const loadDocuments=async()=>{


const res =
await axios.get(
"http://127.0.0.1:5000/documents"
);


setDocuments(res.data);


};






const loadCustomers=async()=>{


const res =
await axios.get(
"http://127.0.0.1:5000/customers"
);


setCustomers(res.data);


};







const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:
e.target.value

});


};








const uploadDocument=async(e)=>{


e.preventDefault();



const data=new FormData();


data.append(
"customer_id",
formData.customer_id
);


data.append(
"document_type",
formData.document_type
);


data.append(
"file",
formData.file
);




try{


await axios.post(

"http://127.0.0.1:5000/documents",

data

);



alert(
"Document uploaded successfully"
);



setFormData({

customer_id:"",
document_type:"",
file:null

});


loadDocuments();



}

catch(error){

console.log(error);

alert(
"Upload failed"
);

}


};








return(


<div
style={{

padding:"25px",

background:"#f8faff",

minHeight:"100vh"

}}
>



<h1>
📁 Document Management
</h1>




<div
style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 8px 25px rgba(0,0,0,0.08)",

marginTop:"25px"

}}
>



<h3>
Upload Document
</h3>



<form onSubmit={uploadDocument}>


<select

className="form-control mb-3"

name="customer_id"

value={formData.customer_id}

onChange={handleChange}

required

>


<option value="">
Select Customer
</option>


{

customers.map(customer=>(

<option
key={customer.id}
value={customer.id}
>

{customer.name}

</option>

))

}


</select>





<select

className="form-control mb-3"

name="document_type"

value={formData.document_type}

onChange={handleChange}

required

>


<option value="">
Select Document Type
</option>


<option>
Identity Proof
</option>


<option>
Policy Document
</option>


<option>
Claim Document
</option>


<option>
Other
</option>


</select>






<input

type="file"

className="form-control mb-3"

onChange={(e)=>

setFormData({

...formData,

file:e.target.files[0]

})

}

required

/>





<button

className="btn btn-primary"

>

📤 Upload Document

</button>



</form>



</div>







<div

style={{

background:"#fff",

padding:"25px",

borderRadius:"20px",

boxShadow:
"0 8px 25px rgba(0,0,0,0.08)",

marginTop:"30px"

}}

>



<h3>
📄 Uploaded Documents
</h3>



<table className="table table-hover">


<thead>

<tr>

<th>ID</th>

<th>Customer ID</th>

<th>Name</th>

<th>Type</th>

<th>Date</th>

<th>Download</th>

</tr>

</thead>



<tbody>


{

documents.map(doc=>(


<tr key={doc.id}>


<td>
{doc.id}
</td>


<td>
{doc.customer_id}
</td>


<td>
{doc.file_name}
</td>


<td>
{doc.document_type}
</td>


<td>
{doc.uploaded_at}
</td>



<td>


<a

href={`http://127.0.0.1:5000/documents/download/${doc.file_name}`}

className="btn btn-success btn-sm"

target="_blank"

>

⬇ Download

</a>


</td>


</tr>


))


}



</tbody>


</table>



</div>





</div>


);


}



export default Documents;