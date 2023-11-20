import React, { CSSProperties, useEffect, useState } from 'react';
import { EChartsOption } from 'echarts-for-react';
import ReactECharts from 'echarts-for-react';

// export interface BaseChartProps {
//   option?: EChartsOption;
//   onEvents?: Record<string, (e: any) => void>;
//   width?: string | number;
//   height?: string | number;
//   style?: CSSProperties;
//   className?: string;
// }

export const getChartColors = (theme) => [
    theme.chartColor1,
    theme.chartColor2,
    theme.chartColor3,
    theme.chartColor4,
    theme.chartColor5,
];

export const getDefaultTooltipStyles = (theme) => ({
    borderColor: theme.chartColor1,
    borderWidth: 2,
    textStyle: {
        fontWeight: 600,
        fontSize: 16,
        // color: theme.chartColor1,
    },
});

export const BaseChart = ({ option, width, height, onEvents, style, ...props }) => {
    const [loading, setLoading] = useState(true);

    const chartHeight = height || '400px';

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000 / 2);
    }, []);

    // return loading ? (
    //     <Loading /> // Assuming Loading component is imported properly
    // ) : (
    return (
        <ReactECharts
            {...props}
            option={{ ...option }}
            style={{
                ...style,
                height: chartHeight,
                minHeight: height === '100%' ? 400 : 'unset',
                width,
                zIndex: 0,
            }}
            onEvents={onEvents}
        />
    );
};
