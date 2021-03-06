import React, { Suspense } from 'react'

import { LinearMipMapLinearFilter, NearestFilter } from 'three'

import { useTexture } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { dirtBlockTextureUrl } from './textureSamples'

interface ComponentProps {}

const SceneBlock: React.FC = () => {
    const texture = useTexture(dirtBlockTextureUrl)

    texture.magFilter = NearestFilter
    texture.minFilter = LinearMipMapLinearFilter

    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}

const BlockModelNew: React.FC<ComponentProps> = () => (
    <Suspense fallback={null}>
        <Canvas
            camera={{
                position: [0, 0, -5],
            }}
        >
            <ambientLight />
            <SceneBlock />
        </Canvas>
    </Suspense>
)

export default BlockModelNew
