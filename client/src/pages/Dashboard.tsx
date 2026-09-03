import { useState } from "react";
import { useAddIncome } from "@/api/currentIncome";
import { useCurrentIncome } from "@/hooks/useCurrentIncome";
import { useCurrentStats } from "@/hooks/useExpenses";
import BarChartComponent from "@/components/BarChart";
import PieChartComponent from "@/components/PieChart";

import Header from "@/components/layouts/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, CircleEuro, ShoppingCart, Wallet } from "lucide-react";

export default function Dashboard() {
  const { data: stats } = useCurrentStats();
  const { data: income } = useCurrentIncome();

  const { mutate: createIncome, isPending } = useAddIncome();
  const [amount, setAmount] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const lastMonthExpenses: number =
    stats?.previousMonths.at(-1)?.totalAmount ?? 0;

  return (
    <>
      <Header name="Dashboard" />
      <div className="px-4 py-3 grid grid-cols-4 gap-3 items-start">
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <CircleEuro />
            </CardTitle>
            <CardDescription>TOTAL BALANCE</CardDescription>
            <p className="font-bold">
              {income?.data.income
                ? (
                    income.data.income.amount - lastMonthExpenses
                  ).toLocaleString()
                : "No data"}
            </p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <Banknote />
            </CardTitle>
            <CardDescription>MONTHLY INCOME</CardDescription>
            <p className="font-bold">
              {income?.data.income
                ? `${income.data.income.amount.toLocaleString()}`
                : "No income added"}
            </p>
          </CardHeader>
          {income?.data.income == null || isEditing ? (
            <form
              className="flex items-center gap-1"
              onSubmit={(e) => {
                e.preventDefault();

                createIncome(
                  {
                    amount: Number(amount),
                  },
                  {
                    onSuccess: () => {
                      setIsEditing(false);
                      setAmount("");
                    },
                  },
                );
              }}
            >
              <Input
                type="number"
                placeholder="Enter monthly income"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Update Income"}
              </Button>

              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              )}
            </form>
          ) : (
            <Button
              className="w-fit self-center"
              variant="outline"
              onClick={() => {
                setAmount(String(income.data.income!.amount));
                setIsEditing(true);
              }}
            >
              Edit Income
            </Button>
          )}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-expense-red">
              <ShoppingCart />
            </CardTitle>
            <CardDescription>MONTHLY EXPENSES</CardDescription>
            <p className="font-bold">{lastMonthExpenses.toLocaleString()}</p>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-chart">
              <Wallet />
            </CardTitle>
            <CardDescription>SAVINGS</CardDescription>
            <p className="font-bold">28,500.00</p>
          </CardHeader>
        </Card>
      </div>
      <div className="px-4 py-3 grid grid-cols-2 gap-3">
        <Card className="[--card-spacing:--spacing(4)]">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-chart">Monthly spending</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartComponent previousMonths={stats?.previousMonths ?? []} />
          </CardContent>
        </Card>
        <Card className="[--card-spacing:--spacing(4)]">
          <CardHeader className="items-center pb-0">
            <CardTitle className="text-chart">Spending by category</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent totalsCategory={stats?.totalsCategory ?? []} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
