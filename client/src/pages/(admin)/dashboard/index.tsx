import Heading from "@/components/heading";
import { Card, CardContent } from "@/components/ui/card";
import { useOrders } from "@/hooks/use-orders";
import { useProducts } from "@/hooks/use-product";
import { useTotalRevenue } from "@/hooks/use-total-revenue";
import { formatter } from "@/lib/utils";
import { LucideBox, LucideUsers2 } from "lucide-react";
import { BsInbox } from "react-icons/bs";
import { MdAttachMoney, MdOutlineWavingHand } from "react-icons/md";
import Overview from "./_components/overview";
import useGraphRevenue from "@/hooks/use-graph-revenue";
import { Link } from "react-router-dom";
import RecentOrders from "./_components/recent-orders";
import { useUsers } from "@/hooks/use-user";
import { useMemo } from "react";

const DashboardPage = () => {
  const { data: recentOrders } = useOrders({
    _limit: 5,
  });
  const { data: orders } = useOrders();
  const { data: products } = useProducts({
    get_all: true,
  });
  const { data: users } = useUsers({
    get_all: true,
  });
  const { graphData } = useGraphRevenue();
  const totalRevenue = useTotalRevenue();

  const productCount = useMemo(
    () => products?.totalDocs || products?.metaData?.length || 0,
    [products]
  );
  const orderCount = useMemo(() => orders?.totalDocs ?? 0, [orders]);
  const userCount = useMemo(() => users?.metaData?.length ?? 0, [users]);

  const statsCards = [
    {
      title: "Total Revenue",
      value: formatter.format(totalRevenue),
      icon: <MdAttachMoney className="w-6 h-6 opacity-70" />,
    },
    {
      title: "Sales",
      value: `+${orderCount}`,
      icon: <BsInbox className="w-6 h-6 opacity-70" />,
    },
    {
      title: "Products in Stock",
      value: productCount,
      icon: <LucideBox className="w-6 h-6 opacity-70" />,
    },
    {
      title: "Users",
      value: `+${userCount}`,
      icon: <LucideUsers2 className="w-6 h-6 opacity-70" />,
    },
  ];

  return (
    <div className="flex flex-col lg:gap-y-6 gap-y-4">
      <div className="md:flex items-start hidden">
        <Heading title="Overview" variant="large" />
        <MdOutlineWavingHand className="w-5 h-5 mt-1 ml-2" />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-4 gap-3">
        {statsCards.map((card, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">{card.title}</p>
                {card.icon}
              </div>
              <p className="font-bold text-2xl mt-3">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <p className="text-base font-medium">Overview</p>
              <p className="font-normal text-xs text-neutral-600">
                Monthly revenue and sales overview
              </p>
            </div>
            <div className="w-full h-[350px] mt-8">
              <Overview data={graphData} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <p className="text-base font-medium">Recent orders</p>
                <p className="font-normal text-xs text-neutral-600">
                  Latest orders from your store
                </p>
              </div>
              <Link to="/dashboard/orders" className="text-sm underline">
                View all
              </Link>
            </div>
            <div className="w-full h-[350px] mt-8">
              {recentOrders?.metaData && (
                <RecentOrders data={recentOrders.metaData} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
