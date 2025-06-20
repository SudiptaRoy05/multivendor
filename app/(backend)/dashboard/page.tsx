import getUser from "@/app/action/auth/getUser";
import SellerOverview from "@/components/sellerOverview";
import UserOverview from "@/components/userOverview";

export default async function page() {
    const user = await getUser();
    
    return (
        <div>
            {user?.role === "seller" ? <SellerOverview user={user} />: <UserOverview />}
            
        </div>
    )
}
