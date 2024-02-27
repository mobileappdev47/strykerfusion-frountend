import React from "react";
import { motion } from "framer-motion";
import style from '../sidebar.module.css'

const items = [
  { text: "How It Works", link: "brandandprocess" },
  { text: "Our Products", link: "allproducts" },
  { text: "Why Us", link: "regexeprience" },
  { text: "Find Us", link: "contactus" },
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
        <motion.a
          href={`#${item?.link}`}
          className={style.sidebarmenu}
          key={item?.link}
          variants={itemsVariants}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
        >
          {item?.text}
        </motion.a>
      ))}
    </motion.div>
  );
};

export default Links;