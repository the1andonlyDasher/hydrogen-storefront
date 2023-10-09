import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

type ACTypes = {
    header?: string;
    subheader?: string;
    text?: any;
    clicked?: boolean;
}

interface ACProps{
    props: ACTypes
}

const wrapper_variants = {
    initial:{scaleX:[0,0], scaleY:[0,0]},
    enter:{scaleX:[0,1], scaleY:[0.2,1], transition:{ ease:"easeIn", staggerchildren: 0.2, when:"beforeChildren"}},
    exit:{scaleX:[1,0], scaleY:[1,0], transition:{ ease:"easeOut", staggerchildren: 0.2, when:"afterChildren"}},
}

const text_variants = {
    initial:{x:-10, opacity:0},
    enter:{x:0, opacity:1},
    exit:{x:10, opacity:0},
}



export function AboutContainer({props}:ACProps) {
    const controls = useAnimation();
    useEffect(()=>{
        controls.start(props.clicked ? "enter": "exit")
    }, [props.clicked])

    return(<>
    <motion.div animate={controls} className="w-full h-full max-w-[80%] max-h-[80vh] m-auto overflowX-hidden p-20 fixed top-0 left-0 flex justify-center align-center overflow-scroll bg-[#111] z-30" variants={wrapper_variants}>
        <div className="fixed top-0 right-0" onClick={()=>controls.start("exit")}>
        <div className="box">
<svg width="40" height="40" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30" stroke="black" stroke-width="4" /></svg>
</div>

<div className="bg-close" style={{width:"25px", height:"25px"}}></div>
<div className="bg-close" style={{width: "50px", height: "50px"}}></div>
<div className="bg-close" style={{width:"150px", height: "150px",}}></div>
        </div>
        {/* <motion.h2 variants={text_variants}>{props.header}</motion.h2> */}
        <motion.p variants={text_variants}>{props.text}</motion.p>
    </motion.div>
    </>)
}