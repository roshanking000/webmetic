import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import infoIcon from "../assets/images/info.svg";

const VisitorsSourcesChart = ({ data, showVisitorSourceData }) => {
  const { t } = useTranslation();

  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data !== null && data.length > 0) {
      const seriesArray = [];
      const categoryArray = [];
      for (let i = 0; i < data.length; i++) {
        seriesArray.push(data[i].count);
        categoryArray.push(data[i].source);
      }

      setSeries([
        {
          name: t('dashboard.count'),
          color: "#2F78EE",
          data: seriesArray,
        },
      ]);

      setOptions({
        chart: {
          type: "bar",
          width: "100%",
          height: "75%",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: "100%",
            borderRadiusApplication: "end",
            borderRadius: 5,
            dataLabels: {
              position: "top",
            },
          },
        },
        legend: {
          show: true,
          position: "bottom",
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          shared: true,
          intersect: false,
          formatter: function (value) {
            return value;
          },
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-sm text-[#687588]",
            },
            formatter: function (value) {
              return value;
            },
          },
          categories: categoryArray,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: "Inter, sans-serif",
              cssClass: "text-sm text-[#687588]",
            },
          },
        },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: {
            left: 20,
            right: 20,
            top: -20,
          },
        },
        fill: {
          opacity: 1,
        },
      });
    }
  }, [data]);

  return (
    <div className="flex flex-col p-6 w-full rounded-2xl border border-dashboard">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold text-title">{t('dashboard.visitorssources')}</p>
      </div>
      {/* <div className="flex items-center gap-[13px] py-2">
        <img alt="website" src={websiteLinkIcon} />
        <p className="text-sm text-main">{selectedDomain[0]}</p>
      </div> */}

      <div className={clsx(showVisitorSourceData === true ? "" : "hidden")}>
        <>
          <Chart height={320} options={options} series={series} type="bar" />
          <div className="flex items-center gap-3">
            <img alt="info" className="w-3 h-3" src={infoIcon} />
            <p className="text-xs text-greyscale">
              {t('dashboard.info')}
            </p>
          </div>
        </>
      </div>
      {showVisitorSourceData === false && (
        <div className="flex h-full items-center justify-center bg-gray-300 rounded-2xl animate-pulse">
          <p>{data?.length === 0 ? t('dashboard.nodata') : ""}</p>
        </div>
      )}
    </div>
  );
};

export default VisitorsSourcesChart;
