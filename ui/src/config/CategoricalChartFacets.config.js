export const CategoricalChartFacetsConfig = {
    facet: {
        name: "status"
    },
    chartProps: {
        title: "Status",
        footerText: "Footer of the chart",
    },
    barChartProps: {
        chartProps: { pannable:true, zoomable: true },
        chartTitleProps: {
            text: "Status"
        }
    },
    lineChartProps: {
        chartProps: { pannable:true, zoomable: true },
        chartTitleProps: {
            text: "New config structure"
        },
        chartCategoryAxisItemProps: {
            title: { text: "New Footer text" }
        }
    },
    pieChartProps: {
        chartProps: { pannable:true, zoomable: true },
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
export default CategoricalChartFacetsConfig;