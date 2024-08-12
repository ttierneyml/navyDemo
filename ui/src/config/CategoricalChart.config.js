export const CategoricalChartConfig = {
    entityTypeConfig: {
        "path": "extracted.*~" // child key of root
    },
    entities: [
        {
            entityType: 'person',
            items: [
                {
                    label: 'Activity',
                    path: 'extracted.person.activities.activity',
                    key: 'predicate'
                },
                {
                    label: 'Events',
                    path: 'extracted.person.events.event',
                    key: 'predicate'
                },
            ],
        }],
    chartProps: {
        title: "No of person per activity",
        footerText: "Footer of the chart",
    },
    areaChartProps: {
        chartTitleProps: {
            text: "No of activities"
        },
    },
    barChartProps: {
        chartProps: { pannable: true, zoomable: true },
        chartTitleProps: {
            text: "Example with new config"
        }
    },
    radarLineChartProps: {
        chartTitleProps: {
            text: "New config structure"
        },
        chartSeriesItemProps: {
            name: "New name test"
        },
        chartValueAxisItemProps: {
            labels:{ format:  'number' }
        },
        chartLegendProps: {
            position: 'bottom'
        },
    },
    lineChartProps: {
        chartTitleProps: {
            text: "New config structure"
        },
        chartCategoryAxisItemProps: {
            title: { text: "New Footer text" }
        }
    },
    pieChartProps: {
        chartSeriesItemProps: {
            labels: {
                visible: true,
                content:  (props) => {
                    return `${props.dataItem.category} has ${props.dataItem.value}`
                }
            }
        },
        chartLegendProps: {
            position: 'bottom',
            visible: true
        },
    },
    donutChartProps: {
        chartProps: {
            donutCenterRender: () => {
                return (
                    <span>This is an example</span>
                )
            },
        },
        chartSeriesLabelsProps: {
            color: '#fff',
            background: 'none',
            label:(e) => e.category
        },
        chartLegendProps: {
            visible: true
        },
    },
}
export default CategoricalChartConfig;