import React from 'react';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  enabledText?: string;
  disabledText?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, enabled, onChange, enabledText = 'On', disabledText = 'Off' }) => {
  return (
    <div>
      <label className="block mb-2 font-semibold text-amunet-white">{label}</label>
      <div className="flex items-center space-x-4">
        <span className={`text-sm font-medium ${!enabled ? 'text-amunet-white' : 'text-amunet-light'}`}>{disabledText}</span>
        <button
          type="button"
          className={`${
            enabled ? 'bg-amunet-accent' : 'bg-amunet-secondary'
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amunet-accent focus:ring-offset-2 focus:ring-offset-amunet-primary`}
          onClick={() => onChange(!enabled)}
          aria-pressed={enabled}
        >
          <span
            aria-hidden="true"
            className={`${
              enabled ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          />
        </button>
        <span className={`text-sm font-medium ${enabled ? 'text-amunet-white' : 'text-amunet-light'}`}>{enabledText}</span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
