import React from 'react';
import { Package, Heart, Truck, Gift, Check, Plus, ShoppingCart, Star, Tag } from 'lucide-react';

export default function UserOverview() {
    const stats = [
        {
            title: "Total Orders",
            value: "24",
            icon: Package,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Wishlist Items",
            value: "12",
            icon: Heart,
            color: "text-pink-600",
            bgColor: "bg-pink-50"
        },
        {
            title: "Pending Deliveries",
            value: "3",
            icon: Truck,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            title: "Active Coupons",
            value: "5",
            icon: Gift,
            color: "text-green-600",
            bgColor: "bg-green-50"
        }
    ];

    const activities = [
        {
            id: 1,
            type: "delivered",
            title: "Order Delivered",
            description: "Your order #ORD-7898 has been delivered",
            time: "Today, 9:45 AM",
            icon: Check,
            iconColor: "text-green-600",
            iconBg: "bg-green-50"
        },
        {
            id: 2,
            type: "wishlist",
            title: "Added to Wishlist",
            description: "You added 'Wireless Headphones' to your wishlist",
            time: "Yesterday, 4:30 PM",
            icon: Heart,
            iconColor: "text-pink-600",
            iconBg: "bg-pink-50"
        },
        {
            id: 3,
            type: "shipped",
            title: "Order Shipped",
            description: "Your order #ORD-7891 has been shipped",
            time: "Yesterday, 11:20 AM",
            icon: Truck,
            iconColor: "text-blue-600",
            iconBg: "bg-blue-50"
        },
        {
            id: 4,
            type: "review",
            title: "Review Posted",
            description: "You posted a review for 'Smart Watch'",
            time: "May 20, 2023",
            icon: Star,
            iconColor: "text-yellow-600",
            iconBg: "bg-yellow-50"
        },
        {
            id: 5,
            type: "coupon",
            title: "Coupon Applied",
            description: "You used coupon 'SUMMER20' on your purchase",
            time: "May 18, 2023",
            icon: Tag,
            iconColor: "text-purple-600",
            iconBg: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hi, Alex</h1>
                        <span className="text-2xl">👋</span>
                    </div>
                    <p className="text-sm text-gray-500">Last updated: Today, 10:30 AM</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`w-5 h-5 ${stat.color}`} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-4 md:p-6 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {activities.map((activity) => {
                            const Icon = activity.icon;
                            return (
                                <div key={activity.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <div className={`p-2 rounded-lg ${activity.iconBg} flex-shrink-0`}>
                                            <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-900 mb-1">{activity.title}</h3>
                                                    <p className="text-sm text-gray-600">{activity.description}</p>
                                                </div>
                                                <p className="text-xs text-gray-500 flex-shrink-0">{activity.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}