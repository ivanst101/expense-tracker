import BarChartComponent from "@/components/BarChart";
import Header from "@/components/layouts/Header";
import PieChartComponent from "@/components/PieChart";
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { useCurrentStats } from "@/hooks/useExpenses";
import {
  BadgeCheck,
  Banknote,
  CircleEuro,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

export default function Dashboard() {
  const { data } = useCurrentStats();
  const lastMonthExpenses: number =
    data?.previousMonths.at(-1)?.totalAmount ?? 0;

  return (
    <>
      <Header name="Dashboard" />
      <div className="px-4 py-3 grid grid-cols-4 gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <CircleEuro />
            </CardTitle>
            <CardDescription>TOTAL BALANCE</CardDescription>
            <CardAction className="text-chart">
              <TrendingUp /> 2.4%
            </CardAction>
            <p className="font-bold">$142,850.40</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <Banknote />
            </CardTitle>
            <CardDescription>MONTHLY INCOME</CardDescription>
            <CardAction className="text-chart">
              <TrendingUp /> 8.1%
            </CardAction>
            <p className="font-bold">$12,400.00</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-expense-red">
              <ShoppingCart />
            </CardTitle>
            <CardDescription>MONTHLY EXPENSES</CardDescription>
            <CardAction className="text-expense-red">
              <TrendingDown /> 1.2%
            </CardAction>
            <p className="font-bold">${lastMonthExpenses}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <Wallet />
            </CardTitle>
            <CardDescription>SAVINGS</CardDescription>
            <CardAction className="text-chart">
              <BadgeCheck />
              Goal
            </CardAction>
            <p className="font-bold">$28,500.00</p>
          </CardHeader>
        </Card>
      </div>
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <Card className="[--card-spacing:--spacing(4)]">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-chart">Monthly spending</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent previousMonths={data?.previousMonths ?? []} />
          </CardContent>
        </Card>
        <Card className="[--card-spacing:--spacing(4)]">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-chart">Spending by category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent totalsCategory={data?.totalsCategory ?? []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
