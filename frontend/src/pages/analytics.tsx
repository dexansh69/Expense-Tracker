import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";

import type { AnalyticsData } from "../components/analytics/types/analytics";

import AnalyticsCards from "../components/analytics/analyticsCards";
import CategoryPieChart from "../components/analytics/categoryPie";
import MonthlyBarChart from "../components/analytics/monthyl";
import AnalyticsAPI from "../apiCalls/anayltics";

export default function Analytics() {
    const [analytics, setAnalytics] = useState<AnalyticsData| null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchAnalytics() {
        try {
            const result = await AnalyticsAPI();
            setAnalytics(result);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex bg-gray-100 min-h-screen">
                <Sidebar />
                <main className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl font-semibold">
                        Loading Analytics...
                    </h1>
                </main>
            </div>
        );
    }

    if (!analytics) {
        return (
            <div className="flex bg-gray-100 min-h-screen">
                <Sidebar />
                <main className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl font-semibold text-red-500">
                        Failed to load analytics.
                    </h1>
                </main>
            </div>
        );
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Analytics
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Visualize your spending insights.
                    </p>
                </div>

                <AnalyticsCards analytics={analytics} />

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

                    <CategoryPieChart
                        categorySpend={analytics.categorySpend}
                    />

                    <MonthlyBarChart
                        monthlySpend={analytics.MonthlySpend_full}
                    />

                </div>

            </main>
        </div>
    );
}