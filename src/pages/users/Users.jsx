import React, { useState } from "react";
import SearchLoader from "../../components/loaders/SearchLoader";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import NoData from "../../components/shared/ui/NoData";
import SomethingWrong from "../../components/shared/ui/SomethingWrong";
// import SalesTable from "../../components/tables/sales/SalesTable";
import { avatar } from "../../assets/getAssets";
import UserTable from "../../components/tables/users/UsersTable";
function Users() {
  const isLoading = false;
  const isError = false;
  const [data] = useState([
    {
      id: 1,
      fileUrl: avatar,
      name: "Mahhen Hasan",
      email: "example@email.com",
      points: 50,
      uploads: 12,
      timestamp: 1691027717,
    },
    {
      id: 2,
      fileUrl: avatar,
      name: "Tusar Ahmed",
      email: "example@email.com",
      points: 40,
      uploads: 7,
      timestamp: 1693700791,
    },
  ]);
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const sortByTime = (a, b) => {
    return b.timestamp - a.timestamp;
  };

  const filterBySearch = (data) => {
    if (searchValue.trim().length > 0) {
      return data?.name?.toLowerCase().includes(searchValue?.toLowerCase());
    } else {
      return true;
    }
  };

  let content = null;

  if (isLoading) {
    content = <SearchLoader></SearchLoader>;
  } else if (!isLoading && isError) {
    content = <SomethingWrong></SomethingWrong>;
  } else if (!isLoading && !isError && data?.length === 0) {
    content = <NoData></NoData>;
  } else if (!isLoading && !isError && data?.length > 0) {
    const newData = [...data]?.sort(sortByTime)?.filter(filterBySearch);
    content = <UserTable data={newData}></UserTable>;
  }

  return (
    <section className="h-full w-full px-4 md:px-6 py-6">
      <div className="bg-themeMid shadow-sm w-full h-full rounded-2xl overflow-hidden">
        <SearchBar
          title="Users"
          path="/sales-add"
          value={searchValue}
          onChange={onChange}
          isNotAddable={true}
        ></SearchBar>
        <div className="h-[calc(100%-78px)]">{content}</div>
      </div>
    </section>
  );
}

export default Users;
