import { useEffect, useState } from "react";
import DashboardCard from "../../../Components/Common/DashboardCard";
import Features from "../../../Components/HomepageSections/Features";
import VerticalNavbar from "../../../Components/Common/VerticalNavbar";

const AdminDashboard = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getNumbers();
  }, []);

  const getNumbers = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/getnumbers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const answer = await response.json();
    setInfo(answer.data);
  };

  return (
    <div className="flex flex-row w-full">
      <VerticalNavbar />
      <div className="grid grid-cols-12 gap-x-10 w-full pt-10 px-10 flex-col pb-10 h-fit">
        <DashboardCard
          link="/admin/users"
          name="Users"
          number={info.Users}
          details={[
            "Create new users",
            "View current users",
            "Edit user details",
            "Add new counselors",
            "Delete users",
          ]}
        />
        <DashboardCard
          link="/admin/payments"
          name="Payments"
          number={info.Payments}
          details={[
            "View payment history",
            "View user who have paid for the services",
            "Delete payments",
          ]}
        />
        <DashboardCard
          link="/admin/reviews"
          name="Reviews"
          number={info.Reviews}
          details={["View current reviews", "Delete reviews"]}
        />
        <DashboardCard
          link="/admin/colleges"
          name="Colleges"
          number={info.Colleges}
          details={[
            "Create new colleges",
            "View current colleges",
            "Edit college details",
            "Delete colleges",
          ]}
        />
        <DashboardCard
          link="/admin/universities"
          name="Universities"
          number={info.Universities}
          details={[
            "Create new universities",
            "View current universities",
            "Edit university details",
            "Delete universities",
          ]}
        />
        <DashboardCard
          link="/admin/subjects"
          name="Subjects"
          number={info.Subjects}
          details={[
            "Create new subjects",
            "View current subjects",
            "Edit course subjects",
            "Delete subjects",
          ]}
        />
        <DashboardCard
          link="/admin/courses"
          name="Courses"
          number={info.Courses}
          details={[
            "Create new courses",
            "View current courses",
            "Edit course details",
            "Delete courses",
          ]}
        />
        <DashboardCard
          link="/admin/questions"
          name="Mock Questions"
          number={info.Questions}
          details={[
            "Create new mock questions",
            "View multiple mock questions at once",
            "Edit mock questions",
            "Delete mock questions",
          ]}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
