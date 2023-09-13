import { Outlet, useParams } from "react-router";
import { users } from "../../db";
import { Link } from "react-router-dom";

export const User = () => {
  const { userId } = useParams();
  return (
    <h1>
      User with it {userId} is named: {users[Number(userId) - 1].name}
      <hr />
      <Link to="followers">See followers</Link>
      <Outlet />
    </h1>
  );
};
