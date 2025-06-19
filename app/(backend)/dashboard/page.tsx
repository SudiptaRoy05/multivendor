import getUser from "@/app/action/auth/getUser";
import SellerOverview from "@/components/sellerOverview";

export default async function page() {
    const user = await getUser();
    return (
        <div>
            <SellerOverview user={user} />
        </div>
    )
}
