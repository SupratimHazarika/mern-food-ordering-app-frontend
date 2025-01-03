import { CircleUserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
    const { user, logout } = useAuth0();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex justify-center px-3 gap-2 font-bold hover:text-orange-500 ">
                <CircleUserRound className="text-orange-500" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-3 py-3 px-4 justify-center items-center">
                <DropdownMenuItem>
                    <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
                        Manage Restaurant
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to="/user-profile" className="font-bold hover:text-orange-500">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button onClick={() => logout()} className="flex flex-1 font-bold bg-orange-500">
                        Log Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UsernameMenu;