import React, { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    Package,
    Settings,
    LogOut,
    Menu,
    X,

} from "lucide-react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);
import { Doughnut, Line } from "react-chartjs-2";




const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "#4bc0c0",
                data: [0, 120000],
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "#333",
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: false,
            },
            tooltip: {
                mode: "index",
                intersect: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: "#4B5563", // gray-700
                },
            },
            y: {
                grid: {
                    color: "#E5E7EB", // gray-200
                },
                ticks: {
                    color: "#4B5563",
                    callback: function (value) {
                        return `₹${value}`;
                    },
                },
            },
        },
    };


    const doughnutData = {
        labels: ["In Stock", "Out Of Stock",],
        datasets: [
            {
                label: "Statistics",
                data: [10, 2],
                backgroundColor: ["#6ac155", "#cb4335",],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Toggle Sidebar Button - visible only on small screens */}
            <div className="md:hidden absolute top-4 left-4 z-50">
                <button onClick={() => setSidebarOpen(true)} className="text-gray-800">
                    <Menu size={28} />
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed z-40 top-0 left-0 w-64 h-full bg-gray-900 text-white flex flex-col shadow-lg transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                {/* Close button - only visible on small screens */}
                <div className="flex justify-between items-center p-4 md:hidden">
                    <span className="text-xl font-bold">Admin Panel</span>
                    <button onClick={() => setSidebarOpen(false)} className="text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Title - for desktop */}
                <div className="text-2xl font-bold p-6 border-b border-gray-700 hidden md:block">
                    Admin Panel
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <NavItem icon={<Users size={20} />} label="Users" />
                    <NavItem icon={<Package size={20} />} label="Products" />
                    <NavItem icon={<ShoppingCart size={20} />} label="Orders" />
                    <NavItem icon={<Settings size={20} />} label="Settings" />
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-gray-800">
                    <NavItem icon={<LogOut size={20} />} label="Logout" />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto mt-12 md:mt-0 w-full md:ml-64">
                <header className="mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
                </header>

                {/* Stat Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <StatCard title="Total Users" value="1,240" color="blue" />
                    <StatCard title="Total Orders" value="580" color="green" />
                    <StatCard title="Revenue" value="₹1,20,000" color="purple" />
                </section>

                {/* Recent Orders Table */}
                <section className=" rounded-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">📦 Recent Orders</h2>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-[#101828] text-white uppercase text-xs">
                                <tr>
                                    <th className="px-3 py-3">Order ID</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 text-gray-700">
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">#123456</td>
                                    <td className="px-4 py-3">John Doe</td>
                                    <td className="px-4 py-3">₹2,500</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                            Delivered
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">#123457</td>
                                    <td className="px-4 py-3">Jane Smith</td>
                                    <td className="px-4 py-3">₹1,800</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
                                            Processing
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50">
                                    <td className="px-4 py-3 font-medium">#123458</td>
                                    <td className="px-4 py-3">Dixita P.</td>
                                    <td className="px-4 py-3">₹3,000</td>
                                    <td className="px-4 py-3">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                            Cancelled
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {/* Line Chart */}
                    <div className="bg-white rounded-lg shadow p-6 h-[430px] flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">💰 Revenue Overview</h2>
                        <div className="flex-1">
                            <Line data={lineState} options={lineOptions} />
                        </div>
                    </div>

                    {/* Doughnut Chart */}
                    <div className="bg-white rounded-lg shadow p-6 h-[420px] flex flex-col">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">📊 Overview Stats</h2>
                        <div className="flex-1 flex items-center justify-center">
                            <div className="w-60 h-60">
                                <Doughnut data={doughnutData} />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

const NavItem = ({ icon, label }) => (
    <button className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded-md transition">
        {icon}
        <span>{label}</span>
    </button>
);

const StatCard = ({ title, value, color }) => {
    const colorClasses = {
        blue: "bg-blue-100 text-blue-700",
        green: "bg-green-100 text-green-700",
        purple: "bg-purple-100 text-purple-700",
    };

    return (
        <div className={`p-4 rounded-lg shadow ${colorClasses[color]}`}>
            <p className="text-sm">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
        </div>
    );
};

export default AdminDashboard;
