import { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [claims, setClaims] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const customersRes = await axios.get(
        "http://127.0.0.1:5000/customers"
      );

      const policiesRes = await axios.get(
        "http://127.0.0.1:5000/policies"
      );

      const claimsRes = await axios.get(
        "http://127.0.0.1:5000/claims"
      );

      const paymentsRes = await axios.get(
        "http://127.0.0.1:5000/payments"
      );

      setCustomers(customersRes.data);
      setPolicies(policiesRes.data);
      setClaims(claimsRes.data);
      setPayments(paymentsRes.data);

    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };


  const totalRevenue = payments.reduce(
    (sum, item) => sum + Number(item.amount || item.premium_amount || 0),
    0
  );


  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
    ],

    datasets: [
      {
        label: "Premium Revenue",
        data: [
          12000,
          18000,
          15000,
          22000,
          26000,
          totalRevenue || 30000,
        ],

        tension: 0.4,
      },
    ],
  };


  const policyTypes = {};

  policies.forEach((policy) => {
    const type = policy.policy_type || "Other";

    policyTypes[type] =
      (policyTypes[type] || 0) + 1;
  });


  const pieData = {
    labels: Object.keys(policyTypes).length
      ? Object.keys(policyTypes)
      : ["Health", "Life", "Vehicle"],

    datasets: [
      {
        label: "Policies",

        data: Object.values(policyTypes).length
          ? Object.values(policyTypes)
          : [40, 30, 30],
      },
    ],
  };


  return (
    <div
      style={{
        padding: "25px",
        background: "#f8faff",
        minHeight: "100vh",
      }}
    >

      <h1
        style={{
          color: "#374151",
          marginBottom: "25px",
        }}
      >
        Insurance Dashboard
      </h1>


      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >

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



      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "25px",
          marginTop: "35px",
        }}
      >

        <div
          style={{
            background:"#ffffff",
            padding:"25px",
            borderRadius:"20px",
            boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >

          <h3>
            📈 Monthly Premium Revenue
          </h3>

          <Line data={lineData}/>

        </div>



        <div
          style={{
            background:"#ffffff",
            padding:"25px",
            borderRadius:"20px",
            boxShadow:
            "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >

          <h3>
            🥧 Policy Distribution
          </h3>

          <Pie data={pieData}/>

        </div>

      </div>


    </div>
  );
}



function Card({title,value,icon}){

  return(

    <div
      style={{
        background:"#ffffff",
        padding:"25px",
        borderRadius:"20px",
        boxShadow:
        "0 8px 25px rgba(0,0,0,0.08)",
        transition:"0.3s",
      }}
    >

      <div
        style={{
          fontSize:"35px"
        }}
      >
        {icon}
      </div>


      <h3
        style={{
          color:"#6b7280"
        }}
      >
        {title}
      </h3>


      <h1
        style={{
          color:"#2563eb"
        }}
      >
        {value}
      </h1>


    </div>

  );
}


export default Dashboard;