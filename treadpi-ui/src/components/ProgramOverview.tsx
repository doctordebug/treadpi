import * as React from "react";
import Row from "./UIElements.tsx/Row";
import Button from "../elements/Button";
import { ProgramParameter, ProgramShortDescription } from "../helper/interfaces";

interface ProgramOverviewProps {
  availablePrograms: ProgramShortDescription[];
  onSelect: (program: ProgramShortDescription) => void;
}

const ProgramOverview = (props: ProgramOverviewProps) => {
  const [showModal, setShowModal] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<ProgramShortDescription | null>(null);

  function selectProgram(program: ProgramShortDescription) {
    if (program.allowUserParams) {
      setSelectedProgram(program);
      setShowModal(true);
    } else {
      props.onSelect(program);
    }
  }

  function confirmUserParams() {
    console.log("starting", selectedProgram)
    if (selectedProgram) {
      props.onSelect(selectedProgram);
    }
    setShowModal(false);
  }

  return (
    <>
      <Row direction="vertical">
        {props.availablePrograms.map((p) => (
          <div key={p.id} className="programCard" onClick={() => selectProgram(p)}>
            <div className="programTitle">{p.name}</div>
            <div className="programDesc">{p.description}</div>
          </div>
        ))}
      </Row>

      {showModal && selectedProgram && (
        <div className="modalBackdrop">
          <div className="modal">
            <h2 style={{ marginBottom: "1rem" }}>{selectedProgram.name}</h2>

            {selectedProgram.userParams?.map((param: ProgramParameter) => (
              <div key={param.name} style={{ marginBottom: "1.2rem" }}>
                <label>{param.label}</label>
                <input
                  type={"number"}
                  onChange={(e) =>
                    {
                        console.log( e.target.value)
                        param.value = Number(e.target.value)
                        const newUserParams = selectedProgram.userParams.map(p => {
                            if(p.name == param.name){
                                return {...param, value: Number(e.target.value)}
                            }
                            return p;
                        })
                        setSelectedProgram(prev => ({...prev, userParams: newUserParams }))

                    }                                        
                  }
                  value={param.value}
                  style={{
                    width: "100%",
                    padding: "0.6rem",
                    borderRadius: "10px",
                    marginTop: "0.4rem",
                  }}
                />
              </div>
            ))}

            <Row justifyContent="space-between">
              <Button onClick={() => setShowModal(false)}>Abbrechen</Button>
              <Button onClick={confirmUserParams}>Start</Button>
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgramOverview;
