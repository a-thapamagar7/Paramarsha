import { useState, useEffect } from "react";
import deleteImg from "../../../Images/delete.png";
import VerticalNavbar from "../../../Components/Common/VerticalNavbar";

const AdminPayments = () => {
  const wrongError = "text-red-600 text-xs";
  const rightError = "text-green-600 text-xs";
  const [payment, setPayment] = useState([]);
  const [error, setError] = useState({});
  const [editPressed, setEditPressed] = useState(false);
  const [createPressed, setCreatePressed] = useState(false);
  const [identifyID, setIdentifyID] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    getPayments();
  }, []);

  const changeDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const getPayments = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getpaymentinfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    console.log(answer.data);
    setPayment(answer.data);
  };

  const deletePayments = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/payment/delete/${userId}`,
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
      const newData = payment.filter((item) => item._id !== userId);
      setPayment(newData);
    } else {
      error.message = "There was an error deleting data";
      error.style = wrongError;
    }
  };

  return (
    <div className="flex flex-row w-full">
      <VerticalNavbar />
      <div className="flex w-full pt-10 px-10 flex-col pb-10">
        <div className="text-2xl mb-10 font-bold tracking-tight spacegrotesk text-gray-500">
          <span>Payments</span>
        </div>
        <div className={error.style}>{error.message}</div>
        <table className=" text-gray-600 text-xs font-medium rounded shadow-lg lato">
          <thead>
            <tr className="grid border-y grid-cols-12 place-items-center h-11 bg-gray-100">
              <th className="col-span-1">S.N.</th>
              <th className="col-span-2">TransactionID</th>
              <th className="col-span-2">Name</th>
              <th className="col-span-1">Email</th>
              <th className="col-span-1">Method</th>
              <th className="col-span-2">Pidx</th>
              <th className="col-span-2">Date</th>
              <th className="col-span-1"></th>
            </tr>
          </thead>

          <tbody>
            {payment.map((value, index) => {
              return (
                <tr
                  key={index}
                  className={
                    "hover:bg-yellow-100 border-y grid grid-cols-12 h-11 max-h-11 place-items-center " +
                    `${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`
                  }
                >
                  <td className="col-span-1">{index + 1}</td>
                  <td className="col-span-2">{value.transactionId}</td>
                  <td className="col-span-2">
                    {value.user.firstName + " "}
                    {value.user.lastName}
                  </td>
                  <td className="col-span-1">{value.user.email}</td>
                  <td className="col-span-1">{value.paymentMethod}</td>

                  <td className="col-span-2">{value.pidx}</td>
                  <td className="col-span-2">{changeDate(value.createdAt)}</td>
                  <td className="flex items-center gap-x-5 col-span-1">
                    <button
                      onClick={() => {
                        deletePayments(value._id);
                      }}
                    >
                      <img className="h-7" src={deleteImg} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
