import { forwardRef, useState } from "react";
import Section from "./Section";
import { AnimationProps, Variant, Variants, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type serviceType = {
    title?: string;
    description?: string;
    cost?: string | number;
    duration?: string | number;
    variants?: Variants;
}

interface serviceProps {
    props: serviceType;
}

const priceVariants:any = {
    initial:{opacity:0, x:-10},
    enter:{opacity:1, x:0, transition:{ staggerChidlren: 0.2, when:"beforeChildren"}},
    exit:{opacity:0, x:10, transition:{ staggerChidlren: 0.2, when:"afterChildren"}},
}

const arrow_variants = {
    closed: { rotate: "0deg" },
    open: { rotate: "180deg" },
};

const desc_variants = {
    closed: { gridTemplateRows: "0fr", opacity:0, paddingTop:0  },
    open: { gridTemplateRows: "1fr", opacity:1, paddingTop: "1rem" }
}

const ServiceBasic = ({ props }: serviceProps) => {
    const [click, setClicked] = useState(false);
    return (<>
        <motion.div variants={priceVariants} className="p-8 my-2 bg-[#0f0f0f] border-[#0e0e0e] w-full h-full grid grid-cols-1 md:grid-cols-2 justif-start grid-rows-1">
            <motion.dl className="flex flex-col mb-auto">
                <motion.div
                    onClick={() => { setClicked(!click) }}
                    className="flex gap-6 cursor-pointer justify-start flex-row items-center">
                    <h3 className="m-0 w-auto">
                        {props.title}
                    </h3>
                    <motion.div
                        className="w-4 h-4 origin-center"
                        variants={arrow_variants}
                        animate={click ? "open" : "closed"}>
                        <FontAwesomeIcon icon={faChevronDown} scale={5} />
                    </motion.div>
                </motion.div>
                <motion.div variants={desc_variants} animate={click ? "open" : "closed"} className="grid overflow-hidden">
                    <p className="m-0 overflow-hidden">{props.description}</p>
                </motion.div>
            </motion.dl>
            <motion.dl className="flex pt-4 mt-4 md:m-0 md:p-0 flex-row md:flex-col justify-between md: justify-end gap-4 border-t border-[#222] md:border-none">
                <h4 className="m-0 text-left md:text-right">{props.cost}</h4>
                <p className="m-0 text-right">{props.duration}</p>
            </motion.dl>
        </motion.div>
    </>)
}

const Service = forwardRef<HTMLElement, serviceProps>((props, ref) => <ServiceBasic {...props}></ServiceBasic>);

export default Service;