import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Html, Bounds, Center, Bvh } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { cn } from '../../lib/utils';

function Loader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-green-400 font-mono text-sm font-bold tracking-widest whitespace-nowrap">LOADING CITY...</div>
      </div>
    </Html>
  );
}

function Model({ url, onInteract }: { url: string; onInteract: (part: string) => void }) {
  const { scene } = useGLTF(url);

  return (
    <primitive 
      object={scene} 
      onClick={(e: any) => {
        e.stopPropagation();
        onInteract(e.object.name || 'Building');
      }}
    />
  );
}

interface SmartCityModelProps {
  className?: string;
}

export function SmartCityModel({ className }: SmartCityModelProps) {
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  return (
    <div className={cn("relative w-full h-full bg-[#050b14] overflow-hidden", className)}>
      {/* Overlay UI for interaction */}
      {activeInfo && (
        <div className="absolute top-6 left-6 z-10 bg-black/80 border border-green-500/50 backdrop-blur-md p-4 rounded-xl max-w-xs animate-in fade-in slide-in-from-top-4">
          <h3 className="text-green-400 font-mono font-bold text-lg mb-1">{activeInfo}</h3>
          <p className="text-white/70 text-sm">Interactive smart city node selected. Real-time data streaming...</p>
          <button 
            onClick={() => setActiveInfo(null)}
            className="mt-3 text-xs bg-green-500/20 text-green-400 px-3 py-1.5 rounded hover:bg-green-500/40 transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [50, 40, 50], fov: 45 }}
        className="touch-none"
        dpr={1}
        performance={{ min: 0.5 }}
      >
        {/* Smart City Lighting: Dark base with neon accents */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#00ffcc" />
        <directionalLight position={[-10, 10, -10]} intensity={2} color="#0066ff" />
        <pointLight position={[0, 10, 0]} intensity={3} color="#ff00ff" distance={100} />

        <Suspense fallback={<Loader />}>
          <Bounds fit clip observe margin={0.7}>
            <Center>
              <Bvh firstHitOnly>
                <Model 
                  url="/models/nongnuch/nongnuch.glb" 
                  onInteract={(part) => setActiveInfo(part)}
                />
              </Bvh>
            </Center>
          </Bounds>
          <Environment preset="city" />
        </Suspense>

        {/* Controls: Free rotation */}
        <OrbitControls 
          makeDefault
          enableRotate={true}
          enablePan={true}
          enableZoom={false}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Cyberpunk Grid Background Effect */}
      <div className="absolute inset-0 pointer-events-none" 
           style={{
             backgroundImage: 'linear-gradient(rgba(0, 255, 204, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 204, 0.05) 1px, transparent 1px)',
             backgroundSize: '40px 40px',
             backgroundPosition: 'center center',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) translateZ(-200px)',
             opacity: 0.5
           }}>
      </div>
    </div>
  );
}
