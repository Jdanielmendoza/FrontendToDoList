import "./OptionsSounds.css";
import { getSounds } from "../utilsPomodoro";

const OptionsSounds = ({
  showOptions,
  setSoundSelected,
  indexSoundSelected,
}) => {
  const hidePanelOptions = () => {
    showOptions(false);
  };

  return (
    <div className="containerShowOptionsSounds">
      <h1 className="titlePanelContainerOptions">Sonido de fondo</h1>
      <ul className="ulContainerSounds">
        {getSounds.map((title,index)=>{
          return (
            <li
              className="listOptions"
              onClick={() => {
                setSoundSelected(index);
              }}
              key={index}
            >
              <p className="titlePanelSound">{title}</p>
              <div className={`radioSound ${indexSoundSelected==index?"radioSoundChecked":""} `} ></div>
            </li>
          );
        })}
      </ul>
      <input
        type="button"
        value="Seleccionar"
        onClick={hidePanelOptions}
        className="buttonSelectedSound"
      />
    </div>
  );
};

export default OptionsSounds;
