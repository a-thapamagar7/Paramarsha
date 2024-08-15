import { useState, useEffect } from "react";
import editImg from "../../../Images/edit.png";
import deleteImg from "../../../Images/delete.png";
import rightImg from "../../../Images/check-mark.png";
import wrongImg from "../../../Images/cross.png";
import VerticalNavbar from "../../../Components/Common/VerticalNavbar";

const AdminSubjects = () => {
  const wrongError = "text-red-600 text-xs";
  const rightError = "text-green-600 text-xs";
  const [subject, setSubject] = useState([]);
  const [error, setError] = useState({});
  const [editPressed, setEditPressed] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [identifyID, setIdentifyID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getsubjectinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setSubject(answer.data);
  };

  const deleteSubjects = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subject/delete/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const answer = await response.json();
    if (answer.message == "data_deleted") {
      const newError = { ...error };
      newError.message = "The data has been deleted";
      newError.style = rightError;
      setError(newError);
      const newData = subject.filter((item) => item._id !== userId);
      setSubject(newData);
    } else {
      error.message = "There was an error deleting data";
      error.style = wrongError;
    }
  };

  const showEditMode = (newName, newDescription, newID) => {
    setName(newName);
    setDescription(newDescription);
    setIdentifyID(newID);
    setEditPressed(true);
  };

  const editSubjects = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subject/update/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );
    const answer = await response.json();
    if (answer.message == "data_updated") {
      const index = subject.findIndex((random) => random._id == userId);
      const updatedSubject = Object.assign({}, subject[index], {
        name,
        description,
      });
      const newState = [...subject];
      newState[index] = updatedSubject;
      setSubject(newState);
      setName("");
      setDescription("");
      const newError = { ...error };
      newError.message = "The data has been updated";
      newError.style = rightError;
      setError(newError);
    } else {
      error.message = "There was an error deleting data";
      error.style = wrongError;
    }
  };

  const createSubjects = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/subject/create`,
      {
        method: "POST",
        //sends the data in json format
        headers: {
          "Content-Type": "application/json",
        },
        //sends the states to the server
        body: JSON.stringify({
          name,
          description,
        }),
      }
    );

    const answer = await response.json();
    if (answer.data) {
      const newError = { ...error };
      newError.message = "The subject have been sucessfully added";
      newError.style = rightError;
      setError(newError);
      setSubject(answer.data);
    } else {
      const newError = { ...error };
      newError.message = "There was an error";
      newError.style = wrongError;
      setError(newError);
    }
  };

  return (
    <div className="flex flex-row w-full">
      <VerticalNavbar />
      <div className="flex w-full pt-10 px-10 flex-col pb-10">
        <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500">
          <span>Subjects</span>
        </div>
        <div className={error.style}>{error.message}</div>
        <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
          <thead>
            <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
              <th className="col-span-1">S.N.</th>
              <th className="col-span-3">Name</th>
              <th className="col-span-6">Description</th>
              <th className="col-span-2"></th>
            </tr>
          </thead>

          <tbody>
            {subject.map((value, index) => {
              return !editPressed || value._id != identifyID ? (
                <tr
                  key={index}
                  className={
                    "hover:bg-yellow-100 border-y grid grid-cols-12 h-11 max-h-11 place-items-center " +
                    `${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`
                  }
                >
                  <td className="col-span-1">{index + 1}</td>
                  <td className="col-span-3">{value.name}</td>
                  <td className="relative col-span-6 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                    {value.description}
                  </td>

                  <td className="flex items-center gap-x-5 col-span-2">
                    <button
                      onClick={() =>
                        showEditMode(value.name, value.description, value._id)
                      }
                    >
                      <img className="h-6" src={editImg} />
                    </button>
                    <button
                      onClick={() => {
                        deleteSubjects(value._id);
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
                  <td className="col-span-3">
                    <input
                      className="w-full h-full bg-transparent outline-none"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                    />
                  </td>
                  <td className="w-full relative col-span-6 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                    <input
                      className="w-full h-full bg-transparent text-center outline-none"
                      type="text"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      value={description}
                    />
                  </td>

                  <td className="flex items-center gap-x-7 col-span-2">
                    <button
                      onClick={() => {
                        editSubjects(value._id);
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
                <td className="col-span-3 w-full h-full border-r">
                  <input
                    className="w-full h-full bg-transparent outline-none"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </td>
                <td className="w-full h-full border-r relative col-span-6 px-4 py-2 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-full">
                  <input
                    className="w-full h-full bg-transparent text-center outline-none"
                    type="text"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    value={description}
                  />
                </td>

                <td className="flex items-center gap-x-7 col-span-2">
                  <button
                    onClick={() => {
                      createSubjects();
                      setName("");
                      setDescription("");
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

export default AdminSubjects;
