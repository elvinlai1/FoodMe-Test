import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const randomizer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
  const labels = ['January','Febraury','March','April','May','June','July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Meat',
        data: labels.map(() => randomizer(0, 1000)),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Vegetable',
        data: labels.map(() => randomizer(0, 1000)),
        borderColor: 'rgb(11, 212, 14)',
        backgroundColor: 'rgba(11, 212, 14, 0.5)',
      },
    ],
  };
  
  export default function HistoricalMonthlyExpenditure() {
  
      
  
      return (
          <>
          <div className="container border border-black p-3">
              <div className="flex flex-col">
              
                  <p className="uppercase font-bold">Monthly Expenditure</p>
  
                  <p>October 2023</p>
                  <div className='flex flex-col h-96 items-center '>
                      <Line options={options} data={data} />    
                  </div>
                      
                  
              </div>
          </div>
          </>
      )
  }