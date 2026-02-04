import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartJs = () => {
  const lineRef = useRef(null);
  const barRef = useRef(null);
  const areaRef = useRef(null);
  const doughnutRef = useRef(null);
  const pieRef = useRef(null);
  const scatterRef = useRef(null);

  useEffect(() => {
    // Line Chart
    new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Sales",
            data: [12, 19, 3, 17, 28, 24],
            borderColor: "rgb(75, 192, 192)",
            fill: false,
            tension: 0.4,
          },
        ],
      },
    });

    // Bar Chart
    new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255, 99, 132)",
              "rgba(54, 162, 235)",
              "rgba(255, 206, 86)",
              "rgba(75, 192, 192)",
            ],
          },
        ],
      },
    });

    // Area Chart
    new Chart(areaRef.current, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Revenue",
            data: [3, 2, 2, 6, 4],
            backgroundColor: "rgba(153,102,255,0.5)",
            borderColor: "rgba(153,102,255)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
    });

    // Doughnut Chart
    new Chart(doughnutRef.current, {
      type: "doughnut",
      data: {
        labels: ["Sales", "Orders", "Revenue"],
        datasets: [
          {
            data: [300, 500, 200],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
          },
        ],
      },
    });

    // Pie Chart
    new Chart(pieRef.current, {
      type: "pie",
      data: {
        labels: ["Gross", "Purchases", "Tax"],
        datasets: [
          {
            data: [492, 87000, 882],
            backgroundColor: ["#8e44ad", "#f39c12", "#2ecc71"],
          },
        ],
      },
    });

    // Scatter Chart
    new Chart(scatterRef.current, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Scatter Dataset",
            data: [
              { x: -10, y: 0 },
              { x: -5, y: 5 },
              { x: 0, y: 10 },
              { x: 5, y: 5 },
              { x: 10, y: 0 },
            ],
            backgroundColor: "rgb(255, 99, 132)",
          },
        ],
      },
    });
  }, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper">

        <div className="row">
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Line chart</h4>
                <canvas ref={lineRef}></canvas>
              </div>
            </div>
          </div>

          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Bar chart</h4>
                <canvas ref={barRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd Row */}
        <div className="row">
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Area chart</h4>
                <canvas ref={areaRef}></canvas>
              </div>
            </div>
          </div>

          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Doughnut chart</h4>
                <canvas ref={doughnutRef}></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* 3rd Row */}
        <div className="row">
          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Pie chart</h4>
                <canvas ref={pieRef}></canvas>
              </div>
            </div>
          </div>

          <div className="col-lg-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Scatter chart</h4>
                <canvas ref={scatterRef}></canvas>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartJs;
