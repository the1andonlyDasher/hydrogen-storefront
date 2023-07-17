import { motion, useAnimationControls } from "framer-motion";

interface divProps {
    children?: any;
    height?: any;
}

function ScrollDiv({ height, children }: divProps) {
    const controls = useAnimationControls();

    const divVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const innerDivVariants = {
        initial: { y: 100, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 }
    }

    return (<>
        <motion.div
            variants={divVariants}
            initial="initial"
            exit="exit"
            animate={controls}
            onViewportEnter={() => controls.start("enter")}
            viewport={{ margin: "100px", amount: "some", once:true }}
            transition={{ease:"easeInOut", duration: 0.75, }}
            className={`h-[200vh] w-full`}
        >
            <motion.div variants={innerDivVariants} transition={{ ease:"easeIn", delay: .5 }} className="dot border-l border-[#222]">
                {children}
            </motion.div>
        </motion.div></>);
}

export default ScrollDiv;