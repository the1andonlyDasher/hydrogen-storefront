import * as THREE from "three";
import { Center, Environment, useAspect, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef, Suspense, useState, useMemo, forwardRef } from "react";
import { globalLoaded, loadManager, model } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import { motion, useAnimation, useAnimationControls } from "framer-motion";
import AboutGL from "./AboutGL";
import { ReactThreeFiber, extend, } from '@react-three/fiber';
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from 'maath/geometry';
import { useLocation as useLoc } from "@remix-run/react";


declare global {
    namespace JSX {
        interface IntrinsicElements {
            roundedPlaneGeometry: ReactThreeFiber.Object3DNode<RoundedPlaneGeometry, typeof RoundedPlaneGeometry>
        }
    }
}

extend(geometry)

interface productProps {
    index: number;
    item: {
        name: string,
        url: string,
        collection: string
    };
};



function GL({ position = new THREE.Vector3(2, 3, 20.5), fov = 15, w = 0.7, gap = 0.15 }) {
    const [m, setM] = useAtom(model)
    const loc = useLoc()
    const [models, setModels] = useState<any>(m)
    const [gLoaded, setGLoaded] = useAtom(globalLoaded)
    const [man, setManager] = useAtom(loadManager);
    const [loaded, setLoaded] = useState(false)
    const bar = useRef<any>(null)
    const cover_controls = useAnimation();

    useEffect(() => {
        // console.log(gLoaded)
        gLoaded && cover_controls.start({ opacity: 0, transition: { type: "tween", ease: "easeOut" } }).then(() => { cover_controls.start({ display: "none" }) })

    }, [gLoaded])


    const Shop = () => {
        const [initiated, initiate] = useState<any>(false);

        useEffect(() => {
            setModels(m)
            models && setLoaded(true)
            // console.log(models)
        }, [])

        return (
            <Suspense fallback={null}>
                <Center>
                    {m.map((item: any, index: any) =>
                        <P key={item.name + index} item={item} index={index + 1} />
                    )}
                </Center>
            </Suspense>
        )
    }




    function P({ item, index }: productProps) {
        const r = ((Math.PI * 2) / m.length) * index;
        const [model, setModel] = useState();
        const { size } = useThree()
        const viewport = useThree();
        size.updateStyle = true;
        const [w, h] = useAspect(size.width, size.height)
        const radius = Math.max(1.5, Math.min(w / 2, 2));
        const ref = useRef<any>(null)
        const group = useRef<any>(null)
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { setGLoaded(true) };
        })
        const controls = useAnimationControls()
        const y = -1 * Math.max((Math.min(0.5, Math.min(w / 4, 2))) - 1.25 / (w / 4), -2);

        useEffect(() => {
            if (loaded === true) {
                if (loc.pathname.includes(`/${item.name}`)) {
                    controls.start({ scale: (viewport.size.width < 1024 ? Math.max(2, Math.min(w / 4, 3)) : Math.max(1.35, Math.min(w / 4, 2.5))), x: (viewport.size.width < 1024 ? 0 : 0 - w / 4), z: 0, y: (viewport.size.width < 1024 ? -0.5 : -2), transition: { duration: 1, type: "spring" } })
                } else {
                    if (loc.pathname.includes(`/collections/${item.collection}`)) {

                        controls.start({ scale: 0.65, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: y })
                    } else {
                        controls.start({ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: y })
                    }
                }
            }
        }, [loc, w])


        useFrame((state, delta) => {
            if (loc.pathname.includes("/collections/")) {
                group.current.rotation.y += delta * 0.1
                ref.current.rotation.y -= delta * 0.1
            }
            if (loc.pathname.includes(item.name)) {
                ref.current.rotation.y -= delta * 0.1
            }
        })

        return (
            <>
                <motion3d.group
                    scale={Math.max(0.35, Math.min(w / 4, 0.85))}
                    ref={group}
                    dispose={null}>
                    <motion3d.primitive
                        ref={ref}
                        name={item.name}
                        initial={{ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r), y: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 100, bounce: 0.25, mass: 0.5, delay: index * 0.2 }}
                        object={scene}
                    //  position={[0,loc.pathname.includes("/products/") ? (viewport.size.width < 1024 ? -2 : -3.75):y,0]}
                    //  position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), -2, Math.sin(r) * radius]}
                    />
                </motion3d.group>
            </>
        )
    }

    const canvasWrapper = useRef<any | null>(null)

    return (<>
        <motion.div animate={cover_controls} className="fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center bg-[#111]">
            <motion.div className="width-[100%] height-[100%] max-h-[400px] max-w-[400px] p-8 flex flex-col justify-center items-center">
                <h1>KOPFSACHE</h1>
                <motion.div className="w-full h-[10px]">
                    <motion.div ref={bar} className="w-0 h-full bg-[#ffffff]"></motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
        {/* <div ref={canvasWrapper} className='canvas__wrapper' style={{zIndex: loc.pathname.includes("/shop") ? 100 : -1}}> */}
        <div ref={canvasWrapper} className='canvas__wrapper' >
            <Canvas gl={{ antialias: false }} camera={{ position, fov, }} eventPrefix="client" eventSource={canvasWrapper}>
                <color attach={"background"} args={["#111111"]} />
                <Environment background={false} blur={5} />

                <Shop />


                {loc.pathname.includes("/about") && <AboutGL />}
                {/* {loc.pathname.includes("/shop") && <Rig />} */}
            </Canvas>
        </div>
    </>
    )

}

type sProps = {

}

const FwdGL = forwardRef<HTMLElement, sProps>((props, ref) => <GL {...props} />);

export default FwdGL;
