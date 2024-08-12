export const TwoLayersChartFacetsConfig = {
    facet: {
        name: "Collection"
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
export default TwoLayersChartFacetsConfig;