import { useEffect, useRef } from "react";
import "./Dashboard.css";
import {
  faCircleCheck,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/CPECB-Logo.png";
import { Chart } from "chart.js/auto";

export default function Dashboard() {
  const monthlyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const monthlyChartRef = useRef<Chart<"bar"> | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"pie"> | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const genderData = {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: [15, 8],
            backgroundColor: ["rgb(2, 62, 138)", "rgb(255, 99, 132)"],
          },
        ],
      };

      chartRef.current = new Chart(canvasRef.current, {
        type: "pie",
        data: genderData,
      });
    }
    if (monthlyCanvasRef.current) {
      if (monthlyChartRef.current) {
        monthlyChartRef.current.destroy();
      }

      const monthlyData = {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Number of Renewals",
            data: [10, 15, 8, 12, 20, 14, 18, 22, 16, 13, 19, 25], // Replace with your actual data
            backgroundColor: "rgb(75, 192, 192)",
          },
        ],
      };

      monthlyChartRef.current = new Chart(monthlyCanvasRef.current, {
        type: "bar",
        data: monthlyData,
      });
    }
  }, []);

  return (
    <div className="row vh-100 p-0 m-0">
      <div className="sidebar col-sm-2 text-center border-end">
        <img src={logo} className="logo img-fluid" />
        <div className="pt-5">
          <button className="btn side-btn w-100 py-2 my-3 fs-5">Home</button>
          <button className="btn side-btn w-100 py-2 my-3 fs-5">
            Renewals
          </button>
        </div>
      </div>
      <div className="col-sm-10 bg-light">
        <div className="py-3 row">
          <div className="col">
            <div className="card rounded-4 border border-2">
              <div className="card-body">
                <p className="card-title fs-2">
                  <FontAwesomeIcon icon={faFileLines} /> New Renewals
                </p>
                <p className="card-text text-center fs-1">
                  <span>23</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-4 border border-2">
              <div className="card-body">
                <p className="card-title fs-2">
                  <FontAwesomeIcon icon={faPeopleGroup} /> Current Batch
                </p>
                <p className="card-text fs-1 text-center">
                  <span>8</span>
                </p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card rounded-4 border border-2">
              <div className="card-body">
                <p className="card-title fs-2">
                  <FontAwesomeIcon icon={faCircleCheck} /> Total Renewals
                </p>
                <p className="card-text fs-1 text-center">
                  <span>315</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="row p-5 d-flex align-items-center">
            <div className="col-sm-8 p-5">
              <canvas
                className="rounded-4 p-3 bg-white"
                ref={monthlyCanvasRef}
                id="monthlyBarChart"
              ></canvas>
            </div>
            <div className="col-sm-4 p-5">
              <canvas
                className="pieCanvas rounded-4 p-3 bg-white"
                ref={canvasRef}
                id="genderPieChart"
              ></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
