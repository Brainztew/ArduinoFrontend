import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TempStamp {
    temp: string;
    tempDate: string;
    humidity: string;
}

const Readings = () => {
    const [tempStamp, setTempStamp] = useState<TempStamp[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await fetch('http://192.168.0.215:3000/temp');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTempStamp(data);
            } catch (error) {
                console.error('There was an error!', error);
                setError('Fel vid hämtning av data!');
            }
        };
        fetchReadings();
    }, []);

    if(error) {
        return <p>ERROR: {error}</p>;
    }

    const sortedTempStamp = [...tempStamp].sort((a, b) => new Date(a.tempDate).getTime() - new Date(b.tempDate).getTime());

    const tempChartData = {
        labels: sortedTempStamp.map(tempStamp => tempStamp.tempDate),
        datasets: [
            {
                label: 'Temperatur',
                data: sortedTempStamp.map(tempStamp => parseFloat(tempStamp.temp)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const humidityChartData = {
        labels: sortedTempStamp.map(tempStamp => tempStamp.tempDate),
        datasets: [
            {
                label: 'Fuktighet',
                data: sortedTempStamp.map(tempStamp => parseFloat(tempStamp.humidity)),
                borderColor: 'rgba(192, 75, 192, 1)',
                backgroundColor: 'rgba(192, 75, 192, 0.2)',
                fill: true,
            },
        ],
    };
    

    return (
        <>
{/*         <ul>
            {tempStamp.map((tempStamp, index) => (
                <li key={index}>
                    <p>{tempStamp.tempDate}: {tempStamp.temp}°C</p>
                </li>
            ))}
        </ul> */}
        <Line data={tempChartData} />
        <Line data={humidityChartData} />
        </>
    );
};

export default Readings;