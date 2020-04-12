import React, { useEffect, useState } from 'react';
import nasaData from '../nasaTempData.csv';
import { Line } from 'react-chartjs-2';

// Data from https://data.giss.nasa.gov/gistemp/



function TempChart() {
    const [yearLabel, setYearLabel] = useState([]);
    const [yearTemp, setYearTemp] = useState([]);
    
    const data = {
        labels: yearLabel,
        datasets: [
          {
            label: 'Combined Land-Ocean Temperature Index in C°',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: yearTemp,
          },
        ],
      };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(nasaData);
      const data = await response.text();
      const table = data.split('\n').slice(1);
      table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        const temp = columns[1];
        setYearLabel(yearLabel => [...yearLabel, year])
        setYearTemp(yearTemp => [...yearTemp, parseFloat(temp) + 14])
      });
    };
    getData();
  }, []);

 

  return (
    <div>
      <h2>Global and Hemispheric Monthly Means</h2>
      <p>1880-present, updated through most recent complete year</p>
      <Line data={data} />
      <br />
      <p>Data source: <a href="https://data.giss.nasa.gov/gistemp/">NASA</a></p>
    </div>
  );
}

export default TempChart;
