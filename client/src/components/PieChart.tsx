import { Pie, PieChart, Label } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./ui/chart";
import React from "react";

type TotalsCategoryType = {
  totalAmountByCategory: number;
  category: string;
};

type PieChartProps = {
  totalsCategory: TotalsCategoryType[];
};

const categoryColors: Record<string, string> = {
  food: "#ecf39e",
  bills: "#90a955",
  fuel: "#344e41",
  gym: "#52b772",
  barber: "#588157",
  essential: "#a3b18a",
  rest: "#b7e4c7",
};

export default function PieChartComponent({ totalsCategory }: PieChartProps) {
  const chartData = totalsCategory.map((item) => ({
    ...item,
    fill: categoryColors[item.category] ?? "#94A3B8",
  }));

  const formatCategory = (category: string) =>
    category.charAt(0).toUpperCase() + category.slice(1);

  const chartConfig = totalsCategory.reduce((config, item) => {
    config[item.category] = {
      label: formatCategory(item.category),
      color: categoryColors[item.category] ?? "#94A3B8",
    };

    return config;
  }, {} as ChartConfig);

  const totalExpenses = React.useMemo(() => {
    return totalsCategory.reduce(
      (acc, curr) => acc + curr.totalAmountByCategory,
      0,
    );
  }, [totalsCategory]);

  return (
    <>
      {chartData?.length > 0 ? (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-87.5"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent />} />

            <Pie
              data={chartData}
              dataKey="totalAmountByCategory"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalExpenses.toLocaleString()}
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }

                  return null;
                }}
              />
            </Pie>

            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-1 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      ) : (
        <p>There is no data. Please add some expenses!</p>
      )}
    </>
  );
}
