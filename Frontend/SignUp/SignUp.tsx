import styles from './signUp.module.css';
import { useState } from "react";

interface SignUpProps {
    users: any;
    setUsers: any; // Setter para actualizar el estado de "loggedIn"
}

export default function SignUp({ users, setUsers }: SignUpProps) {

    const [newUser, setNewUser] = useState({ username: '', password: '' });

    function createUser(e: any) {
        e.preventDefault();

        if (users.some((user: any) => user.username === newUser.username)) {
            alert('Username already exists!');
            return;
        } else if (newUser.username === '') {
            alert('The username field must be not empty');
        } else if (newUser.password.length < 5) {
            alert('The password must have 5 characters at least');
        } else {
            // Realizar la solicitud POST al servidor Flask
            fetch('http://127.0.0.1:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newUser), // Enviar el nuevo usuario como JSON
            })
                .then(res => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Failed to create user');
                    }
                })
                .then(data => {
                    setUsers([...users, data]); // Actualizar la lista de usuarios
                    setNewUser({ username: '', password: '' });
                    alert('User created successfully!');
                })
                .catch(error => console.error('Error creating user:', error));
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Sign Up</h1>
            <form className={styles.form}>
                <label className={styles.label}>Enter an username:</label> <br />
                <input
                    className={styles.input}
                    type="text"
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                /> <br />
                <label className={styles.label}>Enter a password:</label> <br />
                <input
                    className={styles.input}
                    type="password"
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                /> <br />
                <button className={styles.createAccountBtn} onClick={createUser}>
                    Create account
                </button>
            </form>
            <footer className={styles.footer}>
                &copy; {new Date().getFullYear()} Limitless
            </footer>
        </div>
    );
}