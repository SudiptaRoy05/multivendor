import { Button } from "./ui/button"
import { FcGoogle } from "react-icons/fc"

const SocialLogin = () => {
    return (
        <div>
            <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                
            >
                <FcGoogle className="h-5 w-5" />
                Login with Google
            </Button>
        </div>
    )
}

export default SocialLogin
