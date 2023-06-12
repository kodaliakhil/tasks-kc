import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { jsonData } from './responseData'
import  "./Services.css"
import { AiFillFilePdf } from "react-icons/ai";
import { BsFillArrowDownSquareFill } from "react-icons/bs";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useState } from "react";




const Services = () => {
    const [filter, setFilter] = useState(false)


    const data = jsonData.lstVendorAnalytics
    const toggleFilterContainer = () => {
        setFilter(!filter)
    }
    
    return(
        <div>
             <div className={filter ? "filter-container" : "filter-container collapsed-container"}>
                <div className='filter-names'>
                    <p>filter 1</p>
                    <p>filter 2</p>
                    <p>filter 3</p>
                </div>
                {filter ? <BsFillArrowUpSquareFill onClick={toggleFilterContainer} className='dropdown-icon' /> :
                    <BsFillArrowDownSquareFill onClick={toggleFilterContainer} className='dropdown-icon' />}
            </div>
        <div className='p-2'>
            <DataTable scrollable scrollHeight="700px" showGridlines value={data}>
                <Column frozen className="text-center" field="OrderNumber" header="OrderNumber"/>
                <Column frozen className="text-center" field="VendorName" header="VendorName"/>
                <Column frozen className="text-center" field="DeliveryDate" header="DeliveryDate"/>
                <Column frozen className="text-center" field="ProdDesc" header="ProdDesc"/>
                <Column frozen className="text-center" field="CustomerName" header="CustomerName"/>
                <Column className="text-center" field="ShipToName" header="ShipToName"/>
                <Column className="text-center" field="Addr1" header="Addr1"/>
                <Column className="text-center" field="CityName" header="CityName"/>
                <Column className="text-center" field="StateCode" header="StateCode"/>
                <Column className="text-center" field="ZipCode" header="ZipCode"/>
                <Column className="text-center" field="Gallons" header="Gallons"/>
                <Column className="text-center" field="ProductPrice" header="ProductPrice"/>
                <Column className="text-center" field="TaxPrice" header="TaxPrice"/>
                <Column className="text-center" field="Latitude" header="Latitude"/>
                <Column className="text-center" field="Longitude" header="Longitude"/>
                <Column className="text-center" field="Fees" header="Fees"/>
                <Column  className="text-center" body={<a  rel="noreferrer" href="https://beeindia.gov.in/sites/default/files/2Ch1.pdf" target="_blank"><AiFillFilePdf /></a>}  header="FileName"/>
                <Column className="text-center" field="LocationType" header="LocationType"/>
                <Column className="text-center" field="AverageGross" header="AverageGross"/>
                <Column className="text-center" field="OPICity" header="OPICity"/>
                <Column className="text-center" field="ProductID" header="ProductID"/>
                <Column className="text-center" field="ProductUnitPrice" header="ProductUnitPrice"/>
                <Column className="text-center" field="FreightUnitPrice" header="FreightUnitPrice"/>
                <Column className="text-center" field="AdditivePrice" header="AdditivePrice"/>
                <Column className="text-center" field="TaxUnitPrice" header="TaxUnitPrice"/>
                <Column className="text-center" field="EnvironmentalFee" header="EnvironmentalFee"/>
                <Column className="text-center" field="OtherFee" header="OtherFee"/>
                <Column className="text-center" field="DeliveryFee" header="DeliveryFee"/>
                <Column className="text-center" field="EquipmentFee" header="EquipmentFee"/>
                <Column className="text-center" field="PageNumber" header="PageNumber"/>
                <Column className="text-center" field="TerminalGroupID" header="TerminalGroupID"/>
                <Column className="text-center" field="FreightPrice" header="FreightPrice"/>
                <Column className="text-center" field="LoadingTime" header="LoadingTime"/>
                <Column className="text-center" field="SiteSetupTime" header="SiteSetupTime"/>
                <Column className="text-center" field="CustomerID" header="CustomerID"/>
                <Column className="text-center" field="StemTimeAndGMPerHr" header="StemTimeAndGMPerHr"/>
            </DataTable>
            </div>
         </div>
    )
}

export default Services 