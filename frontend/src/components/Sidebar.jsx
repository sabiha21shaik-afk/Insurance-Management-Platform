import { Link, useLocation } from "react-router-dom";


function Sidebar() {


  const location = useLocation();



  const menus = [


    {
      name:"Dashboard",
      icon:"📊",
      path:"/"
    },


    {
      name:"Customers",
      icon:"👥",
      path:"/customers"
    },


    {
      name:"Policies",
      icon:"📜",
      path:"/policies"
    },


    {
      name:"Premiums",
      icon:"💳",
      path:"/premiums"
    },


    {
      name:"Claims",
      icon:"📝",
      path:"/claims"
    },


    {
      name:"Documents",
      icon:"📁",
      path:"/documents"
    },


    {
      name:"Reports",
      icon:"📄",
      path:"/reports"
    }


  ];





return (


<div


style={{


width:"270px",


minHeight:"100vh",


background:
"linear-gradient(180deg,#183B6B,#2563EB)",


color:"#fff",


display:"flex",


flexDirection:"column",


justifyContent:"space-between",


padding:"24px 18px",


boxShadow:
"8px 0 30px rgba(0,0,0,.12)"


}}


>



<div>



<div

style={{

display:"flex",

alignItems:"center",

gap:"14px",

marginBottom:"40px"

}}

>


<div

style={{

width:"60px",

height:"60px",

borderRadius:"18px",

background:"rgba(255,255,255,.18)",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"32px"

}}

>

🛡️

</div>




<div>

<h4

style={{

margin:0,

fontWeight:"700"

}}

>

Insurance

</h4>


<small

style={{

color:"#D7E5FF"

}}

>

Management Platform

</small>


</div>


</div>







{

menus.map((menu)=>{


const active =
location.pathname===menu.path;



return(


<Link


key={menu.path}


to={menu.path}



style={{


display:"flex",


alignItems:"center",


gap:"14px",


textDecoration:"none",


padding:"14px 18px",


marginBottom:"12px",


borderRadius:"16px",


transition:"0.3s",


background:


active

?

"rgba(255,255,255,.95)"

:

"transparent",



color:


active

?

"#183B6B"

:

"#EAF2FF",



fontWeight:


active

?

"700"

:

"500"


}}



onMouseEnter={(e)=>{


if(!active){


e.currentTarget.style.background=
"rgba(255,255,255,.15)";


e.currentTarget.style.transform=
"translateX(6px)";


}


}}




onMouseLeave={(e)=>{


if(!active){


e.currentTarget.style.background=
"transparent";


e.currentTarget.style.transform=
"translateX(0)";


}


}}



>


<span

style={{

fontSize:"24px"

}}

>

{menu.icon}

</span>


{menu.name}


</Link>


);


})


}



</div>







<div

style={{


background:"rgba(255,255,255,.12)",


borderRadius:"18px",


padding:"18px",


border:
"1px solid rgba(255,255,255,.15)"


}}

>


<h6

style={{

fontWeight:"700"

}}

>

🚀 Enterprise Edition

</h6>



<small

style={{


color:"#E0ECFF",


lineHeight:"1.5"


}}

>

Secure insurance management with analytics, reports and smart dashboard insights.

</small>


</div>



</div>


);


}


export default Sidebar;