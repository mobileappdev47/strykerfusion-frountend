import React from "react";
import { motion } from "framer-motion";
import style from '../sidebar.module.css'
import { Link } from "react-scroll";

const items = [
  { text: "How It Works", link: "brandandprocess" },
  { text: "Our Products", link: "product" },
  { text: "Why Us", link: "regexeprience" },
  { text: "Find Us", link: "contactusform" },
  { text: "Client Speak", link: "ourclient" }
];

const variants = {
  open: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemsVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: 50,
    opacity: 0,
  },
};

const Links = ({ handleCloseSidebar }) => {
  const handleClick = () => {
    handleCloseSidebar();
  };

  return (
    <motion.div className={style.links} variants={variants}>
      {items.map((item) => (
        <motion.div
          className={style.sidebarmenu}
          key={item?.link}
          variants={itemsVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}

        >
          <Link to={`${item?.link}`} onClick={handleClick}>{item?.text}</Link>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Links;