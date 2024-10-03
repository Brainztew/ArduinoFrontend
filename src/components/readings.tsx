import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
const API_URL = import.meta.env.VITE_API_URL;

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TempStamp {
    temp: string;
    tempDate: string;
    humidity: string;
}

const Readings = () => {
    const [tempStamp, setTempStamp] = useState<TempStamp[]>([]);
    const [liveTempStamp, setLiveTempStamp] = useState<TempStamp | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchReadings = async () => {
            try {
                const response = await fetch(`${API_URL}/temp`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTempStamp(data);
                if (data.length > 0) {
                    setSelectedDate(data[0].tempDate.split('T')[0]);
                }
            } catch (error) {
                console.error('There was an error!', error);
                setError('Fel vid hämtning av data!');
            }
        };
        fetchReadings();
    }, []);
    
    useEffect(() => {
        const fetchLiveReading = async () => {
            try {
                const response = await fetch(`${API_URL}/live`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setLiveTempStamp(data);
            } catch (error) {
                console.error('There was an error!', error);
                setError('Fel vid hämtning av data!');
            }
        };
        fetchLiveReading();
    }, []);

    if (error) {
        return <p>ERROR: {error}</p>;
    }

    const groupedByDate = tempStamp.reduce((acc, curr) => {
        const date = curr.tempDate.split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {} as Record<string, TempStamp[]>);

    Object.keys(groupedByDate).forEach(date => {
        groupedByDate[date].sort((a, b) => new Date(a.tempDate).getTime() - new Date(b.tempDate).getTime());
    });

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDate(event.target.value);
    };

    const selectedData = selectedDate ? groupedByDate[selectedDate] : [];

    const tempChartData = {
        labels: selectedData.map(tempStamp => new Date(tempStamp.tempDate).toLocaleTimeString()),
        datasets: [
            {
                label: 'Temperatur',
                data: selectedData.map(tempStamp => parseFloat(tempStamp.temp)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const humidityChartData = {
        labels: selectedData.map(tempStamp => new Date(tempStamp.tempDate).toLocaleTimeString()),
        datasets: [
            {
                label: 'Fuktighet',
                data: selectedData.map(tempStamp => parseFloat(tempStamp.humidity)),
                borderColor: 'rgba(192, 75, 192, 1)',
                backgroundColor: 'rgba(192, 75, 192, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <>   
            {liveTempStamp && (
                <p>
                    Luftfuktighet: 
                    <span style={{ color: parseFloat(liveTempStamp.humidity) >= 20 && parseFloat(liveTempStamp.humidity) <= 70 ? 'green' : 'red'}}>
                    &nbsp;{liveTempStamp.humidity}% </span>
                    <br />
                    Temperatur:
                    <span style={{ color: parseFloat(liveTempStamp.temp) >= 17 ?'green' : 'red'}}>
                    &nbsp;{liveTempStamp.temp}°C
                    </span></p>

            )}
            <div>
                <label htmlFor="date-select">Välj datum:</label>
                <select id="date-select" value={selectedDate || ''} onChange={handleDateChange}>
                    {Object.keys(groupedByDate).map(date => (
                        <option key={date} value={date}>{date}</option>
                    ))}
                </select>
            </div>
            {selectedDate && selectedData.length > 0 && (
                <>
                    <h2>Temperaturdiagram för {selectedDate}</h2>
                    <Line data={tempChartData} />
                    <h2>Fuktighetsdiagram för {selectedDate}</h2>
                    <Line data={humidityChartData} />
                </>
            )}
        </>
    );
};

export default Readings;