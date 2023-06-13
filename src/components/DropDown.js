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
  const [searchInp, setSearchInp] = useState("");
  let selectedOrders = [];
  uniqueOrders.forEach((item) => {
    if (item.isChecked) {
      selectedOrders.push(item);
    }
  });

  console.log(selectedOrders.length);

  useEffect(() => { 
    const selectAllbtn = document.getElementById("select-all");
    if (UniqueOrdersData.length > 0){
    if (selectedOrders.length === 0) {
      selectAllbtn.indeterminate = false;
    } else if (selectedOrders.length !== UniqueOrdersData.length) {
      selectAllbtn.indeterminate = true;
    } else if (selectedOrders.length === UniqueOrdersData.length) {
      selectAllbtn.indeterminate = false;
      selectAllbtn.checked = true;
    }
  }
  }, [selectedOrders]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if ((name === "allSelect") & (searchInp !== "")) {
      UniqueOrdersData.forEach((i) => {
        const index = uniqueOrders.findIndex((j) => {
          return i.name === j.name;
        });
        console.log(index);
        uniqueOrders.splice(index, 1, { ...i, isChecked: checked });
      });
      console.log(uniqueOrders);

      let tempOrders = UniqueOrdersData.map((i) => ({
        ...i,
        isChecked: checked,
      }));
      setUniqueOrdersData(tempOrders);
    } else if (name === "allSelect") {
      uniqueOrders = uniqueOrders.map((i) => ({ ...i, isChecked: checked }));
      // if (selectedOrders.length !== UniqueOrdersData.length)  {
      //   e.target.indeterminate = true;
      // }
      let tempOrders = UniqueOrdersData.map((i) => ({
        ...i,
        isChecked: checked,
      }));

      setUniqueOrdersData(tempOrders);
    } else {
      uniqueOrders = uniqueOrders.map((i) =>
        i.name === name ? { ...i, isChecked: checked } : i
      );
      let tempOrders = UniqueOrdersData.map((i) =>
        i.name === name ? { ...i, isChecked: checked } : i
      );
      setUniqueOrdersData(tempOrders);
    }
  };
  function onChangeSearchInDropDown(event) {
    let filteredData = uniqueOrders.filter((item) =>
      item.name.includes(event.target.value.toUpperCase())
    );

    setUniqueOrdersData(filteredData);
    setSearchInp(event.target.value.toUpperCase());
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
    uniqueOrders = uniqueOrders.map((i) => ({ ...i, isChecked: false }));
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
                    selectedOrders.length > 0 ? "none" : "solid 1px #dadada"
                  }`,
                  backgroundColor: "#f5f5f5",
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                  borderBottomRightRadius: selectedOrders.length === 0 ?"3px":"0",
                  borderTopRightRadius: selectedOrders.length === 0 ?"3px":"0",
                  borderColor:"#dadada",
                  height: "40px",
                  fontWeight:"400",
                  color:"black",
                  fontFamily:"Roboto",
                  height:"33px"
                }}
              >
                <option style={{}}>
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
                  
                  border: "1px solid #dadada",
                  borderLeft: "none",

                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
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
              boxShadow:"0px 2px 5px #dadada"

            }}
          >
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #dadada",
                margin: "5px",
                borderRadius: "3px",
                padding: "3px",
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
              style={{ overflowY: "scroll", height: expanded ? "83%" : "0%" }}
            >
              {UniqueOrdersData.length > 0 ? (
                <label htmlFor="select-all" >
                  <input
                    type="checkbox"
                    id="select-all"
                    name="allSelect"
                    style={{ margin: "10px" }}
                    checked={
                      !UniqueOrdersData.some((user) => user?.isChecked !== true)
                    }
                    // indeterminate={selectedOrders.length !== UniqueOrdersData.length ? true:false}
                    onChange={handleChange}
                  />
                  Select All
                </label>
              ) : (
                <label style={{ width: "100%", textAlign: "center" }}>
                  No Data Found
                </label>
              )}

              {UniqueOrdersData.map((order, index) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
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
