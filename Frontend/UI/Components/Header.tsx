interface HeaderProps {
    users: any;
    userLoggedIn: number;
}

export default function Header({users, userLoggedIn} : HeaderProps) {
    return(
        <header>
            <h1>Welcome {users[userLoggedIn].username}!</h1>
        </header>
    );
}