import { useState, useEffect } from "react";
import { useOrders } from "./use-orders";

interface GraphData {
  name: string;
  total: number;
  sale: number;
}

const useGraphRevenue = () => {
  const [graphData, setGraphData] = useState<GraphData[]>([]);

  const {
    data: orders,
    isLoading,
    error,
  } = useOrders({
    get_all: true,
  });

  const paidedOrders = orders?.metaData.filter(
    (order) => order.paymentState === "Paid"
  );

  useEffect(() => {
    if (paidedOrders) {
      const monthlyRevenue: { [key: number]: number } = {};
      const monthlySales: { [key: number]: number } = {};

      paidedOrders.forEach((order: any) => {
        const month = new Date(order.createdAt).getMonth();
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total;
        monthlySales[month] = (monthlySales[month] || 0) + 1;
      });

      const newGraphData: GraphData[] = [
        { name: "Jan", total: 0, sale: 0 },
        { name: "Feb", total: 0, sale: 0 },
        { name: "Mar", total: 0, sale: 0 },
        { name: "Apr", total: 0, sale: 0 },
        { name: "May", total: 0, sale: 0 },
        { name: "Jun", total: 0, sale: 0 },
        { name: "Jul", total: 0, sale: 0 },
        { name: "Aug", total: 0, sale: 0 },
        { name: "Sep", total: 0, sale: 0 },
        { name: "Oct", total: 0, sale: 0 },
        { name: "Nov", total: 0, sale: 0 },
        { name: "Dec", total: 0, sale: 0 },
      ];

      Object.keys(monthlyRevenue).forEach((month) => {
        newGraphData[parseInt(month)].total = Number(
          monthlyRevenue[parseInt(month)].toFixed(2)
        );
      });

      Object.keys(monthlySales).forEach((month) => {
        newGraphData[parseInt(month)].sale = Number(
          monthlySales[parseInt(month)].toFixed(2)
        );
      });

      setGraphData(newGraphData);
    }
  }, [paidedOrders]);

  return { graphData, isLoading, error };
};

export default useGraphRevenue;
