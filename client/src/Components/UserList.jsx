import Sidebar from "./Sidebar";


const UserList = () => {
    const users = [
        { id: 1, name: 'John Doe', email: 'johndoe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'janesmith@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com' },
        { id: 4, name: 'Alice Brown', email: 'alicebrown@example.com' },
        { id: 5, name: 'Tom Williams', email: 'tomwilliams@example.com' },
        { id: 6, name: 'Sara Lee', email: 'saralee@example.com' },
        { id: 7, name: 'Mike Jones', email: 'mikejones@example.com' },
        { id: 8, name: 'Emily Davis', email: 'emilydavis@example.com' },
        { id: 9, name: 'Adam Lee', email: 'adamlee@example.com' },
        { id: 10, name: 'Lily Chen', email: 'lilychen@example.com' },
    ];


    const handleEdit = (userId) => {
        // Implement edit user functionality
    };

    const handleDelete = (userId) => {
        // Implement delete user functionality
    };

    return (
        <div className="flex">


            <div className="flex-1  container mx-auto px-4 py-8">

                <h1 className=" text-4xl font-bold text-gray-800 mb-10">All Users</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{user.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleEdit(user.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                            Edit
                                        </button>
                                        <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};


export default UserList;
