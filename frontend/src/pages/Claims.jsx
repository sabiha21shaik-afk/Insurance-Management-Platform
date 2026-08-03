import { useEffect, useState } from "react";
import axios from "axios";

function Claims() {

  const [claims,setClaims]=useState([]);

  const [editing,setEditing]=useState(false);
  const [editId,setEditId]=useState(null);


  const [formData,setFormData]=useState({

    policy_id:"",
    claim_amount:"",
    reason:"",
    status:"Pending",
    submission_date:""

  });


  const [search,setSearch]=useState("");
  const [currentPage,setCurrentPage]=useState(1);

  const claimsPerPage=5;



  useEffect(()=>{

    fetchClaims();

  },[]);



  const fetchClaims=async()=>{

    try{

      const res=await axios.get(
        "http://127.0.0.1:5000/claims"
      );

      setClaims(res.data);

    }
    catch(err){

      console.log(err);

    }

  };




  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  const saveClaim=async(e)=>{

    e.preventDefault();


    try{


      if(editing){


        await axios.put(

          `http://127.0.0.1:5000/claims/${editId}`,

          formData

        );


        alert("Claim updated successfully");


        setEditing(false);
        setEditId(null);


      }
      else{


        await axios.post(

          "http://127.0.0.1:5000/claims",

          formData

        );


        alert("Claim added successfully");


      }



      setFormData({

        policy_id:"",
        claim_amount:"",
        reason:"",
        status:"Pending",
        submission_date:""

      });


      fetchClaims();


    }
    catch(err){

      console.log(err);

      alert("Operation failed");

    }


  };






  const editClaim=(claim)=>{


    setEditing(true);

    setEditId(claim.id);


    setFormData({

      policy_id:claim.policy_id,

      claim_amount:claim.claim_amount,

      reason:claim.reason,

      status:claim.status,

      submission_date:claim.submission_date

    });


  };






  const deleteClaim=async(id)=>{


    if(!window.confirm("Delete this claim?"))
    return;



    try{


      await axios.delete(

        `http://127.0.0.1:5000/claims/${id}`

      );


      fetchClaims();


    }
    catch(err){

      console.log(err);

    }


  };





  const filteredClaims=claims.filter((claim)=>{


    return(

      claim.reason
      ?.toLowerCase()
      .includes(search.toLowerCase())

      ||

      claim.status
      ?.toLowerCase()
      .includes(search.toLowerCase())

    );


  });




  const indexOfLast=currentPage*claimsPerPage;

  const indexOfFirst=indexOfLast-claimsPerPage;


  const currentClaims=
  filteredClaims.slice(
    indexOfFirst,
    indexOfLast
  );



  const totalPages=Math.ceil(
    filteredClaims.length/
    claimsPerPage
  );







return(

<div className="container-fluid mt-4">



<div className="card shadow-lg border-0 mb-4">


<div className="card-header bg-success text-white">

<h3>

{editing ? "✏️ Edit Claim" : "➕ Add New Claim"}

</h3>

</div>



<div className="card-body">


<form onSubmit={saveClaim}>


<div className="row g-3">



<div className="col-md-4">

<input

className="form-control"

type="number"

placeholder="Policy ID"

name="policy_id"

value={formData.policy_id}

onChange={handleChange}

required

/>

</div>




<div className="col-md-4">

<input

className="form-control"

type="number"

placeholder="Claim Amount"

name="claim_amount"

value={formData.claim_amount}

onChange={handleChange}

required

/>

</div>




<div className="col-md-4">

<input

className="form-control"

placeholder="Reason"

name="reason"

value={formData.reason}

onChange={handleChange}

required

/>

</div>




<div className="col-md-4">

<select

className="form-select"

name="status"

value={formData.status}

onChange={handleChange}

>

<option>Pending</option>

<option>Approved</option>

<option>Rejected</option>

</select>


</div>




<div className="col-md-4">

<input

className="form-control"

type="date"

name="submission_date"

value={formData.submission_date}

onChange={handleChange}

/>

</div>



<div className="col-md-4">

<button className="btn btn-success w-100">

{editing ? "Update Claim" : "Add Claim"}

</button>

</div>



</div>


</form>


</div>

</div>






<div className="card shadow-lg border-0">


<div className="card-header bg-primary text-white">

<h3>
📋 Claims Management
</h3>

</div>




<div className="card-body">



<input

className="form-control mb-3"

placeholder="🔍 Search by Reason or Status..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>





<table className="table table-bordered table-hover">


<thead className="table-light">

<tr>

<th>ID</th>
<th>Policy ID</th>
<th>Amount</th>
<th>Reason</th>
<th>Status</th>
<th>Date</th>
<th>Actions</th>

</tr>

</thead>



<tbody>


{

currentClaims.map((claim)=>(


<tr key={claim.id}>


<td>{claim.id}</td>

<td>{claim.policy_id}</td>

<td>₹ {claim.claim_amount}</td>

<td>{claim.reason}</td>


<td>

<span className="badge bg-warning text-dark">

{claim.status}

</span>

</td>


<td>{claim.submission_date}</td>



<td>


<button

className="btn btn-warning btn-sm me-2"

onClick={()=>editClaim(claim)}

>

✏️ Edit

</button>



<button

className="btn btn-danger btn-sm"

onClick={()=>deleteClaim(claim.id)}

>

🗑 Delete

</button>


</td>



</tr>


))


}


</tbody>


</table>





<div className="d-flex justify-content-between">


<button

className="btn btn-outline-primary"

disabled={currentPage===1}

onClick={()=>setCurrentPage(currentPage-1)}

>

⬅ Previous

</button>




<span className="fw-bold">

Page {currentPage} of {totalPages || 1}

</span>




<button

className="btn btn-outline-primary"

disabled={currentPage===totalPages}

onClick={()=>setCurrentPage(currentPage+1)}

>

Next ➡

</button>


</div>



</div>

</div>



</div>

);


}


export default Claims;