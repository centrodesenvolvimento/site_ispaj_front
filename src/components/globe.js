import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense, useRef, useState } from "react"
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import '../css/globe.css'
import '../css/principles.css'
import { OrbitControls } from "@react-three/drei"
const GlobeModel = () => {
    const ref = useRef(null)
    const gltf = useLoader(GLTFLoader, process.env.PUBLIC_URL +'/images/scene.gltf')

    useFrame((state, delta) => ref.current.rotation.y+=0.003)
    const [hover, setHover] = useState(false)
    return (
        <>
        <primitive 
        ref={ref}
        scale={1}
        object={gltf.scene}
        
        position={[0, -2.9, 0]}
        onPointerOver={(e)=> setHover(true)}
        onPointerOut={(e) => setHover(false)}
        />
        </>
    )
}
const Globe = () => {
    
    
    return (
        <div className="globeContainer">
            <div>
                <div className="title" style={{marginBottom: 20}}>Junte-se a nós</div>
                <div className="globeGrid">
                <section className='globeLeft'>
                            <div>
                                <img src={process.env.PUBLIC_URL + '/images/welcome.png'}/>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + '/images/director.png'}/>
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + '/images/student.png'} />
                            </div>
                            <div>
                                <img src={process.env.PUBLIC_URL + '/images/lab.png'}/>
                            </div>
                
                    </section>
                    <div className="globeContainer1">
                        <Canvas style={{width: '100%'}}>
                            <OrbitControls enableZoom={false} enablePan={false}/>
                            <ambientLight intensity={1.5}/>
                            <spotLight position={[1.5, 2, 1]} angle={5}/>
                            <Suspense fallback={null}>
                                <GlobeModel />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Globe