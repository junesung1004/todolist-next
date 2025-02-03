import { render, screen, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom"; // Jest 확장 matcher 사용
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
  test("버튼이 올바르게 렌더링되는지 확인", () => {
    render(<Button text="클릭" onClick={() => {}} buttonColor="blue" textColor="white" />);

    // 버튼이 렌더링되었는지 확인
    const buttonElement = screen.getByRole("button", { name: "클릭" });
    expect(buttonElement).toBeInTheDocument();
  });

  test("버튼 클릭 시 onClick 이벤트가 호출되는지 확인", () => {
    const handleClick = jest.fn(); // Mock 함수 생성
    render(<Button text="클릭" onClick={handleClick} buttonColor="blue" textColor="white" />);

    const buttonElement = screen.getByRole("button", { name: "클릭" });

    // 버튼 클릭 이벤트 실행
    fireEvent.click(buttonElement);

    // onClick 함수가 1번 호출되었는지 확인
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("버튼 색상과 텍스트 색상이 올바르게 적용되는지 확인", () => {
    render(<Button text="클릭" onClick={() => {}} buttonColor="blue" textColor="white" />);

    const buttonElement = screen.getByRole("button", { name: "클릭" });

    // 스타일 확인
    expect(buttonElement).toHaveStyle("background-color: blue");
    expect(buttonElement).toHaveStyle("color: white");
  });
});
