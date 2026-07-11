import type { AnalyticsData } from "./types/analytics";

interface Props {
    analytics: AnalyticsData;
}

export default function AnalyticsCards({ analytics }: Props) {

    return (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 text-sm">
                    Total Spend
                </p>

                <h2 className="text-3xl font-bold mt-3">
                    ₹{analytics.totalSpend.toFixed(0)}
                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 text-sm">
                    This Month
                </p>

                <h2 className="text-3xl font-bold mt-3 text-blue-600">
                    ₹{analytics.spendMonthly}
                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 text-sm">
                    This Year
                </p>

                <h2 className="text-3xl font-bold mt-3 text-green-600">
                    ₹{analytics.spendYearly}
                </h2>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

                <p className="text-gray-500 text-sm">
                    Favourite Category
                </p>

                <h2 className="text-2xl font-bold mt-3">
                    {analytics.favCategory}
                </h2>

                <p className="text-gray-500 mt-2">
                    ₹{analytics.amountCategory}
                </p>

            </div>

        </div>

    );

}