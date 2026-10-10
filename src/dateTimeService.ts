import { useAppStore } from "./store";

const TEST_MODE_DATE: Date = new Date(2026, 0, 2);

export function getCurrDate(): Date {
  const isTestMode: boolean = useAppStore((state) => state.isTestMode);
  return isTestMode ? TEST_MODE_DATE : new Date();
}

export function getTestModeDate(): Date {
  return TEST_MODE_DATE;
}
