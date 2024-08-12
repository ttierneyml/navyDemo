export const TwoLayersChartConfig = {
    entityTypeConfig: {
        path: 'extracted.*~' // child key of root
    },
    entities: [
        {
            entityType: 'person',
            items: [
                {
                    maxValue: { path: 'extracted.person.range.to' },
                    minValue: { path: 'extracted.person.range.from' },
                },
            ],
        },
        {
            entityType: 'organization',
            items: [
                {
                    maxValue: { path: 'extracted.organization.range.to' },
                    minValue: { path: 'extracted.organization.range.from' },
                },
            ],
        }
        ],
    bulletChartProps: {
        chartTitleProps: {
            text: "Range"
        },
        chartSeriesItemProps: {
            color: '#fff',
            data: [[52, 55]]
        },
        chartSeriesLabelsProps: {position: 'center', font: 'bold 12pt sans-serif'},
        chartValueAxisItemProps: {min: 0, max: 100},
        chartTooltipProps: {
            render: ({point}) => {
                const {value} = point;
                return (
                    <span>
                    Maximum: {value.target}
                        <br/>
                    Average: {value.current}
                </span>
                )
            }
        }
    },
    polarChartProps: {
        chartseriesLabelProps: {
            position: '',
            content: ''
        },
        chartXAxisItemProps: {
            startAngle: '-90',
            majorUnit: '30'
        },
        chartYAxisItemProps: {
            visible: false
        }
    },
    chartScatterPlotProps: {
        chartTitleProps: {
            text: "Range"
        },
        chartXAxisItemProps: {
            title: {
                text: "Range 2"
            }
        },
        chartYAxisItemProps: {
            text: "Range 3"
        }
    }
}
export default TwoLayersChartConfig;