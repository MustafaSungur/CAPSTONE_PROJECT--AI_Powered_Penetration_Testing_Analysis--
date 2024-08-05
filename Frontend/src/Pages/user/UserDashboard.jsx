import { useDispatch, useSelector } from "react-redux";
import pending from "../../assets/pending.svg";
import completed from "../../assets/complated.svg";
import total from "../../assets/total.svg";
import redFinger from "../../assets/redFinger.svg";
import greenFinger from "../../assets/greenFinger.svg";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../Components/ui/table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllOsints } from "../../api/osintFetch";
import { Input } from "@/Components/ui/input";
import { checkCookie } from "../../app/features/auth/authSlice";

const UserDashboard = () => {
  const dispatch = useDispatch();

  const [osints, setOsints] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const { userInfo } = useSelector((state) => state.auth);
  const [status, setStatus] = useState({
    total: 0,
    scanning: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchOsints = async () => {
      dispatch(checkCookie());
      const data = await getAllOsints(userInfo._id);
      setOsints(data.message);
      setFilterData(data.message); // filterData'yı osints'in kendisiyle başlat
      const countNullComments = (data) => {
        let scanningCount = 0;
        data.forEach((item) => {
          if (item.comment === null) {
            scanningCount++;
          }
        });
        return scanningCount;
      };
      setStatus({
        total: data.message.length,
        scanning: countNullComments(data.message),
        completed: data.message.length - countNullComments(data.message),
      });
    };

    fetchOsints();
  }, []);

  const onChange = (e) => {
    const searchText = e.target.value;
    if (searchText === "") {
      setFilterData(osints);
    } else {
      setFilterData(osints.filter((data) => data.url.includes(searchText)));
    }
  };

  const handleFilterChange = (selectedStatus) => {
    setFilterStatus(selectedStatus);
    if (selectedStatus === "All") {
      setFilterData(osints);
    } else {
      setFilterData(
        osints.filter((data) =>
          selectedStatus === "Scanning"
            ? data.comment === null
            : data.comment !== null
        )
      );
    }
  };
  return (
    <div>
      <div className="w-4/5 mx-auto">
        <p className="p-6 text-xl">
          {userInfo.firstname} {userInfo.lastname}
        </p>
        {/* CARDS */}
        <div className="flex gap-5 mx-auto ">
          <div className="rounded-xl border bg-card text-card-foreground shadow flex p-2 ">
            <div>
              <div className="p-6 w-40 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Total Osint
                </h3>
              </div>
              <div className="p-6 pt-0 text-xl">{status.total}</div>
            </div>
            <div className="grid">
              <img
                src={total}
                className="h-10 w-10 text-muted-foreground my-auto"
              />
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow flex p-2 ">
            <div>
              <div className="p-6 w-40 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Scanning Osint
                </h3>
              </div>
              <div className="p-6 pt-0 text-xl">{status.scanning}</div>
            </div>
            <div className="grid">
              <img
                src={pending}
                className="h-10 w-10 text-muted-foreground my-auto"
              />
            </div>
          </div>
          <div className="rounded-xl border bg-card text-card-foreground shadow flex p-2">
            <div>
              <div className="p-6 w-40 flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">
                  Completed Osint
                </h3>
              </div>
              <div className="p-6 pt-0 text-xl">{status.completed}</div>
            </div>
            <div className="grid">
              <img
                src={completed}
                className="h-10 w-10 text-muted-foreground my-auto"
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <Table className="my-10 ">
          <TableCaption>A list of your url for osint</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Count</TableHead>
              <TableHead>
                <div className="flex  gap-5">
                  <span className="my-auto">URL</span>
                  <Input
                    placeholder="Search"
                    className="w-1/5 my-auto"
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </TableHead>
              <TableHead>
                <div className="w-4/5 text-start">
                  <div className="my-4">
                    <span className="mr-5">Status</span>

                    <select
                      value={filterStatus}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="px-2 py-1 border rounded-md focus:outline-none"
                    >
                      <option value="All">All</option>
                      <option value="Scanning">Scanning</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filterData &&
              filterData.map((osint, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{osint.url}</TableCell>
                  <TableCell>
                    {osint.comment ? "Completed" : "Scanning"}
                  </TableCell>
                  <TableCell className="text-right">
                    {osint.comment === null ? (
                      <div className="flex justify-end">
                        <img
                          src={redFinger}
                          alt="details"
                          className="h-10 w-10 text-muted-foreground my-auto "
                        />
                      </div>
                    ) : (
                      <Link
                        to={`/user/dashboard/${osint.comment}`}
                        className="flex justify-end"
                      >
                        <img
                          src={greenFinger}
                          alt="details"
                          className="h-10 w-10 text-muted-foreground my-auto "
                        />
                      </Link>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserDashboard;
