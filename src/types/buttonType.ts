export default interface ButtonProps {
  text : string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>)=>void
  buttonColor: string,
  textColor: string
}


