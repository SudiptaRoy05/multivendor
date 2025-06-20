
import { auth } from "@/app/api/auth/[...nextauth]/route"
import CreateShopForm from "@/components/CreatShopForm"

const CreateShop = async () => {
    const session = await auth()

    if (!session || !session.user) {
        return <p>Please login to create a shop</p>
    }
    const user = {
        name: session.user.name || "",
        email: session.user.email || "",
    }

    return (
        <div>
            <CreateShopForm user={user} />
        </div>
    )
}

export default CreateShop
