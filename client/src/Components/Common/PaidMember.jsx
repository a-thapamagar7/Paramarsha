import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

function PaidMember({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const fetchData = async () => {
        const response = await fetch(`http://localhost:1447/api/user/getdetails`, {
          method: "GET",
          headers: {
            'x-access-token': localStorage.getItem('token'),
            "Content-Type": "application/json"
          }
        });

        const answer = await response.json();
        if (answer.data.isPaidMember || answer.role != "user") {
          setAuthorized(true);
        }

        setLoading(false);
      };

      fetchData();
    } else {
      setLoading(false); // No token, so set loading to false
    }
  }, []);

  if (loading) {
    // You can show a loading spinner or any other UI element indicating the loading state
    return <div>Loading...</div>;
  }

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }

  if (!authorized) {
    return <Navigate to="/epay" replace />;
  }

  return children;
}

export default PaidMember;