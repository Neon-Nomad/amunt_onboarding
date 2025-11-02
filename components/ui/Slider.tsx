
import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, unit = '', onChange }) => {
  return (
    <div className="w-full">
      <label className="flex justify-between items-center mb-2 text-amunet-white">
        <span>{label}</span>
        <span className="font-bold text-amunet-accent">{value}{unit}</span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-amunet-secondary rounded-lg appearance-none cursor-pointer accent-amunet-accent"
      />
    </div>
  );
};

export default Slider;