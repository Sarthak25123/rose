import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Upload } from 'lucide-react';

const RoseGenerator = () => {
  const [showRose, setShowRose] = useState(false);
  const [activePetals, setActivePetals] = useState(0);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const totalPetals = 12; // Increased for fuller center
  
  useEffect(() => {
    if (showRose && activePetals < totalPetals) {
      const timer = setTimeout(() => {
        setActivePetals(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [showRose, activePetals]);

  const handleGenerate = () => {
    setShowRose(true);
    setActivePetals(0);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const getPetalPath = (index) => {
    const petalConfigs = [
      // Outer petals
      { angle: 0, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      { angle: 60, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      { angle: 120, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      { angle: 180, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      { angle: 240, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      { angle: 300, scale: 1, path: "M150 150 Q 165 130, 170 150 Q 165 170, 150 150" },
      // Middle petals
      { angle: 30, scale: 0.85, path: "M150 150 Q 160 135, 165 150 Q 160 165, 150 150" },
      { angle: 90, scale: 0.85, path: "M150 150 Q 160 135, 165 150 Q 160 165, 150 150" },
      { angle: 150, scale: 0.85, path: "M150 150 Q 160 135, 165 150 Q 160 165, 150 150" },
      // Inner petals (converging to center)
      { angle: 45, scale: 0.7, path: "M150 150 Q 155 140, 158 150 Q 155 160, 150 150" },
      { angle: 135, scale: 0.7, path: "M150 150 Q 155 140, 158 150 Q 155 160, 150 150" },
      { angle: 225, scale: 0.7, path: "M150 150 Q 155 140, 158 150 Q 155 160, 150 150" }
    ];

    const config = petalConfigs[index];
    const layer = index < 6 ? 0 : index < 9 ? 1 : 2;
    const baseColors = ['#ff0000', '#ff1a1a', '#ff3333'];
    const outlineColors = ['#8b0000', '#990000', '#a60000'];

    return (
      <g key={index}>
        {/* Shadow layer */}
        <path
          d={config.path}
          fill="rgba(0,0,0,0.2)"
          transform={`translate(2 2) rotate(${config.angle} 150 150) scale(${config.scale})`}
          style={{
            opacity: index < activePetals ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
          }}
        />
        {/* Main petal */}
        <path
          d={config.path}
          fill={baseColors[layer]}
          stroke={outlineColors[layer]}
          strokeWidth="2"
          transform={`rotate(${config.angle} 150 150) scale(${config.scale})`}
          style={{
            opacity: index < activePetals ? 1 : 0,
            transition: 'opacity 0.5s ease-in'
          }}
        />
        {/* Inner detail */}
        <path
          d={config.path}
          fill="none"
          stroke="#ff6666"
          strokeWidth="1"
          transform={`rotate(${config.angle} 150 150) scale(${config.scale * 0.9})`}
          style={{
            opacity: index < activePetals ? 0.3 : 0,
            transition: 'opacity 0.5s ease-in'
          }}
        />
      </g>
    );
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen bg-pink-50">
      <Card className="w-full max-w-4xl bg-white shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
            Happy Wose Dayy!!
          </h1>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Rose Container */}
            <div className="bg-white p-4 rounded-lg border-4 border-red-200 shadow-inner">
              <svg 
                viewBox="0 0 300 300" 
                className="w-full h-full"
              >
                {/* Stem */}
                {showRose && (
                  <>
                    <path
                      d="M150 150 L 150 250"
                      stroke="#2d8a1b"
                      strokeWidth="8"
                      fill="none"
                      style={{
                        opacity: activePetals > 0 ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                    {/* Stem outline */}
                    <path
                      d="M150 150 L 150 250"
                      stroke="#1a5c10"
                      strokeWidth="2"
                      fill="none"
                      style={{
                        opacity: activePetals > 0 ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                    {/* Leaves */}
                    <path
                      d="M150 200 Q 170 200, 165 185 Q 160 170, 150 200"
                      fill="#2d8a1b"
                      stroke="#1a5c10"
                      strokeWidth="2"
                      style={{
                        opacity: activePetals > totalPetals/2 ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                    <path
                      d="M150 220 Q 130 220, 135 205 Q 140 190, 150 220"
                      fill="#2d8a1b"
                      stroke="#1a5c10"
                      strokeWidth="2"
                      style={{
                        opacity: activePetals > totalPetals/2 ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                  </>
                )}
                
                {/* Petals */}
                {Array.from({ length: totalPetals }).map((_, i) => getPetalPath(i))}
                
                {/* Center detail */}
                {showRose && (
                  <>
                    <circle
                      cx="150"
                      cy="150"
                      r="10"
                      fill="#8b0000"
                      stroke="#660000"
                      strokeWidth="2"
                      style={{
                        opacity: activePetals === totalPetals ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                    <circle
                      cx="150"
                      cy="150"
                      r="6"
                      fill="#660000"
                      style={{
                        opacity: activePetals === totalPetals ? 1 : 0,
                        transition: 'opacity 0.5s ease-in'
                      }}
                    />
                  </>
                )}
              </svg>
            </div>

            {/* Image Upload Container */}
            <div className="bg-white p-4 rounded-lg border-4 border-red-200 shadow-inner flex flex-col items-center justify-center">
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="max-w-full max-h-64 object-contain"
                />
              ) : (
                <div className="text-center p-8">
                  <img 
                    src="C:\Users\svrak\Downloads\smash.jpeg" 
                    alt="placeholder"
                    className="mb-4 opacity-50"
                  />
                  <p className="text-gray-500 mb-2">Upload your image here</p>
                </div>
              )}
              <Button 
                onClick={() => document.getElementById('imageUpload').click()} 
                className="mt-4 bg-red-500 hover:bg-red-600"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
          
          <p className="text-center italic text-gray-600 mt-4">
            I wuv uou chibu ❤️
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pb-6">
          <Button
            onClick={handleGenerate}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            <Heart className="w-4 h-4" />
            Generate Rose
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RoseGenerator;
