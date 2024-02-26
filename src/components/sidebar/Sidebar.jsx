import ToggleButton from "./togglebutton/TggleButton";
import { motion } from "framer-motion";
import "./sidebar.module.css";
import { useState } from "react";
import Links from "./link/Link";
import style from './sidebar.module.css'
import logo from '../../assets/logo.png';

const variants = {
    open: {
        clipPath: "circle(1200px at 350px 50px)",
        transition: {
            type: "spring",
            stiffness: 20,
        },
    },
    closed: {
        clipPath: "circle(0px at 350px 50px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};
const Sidebar = () => {
    const [open, setOpen] = useState(false);

    return (
        <motion.div className={style.sidebar} animate={open ? "open" : "closed"} >
            <div className=''>
                <div><img src={logo} alt="" className={`${style.profileimg}`} /></div>
            </div>
            <motion.div className={style.bg} variants={variants}>
                <Links />
            </motion.div>
            <ToggleButton setOpen={setOpen} />
        </motion.div>
    );
};

export default Sidebar;