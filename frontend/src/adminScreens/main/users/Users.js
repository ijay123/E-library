import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../../redux/action/user";

const Users = () => {
  const dispatch = useDispatch();
  const {
    allUsers: { users },
  } = useSelector((state) => state);

  console.log(users, "allUsers");

  useEffect(() => {
    dispatch(getUsersAction());
  }, [dispatch]);

  return (
    <div className="w-[80vw] h-[100vh] top-[5vw] absolute right-0 bg-[grey] justify-center pt-[30px] flex gap-[70px]">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
