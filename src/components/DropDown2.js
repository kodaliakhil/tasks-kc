import { useEffect, useState } from "react";
import { jsonData } from "./responseData";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineSearch } from "react-icons/ai";

let uniqueOrders = [
  ...new Set(jsonData.lstVendorAnalytics.map((item) => item.OrderNumber)),
];

uniqueOrders = uniqueOrders.map((item) => ({ name: item, isChecked: false }));

export default function DropDown2() {
  const [UniqueOrdersData, setUniqueOrdersData] = useState(uniqueOrders);
  const [expanded, setExpanded] = useState(false);
  const [selectAllClicked, setselectAllClicked] = useState(false);
  const data = UniqueOrdersData;
  let selectedOrders = [];
  UniqueOrdersData.forEach((item) => {
    // if (selectAllClicked){
    //   selectedOrders.push({ name: item.name, isChecked: true });

    // }
    if (item.isChecked) {
      selectedOrders.push({ name: item.name, isChecked: true });
    }
  });

  console.log(data);
  useEffect(() => {
    if (selectAllClicked) {
      let ordersSelected = selectedOrders.map((i) => i.name);
      uniqueOrders.map((i) => ordersSelected.push(i.name));
      ordersSelected = [...new Set(ordersSelected)];
      selectedOrders = ordersSelected.map((i) => ({
        name: i,
        isChecked: true,
      }));
    }
  }, [selectAllClicked]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = UniqueOrdersData.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUniqueOrdersData(tempUser);

      checked ? setselectAllClicked(true) : setselectAllClicked(false);
    } else {
      let tempUser = UniqueOrdersData.map((user) =>
        user.name === name ? { ...user, isChecked: checked } : user
      );
      setUniqueOrdersData(tempUser);
      // setselectAllClicked(false)
    }
  };
  function onChangeSearchInDropDown(event) {
    let filteredData = uniqueOrders.filter((item) =>
      item.name.includes(event.target.value.toUpperCase())
    );
    filteredData = filteredData.map((i) => i.name);
    let checkedFilteredData2 = selectedOrders.filter((item) =>
      item.name.includes(event.target.value.toUpperCase())
    );
    checkedFilteredData2 = checkedFilteredData2.map((i) => i.name);

    const finalFilteredData = filteredData.map((item) => {
      if (checkedFilteredData2.includes(item)) {
        return { name: item, isChecked: true };
      } else {
        return { name: item, isChecked: false };
      }
    });
    console.log(finalFilteredData);
    // if (event.target.value){
    setUniqueOrdersData([...finalFilteredData]);
    // }else{

    // }
  }

  function selectText() {
    const ords = selectedOrders.map((i) => i.name);
    if (selectedOrders.length > 2) {
      return `${selectedOrders[0].name}, ${selectedOrders[1].name} & ${
        selectedOrders.length - 2
      }more...`;
    } else {
      return `${[...ords]}`;
    }
  }
  function onClickCrossButton() {
    setUniqueOrdersData(uniqueOrders);
    selectedOrders = [];

    const searchInp = document.getElementById("searchInp");
    searchInp.value = "";
  }
  return (
    <div
      className="container my-4 dropdown-cont"
      style={{ width: "400px", zIndex: "99" }}
    >
      <div className="form-check">
        <div className="multiselect" style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className="selectBox"
              
              onClick={() => setExpanded((prev) => !prev)}
              onBlur={() => setExpanded(false)}
              style={{ width: "100%" }}
            >
              <select
                onBlur={() => setExpanded(false)}
                style={{
                  borderRight: `${
                    selectedOrders.length > 0 ? "none" : "solid 1px"
                  }`,
                  // height: "100%",
                  backgroundColor: "#f5f5f5",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  height: "40px",
                }}
              >
                <option>
                  {/* {"Select an option"} */}
                  {selectedOrders.length > 0
                    ? selectText()
                    : "Select an option"}
                </option>
              </select>

              <div className="overSelect"></div>
            </div>
            {selectedOrders.length > 0 ? (
              <button
                onClick={onClickCrossButton}
                style={{
                  backgroundColor: "transparent",
                  borderLeft: "none",
                  borderWidth: "1px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <RxCross2 />
              </button>
            ) : null}
          </div>
          <div
            id="checkboxes"
            style={{
              display: "block",
              height: expanded ? "300px" : "0px ",
              border: expanded ? "1px solid #dadada" : "none",
              // height: "300px",
            }}
          >
            <div
              style={{
                // display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #dadada",
                margin: "10px",
                borderRadius: "10px",
                padding: "5px",
                display: expanded ? "flex" : "none",
              }}
            >
              <AiOutlineSearch style={{ width: "20px", height: "20px" }} />
              <input
                placeholder="Search"
                onChange={onChangeSearchInDropDown}
                style={{ width: "100%", border: "none", outline: "none" }}
                id="searchInp"
                type="search"
              ></input>
            </div>
            <div
              style={{ overflowY: "scroll", height: expanded ? "75%" : "0%" }}
            >
              <label htmlFor="select-all" style={{ fontWeight: "bold" }}>
                <input
                  type="checkbox"
                  id="select-all"
                  //   className="form-check-input"
                  name="allSelect"
                  style={{ margin: "10px" }}
                  checked={
                    !UniqueOrdersData.some((user) => user?.isChecked !== true)
                  }
                  onChange={handleChange}
                  //   onChange={onChangeSelectAll}
                  //   checked={selectAll ? true : false}

                  // onChange={onChangeSelectOrder}
                />
                Select All
              </label>

              {data.map((order, index) => (
                <div
                  //   className="form-check"
                  key={index}
                >
                  <label

                  // className="form-check-label ms-2"
                  >
                    <input
                      type="checkbox"
                      //   className="form-check-input"
                      name={order.name}
                      checked={order?.isChecked || false}
                      onChange={handleChange}
                      style={{ margin: "10px" }}
                    />
                    {order.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
