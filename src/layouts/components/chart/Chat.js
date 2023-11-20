import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { BaseChart } from '../charts/BaseChart';
import moment from 'moment';
// import { getDailySummaries } from '@app/api/dailySummaries.api';
// import { BaseCard } from '@app/components/common/BaseCard/BaseCard';

// import { BaseChart } from '@app/components/common/charts/BaseChart';

function ChartLogin({ orders, total }) {
    // const { register, login } = props;
    console.log(orders);
    console.log(total);
    const startDate = moment().subtract(4, 'days');
    const endDate = moment().endOf('day');
    const dateArray = [];

    for (let date = startDate.clone(); date.isSameOrBefore(endDate, 'day'); date.add(1, 'day')) {
        dateArray.push(date.format('DD/MM/YYYY'));
    }
    // const posList = [
    //   'left',
    //   'right',
    //   'top',
    //   'bottom',
    //   'inside',
    //   'insideTop',
    //   'insideLeft',
    //   'insideRight',
    //   'insideBottom',
    //   'insideTopLeft',
    //   'insideTopRight',
    //   'insideBottomLeft',
    //   'insideBottomRight',
    // ] as const;

    // State to manage configuration
    const [config, setConfig] = useState({
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
    });

    const labelOption = {
        show: true,
        position: config.position,
        distance: config.distance,
        align: config.align,
        verticalAlign: config.verticalAlign,
        rotate: config.rotate,
        // formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
            name: {},
        },
    };

    // Define your option here
    const option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        legend: {
            // data: ['Đăng ký', 'Đăng nhập', 'Luyện tập', 'Đọc sách', 'Toán học', 'Đánh máy', 'Chơi', 'Tiêu vàng'],
            data: ['Đơn hàng', 'Tổng tiền'],
            textStyle: {},
            // textStyle: {
            //     color: themeObject[theme].textMain,
            // },
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar', 'stack'] },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: [
            {
                type: 'category',
                axisTick: { show: false },
                data: dateArray,
                // data: ['2012', '2013', '2014', '2015', '2016'],
            },
        ],
        yAxis: [
            {
                type: 'value',
            },
        ],
        series: [
            {
                name: 'Đơn hàng',
                type: 'bar',
                barGap: 0,
                label: labelOption,
                emphasis: {
                    focus: 'series',
                },
                itemStyle: {
                    // borderRadius: 5,
                    // borderColor: BASE_COLORS.white,
                    // borderWidth: 2,
                },
                data: orders,
            },
            {
                name: 'Tổng tiền',
                type: 'bar',
                label: labelOption,
                emphasis: {
                    focus: 'series',
                },
                data: total,
            },
            // {
            //   name: 'Luyện tập',
            //   type: 'bar',
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [150, 232, 201, 154, 190],
            // },
            // {
            //   name: 'Đọc sách',
            //   type: 'bar',
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [98, 77, 101, 99, 40],
            // },
            // {
            //   name: 'Toán học',
            //   type: 'bar',
            //   barGap: 0,
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [320, 332, 301, 334, 390],
            // },
            // {
            //   name: 'Đánh máy',
            //   type: 'bar',
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [220, 182, 191, 234, 290],
            // },
            // {
            //   name: 'Luyện tập',
            //   type: 'bar',
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [150, 232, 201, 154, 190],
            // },
            // {
            //   name: 'Chơi',
            //   type: 'bar',
            //   label: labelOption,
            //   emphasis: {
            //     focus: 'series',
            //   },
            //   data: [98, 77, 101, 99, 40],
            // },
        ],
        // legend1: {
        //   data: ['Đăng ký', 'Đăng nhập', 'Luyện tập', 'Đọc sách', 'Toán học', 'Đánh máy', 'Chơi', 'Tiêu vàng'],
        // },
    };

    // Set the option to the chart
    //   myChart.setOption(option);
    // }, [config]);

    return (
        // <BaseCard padding="0 0 1.875rem" title="Các chỉ số meduverse ">
        <BaseChart option={option} height="51rem" width="1371px" />
        // </BaseCard>
    );
}

export default ChartLogin;
