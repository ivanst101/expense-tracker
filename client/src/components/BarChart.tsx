import { ChartContainer, type ChartConfig } from "./ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "./ui/chart";

type PreviousMonthsType = {
  month: string;
  totalAmount: number;
};

type BarChartProps = {
  previousMonths: PreviousMonthsType[];
};

export default function BarChartComponent({ previousMonths }: BarChartProps) {
  const chartConfig = {
    totalAmount: {
      label: "Expenses",
      color: "#006C49",
    },
  } satisfies ChartConfig;

  return (
    <>
      <ChartContainer config={chartConfig} className="min-h-50 w-full">
        <BarChart accessibilityLayer data={previousMonths}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar
            dataKey="totalAmount"
            fill="var(--color-totalAmount)"
            radius={4}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
