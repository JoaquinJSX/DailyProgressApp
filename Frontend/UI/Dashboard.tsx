import Header from "./Components/Header";

interface DashBoardProps {
    users: any;
    userLoggedIn: number;
}

export default function Dashboard({ users, userLoggedIn }: DashBoardProps) {

    return (
        <div>
            <Header users={users} userLoggedIn={userLoggedIn}/>
        </div>
    );
}