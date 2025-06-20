import getUser from "@/app/action/auth/getUser";
import SellerAside from "./sellerAside";
import UserAside from "./userAside";
import getShop from "@/app/action/auth/getShop";

export default async function DashboardAside() {
  const user = await getUser();
  const shopData = await getShop();

  const shop = (shopData ?? []).map((s) => ({
    _id: s._id.toString(),
    name: s.name ?? "Unnamed Shop", // Provide a fallback name
  }));

  console.log(shop)

  return (
    <div>
      {user?.role === "seller" ? <SellerAside shop={shop} /> : <UserAside />}
    </div>
  );
}