import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale, 
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  layout: {
    padding: 20,
  },
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const randomizer = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const labels = ['October'];

const data = {
  labels,
  datasets: [
    {
      label: 'Meat',
      data: labels.map(() => randomizer(0, 300)),
      borderColor: 'rgb(255,0,0)',
      backgroundColor: 'rgba(255,0,0, 0.8)',
    },
    {
      label: 'Vegetable',
      data: labels.map(() => randomizer(0, 300)),
      borderColor: 'rgb(11, 212, 14)',
      backgroundColor: 'rgba(11, 212, 14, 0.5)',
    },
  ],
};

export default function MonthlyExpenditure() {

    

    return (
        <>
        <div className="container border border-black p-3">
            <div className="flex flex-col">
            
                <p className="uppercase font-bold">This Month's Expenditure</p>

                <p>October 2023</p>
                <div className='flex flex-col'>
                    <Bar options={options} data={data} />    
                </div>
                    
                
            </div>
        </div>
        </>
    )
}