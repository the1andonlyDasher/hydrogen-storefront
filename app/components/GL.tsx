import * as THREE from "three";
import { Bounds, Environment, Html, Scroll, ScrollControls, View, useAspect, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef, Suspense, useState, useMemo, forwardRef } from "react";
import { globalLoaded, loadManager, model } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import { motion, useAnimation, useAnimationControls } from "framer-motion";
import AboutGL from "./AboutGL";
import { ReactThreeFiber, extend, } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { easing } from 'maath'
import * as geometry from "maath/geometry";
import medium from '../../public/fonts/economica-v13-latin-700.woff'
import regular from '../../public/fonts/nunito-sans-v15-latin-regular.woff'
import { RoundedPlaneGeometry } from 'maath/geometry'
import { useLocation, useRoute } from "wouter"
import { useLocation as useLoc } from "@remix-run/react";
import { Flex, Box } from "@react-three/flex"




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
    const [models, setModels] = useState<any>([])   
    const [gLoaded, setGLoaded] = useAtom(globalLoaded)
    const [man, setManager] = useAtom(loadManager);
    const [loaded, setLoaded] = useState(false)
    const bar = useRef<any>(!null)
    const cover_controls = useAnimation();

    useEffect(()=>{
    gLoaded === true && cover_controls.start({opacity:0, transition:{type:"tween", ease:"easeOut"}}).then(()=>{cover_controls.start({display:"none"})})

    },[gLoaded])


    const Card = ({ item, index }: any) => {
        const ref = useRef<any>(!null);
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { console.log("done loading") };
        })

        return (
            <>
                <Frame price={item.price} width={1.2} height={1.85} id={"0" + index} name={`${item.name}`} author="Omar Faruq Tawsif" bg={`#${index}${index}${index}${index}ff`} position={[-5 + index * 1.5, 0, 0]} rotation={[0, 0, 0]}>
                    <Environment preset="city" />
                    <Gltf
                        scale={0.75}
                        position={[0, -1, 0]}
                        rotation={[0,Math.PI/2,0]}
                        name={item.name}
                        src={item.url}
                    // position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), 0, Math.sin(r) * radius]}
                    />

                </Frame>
            </>
        )
    }


    const SecondShop = () => {
        const { width } = useThree((state) => state.viewport)
        const xW = w + gap
        useEffect(() => {
            m && setModels(m)
   
            models && setLoaded(true)
        }, [])
        return (<>
            <Suspense fallback={null}>
                        {models && models.map((item: any, index: any) =>
                            <Card key={item.name + index} item={item} index={index + 1} />
                        )}
            </Suspense>
        </>)
    }

    function Frame({ id, name, price, author, bg, width = 1, height = 1.61803398875, children, ...props }: any) {
        const portal = useRef<any>(!null)
        const [location, setLocation] = useLocation()
        const [, params] = useRoute('/shop/item/:id')
        const [hovered, hover] = useState(false)
        const controls = useAnimationControls()
        const { size } = useThree();
        size.updateStyle
        const [w, h] = useAspect(size.width, size.height)
        const variants = {
            zoomIn: { scale: Math.max(0.35, Math.min(w / 4, 0.85)) },
            zoomOut: { scale: 1 },
        }
        useEffect(() => {
            if (location == "/shop/") {
                controls.start("zoomOut")
            }
        }, [location])
        useCursor(hovered)
        useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))
        return (
            <group {...props}>
                <Text font={medium} fontSize={0.2} maxWidth={2} anchorY="top" anchorX="left" lineHeight={1.2} position={[-0.5, 0.75, 0.01]} material-toneMapped={false}>
                    {name.split("-").join(" ")}
                </Text>
                <Text font={medium} fontSize={0.15} anchorX="right" anchorY="bottom-baseline" position={[0.5, -0.7, 0.01]} material-toneMapped={false}>
                    {price} €
                </Text>
                <Text font={medium} fontSize={0.075} anchorX="left" anchorY="bottom-baseline" position={[-0.5, -0.7, 0.01]} material-toneMapped={false}>
                    {/* {author} */}
                    Kopfsache
                </Text>

                <motion3d.mesh variants={variants} animate={controls} name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation("/shop/item/" + e.object.name), controls.start("zoomIn"))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
                    <roundedPlaneGeometry args={[width, height, 0.02]} />
                    <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
                        <color attach="background" args={[bg]} />
                        {children}
                    </MeshPortalMaterial>
                </motion3d.mesh>
            </group>
        )
    }

    function Rig({ position = new THREE.Vector3(0, 0, 15), focus = new THREE.Vector3(0, 0, 0) }) {
        const { controls, scene }: any = useThree()
        const [, params] = useRoute('/shop/item/:id')
        useEffect(() => {
            const active = scene.getObjectByName(params?.id)
            if (active) {
                active.parent.localToWorld(position.set(0, -1, 12))
                active.parent.localToWorld(focus.set(0, 0, 0))
            }
            controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
        })
        return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
    }


    const Shop = () => {
        const [initiated, initiate] = useState(false);
        useEffect(() => {
            m && setModels(m)
            models && setLoaded(true)
        }, [m,models])

        return (
            <Suspense fallback={null}>

                {models && models.map((item: any, index: any) =>
                    <P key={item.name + index} item={item} index={index + 1} />
                )}

            </Suspense>
        )
    }




    function P({ item, index }: productProps) {
        const r = ((Math.PI * 2) / m.length) * index;
        const { size } = useThree()
        const viewport = useThree();
        size.updateStyle = true;
        const [w, h] = useAspect(size.width, size.height)
        const radius = Math.max(1.5, Math.min(w / 2, 2));
        const ref = useRef<any>(!null)
        const group = useRef<any>(!null)
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { setGLoaded(true)};
        })
        const controls = useAnimationControls()

        useEffect(() => {
            controls.start({ scale: 0 })
            if (loaded === true) {
                if (loc.pathname.includes(`/${item.name}`)) {
                    controls.start({ scale: 2.0, x: (viewport.size.width < 768 ? 0 : 0 - w / 8), z: 0, y: (viewport.size.width < 768 ? 0 : -1), transition: { duration: 1, type: "spring" } })
                } else {
                    if (loc.pathname.includes(`/collections/${item.collection}`)) {
                        controls.start({ scale: 0.65, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: 0 })
                    } else {
                        controls.start({ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r) * radius, y: 0 })
                    }
                }
            }
        }, [loc])


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
                        initial={{ scale: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 100, bounce: 0.25, mass: 0.5, delay: index * 0.2 }}
                        object={scene}
                    // position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), 0, Math.sin(r) * radius]}
                    />
                </motion3d.group>
            </>
        )
    }

    const canvasWrapper = useRef<any>(!null)

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
                <Environment preset="city" />
          
                    <Shop />

                
                {loc.pathname.includes("/about") && <AboutGL />}
                {loc.pathname.includes("/shop") && <Rig />}
            </Canvas>
        </div>
        </>
    )

}

type sProps = {

}

const FwdGL = forwardRef<HTMLElement, sProps>((props, ref) => <GL {...props} />);

export default FwdGL;
