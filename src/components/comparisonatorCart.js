import React, { Component } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import chartData from "../data";
import jsPDF from "jspdf";
import '../components/chart.css'


class comparisonatorCart extends Component {
    constructor(props) {
        super(props);
        this.updateCharts = this.updateCharts.bind(this);

        let teams = chartData
            .map((t) => t)

        const chartsData = [].concat(teams, teams).map((t, i) => ({
            week: i + 1,
            image: t.imageDataURL,
            index: Math.floor(Math.random() * 400)
        }))
        const ronaldosData = [].concat(teams, teams).map((t, i) => ({

            index: Math.floor(Math.random() * 400)
        }))
        const messisData = [].concat(teams, teams).map((t, i) => ({

            index: Math.floor(Math.random() * 400)
        }))

        const result = [];
        const averageChart = [].concat(ronaldosData, messisData, chartsData)
        for (var i = 0; i < averageChart[0].length; i++) {
            var num = 0;
            for (var j = 0; j < averageChart.length; j++) {
                num += averageChart[j][i];
            }
            result.push(Math.round(num / averageChart.length));
        }
        console.log(averageChart)

        this.state = {
            options: {
                chart: {
                    id: "basic-bar",
                    toolbar: {
                        show: false,
                    }

                },
                annotations: {
                    points: chartsData.map(d => ({
                        x: d.week,
                        y: d.index,
                        maker: {
                            size: 0
                        },
                        image: {
                            path: d.image,
                            offsetY: -3,
                            offsetX: 0,
                        }
                    }))
                },
                xaxis: {
                    categories: chartsData.map(d => d.week)
                },
            }
            ,
            dataLabels: {
                enabled: false
            }
            ,
            series: [
                {
                    name: "Boupendza",
                    data: chartsData.map(d => d.index)

                },
                {
                    name: "Messi",
                    data: messisData.map(d => d.index)
                },
                {
                    name: "Ronaldo",
                    data: ronaldosData.map(d => d.index)
                },
                // {
                //     name: "Average",
                //     data: averageChart.map(d => d.index)
                // },
            ]
        };
    }
    getDataUri() {
        ApexCharts.exec("basic-bar", "dataURI").then(({ imgURI }) => {
            console.log(imgURI);
            var pdf = new jsPDF();
            pdf.addImage(imgURI, 'PNG', 0, 0);
            pdf.save("download.pdf");
        });

    }

    updateCharts() {
        const max = 90;
        const min = 30;
        const newMixedSeries = [];

        this.state.series.forEach((s) => {
            const data = s.data.map(() => {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            });
            newMixedSeries.push({ data: data });
        });
        this.setState({
            series: newMixedSeries,
            seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50]
        });
    }


    render() {
        return (
            <>
                <div className="dropdownItems">
                    <select className="browser-default custom-select">
                        <option value="2">2020/2021 </option>
                        <option value="3">2019/2020</option>
                    </select>
                    <select className="browser-default custom-select" onChange={this.updateCharts}>
                        <option value="2" >Süper Lig, Turkey</option>
                        <option value="3" >Champions League,EU</option>
                    </select>
                    <select className="browser-default custom-select">
                        <option value="2">LW</option>
                        <option value="3">CMF</option>
                        <option value="3">RW</option>
                    </select>
                    <button className="exportButton" onClick={this.getDataUri}>Export</button>
                </div>

                <div className="app">
                    <div className="row">
                        <div className="mixed-chart">
                            <Chart
                                options={this.state.options}
                                series={this.state.series}
                                type="area"
                                width="100%"
                                height="450"
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default comparisonatorCart;
