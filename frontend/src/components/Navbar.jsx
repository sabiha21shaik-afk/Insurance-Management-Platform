function Navbar() {

  const today = new Date().toLocaleDateString("en-IN", {
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric",
  });


  return (

    <div

    style={{

      height:"85px",

      background:"#ffffff",

      borderRadius:"22px",

      padding:"0 30px",

      display:"flex",

      alignItems:"center",

      justifyContent:"space-between",

      boxShadow:
      "0 12px 30px rgba(15,23,42,.08)",

      marginBottom:"28px"

    }}

    >



      <div>

        <h3

        style={{

          margin:0,

          color:"#183B6B",

          fontWeight:"800"

        }}

        >

          Welcome Back 👋

        </h3>


        <small

        style={{

          color:"#64748B"

        }}

        >

          {today}

        </small>


      </div>







      <div

      style={{

        display:"flex",

        alignItems:"center",

        gap:"18px"

      }}

      >



        <div

        style={{

          background:"#F8FAFC",

          border:"1px solid #E5E7EB",

          borderRadius:"14px",

          padding:"10px 18px",

          display:"flex",

          alignItems:"center",

          gap:"8px"

        }}

        >

          🔍

          <input

          type="text"

          placeholder="Search..."

          style={{

            border:"none",

            outline:"none",

            background:"transparent",

            width:"220px"

          }}

          />


        </div>







        <button

        style={{

          width:"46px",

          height:"46px",

          borderRadius:"14px",

          border:"none",

          background:"#EEF4FF",

          fontSize:"20px",

          cursor:"pointer",

          transition:"0.3s"

        }}



        onMouseEnter={(e)=>{

          e.currentTarget.style.transform=
          "scale(1.1)";

        }}



        onMouseLeave={(e)=>{

          e.currentTarget.style.transform=
          "scale(1)";

        }}

        >

          🔔

        </button>







        <div

        style={{

          display:"flex",

          alignItems:"center",

          gap:"12px"

        }}

        >



          <div

          style={{

            width:"50px",

            height:"50px",

            borderRadius:"50%",

            background:
            "linear-gradient(135deg,#2563EB,#7C3AED)",

            color:"#fff",

            display:"flex",

            alignItems:"center",

            justifyContent:"center",

            fontSize:"20px",

            fontWeight:"800"

          }}

          >

            S

          </div>





          <div>

            <div

            style={{

              fontWeight:"700",

              color:"#1E293B"

            }}

            >

              Sabiroon

            </div>


            <small

            style={{

              color:"#64748B"

            }}

            >

              Administrator

            </small>


          </div>



        </div>



      </div>



    </div>

  );

}


export default Navbar;