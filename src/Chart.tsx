import { useState } from "react";
import { Button } from "@/components/ui/button"

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

import { getServices, getSubscriptions, SubscriptionStatus } from "./data"
import type { Subscription, Service } from "./data"

import { useSubscriptionListStore } from "./store";
import { getCurrDate } from "./dateTimeService";

type MonthSubscription = {
  service: string
  amount: number
  percentage: number
}

type ChartMonth = {
  firstDate: Date
  lastDate: Date
  subscriptions: Map<string, MonthSubscription>
  totalAmount: number
}

type ChartMonthData = {
  month: string
  [index: string]: number | string
};

const MONTH_COUNT_IN_RANGE: number = 6;
const UNCATEGORIZED_TEXT: string = "(Uncategorized)";

const calendarHeaderDateTimeFormat = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

function Chart() {
  const today: Date = getCurrDate();
  
  const selectedCategories: Set<string> = useSubscriptionListStore((state) => state.selectedCategories);
  const setCategorySelectState: (category: string, isSelected: boolean) => void = useSubscriptionListStore((state) => state.setCategorySelectState);
  const setAllCategoriesUnselected: () => void = useSubscriptionListStore((state) => state.setAllCategoriesUnselected);
  const isUncategorizedSelected: boolean = useSubscriptionListStore((state) => state.isUncategorizedSelected);
  const setUncategorizedSelected: (isSelected: boolean) => void = useSubscriptionListStore((state) => state.setUncategorizedSelected);

  const [{ startDate, endDate }, setStartAndEndDates] = useState<{ startDate: Date, endDate: Date }>({
    startDate: new Date(today.getFullYear(), today.getMonth() - MONTH_COUNT_IN_RANGE + 1, 1),
    endDate: new Date(today.getFullYear(), today.getMonth() + 1, 0)
  });

  const months: ChartMonth[] = [];
  const months2: ChartMonthData[] = [];
  for (let monthIndex = 0; monthIndex < MONTH_COUNT_IN_RANGE; monthIndex++) {
    const firstDate: Date = new Date(startDate.getFullYear(), startDate.getMonth() + monthIndex, 1);
    months.push({
      firstDate: firstDate,
      lastDate: new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 0),
      subscriptions: new Map<string, MonthSubscription>(),
      totalAmount: 0
    });
    months2.push({
      month: `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}`
    });
  }

  const subs: Subscription[] = getSubscriptions();
  const services: Service[] = getServices();
  const serviceColors: Map<string, string> = new Map<string, string>();
  for (const service of services) {
    if (service.color === undefined) {
      serviceColors.set(service.name, `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`);
    }
    else {
      serviceColors.set(service.name, service.color);
    }
  }
  const categoryNames: string[] = Array.from(new Set(subs.filter((sub: Subscription) => sub.category !== undefined).map((sub: Subscription) => sub.category as string)));
  
  let filteredSubs: Subscription[] = subs.filter((sub: Subscription) => sub.status !== SubscriptionStatus.Upcoming);
  if (selectedCategories.size > 0 || isUncategorizedSelected) {
    filteredSubs = filteredSubs.filter((sub: Subscription) => isUncategorizedSelected && sub.category === undefined || sub.category !== undefined && selectedCategories.has(sub.category as string));
  }

  let chartServices: Set<string> = new Set<string>();

  for (const sub of filteredSubs) {
    if (sub.start > endDate || sub.end < startDate) {
      continue;
    }

    if (sub.service !== undefined && !chartServices.has(sub.service)) {
      chartServices.add(sub.service);
    }

    let subDayCount: number = Math.ceil((sub.end.getTime() - sub.start.getTime()) / (1000 * 3600 * 24) + 1);

    for (const month of months) {
      if (sub.start > month.lastDate || sub.end < month.firstDate) {
        continue;
      }
      let monthDayCount: number = month.lastDate.getDate();
      if (sub.start > month.firstDate) {
        monthDayCount = monthDayCount - sub.start.getDate() + 1;
      }
      if (sub.end < month.lastDate) {
        monthDayCount = monthDayCount - (month.lastDate.getDate() - sub.end.getDate());
      }
      
      const existingAmount = month.subscriptions.get(sub.service)?.amount ?? 0;
      const addedAmount = Math.round(sub.totalAmount * (monthDayCount / subDayCount) * 100) / 100; // TODO rounding errors
      month.subscriptions.set(sub.service, { service: sub.service, amount: existingAmount + addedAmount, percentage: 0 });
      month.totalAmount += addedAmount;
    }
  }

  for (const month of months) {
    for (const entry of month.subscriptions.values()) {
      entry.percentage = Math.round(entry.amount * 100 / month.totalAmount); // TODO rounding errors
    }
  }

  for (let i = 0; i < months.length; i++) {
    const month: ChartMonth = months[i];
    for (const service of chartServices.keys()) {
      months2[i][service] = month.subscriptions.get(service)?.amount ?? 0; // TODO handle prop collisions
    }
  }
  
  function setDateRange(yearChange: number, monthChange: number): void {
    setStartAndEndDates({
      startDate: new Date(startDate.getFullYear() + yearChange, startDate.getMonth() + monthChange),
      endDate: new Date(endDate.getFullYear() + yearChange, endDate.getMonth() + monthChange) 
    });
  }

  return (
    <>
      <h1>Chart</h1>
      <div className="control-container">
        <Button onClick={() => setDateRange(-1, 0)}>
          &lt;&lt;
        </Button>
        <Button onClick={() => setDateRange(0, -1)}>
          &lt;
        </Button>
        <Button onClick={() => setDateRange(0, 1)}>
          &gt;
        </Button>
        <Button onClick={() => setDateRange(1, 0)}>
          &gt;&gt;
        </Button>
      </div>
      <div id="category_button_list" className="button-container">
        {categoryNames.map((category: string) => (
          <Button key={category} className={(selectedCategories.has(category) ? "selected" : "")} onClick={() => setCategorySelectState(category, !selectedCategories.has(category))}>
            {category}
          </Button>
        ))}
        <Button className={(isUncategorizedSelected ? "selected" : "")} onClick={() => setUncategorizedSelected(!isUncategorizedSelected)}>{UNCATEGORIZED_TEXT}</Button>
        <Button onClick={() => setAllCategoriesUnselected()}>SHOW ALL</Button>
      </div>
      <BarChart data={months2} style={{ width: "100%", height: "70vh" }}>
        <XAxis dataKey="month" />
        <YAxis width="auto" />
        {Array.from(chartServices.keys()).map((key: string) => (
          <Bar dataKey={key} fill={serviceColors.get(key)} stackId="1" isAnimationActive={false} />
        ))}
        <Tooltip labelStyle={{ color: "black" }} />
        <Legend />
      </BarChart>
      {months.map((month: ChartMonth) => (
        <>
          <h4 key={month.firstDate.getFullYear() + "-" + month.firstDate.getMonth()}>
            {calendarHeaderDateTimeFormat.format(month.firstDate)}
          </h4>
          {Array.from(month.subscriptions.entries()).map(([ service, entry ]) => (
            <div key={month.firstDate.getFullYear() + "-" + month.firstDate.getMonth() + "-" + service}>
              {entry.service} - {entry.amount} ({entry.percentage}%)
            </div>
          ))}
          <div>TOTAL: ${month.totalAmount}</div>
        </>
      ))}
    </>
  );
}

export default Chart;