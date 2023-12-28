import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./helper";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [botToken, setBotToken] = useState("");
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/admin`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
        setUsers([]);
      });
  }, []);

  const handleDelete = (userId) => {
    axios.delete(`${BASE_URL}/admin/${userId}`).then(() => {
      setUsers(users.filter((user) => user._id !== userId));
    });
  };

  const handleBlock = (e, id) => {
    const status = e.target.checked;
    if (status) {
      axios
        .put(`${BASE_URL}/admin/${id}`, {
          isBlocked: true,
        })
        .then(() => {
          setUsers(
            users.map((user) =>
              user._id === id ? { ...user, isBlocked: true } : user
            )
          );
        });
    } else {
      axios
        .put(`${BASE_URL}/admin/${id}`, {
          isBlocked: false,
        })
        .then(() => {
          setUsers(
            users.map((user) =>
              user._id === id ? { ...user, isBlocked: false } : user
            )
          );
        });
    }
  };

  const handleSaveSettings = () => {
    if (botToken === "" || apiKey === "")
      return alert("Please fill all fields");
    else {
      axios
        .post(`${BASE_URL}/settings`, {
          botToken: botToken,
          apiKey: apiKey,
        })
        .then((res) => {
          document.getElementById("my_modal_3").close();
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar bg-slate-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">WeatherBOT</a>
        </div>

        <div className="navbar-end">
          <button
            className="btn btn-ghost btn-circle mr-3"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-settings"
            >
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-xl mb-3">Bot Settings</h3>
              <label className="form-control w-full mb-4">
                <div className="label">
                  <span className="label-text text-slate-500">
                    Telegram Bot Token
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Token"
                  className="input input-bordered w-full"
                  onChange={(e) => setBotToken(e.target.value)}
                  value={botToken}
                  required
                />
              </label>
              <label className="form-control w-full mb-3">
                <div className="label">
                  <span className="label-text text-slate-500">
                    OpenWeatherMap API Key
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="API Key"
                  className="input input-bordered w-full"
                  onChange={(e) => setApiKey(e.target.value)}
                  value={apiKey}
                  required
                />
              </label>
              {/* <form method="dialog"> */}
              <button
                className="btn w-full btn-success text-white mt-4"
                onClick={handleSaveSettings}
              >
                Save
              </button>
              {/* </form> */}
            </div>
          </dialog>
          <Link className="btn btn-outline btn-md mr-3" to="/">
            Logout
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table bg-base-100">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>UserId</th>
              <th>Username</th>
              <th>City</th>
              <th>Blocked</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="hover">
                <th>{idx + 1}</th>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.city}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-md toggle-error"
                    onChange={(e) => handleBlock(e, user._id)}
                    checked={user.isBlocked}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-square btn-outline btn-sm btn-error"
                    onClick={() => handleDelete(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
