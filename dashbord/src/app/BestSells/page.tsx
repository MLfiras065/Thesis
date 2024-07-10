"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';

const DoughnutChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Doughnut), {
  ssr: false,
});
const LineChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});
const BarChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false,
});
const PolarAreaChart = dynamic(() => import('react-chartjs-2').then((mod) => mod.PolarArea), {
  ssr: false,
});

const doughnutData = {
  labels: ['House', 'Apartment', 'Traditional House', 'Guest House'],
  datasets: [
    {
      label: 'Best Selling',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(0, 123, 255, 0.6)', 
        'rgba(255, 0, 0, 0.6)',   
        'rgba(255, 215, 0, 0.6)', 
        'rgba(255, 192, 203, 0.6)'
      ],
      borderColor: [
        'rgba(0, 123, 255, 1)', 
        'rgba(255, 0, 0, 1)',   
        'rgba(255, 215, 0, 1)', 
        'rgba(255, 192, 203, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const lineData = {
  labels: ['January', 'February', 'July', 'June', 'May', 'April'],
  datasets: [
    {
      label: 'Most Hectic Time  ',
      data: [65, 59, 80, 81, 56, 55],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
};

const barData = {
  labels: ['Category A', 'Category B', 'Category C', 'Category D'],
  datasets: [
    {
      label: 'Sales Comparison',
      data: [30, 40, 25, 35],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const polarAreaData = {
  labels: [ 'Male', 'Female'],
  datasets: [
    {
      label: 'Average Score',
      data: [5, 7, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

const BestSellingCharts = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {/* Doughnut Chart */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Most Popular Accommodation Types
          </div>
          <div className="p-4">
            <div className="h-80">
              <DoughnutChart data={doughnutData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Most  porperty  Exists</h2>
            <ul className="list-disc list-inside">
              <li>Apartments are the most popular accommodation type.</li>
              <li>Houses follow closely behind in popularity.</li>
              <li>Traditional houses and guest houses have lower popularity compared to others.</li>
            </ul>
          </div>
        </div>
        
        {/* Line Chart */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
             Booking
          </div>
          <div className="p-4">
            <div className="h-80">
              <LineChart data={lineData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Monthly Booking Overview</h2>
            <p className="text-gray-700">
              Analyze the Booking trend month-over-month to identify growth patterns.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              View Detailed Report
            </button>
          </div>
        </div>

        {/* Bar Chart */}
        {/* <div className="bg-white shadow-lg rounded-lg overflow-hidden"> */}
          {/* <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Sales Comparison by Category
          </div>
          <div className="p-4">
            <div className="h-80">
              <BarChart data={barData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Category Sales Breakdown</h2>
            <p className="text-gray-700">
              Compare sales performance across different product categories.
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              View Detailed Report
            </button>
          </div>
        </div> */}

        {/* Polar Area Chart */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center font-bold text-lg">
            Average Score by Gender
          </div>
          <div className="p-4">
            <div className="h-80">
              <PolarAreaChart data={polarAreaData} />
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Gender Average </h2>
            <p className="text-gray-700">
              View average scores for different gender
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              View Detailed Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellingCharts;
