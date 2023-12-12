import { useEffect, useRef } from "react";
import "./Dashboard.css";
import {
  faCircleCheck,
  faFileLines,
} from "@fortawesome/free-regular-svg-icons";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chart } from "chart.js/auto";
import {
  useAllRenewedDemographics,
  useGenderDemographics,
  useRegisteredDemographics,
  useRenewedDemographics,
} from "../../services/api/demographics";

export default function Dashboard() {
  const { data: gender_count } = useGenderDemographics();
  const { data: all_renewed_count_months } = useAllRenewedDemographics();
  const { data: renewed_count_months } = useRenewedDemographics();
  const { data: register_count_months } = useRegisteredDemographics();

  const monthlyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const monthlyChartRef = useRef<Chart<"bar"> | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart<"pie"> | null>(null);

  const months = Object.keys(renewed_count_months?.data || {}).map((key) => {
    return key;
  });
  const all_renewal_counts = Object.values(
    all_renewed_count_months?.data || {}
  ).map((value) => {
    return value;
  });
  const renewal_counts = Object.values(renewed_count_months?.data || {}).map(
    (value) => {
      return value;
    }
  );
  const register_counts = Object.values(register_count_months?.data || {}).map(
    (value) => {
      return value;
    }
  );

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const genderData = {
        labels: ["Male", "Female"],
        datasets: [
          {
            data: [
              Number(gender_count?.data.male),
              Number(gender_count?.data.female),
            ],
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
        labels: months,
        datasets: [
          {
            label: "Number of Renewals",
            data: renewal_counts,
            backgroundColor: "rgb(75, 192, 192)",
          },
        ],
      };

      monthlyChartRef.current = new Chart(monthlyCanvasRef.current, {
        type: "bar",
        data: monthlyData,
      });
    }
  }, [gender_count, months, renewal_counts]);

  const new_renewals_count = renewal_counts[renewal_counts.length - 1];
  const new_register_count = register_counts[register_counts.length - 1];
  const all_register_count = all_renewal_counts[all_renewal_counts.length - 1];

  return (
    <div className="bg-light p-2">
      <div className="py-3 row">
        <div className="col">
          <div className="card rounded-4 border border-2 border-info">
            <div className="card-body">
              <p className="card-title fs-2">
                <FontAwesomeIcon icon={faFileLines} /> New Renewals
              </p>
              <p className="card-text text-center fs-1">
                <span>{new_renewals_count}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card rounded-4 border border-2 border-primary">
            <div className="card-body">
              <p className="card-title fs-2">
                <FontAwesomeIcon icon={faPeopleGroup} /> New Register
              </p>
              <p className="card-text fs-1 text-center">
                <span>{new_register_count}</span>
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card rounded-4 border border-2 border-success">
            <div className="card-body">
              <p className="card-title fs-2">
                <FontAwesomeIcon icon={faCircleCheck} /> Total Renewals
              </p>
              <p className="card-text fs-1 text-center">
                <span>{all_register_count}</span>
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
  );
}
