import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const MostVisitedPagesChart = ({
  data,
  showVisitedPagesData,
}) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data !== null && data.length > 0) {
      const countArray = [];
      const titleArray = [];
      for (let i = 0; i < data.length; i++) {
        countArray.push(data[i].count);
        titleArray.push(getDisplayString(data[i].title, 6, 0));
      }

      setSeries([
        {
          name: "",
          type: "column",
          data: countArray,
          color: "#2F78EE",
        },
        {
          name: "",
          type: "line",
          data: countArray,
          color: "#E697FF",
        },
      ]);

      setOptions({
        chart: {
          height: "300px",
          maxWidth: "100%",
          type: "line",
          fontFamily: "Inter, sans-serif",
          dropShadow: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "50%",
            borderRadiusApplication: "end",
            borderRadius: 5,
          },
        },
        tooltip: {
          enabled: false,
          x: {
            show: false,
          },
          y: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -26,
          },
        },
        legend: {
          show: false,
        },
        stroke: {
          width: [0, 3],
        },
        xaxis: {
          categories: titleArray,
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-[10px] font-normal text-[#446698]",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          show: false,
        },
      });
    }
  }, [data]);

  const getDisplayString = (str, subLength1, subLength2) => {
    if (str === null || str === undefined) return "";
    return `${str.toString().substr(0, subLength1)}...${str
      .toString()
      .substr(str.length - subLength2, str.length)}`;
  };

  return (
    <React.StrictMode>
      <div className="flex flex-col p-6 w-full rounded-2xl border border-dashboard">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-title">{t('dashboard.mostvisitedpages')}</p>
        </div>

        <div className={clsx(showVisitedPagesData === true ? "" : "hidden")}>
          <Chart height={300} options={options} series={series} type="line" />
        </div>
        {showVisitedPagesData === false && (
          <div className="flex h-full items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
            <p>{data?.length === 0 ? t('dashboard.nodata') : ""}</p>
          </div>
        )}

        {showVisitedPagesData === true && (
          <div className="flex flex-col gap-[10px]">
            {data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="min-w-[10px] min-h-[10px] rounded-full bg-[#2F78EE]"></div>
                    <p className="text-xs text-greyscale">{item.title}</p>
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
    </React.StrictMode>
  );
};

export default MostVisitedPagesChart;
