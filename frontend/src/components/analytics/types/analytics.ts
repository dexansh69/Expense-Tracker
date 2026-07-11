export interface AnalyticsData {
    totalSpend: number;
    spendMonthly: number;
    spendYearly: number;
    favCategory: string;
    amountCategory: number;
    categorySpend: Record<string, number>;
    MonthlySpend_full: Record<string, number>;
}