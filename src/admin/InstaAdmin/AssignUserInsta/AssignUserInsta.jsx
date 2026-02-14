import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { Pencil, Search } from "lucide-react";

// COMPONENTS
import DropdownWithSearch from "@/whatsapp/components/DropdownWithSearch";
import {
    instaAssignNotAssignUsers,
    instaUserList,
    instaAssignUsers,
} from "@/apis/instagram/Instagram";

const AssignUserInsta = () => {
    const [instaAccounts, setInstaAccounts] = useState([]);
    const [selectedInstaUser, setSelectedInstaUser] = useState(null);
    const [assignedUser, setAssignedUser] = useState([]);
    const [notAssignedUser, setNotAssignedUser] = useState([]);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [assignedSearchTerm, setAssignedSearchTerm] = useState("");


    // Separate selection states
    const [selectedAssignedUsers, setSelectedAssignedUsers] = useState([]);
    const [selectedUnassignedUsers, setSelectedUnassignedUsers] = useState([]);

    // Fetch all Instagram user accounts
    const fetchInstaUserList = async () => {
        try {
            const res = await instaUserList();
            setInstaAccounts(res?.data || []);
        } catch (error) {
            console.error("Error fetching Insta user list:", error);
        }
    };

    // Fetch assigned & not assigned users for selected Insta user
    const fetchAllInstaUsers = async () => {
        if (!selectedInstaUser) return;
        try {
            const res = await instaAssignNotAssignUsers(selectedInstaUser);
            setAssignedUser(res?.data?.assignUserList || []);
            setNotAssignedUser(res?.data?.notAssignUserList || []);
        } catch (error) {
            console.error("Error fetching Insta users:", error);
        }
    };

    // Filtering logic
    const filteredAssignedUsers = useMemo(() => {
        if (!assignedSearchTerm.trim()) return assignedUser;
        return assignedUser.filter((acc) =>
            acc.userId?.toLowerCase().includes(assignedSearchTerm.toLowerCase())
        );
    }, [assignedSearchTerm, assignedUser]);

    const filteredUsers = useMemo(() => {
        if (!searchTerm.trim()) return notAssignedUser;
        return notAssignedUser.filter((acc) =>
            acc.userId?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, notAssignedUser]);

    //  Highlight matched text
    const highlightMatch = (text, keyword) => {
        if (!keyword.trim()) return text;
        const regex = new RegExp(`(${keyword})`, "gi");
        return text.split(regex).map((part, i) =>
            regex.test(part) ? (
                <span key={i} className="bg-yellow-200 text-gray-900 font-medium">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    // Handle selections
    const handleSelectAssignedUser = (srNo) => {
        setSelectedAssignedUsers((prev) =>
            prev.includes(srNo) ? prev.filter((id) => id !== srNo) : [...prev, srNo]
        );
    };

    const handleSelectUnassignedUser = (srNo) => {
        setSelectedUnassignedUsers((prev) =>
            prev.includes(srNo) ? prev.filter((id) => id !== srNo) : [...prev, srNo]
        );
    };

    useEffect(() => {
        fetchInstaUserList();
    }, []);

    useEffect(() => {
        fetchAllInstaUsers();
    }, [selectedInstaUser]);

    const handleAssignUser = async () => {

        const existingAssignedUser = assignedUser.map(item => item.srNo)
        const data = {
            instaOffDetailSrNo: "1",
            instaAssignUserList: [...existingAssignedUser, ...selectedUnassignedUsers],
        };

        try {
            const res = await instaAssignUsers(data);
            fetchAllInstaUsers();
            setSelectedUnassignedUsers([])
            if (res.statusCode === 200) {
                toast.success("Assigned Successfully!!")
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <div>
            <div className="flex flex-col gap-8 p-6">
                {/* Header */}
                <h1 className="text-2xl font-semibold text-gray-800">
                    Assign Instagram Users
                </h1>

                {/* Dropdown */}
                <div className="w-full max-w-md">
                    <DropdownWithSearch
                        label="Select Instagram User"
                        placeholder="Select Instagram User"
                        value={selectedInstaUser}
                        onChange={(value) => setSelectedInstaUser(value)}
                        options={instaAccounts.map((acc) => ({
                            label: acc.userName,
                            value: acc.instaOffDetailSrNo,
                        }))}
                    />
                </div>
            </div>

            {/* Assigned + Not Assigned Users */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Assigned Users */}
                <div className="mt-5 bg-white p-4 rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <h2 className="text-lg font-medium text-gray-700">
                            Assigned Users ({filteredAssignedUsers.length})
                        </h2>

                        <div className="relative w-full sm:w-64">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search assigned users..."
                                value={assignedSearchTerm}
                                onChange={(e) => setAssignedSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 h-130 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
                        {filteredAssignedUsers.length > 0 ? (
                            filteredAssignedUsers.map((acc) => (
                                <div
                                    key={acc.srNo}
                                    className="flex items-center justify-between border border-gray-200 bg-gray-50 rounded-lg px-4 py-2 hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-blue-500 cursor-pointer"
                                            checked={selectedAssignedUsers.includes(acc.srNo)}
                                            onChange={() => handleSelectAssignedUser(acc.srNo)}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {highlightMatch(
                                                    acc.userId || "N/A",
                                                    assignedSearchTerm
                                                )}
                                            </p>
                                            <p className="text-xs text-gray-500">Sr No: {acc.srNo}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setOpenEditDialog(true)}
                                        className="text-gray-500 hover:text-gray-600 transition"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">No assigned users</p>
                        )}
                    </div>

                    {selectedAssignedUsers.length > 0 && (
                        <div className="mt-3">
                            <button className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                                Unassign Selected ({selectedAssignedUsers.length})
                            </button>
                        </div>
                    )}
                </div>

                {/* Not Assigned Users */}
                <div className="mt-5 bg-white p-4 rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <h2 className="text-lg font-medium text-gray-700">
                            Not Assigned Users ({filteredUsers.length})
                        </h2>

                        <div className="relative w-full sm:w-64">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                placeholder="Search unassigned users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:ring-1 focus:ring-blue-400 focus:border-blue-400 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-3 h-130 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 rounded-md">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((acc) => (
                                <div
                                    key={acc.srNo}
                                    className="flex items-center justify-between border border-gray-200 bg-white rounded-lg px-4 py-2 hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 accent-blue-500 cursor-pointer"
                                            checked={selectedUnassignedUsers.includes(acc.srNo)}
                                            onChange={() => handleSelectUnassignedUser(acc.srNo)}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">
                                                {highlightMatch(acc.userId || "N/A", searchTerm)}
                                            </p>
                                            <p className="text-xs text-gray-500">Sr No: {acc.srNo}</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setOpenEditDialog(true)}
                                        className="text-gray-500 hover:text-gray-700 transition"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">
                                No unassigned users found
                            </p>
                        )}
                    </div>

                    {selectedUnassignedUsers.length > 0 && (
                        <div className="mt-3">
                            <button
                                className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                onClick={handleAssignUser}
                            >
                                Assign Selected ({selectedUnassignedUsers.length})
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AssignUserInsta;
