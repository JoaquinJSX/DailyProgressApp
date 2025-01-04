import styles from './logIn.module.css';
import { useReducer, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'updateField':
            return {
                ...state,
                [action.field]: action.value, // Actualiza dinámicamente el campo por nombre
            };
        case 'reset':
            return action.initialState; // Resetea el estado al inicial
        default:
            throw new Error(`Acción desconocida: ${action.type}`);
    }
};

export default function LogIn() {

    useEffect(() => {
        fetch('http://127.0.0.1:5000/users') // URL correcta
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const [users, setUsers] = useState([]);
    const [state, dispatch] = useReducer(reducer, { username: '', password: '' });

    function handleChange(e: any) {
        dispatch({
            type: 'updateField',
            field: e.target.name, // Nombre del campo (name o email)
            value: e.target.value, // Valor ingresado
        });
    };

    function logIn(e: any) {

        e.preventDefault();

        let userId = 0;

        if (users.length === 0) {
            alert('There are no users yet');
        } else {
            for (let i in users) {
                if (users[i].username != state.username) {
                    userId++;
                    if (userId == users.length) {
                        alert('username not found');
                    }
                } else {
                    if (users[userId].password != state.password) {
                        alert('Incorrect password');
                    } else {
                        //do something
                    }
                }
            }
        }
    }

    return (
        <div className="log-in_container">
            <h1>Log In</h1>
            <form>
                Enter your username: <input
                    type="text"
                    name='username'
                    value={state.username} // Vincular con el estado
                    onChange={handleChange} // Llama a dispatch cuando cambia
                />
                Enter your password:  <input
                    type="password"
                    name='password'
                    value={state.password} // Vincular con el estado
                    onChange={handleChange} // Llama a dispatch cuando cambia
                />
                <button onClick={logIn}>Get into</button>
            </form>
            <Link to='/sign-up'>Don´t have an account?</Link>
        </div>
    );
}