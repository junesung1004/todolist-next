import ButtonProps from "../../types/buttonType";

export default function Button({ text, onClick, buttonColor, textColor }: ButtonProps) {
  return (
    <button
      className={`py-2 px-5 bg-[#CBD5E1] border-[2px] border-black rounded-full shadow-[2px_4px_#000] hover:text-white hover:font-bold transition-all duration-300`}
      onClick={onClick}
      style={{
        backgroundColor: buttonColor,
        color: textColor,
      }}
    >
      {text}
    </button>
  );
}
