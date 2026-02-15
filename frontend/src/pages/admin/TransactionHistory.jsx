import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("/api/admin/transactions", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTransactions(data);
        } catch (error) {
            toast.error("Failed to load transactions.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="main-container">
                <div className="loading">Loading transactions...</div>
            </div>
        );
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return "badge badge-green";
            case "Ordered":
                return "badge badge-blue";
            case "Received":
                return "badge badge-blue"; // No purple in global css, fallback to blue
            case "Cancelled":
                return "badge badge-red";
            default:
                return "badge badge-orange";
        }
    };

    return (
        <div className="page admin-dashboard-page">
            <div className="main-container">
                <div className="page-header">
                    <h2 style={{ color: "white" }}>Transaction History</h2>
                </div>

                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>User</th>
                                <th>Total Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Vendors Involved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((order) => (
                                    <tr key={order._id}>
                                        <td>
                                            <strong>{order._id.slice(-8).toUpperCase()}</strong>
                                        </td>
                                        <td>
                                            <div>
                                                <strong>{order.userId?.name || "Unknown"}</strong>
                                                <div style={{ fontSize: "0.85rem", color: "#6c757d" }}>
                                                    {order.userId?.email}
                                                </div>
                                            </div>
                                        </td>
                                        <td>₹{order.totalAmount?.toLocaleString()}</td>
                                        <td>
                                            {new Date(order.createdAt).toLocaleDateString(undefined, {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </td>
                                        <td>
                                            <span className={getStatusBadge(order.status)}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                                {[
                                                    ...new Map(
                                                        order.items.map((item) => [
                                                            item.vendorId?._id,
                                                            item.vendorId,
                                                        ])
                                                    ).values(),
                                                ].map((vendor, idx) => (
                                                    vendor ? (
                                                        <div
                                                            key={idx}
                                                            style={{
                                                                background: "#f8f9fa",
                                                                padding: "6px 10px",
                                                                borderRadius: "6px",
                                                                border: "1px solid #e9ecef",
                                                                display: "flex",
                                                                flexDirection: "column"
                                                            }}
                                                        >
                                                            <span style={{ fontWeight: "600", fontSize: "0.85rem", color: "#2c3e50" }}>
                                                                {vendor.name}
                                                            </span>
                                                            <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                                                                {vendor.email}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <span key={idx} style={{ fontSize: "0.85rem", color: "#6c757d" }}>Unknown Vendor</span>
                                                    )
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="empty-msg">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;
