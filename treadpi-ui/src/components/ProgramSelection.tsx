import * as React from 'react';
import { loadPrograms } from '../helper/api';
import { ProgramShortDescription } from '../helper/interfaces';
import ProgramOverview from './ProgramOverview';

interface ProgramSelectionProps {
  onProgramSelected: (program: ProgramShortDescription) => void;
}

const ProgramSelection = (props:ProgramSelectionProps) => {
    const [programs, setPrograms] = React.useState<ProgramShortDescription[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        loadPrograms().then(o => {setPrograms(o), setLoading(false)})
    }, []);

return (
    <>
        <div className="programTitle">Program wählen</div>
        {loading && <>Loading programs</>}
        {!loading && <ProgramOverview availablePrograms={programs} onSelect={(o:ProgramShortDescription)=> {
            console.log("value in program selection:",o)
            props.onProgramSelected(o)
        }}/>}
    </>
)
}

export default ProgramSelection;