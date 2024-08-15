import { useState, useEffect } from "react";
import editImg from "../../../Images/edit.png";
import deleteImg from "../../../Images/delete.png";
import rightImg from "../../../Images/check-mark.png";
import wrongImg from "../../../Images/cross.png";
import VerticalNavbar from "../../../Components/Common/VerticalNavbar";
import ComboBox from "../../../Components/Common/ComboBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsers = () => {
  const wrongError = "text-red-600 text-xs";
  const rightError = "text-green-600 text-xs";
  const [user, setUser] = useState([]);
  const [error, setError] = useState({});
  const [editPressed, setEditPressed] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [identifyID, setIdentifyID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isPaidMember, setIsPaidMember] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
    { label: "Counselor", value: "counselor" },
  ]);

  useEffect(() => {
    getUsers();
  }, []);

  const handleChangeRole = (value) => {
    setRole(value);
  };

  const getUsers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getuserinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setUser(answer.data);
  };

  const deleteUsers = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const answer = await response.json();
    if (answer.status == "success") {
      toast.success(answer.message);
      const newData = user.filter((item) => item._id !== userId);
      setUser(newData);
    } else {
      toast.error(answer.message);
    }
  };

  const editUsers = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          role,
          isPaidMember,
        }),
      }
    );
    const answer = await response.json();
    if (answer.status == "success") {
      const index = user.findIndex((random) => random._id == userId);
      const updatedSubject = Object.assign({}, user[index], {
        firstName,
        lastName,
        email,
        role,
        isPaidMember,
      });
      const newState = [...user];
      newState[index] = updatedSubject;
      setUser(newState);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setRole("");
      setIsPaidMember(false);
      setCreatePressed(false);
      toast.success(answer.message);
    } else {
      toast.error(answer.message);
    }
  };

  const createUsers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/create`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "Content-Type": "application/json",
        },
        //sends the states to the server
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
          isPaidMember,
        }),
      }
    );

    const answer = await response.json();
    if (answer.data) {
      toast.success(answer.message);
      setUser(answer.data);
    } else {
      toast.error(answer.message);
    }
  };

  const showEditMode = (
    firstName,
    lastName,
    email,
    role,
    isPaidMember,
    newID
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setRole(role);
    setIsPaidMember(isPaidMember);
    setEditPressed(true);
    setIdentifyID(newID);
  };

  return (
    <div className="flex flex-row w-full">
      <ToastContainer />
      <VerticalNavbar />
      <div className="flex w-full pt-10 px-10 flex-col pb-10">
        <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500">
          <span>Users</span>
        </div>
        <div className={error.style}>{error.message}</div>
        <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
          <thead>
            <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
              <th className="col-span-1">S.N.</th>
              <th className="col-span-1">First Name</th>
              <th className="col-span-2">Last Name</th>
              <th className="col-span-2">Email</th>
              <th className="col-span-1">Password</th>
              <th className="col-span-2">Role</th>
              <th className="col-span-1">isPaidMember</th>
              <th className="col-span-2"></th>
            </tr>
          </thead>

          <tbody>
            {user.map((value, index) => {
              return !editPressed || value._id != identifyID ? (
                <tr
                  key={index}
                  className={
                    "hover:bg-yellow-100 border-y grid grid-cols-12 h-11 max-h-11 place-items-center " +
                    `${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`
                  }
                >
                  <td className="col-span-1">{index + 1}</td>
                  <td className="col-span-1">{value.firstName}</td>
                  <td className="col-span-2">{value.lastName}</td>
                  <td className="col-span-2">{value.email}</td>
                  <td className="col-span-1">Hidden</td>
                  <td className="col-span-2">{value.role}</td>
                  <td className="col-span-1">{String(value.isPaidMember)}</td>

                  <td className="flex items-center gap-x-5 col-span-2">
                    <button
                      onClick={() =>
                        showEditMode(
                          value.firstName,
                          value.lastName,
                          value.email,
                          value.role,
                          value.isPaidMember,
                          value._id
                        )
                      }
                    >
                      <img className="h-6" src={editImg} />
                    </button>
                    <button
                      onClick={() => {
                        deleteUsers(value._id);
                      }}
                    >
                      <img className="h-7" src={deleteImg} />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={index}
                  className={
                    "border-y grid grid-cols-12 h-11 max-h-11 place-items-center " +
                    `${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`
                  }
                >
                  <td className="col-span-1">{index + 1}</td>
                  <td className="col-span-1 w-full h-full border-r">
                    <input
                      className="w-full h-full bg-transparent outline-none"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                    />
                  </td>
                  <td className="col-span-2 w-full h-full border-r">
                    <input
                      className="w-full h-full bg-transparent outline-none"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      value={lastName}
                    />
                  </td>
                  <td className="col-span-2 w-full h-full border-r">
                    <input
                      className="w-full h-full bg-transparent outline-none"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      value={email}
                    />
                  </td>
                  <td className="col-span-1 w-full h-full border-r">
                    Access Denied
                  </td>
                  <td className="col-span-2 w-full h-full border-r">
                    <ComboBox
                      border={true}
                      options={availableRoles}
                      selectedValue={role}
                      onValueChange={handleChangeRole}
                    />
                  </td>
                  <td className="col-span-1 w-full h-full border-r flex items-center justify-center">
                    Access Denied
                  </td>

                  <td className="flex items-center gap-x-7 col-span-2">
                    <button
                      onClick={() => {
                        editUsers(value._id);
                        setEditPressed(false);
                      }}
                    >
                      <img className="h-5" src={rightImg} />
                    </button>
                    <button onClick={() => setEditPressed(false)}>
                      <img className="h-4" src={wrongImg} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {createPressed ? (
              <tr className="border-y grid grid-cols-12 h-11 max-h-11 place-items-center">
                <td className="col-span-1 border w-full h-full flex items-center justify-center">
                  +
                </td>
                <td className="col-span-1 w-full h-full border-r">
                  <input
                    className="w-full h-full bg-transparent outline-none"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    value={firstName}
                  />
                </td>
                <td className="col-span-2 w-full h-full border-r">
                  <input
                    className="w-full h-full bg-transparent outline-none"
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    value={lastName}
                  />
                </td>
                <td className="col-span-2 w-full h-full border-r">
                  <input
                    className="w-full h-full bg-transparent outline-none"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </td>
                <td className="col-span-1 w-full h-full border-r">
                  <input
                    className="w-full h-full bg-transparent outline-none"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </td>
                <td className="col-span-2 w-full h-full border-r flex items-center justify-center">
                  <ComboBox
                    border={true}
                    options={availableRoles}
                    selectedValue={role}
                    onValueChange={handleChangeRole}
                  />
                </td>
                <td className="col-span-1 w-full h-full border-r flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4/6 h-4/6 bg-transparent outline-none"
                    onChange={(e) => {
                      setIsPaidMember(e.target.checked);
                    }}
                    value={isPaidMember}
                  />
                </td>

                <td className="flex items-center gap-x-7 col-span-2">
                  <button
                    onClick={() => {
                      createUsers();
                      setFirstName("");
                      setLastName("");
                      setEmail("");
                      setPassword("");
                      setRole("");
                      setIsPaidMember(false);
                      setCreatePressed(false);
                    }}
                  >
                    <img className="h-5" src={rightImg} />
                  </button>
                  <button onClick={() => setCreatePressed(false)}>
                    <img className="h-4" src={wrongImg} />
                  </button>
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
        <button
          className="bg-gray-400 w-8 h-8 mt-8 text-white hover:bg-gray-700"
          onClick={() => setCreatePressed(true)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
