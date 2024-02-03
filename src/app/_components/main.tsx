"use client";

import { api } from "~/trpc/react";
import { useState, useEffect } from "react";


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

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  //define functions
  const fetchAllUsers = api.user.getAll.useQuery();
  const fetchOneUser = api.user.getOne.useQuery({ id: userId });
  const updateOneUser = api.user.getOne.useQuery({ id: userIdToUpdate });
  const deleteOneUser = api.user.getOne.useQuery({ id: userIdToDelete });

  const createUserMutation = api.user.createUser.useMutation();
  const updateUserMutation = api.user.updateUser.useMutation();
  const deleteUserMutation = api.user.deleteUser.useMutation();

  //define handlers
  const handleCreateUser = async () => {
    if (name == "" || email == "") {
      alert("Enter name and email")
      return
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);
    if (!isValid) {
      alert("Enter valid Email ")
      return
    }

    await createUserMutation.mutateAsync({
      name: name,
      email: email,
    }).then(() => {
      setClick(true);
      setName("");
      setEmail("");
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchAllUsers.refetch()
    }).catch((error) => {
      console.log(error)
    })

  };

  const handleUpdateUser = async () => {
    if (nameToUpdate == "" || emailToUpdate == "") {
      alert("Enter valid name and email to update")
      return
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(emailToUpdate);
    if (!isValid) {
      alert("Enter valid Email")
      return
    }
    const res = updateOneUser
    if (res.data == null) {
      alert("Enter Valid UserID")
      return
    }
    await updateUserMutation.mutateAsync({
      id: userIdToUpdate,
      name: nameToUpdate,
      email: emailToUpdate,
    }).then(() => {
      setClick(true);
      setNameToUpdate("");
      setEmailToUpdate("");
      setUserIdToUpdate("");
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      fetchAllUsers.refetch()
    }).catch((error) => {
      console.log(error)
    });

  };

  const handleDeleteUser = async () => {
    const res = deleteOneUser
    if (res.data == null) {
      alert("Enter Valid UserID")
      return
    }
    await deleteUserMutation.mutateAsync({
      id: userIdToDelete,
    }).then(() => {
      setClick(true);
      setUserIdToDelete("");
      // eslint-disable-next-line @typescript-eslint/no-floating-promises 
      fetchAllUsers.refetch()
    }).catch((error) => {
      console.log(error)
    });

  };

  //return an empty div
  return (
    <div className="mx-auto p-8 mt-8">

      {/* CRUD */}
      <div className="grid grid-cols-4 gap-4">

        {/* Get one user UI */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Get One User</h2>
          <div className="mb-4 flex flex-col gap-4">
            <input
              className="border border-gray-300 p-2 max-w-[90%]"
              placeholder="Enter user id to get"
              value={userId}
              onChange={(e) => setUserId(String(e.target.value))}
            />
            <button
              className="rounded bg-blue-500 px-4 py-2 max-w-[90%] text-white hover:bg-blue-600"
              onClick={() => {
                const res = fetchOneUser
                if (res.data == null) {
                  alert("Enter Valid UserID")
                  return
                }
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                fetchOneUser.refetch()
              }
              }
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
          <div className="mb-4 flex flex-col gap-2">
            <input
              type="text"
              className=" border border-gray-300 p-2 max-w-[90%]"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className=" border border-gray-300 p-2 max-w-[90%]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            className="rounded bg-green-500 w-full px-4 py-2 max-w-[90%] text-white hover:bg-green-600"
            onClick={handleCreateUser}
          >
            Create User
          </button>
        </div>

        {/* Update User */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Update User</h2>
          <div className="mb-4 flex flex-col gap-2">
            <input
              className=" max-w-[90%] border border-gray-300 p-2"
              placeholder="Name to update"
              value={nameToUpdate}
              onChange={(e) => setNameToUpdate(e.target.value)}
            />
            <input
              className="max-w-[90%] border border-gray-300 p-2"
              placeholder="Email to update"
              value={emailToUpdate}
              onChange={(e) => setEmailToUpdate(e.target.value)}
            />
            <input
              placeholder="Enter user id to update"
              className="max-w-[90%] border border-gray-300 p-2"
              value={userIdToUpdate}
              onChange={(e) => setUserIdToUpdate(e.target.value)}
            />
          </div>

          <button
            className="w-full max-w-[90%] rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            onClick={handleUpdateUser}
          >
            Update User
          </button>
        </div>

        {/* Delete User */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">Delete User</h2>
          <div className="mb-4 flex flex-col gap-2">
            <input
              placeholder="Enter user id to delete"
              className=" border border-gray-300 p-2 max-w-[90%]"
              value={userIdToDelete}
              onChange={(e) => setUserIdToDelete(e.target.value)}
            />
            <button
              className="w-full max-w-[90%] rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleDeleteUser}
            >
              Delete User
            </button>
          </div>
        </div>

      </div>

      <hr className="border my-2" />

      {/* Get all users UI */}
      <div className="my-8">
        <div className="flex flex-col my-8">
          <h2 className="mb-4 text-3xl font-bold text-center">Get All Users</h2>

          <button
            className="rounded bg-violet-500 px-4 py-2 text-white hover:bg-violet-700 w-full max-w-[20%] m-auto"
            onClick={() => {
              setClick(true);
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              fetchAllUsers.refetch()
            }}
          >
            Get All Users
          </button>
        </div>

        <div className="mt-8 text-lg mb-4 grid grid-cols-12 px-4 gap-4 font-bold underline">

          <p className="col-span-5">User Id</p>
          <p className="col-span-3">Name</p>
          <p className="col-span-4">Email</p>
        </div>

        {// eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          (click && fetchAllUsers?.data) &&
          fetchAllUsers?.data?.map((user) => (
            <div
              key={user.id}
              className="my-4 grid grid-cols-12 gap-4 rounded border border-gray-300 p-4 shadow bg-red-50 items-center"
            >
              <p className="col-span-5">{user.id}</p>
              <p className="col-span-3">{user.name}</p>
              <p className="col-span-4">{user.email}</p>
            </div>
          ))}
      </div>

    </div>
  );
}