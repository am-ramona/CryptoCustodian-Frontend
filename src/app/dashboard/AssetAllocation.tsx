import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { IBM_Plex_Mono } from 'next/font/google'
import useIntersectionObserver from '../hooks/useIntersectionObserver'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
interface DataItem {
    tokenSymbol: string;
    allocation: number | null;
  }
  
  interface BarChartProps {
    assetsAllocated: DataItem[];
    width?: string | number;  // Optional width prop
    height?: string | number; // Optional height prop
  }

const AssetAllocationVisual: React.FC<BarChartProps> = ({ assetsAllocated,  width = '100%', height = 400  }) => {
    // const [isVisible, elementRef] = useIntersectionObserver({
    //     threshold: 0.1, // Adjust threshold as needed
    //   });
      
    // Filter out items with null allocation
    const filteredData = assetsAllocated.filter(item => item.allocation !== null) as DataItem[];

    const chartData = {
        labels: filteredData.map(item => item.tokenSymbol),
        datasets: [
            {
                label: 'Allocation',
                data: filteredData.map(item => item.allocation),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true, // Disable aspect ratio to allow custom width/height
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.dataset.label}: ${context.raw}`;
                    },
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: false,
                    maxRotation: 90,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return  <Bar data={chartData} options={options} />
    // (
    //     <div ref={elementRef} style={{ minHeight: height, margin: '30px 0' }}>
    //   {isVisible ? (
       
    // ): null} </div>)

};

export default AssetAllocationVisual
