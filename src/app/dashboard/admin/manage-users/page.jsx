"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user`
            );

            const data = await res.json();

            setUsers(data);
            setFilteredUsers(data);
        } catch {
            toast.error("Failed to load users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        const keyword = search.toLowerCase();

        setFilteredUsers(
            users.filter(
                (user) =>
                    user.name?.toLowerCase().includes(keyword) ||
                    user.email?.toLowerCase().includes(keyword)
            )
        );
    }, [search, users]);

    const changeRole = async (email, role) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/role/${email}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            }

            toast.success("Role updated");

            setUsers((prev) =>
                prev.map((user) =>
                    user.email === email
                        ? { ...user, role }
                        : user
                )
            );
        } catch {
            toast.error("Something went wrong");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                Loading...
            </div>
        );
    }

    return (
        <div className="w-[95%] mx-auto py-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <h1 className="text-3xl font-bold">
                    Manage Users
                </h1>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border rounded-lg px-4 py-2 w-full md:w-72"
                />

            </div>

            <div className="overflow-x-auto rounded-xl border bg-white">

                <table className="table">

                    <thead className="bg-gray-100">

                        <tr>
                            <th>User</th>
                            <th> </th>

                            <th>Email</th>
                            <th className="px-2">Role</th>
                            <th>Change Role</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map((user) => (

                            <tr key={user._id}>

                                <td>

                                    <div className="flex p-2 items-center gap-3">



                                        <span className="font-medium px-2">
                                            {user.name}
                                        </span>

                                    </div>

                                </td>
                                <td>    </td>

                                <td className="px-2">{user.email}</td>

                                <td className="px-2">

                                    <span
                                        className={`badge capitalize
                                        ${user.role === "admin"
                                                ? "badge-error"
                                                : user.role ===
                                                    "artist"
                                                    ? "badge-info"
                                                    : "badge-success"
                                            }`}
                                    >
                                        {user.role}
                                    </span>

                                </td>

                                <td>

                                    <select
                                        value={user.role}
                                        onChange={(e) =>
                                            changeRole(
                                                user.email,
                                                e.target.value
                                            )
                                        }
                                        className="select select-bordered select-sm"
                                    >
                                        <option value="user">
                                            User
                                        </option>

                                        <option value="artist">
                                            Artist
                                        </option>

                                        <option value="admin">
                                            Admin
                                        </option>
                                    </select>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default ManageUsers;