import ButtonProps from "../../types/buttonType"

export default function Button ({text, onClick} : ButtonProps) {
  return (
    <button
    className="py-2 px-5 bg-[#CBD5E1] border border-[2px] border-black rounded-full shadow-lg shadow-[2px_4px_#000] hover:text-white hover:font-bold transition-all duration-300 "
    onClick={onClick}
    >
      <span className="sm:hidden">+</span>
      <span className="hidden sm:inline">{text}</span>
    </button>
  )
}