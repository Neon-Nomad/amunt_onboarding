
import React, { useState, useMemo } from 'react';
import Card from './ui/Card';
import Slider from './ui/Slider';
import Button from './ui/Button';
import { Page } from '../types';

interface ROICalculatorProps {
    setActivePage: (page: Page) => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ setActivePage }) => {
    const [values, setValues] = useState({
        leads: 50,
        closeRate: 25,
        avgTicket: 1500,
        missedCalls: 20,
    });

    const handleChange = (name: string, value: string) => {
        setValues(prev => ({ ...prev, [name]: Number(value) }));
    };

    const { missedRevenue, recoveredRevenue } = useMemo(() => {
        const missedLeads = values.leads * (values.missedCalls / 100);
        const closedLeadsFromMissed = missedLeads * (values.closeRate / 100);
        const totalMissedRevenue = closedLeadsFromMissed * values.avgTicket;
        
        // Assume Amunet can successfully re-engage and book 85% of missed opportunities
        const amunetRecoveryRate = 0.85; 
        const totalRecoveredRevenue = totalMissedRevenue * amunetRecoveryRate;

        return {
            missedRevenue: totalMissedRevenue,
            recoveredRevenue: totalRecoveredRevenue,
        };
    }, [values]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    }

    return (
        <div className="max-w-4xl mx-auto">
             <div className="text-center mb-12">
                <h1 className="text-4xl font-bold font-heading">ROI Calculator</h1>
                <p className="text-amunet-light mt-2">Stop losing leads. See how much revenue Amunet AI can recover for you.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                <Card className="space-y-6">
                    <div>
                        <h3 className="text-xl font-bold font-heading mb-2">Your Business Metrics</h3>
                        <p className="text-amunet-light text-sm">Adjust the sliders to match your monthly estimates.</p>
                    </div>
                    <Slider label="Avg. Leads / Month" value={values.leads} min={10} max={500} step={5} onChange={e => handleChange('leads', e.target.value)} />
                    <Slider label="Close Rate" value={values.closeRate} min={1} max={100} step={1} unit="%" onChange={e => handleChange('closeRate', e.target.value)} />
                    <Slider label="Avg. Value per Client" value={values.avgTicket} min={100} max={10000} step={50} unit="$" onChange={e => handleChange('avgTicket', e.target.value)} />
                    <Slider label="Est. Missed Calls" value={values.missedCalls} min={0} max={100} step={1} unit="%" onChange={e => handleChange('missedCalls', e.target.value)} />
                </Card>

                <Card className="text-center bg-gradient-to-br from-amunet-accent/30 to-amunet-primary">
                    <h3 className="text-2xl font-bold font-heading mb-6 text-amunet-white">Potential Revenue Impact</h3>
                    <div className="space-y-8">
                        <div>
                            <p className="text-lg text-amunet-light">Monthly Missed Revenue</p>
                            <p className="text-5xl font-extrabold font-heading text-red-400">{formatCurrency(missedRevenue)}</p>
                        </div>
                        <div>
                            <p className="text-lg text-amunet-light">Amunet Recovered Revenue</p>
                            <p className="text-5xl font-extrabold font-heading text-green-400">{formatCurrency(recoveredRevenue)}</p>
                        </div>
                         <div>
                            <p className="text-lg text-amunet-light">Annual Recovered Revenue</p>
                            <p className="text-5xl font-extrabold font-heading text-green-400">{formatCurrency(recoveredRevenue * 12)}</p>
                        </div>
                    </div>
                     <Button variant="primary" className="mt-8" onClick={() => setActivePage('pricing')}>
                        Start Saving Now
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default ROICalculator;
