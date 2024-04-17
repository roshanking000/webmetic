import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import { colorArray } from "../constants";

const VisitorsLocationChart = ({
  data,
  showVisitorsLocationData
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data !== null && data.length > 0) {
      let totalCount = 0;
      for (let i = 0; i < data.length; i++) totalCount += data[i].count;

      const seriesArray = [];
      const colorsArray = [];
      const labelsArray = [];
      for (let i = 0; i < data.length; i++) {
        seriesArray.push(
          parseInt(((data[i].count / totalCount) * 100).toFixed(0))
        );
        colorsArray.push(colorArray[i]);
        labelsArray.push(data[i].city);
      }

      setSeries(seriesArray);

      setOptions({
        colors: colorsArray,
        chart: {
          height: "320px",
          width: "100%",
          type: "pie",
        },
        stroke: {
          colors: ["white"],
          lineCap: "",
        },
        plotOptions: {
          pie: {
            labels: {
              show: true,
            },
            size: "100%",
            dataLabels: {
              offset: -25,
            },
          },
        },
        labels: labelsArray,
        dataLabels: {
          enabled: true,
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        legend: {
          show: false,
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value + "%";
            },
          },
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value + "%";
            },
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col p-6 w-full rounded-2xl border border-dashboard">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-title">{t('dashboard.visitorslocation')}</p>
      </div>
      <div className={clsx(showVisitorsLocationData === true ? "" : "hidden")}>
        <Chart height={320} options={options} series={series} type="pie" />
      </div>
      {showVisitorsLocationData === false && (
        <div className="flex h-full items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
          <p>{data?.length === 0 ? t('dashboard.nodata') : ""}</p>
        </div>
      )}

      {showVisitorsLocationData === true && (
        <div className="flex flex-col gap-5">
          {data.map((item, index) => {
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={clsx(
                      "w-[10px] h-[10px] rounded-full",
                      index === 0
                        ? "bg-[#27A376]"
                        : index === 1
                        ? "bg-[#FBDB64]"
                        : index === 2
                        ? "bg-[#2F78EE]"
                        : "bg-[#FA5A9E]"
                    )}
                  ></div>
                  <p className="text-xs text-greyscale">{item.city}</p>
                </div>
                <p className="text-sm font-bold text-overview-value">
                  {item.count}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VisitorsLocationChart;
