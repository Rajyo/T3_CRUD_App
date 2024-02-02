"use client";

import { api } from "~/trpc/react";
import { useState } from "react";

export default function Main() {
  //define constants
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameToUpdate, setNameToUpdate] = useState("");
  const [emailToUpdate, setEmailToUpdate] = useState("");
  const [userId, setUserId] = useState("");
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [click, setClick] = useState(false)

  //define functions
  const fetchAllUsers = api.user.getAll.useQuery();
  const fetchOneUser = api.user.getOne.useQuery({ id: userId });

  const createUserMutation = api.user.createUser.useMutation();
  const updateUserMutation = api.user.updateUser.useMutation();
  const deleteUserMutation = api.user.deleteUser.useMutation();

  //define handlers
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        name: name,
        email: email,
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
      setName("");
      setEmail("");
      await fetchAllUsers.refetch().then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: userIdToUpdate,
        name: nameToUpdate,
        email: emailToUpdate,
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      await fetchAllUsers.refetch().then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync({
        id: userIdToDelete,
      }).then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
      setUserIdToDelete("");
      await fetchAllUsers.refetch().then((res) => {
        console.log(res)
      }).catch((error) => {
        console.log(error)
      });
    } catch (error) {
      console.log(error);
    }
  };

  //return an empty div
  return (
    <div className="mx-auto p-8">
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get All Users</h2>
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={async () => { setClick(true); await fetchAllUsers.refetch() }}
      >
        Get All Users
      </button>

      <div className="text- mb-4 mt-4 grid grid-cols-3 gap-4 font-bold">
        <p>Id</p>
        <p>Name</p>
        <p>Email</p>
      </div>

      {(click && fetchAllUsers?.data) &&
        fetchAllUsers?.data?.map((user) => (
          <div
            key={user.id}
            className="my-4 grid grid-cols-3 gap-4 rounded border border-gray-300 bg-white p-4 shadow"
          >
            <p>{user.id}</p>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}

      {/* Get one user UI */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Get One User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 border border-gray-300 p-2"
            placeholder="Enter user id to get"
            value={userId || ""}
            onChange={(e) => setUserId(String(e.target.value))}
          />
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={async () => await fetchOneUser.refetch().then((res) => {
              console.log(res)
            }).catch((error) => {
              console.log(error)
            })}
          >
            Get One User
          </button>
        </div>
        {fetchOneUser?.data && (
          <div>
            <p>Name: {fetchOneUser.data.name}</p>
            <p>Email: {fetchOneUser.data.email}</p>
          </div>
        )}
      </div>

      {/* Create User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Create New User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          onClick={handleCreateUser}
        >
          Create User
        </button>
      </div>

      {/* Update User */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Update User</h2>
        <div className="mb-4 flex">
          <input
            className="mr-2 w-1/2 border border-gray-300 p-2"
            placeholder="Name to update"
            value={nameToUpdate}
            onChange={(e) => setNameToUpdate(e.target.value)}
          />
          <input
            className="w-1/2 border border-gray-300 p-2"
            placeholder="Email to update"
            value={emailToUpdate}
            onChange={(e) => setEmailToUpdate(e.target.value)}
          />
        </div>
        <input
          placeholder="Enter user id to update"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToUpdate}
          onChange={(e) => setUserIdToUpdate(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          onClick={handleUpdateUser}
        >
          Update User
        </button>
      </div>

      {/* Delete User */}

      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
        <input
          placeholder="Enter user id to delete"
          className="mr-2 border border-gray-300 p-2"
          value={userIdToDelete}
          onChange={(e) => setUserIdToDelete(e.target.value)}
        />
        <button
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleDeleteUser}
        >
          Delete User
        </button>
      </div>
    </div>
  );
}