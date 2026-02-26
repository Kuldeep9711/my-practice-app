

interface User { 
    id: number;
     name: string;
     email: string;
}

async function getUsers() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if(!res.ok) throw new Error('Failed')
        return res.json() as Promise<User[]>;
}

export default async function UserList() {
    const users = await getUsers();


  return (
    <ul>
        {users.slice(0, 5).map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
        ))}
    </ul>
  )
}