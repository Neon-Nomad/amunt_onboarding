import React from 'react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange, disabled }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div>
        <label className="block mb-2 font-semibold">Schedule for Later (optional)</label>
        <div className="flex items-center gap-2">
            <input
                type="datetime-local"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full bg-amunet-bg border border-amunet-secondary rounded-md px-4 py-2 text-amunet-white placeholder-amunet-light focus:outline-none focus:ring-2 focus:ring-amunet-accent disabled:opacity-50"
                min={new Date().toISOString().slice(0, 16)} // Disable past dates
            />
            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    disabled={disabled}
                    className="px-3 py-2 bg-amunet-secondary text-amunet-light rounded-md hover:bg-amunet-light/20 transition-colors"
                >
                    Clear
                </button>
            )}
        </div>
    </div>
  );
};

export default DateTimePicker;
