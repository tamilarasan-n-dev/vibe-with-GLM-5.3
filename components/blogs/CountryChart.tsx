"use client";

import { useState, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const rawData = {
  "united states": 38786500,
  "india": 11391250,
  "brazil": 9207850,
  "united kingdom": 6673550,
  "france": 4463150,
  "canada": 4134100,
  "mexico": 3038300,
  "italy": 2586050,
  "australia": 2567550,
  "spain": 2513400,
  "germany": 2293050,
  "indonesia": 2281050,
  "netherlands": 1800900,
  "south africa": 1669700,
  "colombia": 1639650,
  "turkey": 1593700,
  "argentina": 1586600,
  "china": 1509400,
  "philippines": 1337400,
  "chile": 1214850,
  "peru": 992250,
  "malaysia": 964150,
  "pakistan": 956050,
  "belgium": 909550,
  "nigeria": 787050,
  "sweden": 764700,
  "portugal": 706950,
  "venezuela": 697250,
  "united arab emirates": 695100,
  "poland": 670550,
  "iran": 630050,
  "switzerland": 588900,
  "denmark": 578250,
  "singapore": 561750,
  "egypt": 532600,
  "ecuador": 511750,
  "romania": 510550,
  "saudi arabia": 505800,
  "ireland": 483500,
  "russia": 461400,
  "new zealand": 459850,
  "norway": 453600,
  "kenya": 443400,
  "bangladesh": 440600,
  "vietnam": 414850,
  "morocco": 408800,
  "czechia": 372150,
  "israel": 347950,
  "hong kong": 345100,
  "algeria": 336550,
  "thailand": 331550,
  "japan": 314300,
  "greece": 310700,
  "finland": 309350,
  "ukraine": 282150,
  "austria": 277650,
  "ghana": 272600,
  "hungary": 238950,
  "taiwan": 238850,
  "sri lanka": 230250,
  "tunisia": 216250,
  "costa rica": 211800,
  "niger": 209000,
  "serbia": 182950,
  "uruguay": 175100,
  "guatemala": 174050,
  "bulgaria": 152750,
  "dominican republic": 152150,
  "bolivia": 150250,
  "croatia": 148750,
  "puerto rico": 146400,
  "côte d'ivoire": 141050,
  "panama": 140050,
  "slovakia": 138200,
  "tanzania": 131200,
  "uganda": 130750,
  "jordan": 129500,
  "qatar": 126550,
  "nepal": 125200,
  "cameroon": 123650,
  "lebanon": 120150,
  "zimbabwe": 118200,
  "senegal": 111100,
  "el salvador": 103400,
  "paraguay": 99750,
  "iraq": 98450,
  "kuwait": 97200,
  "jamaica": 92050,
  "lithuania": 91150,
  "honduras": 91000,
  "ethiopia": 89400,
  "angola": 86550,
  "slovenia": 81650,
  "oman": 79700,
  "trinidad and tobago": 77850,
  "zambia": 75300,
  "nicaragua": 75250,
  "south korea": 73900,
  "democratic republic of the congo": 73650,
  "kazakhstan": 71900,
  "azerbaijan": 68500,
  "myanmar": 68250,
  "albania": 67150,
  "latvia": 67050,
  "mozambique": 62100,
  "cambodia": 59800,
  "cyprus": 58450,
  "luxembourg": 56600,
  "botswana": 55700,
  "afghanistan": 52850,
  "sudan": 52750,
  "bosnia and herzegovina": 51850,
  "belarus": 51250,
  "iceland": 50350,
  "bahrain": 50050,
  "mauritius": 49000,
  "estonia": 48950,
  "macedonia": 48350,
  "syria": 48300,
  "namibia": 43800,
  "malta": 43350,
  "madagascar": 40000,
  "cuba": 39600,
  "benin": 39500,
  "burkina faso": 38650,
  "rwanda": 38550,
  "papua new guinea": 36000,
  "moldova": 35800,
  "armenia": 35200,
  "haiti": 35050,
  "palestine": 34450,
  "mali": 34300,
  "malawi": 30650,
  "libya": 30350,
  "fiji": 29900,
  "togo": 29050,
  "mongolia": 27450,
  "bahamas": 27400,
  "montenegro": 25300,
  "yemen": 25250,
  "réunion": 24700,
  "gabon": 24650,
  "uzbekistan": 23950,
  "barbados": 20650,
  "guinea": 19950,
  "guadeloupe": 17750,
  "maldives": 17500,
  "macau": 17100,
  "somalia": 16650,
  "suriname": 14600,
  "liberia": 14550,
  "laos": 14350,
  "martinique": 14250,
  "netherlands antilles": 13750,
  "sierra leone": 13350,
  "bermuda": 13350,
  "brunei": 13000,
  "bhutan": 12450,
  "kyrgyzstan": 12100,
  "new caledonia": 12100,
  "swaziland": 12050,
  "gambia": 11600,
  "lesotho": 11300,
  "guyana": 11250,
  "cape verde": 11000,
  "mauritania": 10950,
  "belize": 10250,
  "burundi": 9550,
  "aruba": 9500,
  "kosovo": 9300,
  "guam": 9250,
  "jersey": 8650,
  "french polynesia": 8550,
  "saint lucia": 7700,
  "monaco": 7600,
  "andorra": 7600,
  "cayman islands": 7550,
  "chad": 7400,
  "djibouti": 6950,
  "isle of man": 6350,
  "french guiana": 5900,
  "seychelles": 5650,
  "american samoa": 5600,
  "south sudan": 5500,
  "antigua and barbuda": 5450,
  "guernsey": 5400,
  "grenada": 5250,
  "turkmenistan": 5150,
  "tajikistan": 5000,
  "central african republic": 5000,
  "gibraltar": 4300,
  "equatorial guinea": 4150,
  "saint vincent and the grenadines": 4150,
  "turks and caicos islands": 4150,
  "liechtenstein": 3700,
  "saint kitts and nevis": 3350,
  "vanuatu": 3200,
  "faroe islands": 3100,
  "dominica": 3000,
  "comoros": 2750,
  "greenland": 2700,
  "solomon islands": 2650,
  "mayotte": 2600,
  "Åland islands": 2500,
  "guinea-bissau": 2500,
  "tuvalu": 2450,
  "san marino": 2400,
  "british virgin islands": 2250,
  "anguilla": 2150,
  "micronesia": 1900,
  "northern mariana islands": 1800,
  "tonga": 1700,
  "timor-leste": 1700,
  "u.s. virgin islands": 1650,
  "republic of the congo": 1650,
  "antarctica": 1600,
  "marshall islands": 1600,
  "eritrea": 1550,
  "kiribati": 1550,
  "são tomé and príncipe": 1550,
  "samoa": 1400,
  "curaçao": 950,
  "palau": 800,
  "georgia": 750,
  "cook islands": 750,
  "vatican city": 600,
  "svalbard and jan mayen": 500,
  "wallis and futuna": 500,
  "christmas island": 450,
  "western sahara": 450,
  "saint helena": 450,
  "tokelau": 350,
  "french southern territories": 350,
  "montserrat": 350,
  "norfolk island": 300,
  "saint pierre and miquelon": 300,
  "niue": 300,
  "pitcairn": 250,
  "cocos (keeling) islands": 250,
  "falkland islands": 250,
  "nauru": 250,
  "bouvet island": 250,
  "british indian ocean territory": 200,
  "saint barthélemy": 50,
  "caribbean netherlands": 50,
  "north korea": 50,
  "south georgia and the south sandwich islands": 50,
};

const CountryChart = () => {
  const [page, setPage] = useState(0);
  const pageSize = 5;

  const sortedData = useMemo(() => {
    return Object.entries(rawData).sort((a, b) => b[1] - a[1]);
  }, []);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const currentData = sortedData.slice(page * pageSize, (page + 1) * pageSize);
  const labels = currentData.map(([k]) => k);
  const values = currentData.map(([, v]) => v);

  const data = {
    labels,
    datasets: [
      {
        label: "Population/Value",
        data: values,
        backgroundColor: "rgba(153, 102, 255, 0.8)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Country Distribution",
        color: "#374151",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
      y: {
        ticks: {
          color: "#4b5563",
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage((p) => p - 1);
  };

  return (
    <div className="chart-container country-chart">
      <Bar data={data} options={options} />
      <div className="controls">
        <button onClick={handlePrev} disabled={page === 0}>
          Previous
        </button>
        <span className="page-info">
          Page {page + 1} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CountryChart;
