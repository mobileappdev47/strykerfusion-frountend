import React, { useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Box from "@mui/material/Box";
import axios from "axios";
import style from './singleproduct.module.css'

gsap.registerPlugin(ScrollTrigger);

const SingleProduct = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/product`
                );
                setProducts(response?.data?.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            let ctx = gsap.context(() => {
                gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 1 });

                const animation = gsap.to(".photo:not(:first-child)", {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    stagger: 1
                });

                ScrollTrigger.create({
                    trigger: ".gallery",
                    start: "top top",
                    end: "bottom bottom",
                    pin: ".rightblock",
                    animation: animation,
                    scrub: true
                });
            });

            return () => ctx.revert();
        }
    }, [products]);

    const firstMapProducts = products.slice(0, products.length - 1);

    console.log(firstMapProducts);

    return (
        <React.Fragment>
            <Box className="gallery" sx={{ display: "flex" }}>
                <Box
                    className="left"
                    sx={{
                        width: "0%",
                        marginLeft: "auto",
                        "& .details": {
                            height: "100vh",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            width: "40vw",
                            marginLeft: "auto",
                            color: "#000",
                            fontSize: "3rem",
                            fontWeight: 900
                        }
                    }}
                >
                    <Box className="details"></Box>
                    <Box className="details"></Box>
                    <Box className="details"></Box>
                </Box>
                <Box
                    className="rightblock"
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >
                    <Box
                        sx={{
                            width: "69.8vw",
                            height: "40vh",
                            position: "relative",
                            top: "30%",
                            left: "15%",
                            "& .photo": {
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                "& img": {
                                    height: "100%",
                                    width: "100%"
                                }
                            }
                        }}
                    >
                        {firstMapProducts.map((product, index) => (
                            <Box className="photo">
                                <div key={index}>
                                    <div className={`${style.maindiv}`}>
                                        <div
                                            className={`${style.imgsection} mx-sm-3`}>
                                            <div className={style.imagegradient}></div>
                                            <img
                                                className={style.singleproimg}
                                                src={`${process.env.REACT_APP_BASE_URL}/${product?.productImage}`}
                                                alt='product'
                                            />
                                            <div className={style.contentbox}>
                                                <h1 className={style.imgheadingfont}>{product?.productTitle}</h1>
                                                <h1 className={style.imgcontent}>View Project</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default SingleProduct;
