import { PanelMenu } from 'primereact/panelmenu';
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Sidebar } from 'primereact/sidebar';
import Cookies from 'js-cookie'

import './Header.css'
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { RiMailSendLine } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";
import { AiFillMacCommand } from "react-icons/ai";
import { FaPeopleArrows } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { VscFeedback } from "react-icons/vsc";
import { GiOfficeChair } from "react-icons/gi";
import { MdOutlineHelp } from "react-icons/md";
import { data } from './sampleData'

// console.log(data)

const filteredData = data.filter(each => each.parentid === null)

const isThereChildren  = (id) => {
    const childrensData = data.filter(each => {
        return each.parentid === id
    })

    return childrensData.length === 0

}

const getSubChilds = (id) => {
    const childrensData = data.filter(each => {
        return each.parentid === id
    })

    const children = childrensData.map(each => {
        return {
            id: each.id,
            label: each.text,
            icon: each.icon,
            items:isThereChildren(each.id) ? "":getChildren(each.id)
        }
    })


    if(children.length === 0){
        return ""
    }
    return children
}

const getChildren = (id) => {
    const childrensData = data.filter(each => {
        return each.parentid === id
    })

    const children = childrensData.map(each => {
        return {
            id: each.id,
            label: each.text,
            icon: each.icon,
            items:getSubChilds(each.id)
        }
    })

    // console.log(children)
    return children

}

const fields = filteredData.map(each => {
    return {
        id: each.id,
        label: each.text,
        icon: each.icon,
        items: getChildren(each.id)
    }
})


const sideNavList = [
    {
        path: "/",
        tabName: "Home",
        tabIcon: <AiOutlineHome />,
        id: 1,
    },
    {
        path: "/profile",
        tabName: "Profile",
        tabIcon: <CgProfile />,
        id: 7,
    },
    {
        path: "/services",
        tabName: "Services",
        tabIcon: <AiFillMacCommand />,
        id: 4,
    },
    {
        path: "/projects",
        tabName: "Projects",
        tabIcon: <BiNetworkChart />,
        id: 5,
    },
    {
        path: "/partners",
        tabName: "Partners",
        tabIcon: <FaPeopleArrows />,
        id: 6,
    },
    {
        path: "/careers",
        tabName: "Careers",
        tabIcon: <GiOfficeChair />,
        id: 9,
    },
    {
        path: "/contact",
        tabName: "Contact",
        tabIcon: <RiMailSendLine />,
        id: 3,
    },
    {
        path: "/feedback",
        tabName: "Feedback",
        tabIcon: <VscFeedback />,
        id: 8,
    },
    {
        path: "/about",
        tabName: "About",
        tabIcon: <HiOutlineInformationCircle />,
        id: 2,
    },
    {
        path: "/help",
        tabName: "Help",
        tabIcon: <MdOutlineHelp />,
        id: 10,
    },

]


const Header = () => {

    const [activeTab, setActiveTab] = useState(sideNavList[0].id)
    const [visible, setVisible] = useState(false);


    const onLogout = () => {
        Cookies.remove("jwt_token")
        window.location.replace("/login")
    }

    const setActive = (activeId) => {
        setActiveTab(activeId)
    }



    return (
        <div className='main-container'>

            <nav className='header'>
                <GiHamburgerMenu className='menu-icon' onClick={() => setVisible(true)} />
                <div>
                    <select defaultValue={1} className='dropdown'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button className='logout' onClick={onLogout}>Logout</button>
                </div>
            </nav>
            <div className='body-container'>
                <Sidebar id='sideBar' visible={visible} onHide={() => setVisible(false)}>
                    <div className="d-flex flex-column" >
                    {
                            sideNavList.map(tab => {
                                const isActive = tab.id === activeTab ? "active-side-link" : "side-link-item"
                                return (
                                    <Link to={tab.path} className={isActive} key={tab.id} onClick={() => setActive(tab.id)}>
                                        {tab.tabName}
                                    </Link>
                                )
                            })
                        }
                        </div>
                    <PanelMenu   model={fields} className="w-full md:w-25rem" />
                    {/* </div> */}
                </Sidebar>
                <div className="outlet">
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Header 