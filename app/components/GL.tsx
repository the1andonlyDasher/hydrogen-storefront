import { Backdrop, Bounds, CameraControls, Center, Environment, Resize, Stage, useAspect, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef, Suspense, useState, useMemo } from "react";
import { model } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import * as THREE from "three";
import { useAnimationControls } from "framer-motion";
import { useLocation } from "@remix-run/react";


interface productProps {
    index: number;
    item: {
        name: string,
        url: string,
        collection: string
    };

}


export default function GL({ position = new THREE.Vector3(2, 3, 20.5), fov = 15 }) {
    const [m, setM] = useAtom(model)
    const location = useLocation();
    const [models, setModels] = useState<any>(m)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        loaded === false && setLoaded(true);
        models === null && setModels(m), console.log(models); 
        console.log(loaded);
    }, [loaded, m])


    function P({ item, index }: productProps) {
        var r = ((Math.PI * 2) / m.length) * index;
        const { size } = useThree()
        const viewport = useThree();
        size.updateStyle = true;
        const [w, h] = useAspect(size.width, size.height)
        const radius = Math.max(1.5, Math.min(w / 2, 2));
        const ref = useRef<any>(!null)
        const group = useRef<any>(!null)
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { console.log("done loading") };
        })
        const controls = useAnimationControls()
        console.log(location.pathname)
        useEffect(() => {
            console.log(location.pathname)

            if (location.pathname.includes(`/${item.name}`)) {

                controls.start({ scale: (item.name === "adidas-classic" ? 0.5 : 0.75), x: (viewport.size.width < 768 ? 0 : 0 - w / 8), z: 0, y: (viewport.size.width < 768 ? 0 : -1), transition: { duration: 1, type: "spring" } })
            } else {
                if (location.pathname.includes(`/collections/${item.collection}`)) {
                    controls.start({ scale: 0.65, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: 0, transition: { duration: 0.5, type: "spring" } }).then(() => console.log("Done"))

                } else {
                    controls.start({ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: 0, transition: { duration: 0.5, type: "spring" } }).then(() => console.log("Done"))
                }
            }
            console.log("running GL")
        }, [location])


        useFrame((state, delta) => {
            if (location.pathname.includes("/collections/")) {
                group.current.rotation.y += delta * 0.1
                ref.current.rotation.y -= delta * 0.1
            }
            if (location.pathname.includes(item.name)) {
                ref.current.rotation.y += delta
            } else {
                ref.current.rotation.x === 0
            }
        })

        return (
            <>

                <motion3d.group
                    scale={Math.max(0.35, Math.min(w / 4, 0.85))}
                    ref={group}
                    // position={[(viewport.size.width < 768 ? 0 : 0 + w / 4), (viewport.size.width < 768 ? 0 : -1), 0]}
                    dispose={null}>
                    <motion3d.primitive
                        ref={ref}
                        name={item.name}
                        animate={controls}
                        object={scene}
                      position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), 0, Math.sin(r) * radius]}
                    />
                </motion3d.group>
            </>
        )
    }

    return (
        <div className='canvas__wrapper'>
            <Canvas camera={{ position, fov, }}>
                <color attach={"background"} args={["#111111"]} />
                <Environment preset="park" background blur={1}></Environment>
                <Suspense fallback={null}>
                    {models && models.map((item: any, index: any) =>
                        <P key={item.name + index} item={item} index={index + 1} />
                    )}
                </Suspense>

            </Canvas>
        </div>

    )

}

