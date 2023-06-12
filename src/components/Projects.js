import { useState } from 'react';
import './Project.css'
import { jsonData } from './responseData'
import { format } from 'date-fns'

import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { AiFillFilePdf } from "react-icons/ai";
const Projects = () => {
    const data = jsonData.lstVendorAnalytics
    const [filter, setFilter] = useState(false)
    const [sideFilter, setSideFilter] = useState(false)
    let count = 0

    const unique = [...new Set(data.map(each => (
        JSON.stringify({
            CustomerName: each.CustomerName,
            VendorName: each.VendorName,
            ShipToName: each.ShipToName,
            ShipToAddress: each.Addr1,
            ShipToCity: each.CityName,
            ShipToState: each.StateCode,
            ShipToLocation: each.LocationType
        })
    )))]

    const filteredData = unique.map(obj => {

        const ordersData = data.filter(each => {
            const sampleObj = {
                CustomerName: each.CustomerName,
                VendorName: each.VendorName,
                ShipToName: each.ShipToName,
                ShipToAddress: each.Addr1,
                ShipToCity: each.CityName,
                ShipToState: each.StateCode,
                ShipToLocation: each.LocationType
            }

            return JSON.stringify(sampleObj) === obj

        })

        const uniqueOrders = [...new Set(ordersData.map(each => each.OrderNumber))]


        return { vendor: JSON.parse(obj), orders: uniqueOrders, withDuplicateOrds: ordersData }
    })
    // console.log(filteredData)
    const toggleFilterContainer = () => {
        setFilter(!filter)
    }

    const onClickSideFilter = () => {
        setSideFilter(!sideFilter)
    }

    const getSubTotalRow = (totals) => {
        return <tr className='sub-total-row text-center'>
            <td>Sub Totals</td>
            <td></td>
            <td></td>
            <td></td>
            <td className='totals'>{totals.Gallons.toFixed(3)}</td>
            <td></td>
            <td className='totals' >{totals.ProductPrice.toFixed(3)}</td>
            <td className='totals' >{totals.TaxPrice.toFixed(3)}</td>
            <td></td>
            <td></td>
            <td className='totals' >{totals.Fees.toFixed(3)}</td>
            <td className='totals' >{totals.AverageGross.toFixed(3)}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    }

    const getOrderDetails = (num, vendor) => {
        const obj = JSON.stringify(vendor)
        const ordersArr = data.filter(each => {
            const ordNum = each.OrderNumber
            const eachObj = JSON.stringify({
                CustomerName: each.CustomerName,
                VendorName: each.VendorName,
                ShipToName: each.ShipToName,
                ShipToAddress: each.Addr1,
                ShipToCity: each.CityName,
                ShipToState: each.StateCode,
                ShipToLocation: each.LocationType
            })

            return eachObj === obj && ordNum === num

        })

        return ordersArr

    }

    return (
        <div className="project-container" >
            <div className={filter ? "filter-container" : "filter-container collapsed-container"}>
                <div className='filter-names'>
                    <p>filter 1</p>
                    <p>filter 2</p>
                    <p>filter 3</p>
                </div>
                {filter ? <BsFillArrowUpSquareFill onClick={toggleFilterContainer} className='dropdown-icon' /> :
                    <BsFillArrowDownSquareFill onClick={toggleFilterContainer} className='dropdown-icon' />}
            </div>
            <div className='table-side-filter-container'>
                <div className={sideFilter ? 'side-filters' : 'side-filters collapsed-side-filters'}>
                    {sideFilter ? <BsArrowLeftSquareFill onClick={onClickSideFilter} className='side-filter-icon' /> :
                        <BsFillArrowRightSquareFill onClick={onClickSideFilter} className='side-filter-icon' />}
                    <p>filter</p>
                </div>
                <div className='table-container'>
                    <table className="table-bordered mt-2">
                        <thead className='table-header'>
                            <tr className="text-light bg-dark">
                                <th className='text-center sno p-2'> S.No </th>
                                <th className='text-center CustomerName p-2'>Customer Name</th>
                                <th className='text-center VendorName p-2' >Vendor Name</th>
                                <th className='text-center ShipToName p-2'>Ship To Name</th>
                                <th className='text-center Addr1 p-2'>Ship To Address</th>
                                <th className='text-center CityName p-2'>Ship To City</th>
                                <th className='text-center StateCode p-2'>Ship To State</th>
                                <th className='text-center LocationType p-2'>Location Type</th>
                                <th className='text-center OrderNumber p-2'>Order Number</th>
                                <th className='text-center ProdDesc p-2'>Product</th>
                                <th className='text-center DeliveryDate p-2' >Delivery Date</th>
                                <th className='text-center FileName p-2'>File</th>
                                <th className='text-center Gallons p-2'>Gallons</th>
                                <th className='text-center ZipCode p-2'>Zip Code</th>
                                <th className='text-center ProductPrice p-2'>Product Price</th>
                                <th className='text-center TaxPrice p-2'>Tax Price</th>
                                <th className='text-center Latitude p-2'>Latitude</th>
                                <th className='text-center Longitude p-2'>Longitude</th>
                                <th className='text-center Fees p-2'>Fees</th>
                                <th className='text-center AverageGross p-2'>Average Gross</th>
                                <th className='text-center ProductID p-2'>Product ID</th>
                                <th className='text-center ProductUnitPrice p-2'>Product Unit Price</th>
                                <th className='text-center TaxUnitPrice p-2'>Tax Unit Price</th>
                                <th className='text-center EnvironmentalFee p-2'>Environmental Fee</th>
                                <th className='text-center OtherFee p-2'>Other Fee</th>
                                <th className='text-center DeliveryFee p-2'>Delivery Fee</th>
                                <th className='text-center PageNumber p-2'>Page Number</th>
                                <th className='text-center TerminalGroupID p-2'>Terminal Group ID</th>
                                <th className='text-center LoadingTime p-2'>Loading Time</th>
                                <th className='text-center SiteSetupTime p-2'>Site Setup Time</th>
                                <th className='text-center CustomerID p-2'>Customer ID</th>

                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            
                            {filteredData.map((obj, ind) => {
                                const rowSpan = obj.withDuplicateOrds.length - obj.orders.length

                                return < >
                                    <tr key={ind}>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='sno'>
                                            {obj.withDuplicateOrds.map(each =>{
                                                count = count+1
                                                return  <p className='nums'>{count}</p>
                                            }
                                            )}
                                        </td>
                                            {/* obj.orders.length+obj.withDuplicateOrds.length+1 */}
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center CustomerName p-2'>{obj.vendor.CustomerName}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center VendorName p-2' >{obj.vendor.VendorName}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center ShipToName p-2'>{obj.vendor.ShipToName}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center Addr1 p-2'>{obj.vendor.ShipToAddress}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center CityName p-2'>{obj.vendor.ShipToCity}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center StateCode p-2'>{obj.vendor.ShipToState}</td>
                                        <td rowSpan={obj.orders.length * 2 + 1 + rowSpan} className='text-center LocationType p-2'>{obj.vendor.ShipToLocation}</td>
                                    </tr>

                                    {obj.orders.map((order) => {
                                        const eachOrder = getOrderDetails(order, obj.vendor)
                                        const subTotals = { Gallons: 0, ProductPrice: 0, TaxPrice: 0, Fees: 0, AverageGross: 0, }

                                        return <>
                                            {eachOrder.map((obj, ind) => {
                                                subTotals.Gallons = subTotals.Gallons + obj.Gallons
                                                subTotals.ProductPrice = subTotals.ProductPrice + obj.ProductPrice
                                                subTotals.TaxPrice = subTotals.TaxPrice + obj.TaxPrice
                                                subTotals.Fees = subTotals.Fees + obj.Fees
                                                subTotals.AverageGross = subTotals.AverageGross + obj.AverageGross
                                                const date = format(new Date(obj.DeliveryDate), 'yyyy/MM/dd')
                                                return <tr className='content'  key={ind}>

                                                    <td className='text-center OrderNumber' >{obj.OrderNumber}</td>
                                                    <td className='text-center ProdDesc p-2'>{obj.ProdDesc}</td>
                                                    <td className='text-center DeliveryDate p-2' >{date}</td>
                                                    <td className='text-center FileName p-2'><a href={obj.FileName} rel="noreferrer" target='_blank'><AiFillFilePdf /></a></td>
                                                    <td className='text-center Gallons p-2'>{obj.Gallons}</td>
                                                    <td className='text-center ZipCode p-2'>{obj.ZipCode}</td>
                                                    <td className='text-center ProductPrice p-2'>{obj.ProductPrice}</td>
                                                    <td className='text-center TaxPrice p-2'>{obj.TaxPrice}</td>
                                                    <td className='text-center Latitude p-2'>{obj.Latitude}</td>
                                                    <td className='text-center Longitude p-2'>{obj.Longitude}</td>
                                                    <td className='text-center Fees p-2'>{obj.Fees}</td>
                                                    <td className='text-center AverageGross p-2'>{obj.AverageGross}</td>
                                                    <td className='text-center ProductID p-2'>{obj.ProductID}</td>
                                                    <td className='text-center ProductUnitPrice p-2'>{obj.ProductUnitPrice}</td>
                                                    <td className='text-center TaxUnitPrice p-2'>{obj.TaxUnitPrice}</td>
                                                    <td className='text-center EnvironmentalFee p-2'>{obj.EnvironmentalFee}</td>
                                                    <td className='text-center OtherFee p-2'>{obj.OtherFee}</td>
                                                    <td className='text-center DeliveryFee p-2'>{obj.DeliveryFee}</td>
                                                    <td className='text-center PageNumber p-2'>{obj.PageNumber}</td>
                                                    <td className='text-center TerminalGroupID p-2'>{obj.TerminalGroupID}</td>
                                                    <td className='text-center LoadingTime p-2'>{obj.LoadingTime}</td>
                                                    <td className='text-center SiteSetupTime p-2'>{obj.SiteSetupTime}</td>
                                                    <td className='text-center CustomerID p-2'>{obj.CustomerID}</td>
                                                </tr>
                                            })}

                                            {getSubTotalRow(subTotals)}
                                        </>

                                    })}

                                </>

                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Projects
// export const fildata = filteredData


