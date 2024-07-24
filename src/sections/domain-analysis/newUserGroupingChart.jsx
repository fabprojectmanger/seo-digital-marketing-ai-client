import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  DatasetComponent,
} from "echarts/components";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import Wrapper from '../../components/wrapper/wrapper'
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    CanvasRenderer,
  ]);
const NewUserGroupingChart = ({newUserGroupingValues}) => {
    const barOption = {
        xAxis: {
          max: "dataMax",
        },
        yAxis: {
          type: "category",
          data: [
            "Direct",
            "Organic Search",
            "Organic Social",
            "Referral",
            "Paid Search",
          ],
          inverse: true,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            realtimeSort: true,
            name: "X",
            type: "bar",
            data: [
              newUserGroupingValues?.direct,
              newUserGroupingValues?.search,
              newUserGroupingValues?.social,
              newUserGroupingValues?.referral,
              newUserGroupingValues?.paid,
            ],
            label: {
              show: true,
              position: "right",
              valueAnimation: true,
            },
          },
        ],
        legend: {
          show: true,
        },
        animationDuration: 0,
        animationDurationUpdate: 3000,
        animationEasing: "linear",
        animationEasingUpdate: "linear",
      };
  return (
    <Wrapper className="bg-white p-6 rounded-lg border-dark-100 mt-4 flex-[2]">
          <h2 className='text-2xl font-semibold text-dark-100 mb-2'>Where do your new users come from?</h2>
          <Wrapper className="bar-chart">
            <ReactEChartsCore
              echarts={echarts}
              option={barOption}
              notMerge={true}
              lazyUpdate={true}
              theme={"theme_name"}
            />
          </Wrapper>
        </Wrapper>
  )
}

export default NewUserGroupingChart
