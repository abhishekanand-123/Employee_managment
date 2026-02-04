import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function Dashboard() {
  useEffect(() => {
    /* ------------------------------------
      1. TRANSACTIONS CHART
    ------------------------------------ */
    const transactions = document.getElementById("transactions-chart");
    if (transactions) {
      new Chart(transactions, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Transactions",
              data: [20, 30, 25, 40, 32, 45, 50],
              borderColor: "#fb8c00",
              backgroundColor: "rgba(251,140,0,0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      2. SALES CHART A
    ------------------------------------ */
    const salesA = document.getElementById("sales-chart-a");
    if (salesA) {
      new Chart(salesA, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sales",
              data: [30, 40, 28, 60, 50, 70, 65],
              borderColor: "#1e88e5",
              backgroundColor: "rgba(30,136,229,0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      3. SALES ANALYTICS BARS
    ------------------------------------ */
    const salesB = document.getElementById("sales-chart-b");
    if (salesB) {
      new Chart(salesB, {
        type: "bar",
        data: {
          labels: Array(25).fill(""),
          datasets: [
            {
              label: "Analytics",
              data: Array(25)
                .fill()
                .map(() => Math.floor(Math.random() * 50)),
              backgroundColor: "#42a5f5",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      4. CPU CHART
    ------------------------------------ */
    const cpuChart = document.getElementById("cpu-chart");
    if (cpuChart) {
      new Chart(cpuChart, {
        type: "bar",
        data: {
          labels: Array(10).fill(""),
          datasets: [
            {
              data: [12, 20, 15, 30, 22, 28, 18, 25, 14, 20],
              backgroundColor: "#e53935",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      5. MEMORY CHART
    ------------------------------------ */
    const memoryChart = document.getElementById("memory-chart");
    if (memoryChart) {
      new Chart(memoryChart, {
        type: "bar",
        data: {
          labels: Array(10).fill(""),
          datasets: [
            {
              data: [20, 30, 25, 35, 18, 28, 24, 30, 26, 22],
              backgroundColor: "#26a69a",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      6. INCOME CHART (BIG ONE)
    ------------------------------------ */
    const income = document.getElementById("income-chart");
    if (income) {
      new Chart(income, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Register User",
              data: [100, 300, 200, 350, 250, 400],
              borderColor: "#8e24aa",
              backgroundColor: "rgba(142,36,170,0.15)",
              fill: true,
              tension: 0.4,
            },
            {
              label: "Premium User",
              data: [200, 350, 250, 380, 300, 420],
              borderColor: "#26a69a",
              backgroundColor: "rgba(38,166,154,0.15)",
              fill: true,
              tension: 0.4,
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      7. OVERALL SALES PIE CHART
    ------------------------------------ */
    const pie = document.getElementById("sales-chart-c");
    if (pie) {
      new Chart(pie, {
        type: "pie",
        data: {
          labels: ["Gross Sales", "Purchases", "Tax Return"],
          datasets: [
            {
              data: [492, 87, 882],
              backgroundColor: ["#8e24aa", "#fb8c00", "#43a047"],
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }

    /* ------------------------------------
      8. SALES STATISTICS BAR CHART
    ------------------------------------ */
    const salesD = document.getElementById("sales-chart-d");
    if (salesD) {
      new Chart(salesD, {
        type: "bar",
        data: {
          labels: ["2014", "2015", "2016", "2017", "2018", "2019"],
          datasets: [
            {
              label: "Sales A",
              data: [52, 40, 33, 47, 21, 50],
              backgroundColor: "#8e24aa",
            },
            {
              label: "Sales B",
              data: [22, 45, 23, 50, 15, 40],
              backgroundColor: "#fb8c00",
            },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    }
  }, []);

  return (
    <>
      <div className="row">
        {/* LEFT BLOCK */}
        <div className="col-xl-6 grid-margin stretch-card flex-column">
          <h5 className="mb-4">Status statistics</h5>

          {/* Transactions + Sales */}
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p className="mb-1">Transactions</p>
                  <h4>1352</h4>
                  <div style={{ height: "120px" }}>
                    <canvas id="transactions-chart"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <p>Sales • Orders • Revenue</p>
                  <div className="d-flex justify-content-between">
                    <h6>563</h6>
                    <h6>720</h6>
                    <h6>5900</h6>
                  </div>
                  <div style={{ height: "120px" }}>
                    <canvas id="sales-chart-a"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics + CPU + Memory */}
          <div className="row">
            <div className="col-md-6 stretch-card">
              <div className="card">
                <div className="card-body">
                  <h6>Sales Analytics</h6>
                  <div style={{ height: "100px" }}>
                    <canvas id="sales-chart-b"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 stretch-card">
              <div className="card">
                <div className="card-body">
                  <p>CPU 55%</p>
                  <div style={{ height: "110px" }}>
                    <canvas id="cpu-chart"></canvas>
                  </div>

                  <p className="mt-3">Memory 123,65</p>
                  <div style={{ height: "110px" }}>
                    <canvas id="memory-chart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK */}
        <div className="col-xl-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h5>Income statistics</h5>
              <div style={{ height: "260px" }}>
                <canvas id="income-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BLOCK */}
      <div className="row">
        {/* Pie Chart */}
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h6>Overall Sales</h6>
              <div style={{ height: "260px" }}>
                <canvas id="sales-chart-c"></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-xl-4">
          <div className="card newsletter-card bg-gradient-warning">
            <div className="card-body text-center text-white">
              <h4>Newsletter</h4>
              <input type="text" className="form-control mt-3" placeholder="email address" />
              <button className="btn btn-danger mt-3">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Sales Stats Bar */}
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h6>Sales Statistics</h6>
              <div style={{ height: "320px" }}>
                <canvas id="sales-chart-d"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
