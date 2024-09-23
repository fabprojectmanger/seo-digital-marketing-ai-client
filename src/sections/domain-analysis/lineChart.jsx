import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

const metrics = [
    { label: 'Clicks', key: 'clicks', color: '#4285F4' },
    { label: 'Impressions', key: 'impressions', color: '#EA4335' },
    { label: 'CTR', key: 'ctr', color: '#FBBC05' },
    { label: 'Position', key: 'position', color: '#34A853' },
];

const LineChart = ({ values }) => {
    const [selectedMetrics, setSelectedMetrics] = useState([metrics[0].key]); // Default to clicks
    const [chartData, setChartData] = useState([]);
    const [animationDuration, setAnimationDuration] = useState(1000);
    const [renderChart, setRenderChart] = useState(false);
    const rawData = values.date;

    // Function to format the date as M/D/YY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear().toString().slice(-2);
        return `${month}/${day}/${year}`;
    };

    // Calculate metrics values
    const calculateMetricValues = () => {
        let totalClicks = 0;
        let totalImpressions = 0;
        let totalCTR = 0;
        let totalPosition = 0;
     
        rawData.forEach(entry => {
            totalClicks += entry.clicks;
            totalImpressions += entry.impressions;
            totalCTR += entry.ctr;
            totalPosition += entry.position;
        });
     
        const avgCTR = totalImpressions ? ((totalClicks / totalImpressions) * 100).toFixed(1) : 0; // 1 digit after decimal
        const avgPosition = rawData.length ? (totalPosition / rawData.length).toFixed(2) : 0;
     
        return {
            clicks: { "number": totalClicks, "text": "Total clicks" },
            impressions: { "number": totalImpressions, "text": "Total impressions" },
            ctr: { "number": avgCTR, "text": "Average CTR (%)" }, // Update text to indicate percentage
            position: { "number": avgPosition, "text": "Average position" },
        };
    };

    const metricValues = calculateMetricValues();

    // Function to filter data and show only every nth date for x-axis labels
    const generateTicks = (data, interval = 3) => {
        return data
            .filter((_, index) => index % interval === 0) // Only for ticks, does not remove data
            .map((entry) => formatDate(entry.keys[0]));
    };

    useEffect(() => {
        const transformedData = [
            ['Date', ...selectedMetrics.map((key) => key.charAt(0).toUpperCase() + key.slice(1))],
            ...rawData.map((entry) => [formatDate(entry.keys[0]), ...selectedMetrics.map((key) => entry[key])]),
        ];

        setAnimationDuration(500);
        setRenderChart(false);
        setTimeout(() => {
            setChartData(transformedData);
            setRenderChart(true);
        }, 100);
    }, [selectedMetrics]);

    const options = {
        hAxis: {
            format: 'M/d/yy',
            textStyle: {
                fontSize: 10,
            },
            ticks: generateTicks(rawData, 3), // Set hAxis ticks based on filtered data for labels only
            showTextEvery: 3, // Show every third label, adjusts label display frequency
            gridlines: {
                count: Math.floor(rawData.length / 3), // Adjust the number of gridlines
            },
        },
        vAxis: {
            baselineColor: selectedMetrics.length >= 2 ? 'transparent' : null,
            textStyle: {
                fontSize: 10,
            },
            gridlines: {
                color: selectedMetrics.length >= 2 ? 'transparent' : null,
            },
            ticks:
                selectedMetrics.length === 1
                    ? selectedMetrics.includes('ctr')
                        ? [0, 1, 2, 3]
                        : selectedMetrics.includes('impressions')
                        ? [0, 8, 16, 24]
                        : selectedMetrics.includes('clicks')
                        ? [0, 1, 2, 3]
                        : selectedMetrics.includes('position')
                        ? [15, 10, 5, 0]
                        : []
                    : [],
        },
        legend: { position: 'none' },
        curveType: 'none',
        animation: {
            startup: true,
            duration: animationDuration,
            easing: 'out',
        },
        colors: selectedMetrics.map((metricKey) => metrics.find((m) => m.key === metricKey).color),
    };

    const toggleMetric = (key) => {
        setSelectedMetrics((prevSelected) => {
            if (prevSelected.includes(key) && prevSelected.length === 1) {
                return prevSelected; // Prevent removing the last remaining metric
            }
            return prevSelected.includes(key)
                ? prevSelected.filter((item) => item !== key)
                : [...prevSelected, key];
        });
    };

    return (
        <div className="my-6 rounded-xl bg-white">
            <div className="">
                {/* Added mx-auto for centering */}
                <div className="flex">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            onClick={() => toggleMetric(metric.key)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: selectedMetrics.includes(metric.key) ? metric.color : '#fff',
                                color: selectedMetrics.includes(metric.key) ? '#fff' : '#000',
                                padding: '8px 12px',
                                borderTopLeftRadius: index == 0 ? '4px' : '0px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                                minWidth: '150px',
                                height: '65px',
                                borderBottom: '1px solid',
                                borderLeft: index != 0 ? '1px solid' : '0px',
                                borderRight: index == 3 ? '1px solid' : '0px',
                            }}
                        >
                            <div>
                                <div className="flex items-center">
                                    <div className="pr-2">
                                        {selectedMetrics.includes(metric.key) ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-check2-square"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="12"
                                                height="12"
                                                fill="currentColor"
                                                className="bi bi-square"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <span>{metricValues[metric.key].text}</span>
                                    </div>
                                </div>
                                <div className="flex justify-ce">
                                    <span>{metricValues[metric.key].number}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-10">
                    {/* Added flex utilities */}
                    {renderChart && (
                        <Chart
                            chartType="LineChart"
                            data={chartData}
                            options={options}
                            legendToggle
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LineChart;
