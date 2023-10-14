
import { Carousel } from "@components/Carousel";
import { SDiv } from "@components/ScrollDiv";
import { globalScroll } from "@components/atoms";
import { motion, useScroll, useSpring } from "framer-motion";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { InView } from 'react-intersection-observer';
import { currentSection } from "@components/atoms";
import Footer from "@components/Footer";
import Sec from "@components/Section";
import Service from "@components/service";

const variants:any = {
    initial:{opacity:0},
    enter:{opacity:1, transition:{ staggerChidlren: 0.2, when:"beforeChildren", delayChildren: 0.1}},
    exit:{opacity:0, transition:{ staggerChidlren: 0.2, when:"afterChildren"}},
}

const priceVariants:any = {
    initial:{opacity:0, x:-10},
    enter:{opacity:1, x:0, transition:{ staggerChidlren: 0.2, when:"beforeChildren"}},
    exit:{opacity:0, x:10, transition:{ staggerChidlren: 0.2, when:"afterChildren"}},
}

const Prices = () => {
    return (<>
    <motion.section variants={variants}>
        <motion.div variants={variants} className="my-12 flex flex-wrap flex-col w-full h-full gap-6">
            <motion.h2 variants={variants}>Unsere Preise</motion.h2>
            <motion.h3 variants={variants}>Herren</motion.h3>
            <Service props={{
                title: "Herrenhaarschnitt",
                description: "Haare waschen, schneiden und föhnen.",
                cost: "26,00€",
                duration: "45 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Maschinenhaarschnitt",
                description: "Hier wird nur mit der Maschine geschnitten, ohne Schere und die Haare werden gewaschen.",
                cost: "14,00€",
                duration: "15 min",
                variants:priceVariants

            }} />
            <Service props={{
                title: "Kinderhaarschnitt bis 12 Jahre",
                description: "Haare waschen, schneiden und föhnen.",
                cost: "17,50€",
                duration: "30 min",
                variants:priceVariants

            }} />
            <Service props={{
                title: "Bart fromen",
                description: "Hier wird der Bart sauber gemacht, gekürzt und in die gewünschte Form gebracht.",
                cost: "6,50€",
                duration: "15 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Bart Rasur (inkl. warme Kompresse)",
                description: "Der Bart wird mit einem warmen Handtuch vorbereitet und anschließend mit dem Rasiermesser rasiert.",
                cost: "12,00€",
                duration: "30 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Kopfmassage",
                description: "Kopfmassage mit einem wohltuendem Haarwasser.",
                cost: "4,50€",
                duration: "15 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Gesichtsreinigung und Massage",
                description: "Mit einem tiefenreinigendem Peeling wird das Gesicht während der Massage gereinigt.",
                cost: "9,50€",
                duration: "30 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Verwöhnprogramm",
                description: "Gönn dir auch mal was nach der harten Arbeit, lass dich komplett fallen und genieße es einfach.( Haarschnitt, Bart, Massage, Gesichtsreinigung, Haarentf.)",
                cost: "57,00€",
                duration: "105 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Haarfarbe oder Tönung (Herren)",
                description: "Haarfarbe, Tönung oder nur Graukaschierung inklusive Waschen.",
                cost: "24,00€",
                duration: "45 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Maschienenhaarschnitt mit Übergang(null mm)",
                description: "Hier werden nur die Seiten geschnitten ganz kurz von 0mm angefangen mit Übergang nach oben länger werdend.",
                cost: "20,00€",
                duration: "30 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Nasenwax/Ohren",
                description: "Nasen oder Ohrenhaare mit Wax entfernen.",
                cost: "3,50€",
                duration: "15 min",
                variants:priceVariants
            }} />
        </motion.div>
            <motion.div variants={variants} className="flex flex-wrap flex-col w-full h-full gap-6">
            <motion.h3>Damen</motion.h3>
            <Service props={{
                title: "Damenhaarschnitt",
                description: "Waschen, Schneiden und Haare trocknen.",
                cost: "28,00€",
                duration: "45 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Waschen, Schneiden und Föhnen (kurze Haare)",
                description: "Haare waschen, schneiden und föhnen.",
                cost: "48,50€",
                duration: "75 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Waschen, Schneiden und Föhnen (lange Haare)",
                description: "Haare waschen, schneiden und föhnen.",
                cost: "48,50€",
                duration: "90 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Kinderhaarschnitt bis 12 Jahre",
                description: "Haare waschen, schneiden und föhnen.",
                cost: "17,50€",
                duration: "30 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Waschen, Föhnen und Styling (kurze Haare)",
                description: "Haare waschen und föhnen inkl. Stylingprodukte",
                cost: "22,50€",
                duration: "30 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Waschen, Föhnen und Styling (lange Haare)",
                description: "Haare waschen und föhnen inkl. Stylingprodukte",
                cost: "30,50€",
                duration: "45 min",
                variants:priceVariants
            }} />
            <Service props={{
                title: "Damen Haarschnitt Lang",
                description: "Haare schneiden und trocknen ab Schulter langem Haar",
                cost: "30,00€",
                duration: "45 min",
                variants:priceVariants
            }} />
            </motion.div>
        </motion.section>
    </>);
};


export default Prices;

