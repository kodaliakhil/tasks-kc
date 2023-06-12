import * as React from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { jsonData } from "./responseData";
import "./Partners.css";
import { sum } from "mathjs";
import { AiOutlineFilePdf } from "react-icons/ai";
import "@progress/kendo-theme-default/dist/all.css";

import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";

import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
// import { DropDownList } from "@progress/kendo-react-dropdowns";
import DropDown from "./DropDown";
// import DropDown2 from "./DropDown2";

let initialData = jsonData.lstVendorAnalytics;
initialData = initialData.map((each, i) => ({
  ...each,
  ChangeColor: false,
  DeliveryDate: new Date(each.DeliveryDate),
}));

const allOrders = [];
let serial = 1;                                                 
const uniqueCommonVendors = [
  ...new Set(
    initialData.map((each) =>
      JSON.stringify({
        CustomerName: each.CustomerName,
        VendorName: each.VendorName,
        ShipToName: each.ShipToName,
        ShipToAddress: each.Addr1,
        ShipToCity: each.CityName,
        ShipToState: each.StateCode,
        ShipToLocation: each.LocationType,
      })
    )
  ),
];

uniqueCommonVendors.forEach((vendor) => {
  const ordersData = initialData.filter((item) => {
    const sampleObj = {
      CustomerName: item.CustomerName,
      VendorName: item.VendorName,
      ShipToName: item.ShipToName,
      ShipToAddress: item.Addr1,
      ShipToCity: item.CityName,
      ShipToState: item.StateCode,
      ShipToLocation: item.LocationType,
    };

    return JSON.stringify(sampleObj) === vendor;
  });
  let subTotalRow = {
    AdditivePrice: null,
    AdditiveUnitPrice: null,
    Addr1: ordersData[0].Addr1,
    AverageGross: null,
    CityName: ordersData[0].CityName,
    CustomerID: null,
    CustomerName: ordersData[0].CustomerName,
    DeliveryDate: null,
    DeliveryFee: null,
    EnvironmentalFee: null,
    EquipmentFee: null,
    Fees: null,
    FileName: null,
    FreightPrice: null,
    FreightUnitPrice: null,
    Gallons: null,
    Latitude: null,
    LoadingTime: null,
    LocationType: ordersData[0].LocationType,
    Longitude: null,
    OPICity: null,
    OrderNumber: "Sub Total",
    OtherFee: null,
    PageNumber: null,
    ProdDesc: null,
    ProductID: null,
    ProductPrice: null,
    ProductUnitPrice: null,
    ShipToName: ordersData[0].ShipToName,
    SiteSetupTime: null,
    StateCode: ordersData[0].StateCode,
    StemTimeAndGMPerHr: null,
    TaxPrice: null,
    TaxUnitPrice: null,
    TerminalGroupID: null,
    VendorName: ordersData[0].VendorName,
    ZipCode: null,
    value: true,
    ChangeColor: true,
  };
  const uniqueOrders = [...new Set(ordersData.map((each) => each.OrderNumber))];
  // console.log(uniqueOrders)
  uniqueOrders.forEach((item) => {
    const orders = ordersData.filter((i) => i.OrderNumber === item);
    orders.forEach((j) => {
      allOrders.push({ ...j, num: serial });
      serial++;
    });

    subTotalRow = {
      ...subTotalRow,
      ProductPrice: `$ ${sum(
        orders.map((each) => each.ProductPrice)
      ).toLocaleString("en-US")}`,
      Gallons: sum(orders.map((each) => each.Gallons)),
      TaxPrice: sum(orders.map((each) => each.TaxPrice)),
      Fees: sum(orders.map((each) => each.Fees)),
      AverageGross: sum(orders.map((each) => parseFloat(each.AverageGross))),
      ProductUnitPrice: sum(orders.map((each) => each.ProductUnitPrice)),
      TaxUnitPrice: sum(orders.map((each) => each.TaxUnitPrice)),
    };

    allOrders.push(subTotalRow);
  });
});

initialData = allOrders;

let looped = 1;
for (let i = 0; i < initialData.length; i += looped) {
  let rowSpan = 1;
  looped = 1;
  for (let j = i + 1; j < initialData.length; j++) {
    if (
      initialData[i].CustomerName === initialData[j].CustomerName &&
      initialData[i].VendorName === initialData[j].VendorName &&
      initialData[i].CityName === initialData[j].CityName &&
      initialData[i].ShipToName === initialData[j].ShipToName &&
      initialData[i].Addr1 === initialData[j].Addr1 &&
      initialData[i].LocationType === initialData[j].LocationType &&
      initialData[i].StateCode === initialData[j].StateCode
    ) {
      looped++;
      rowSpan++;
    } else {
      break;
    }
  }

  // add special property for the 'Discontinued' column cells rowSpan
  initialData[i].discontinuedCellRowSpan =
    rowSpan === 1 ? (looped === 1 ? 1 : undefined) : rowSpan;
}

const Partners = () => {
  const [filter, setFilter] = React.useState(true);
  const [sideFilter, setSideFilter] = React.useState(false);
  const [data, setData] = React.useState(initialData);

  const toggleFilterContainer = () => {
    setFilter(!filter);
  };

  const onClickSideFilter = () => {
    setSideFilter(!sideFilter);
  };

  let count = 0;
  const cellRender = (cell, props) => {
    const { dataItem, field } = props;
    if (dataItem.discontinuedCellRowSpan === undefined) {
      count = count + 1;
    }

    if (
      field === "CustomerName" ||
      field === "VendorName" ||
      field === "ShipToName" ||
      field === "StateCode" ||
      field === "Addr1" ||
      field === "CityName" ||
      field === "LocationType" ||
      field === "LocationType"
    ) {
      if (dataItem.discontinuedCellRowSpan) {
        return (
          <td
            {...cell.props}
            rowSpan={dataItem.discontinuedCellRowSpan}
            // className={`${dataItem.className || dataItem.discontinuedClassName}`}
            id="cell1"
            title={cell.props.children}
          >
            {cell.props.children}
          </td>
        );
      } else if (dataItem.discontinuedCellRowSpan === 1) {
        return (
          <td title={cell.props.children} {...cell.props}>
            {cell.props.children}
          </td>
        );
      } else {
        return null;
      }
    }

    return (
      <td
        {...cell.props}
        // className={dataItem.className}

        colSpan={props.colSpan}
        id={`${dataItem.ChangeColor ? "subtotal-row" : null}`}
        onClick={(event) => {
          console.log(event.currentTarget.id);
        }}
        title={cell.props.children}
      >
        {field === "FileName" && dataItem.OrderNumber !== "Sub Total" ? (
          <AiOutlineFilePdf style={{ color: "blue" }} />
        ) : (
          cell.props.children
        )}
      </td>
    );
  };
  const getTableGrid = () => {
    return (
      <Grid
        style={{ height: "100%", width: "100%" }}
        data={data}
        cellRender={cellRender}
      >
        <GridColumn
          field="num"
          title="S.No"
          locked={true}
          width={"60px"}
          className="text-center"
        />
        <GridColumn
          field="CustomerName"
          locked
          title="Customer Name"
          width="150px"
        />
        <GridColumn
          field="VendorName"
          locked
          title="Vendor Name"
          width="150px"
        />
        <GridColumn
          field="ShipToName"
          locked
          title="Ship To Name"
          width="150px"
        />
        <GridColumn
          field="Addr1"
          locked
          title="Ship To Address"
          width="150px"
        />
        <GridColumn
          field="CityName"
          locked
          title="Ship To City"
          width="150px"
        />
        <GridColumn
          field="StateCode"
          locked
          title="Ship To State"
          width="150px"
        />
        <GridColumn
          field="LocationType"
          locked
          title="LocationType"
          width="150px"
        />
        <GridColumn
          field="OrderNumber"
          title="Order Number"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="ProdDesc"
          title="ProdDesc"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="DeliveryDate"
          format="{0:d}"
          title="Delivery Date"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="FileName"
          title="File Name"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="Gallons"
          title="Gallons"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="ZipCode"
          title="Zip Code"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="ProductPrice"
          format="{0:c}"
          title="Product Price"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="TaxPrice"
          title="Tax Price"
          format="{0:c}"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="Latitude"
          title="Latitude"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="Longitude"
          title="Longitude"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="Fees"
          title="Fees"
          format="{0:c}"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="AverageGross"
          title="AverageGross"
          format="{0:c}"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="ProductID"
          title="ProductID"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="ProductUnitPrice"
          title="ProductUnitPrice"
          format="{0:c}"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="TaxUnitPrice"
          title="TaxUnitPrice"
          width="150px"
          format="{0:c}"
          className="text-center"
        />
        <GridColumn
          field="EnvironmentalFee"
          title="EnvironmentalFee"
          format="{0:c}"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="OtherFee"
          title="OtherFee"
          width="150px"
          format="{0:c}"
          className="text-center"
        />
        <GridColumn
          field="DeliveryFee"
          title="DeliveryFee"
          width="150px"
          format="{0:c}"
          className="text-center"
        />
        <GridColumn
          field="PageNumber"
          title="PageNumber"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="TerminalGroupID"
          title="TerminalGroupID"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="LoadingTime"
          title="LoadingTime"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="SiteSetupTime"
          title="SiteSetupTime"
          width="150px"
          className="text-center"
        />
        <GridColumn
          field="CustomerID"
          title="Customer ID"
          width="150px"
          className="text-center"
        />
      </Grid>
    );
  };

  const getTable = React.useMemo(() => getTableGrid(), [data]);

  // Multi select Dropdown Start
  const uniqueOrders = [
    ...new Set(jsonData.lstVendorAnalytics.map((item) => item.OrderNumber)),
  ];

  const [UniqueOrdersData, setUniqueOrdersData] = React.useState(
    uniqueOrders.slice()
  );
  const [dropdownValues, setDropDownValues] = React.useState([]);
  const [dropdown, setDropDown] = React.useState(false);

  const selected = dropdownValues.length;

  const onChange = (event) => {
    const values = [...event.value];
    setDropDownValues(values);
    const filteredData = values.map((each) => {
      return initialData.filter((item) => item.OrderNumber === each);
    });
    setData(filteredData.flat());
  };
  //   React.useEffect(()=>{
  //     console.log(data)
  //   },[data])

  const filterChange = (event) => {
    setUniqueOrdersData(filterBy(uniqueOrders.slice(), event.filter));
  };

  const itemRender = (li, itemProps) => {
    const itemChildren = (
      <span>
        <input
          type="checkbox"
          name={itemProps.dataItem}
          checked={itemProps.selected}
          onChange={(e) => itemProps.onClick(itemProps.index, e)}
        />
        &nbsp;{li.props.children}
      </span>
    );
    return React.cloneElement(li, li.props, itemChildren);
  };
  // // Multi select Dropdown End

  return (
    <div className="project-container">
      <div
        className={
          filter ? "filter-container" : "filter-container collapsed-container"
        }
      >
        <div className="filter-names">
          
          {/* <DropDown/> */}
        <DropDown/>
          <MultiSelect
            filterable
            onFilterChange={filterChange}
            data={UniqueOrdersData}
            itemRender={itemRender}
            autoClose={true}
            value={dropdownValues}
            onFocus={() => setDropDown(true)}
            onBlur={() => setDropDown(false)}
            opened={dropdown}
            onChange={onChange}
            placeholder="Please select ..."
            className="checkbox-dropdown"
            tags={
              selected > 0
                ? [
                    {
                      text: `${[...dropdownValues]}`,
                      data: [...dropdownValues],
                    },
                  ]
                : []
            }
          />
        </div>
        {filter ? (
          <BsFillArrowUpSquareFill
            onClick={toggleFilterContainer}
            className="dropdown-icon"
          />
        ) : (
          <BsFillArrowDownSquareFill
            onClick={toggleFilterContainer}
            className="dropdown-icon"
          />
        )}
      </div>
      <div
        className="table-side-filter-container"
        style={{
          height: filter ? "65vh" : "90vh",
          width: sideFilter ? "93%" : "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          onClick={onClickSideFilter}
          className={
            sideFilter ? "side-filters" : "side-filters collapsed-side-filters"
          }
        >
          <p>filter</p>
        </div>

        <div className="w-100">{getTable}</div>
      </div>
    </div>
  );
};

export default Partners;
