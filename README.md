<!-- PROJECT LOGO -->
<br />
<div align="center">
<a href="https://github.com/junesung1004/todolist-next">
    <img src="https://github.com/junesung1004/todolist-next/blob/main/public/images/Size%3DLarge.svg" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">do it !</h3>

  <p align="center">
    간단하게 오늘 할 일을 추가 후 디테일 페이지에서 <br />사진과 메모로 기록을 해놓을 수 있는 반응형 플랫폼 웹사이트
    <br />
    <br />
    <a href="https://todogogo.netlify.app">데모 사이트</a>
  </p>
</div>

## 프로젝트 소개

**◼️ 목적**

하루 일과를 보내기에 앞서 할 일을 기록해두는 플랫폼으로써 나의 일과를 파악할 수 있고, 시간이 지나 무슨일을 했는지 알 수 있는 기회를 제공합니다

**◼️ 목표**

- 할 일을 추가 후 목록의 왼쪽 아이콘을 누르면 완료 목록으로 변경되어 해야 할 일과 완료된 일을 구분할 수 있습니다다
- 디테일 페이지에는 간단한 메모와 사진을 올릴 수 있으며 수정 또 한 가능합니다

**◼️ 페르소나**

 <div align="center">
	  <img src="https://raw.githubusercontent.com/junesung1004/todolist-next/refs/heads/main/public/images/profile.webp" />
	 <p>💡박준성: "오늘 나의 할 일을 저장 후 계획적으로 움직여보자!"</p>
 </div>

## 기능 목록

**요구사항 관련 기능 및 컴포넌트입니다**

<details><summary>1. 공통 헤더 컴포넌트</summary>

![헤더](https://github.com/junesung1004/todolist-next/blob/main/public/readme/header.png)

- 로고를 클릭하여 메인 페이지로 이동한다

</details>

<details><summary>2. 서치바 컴포넌트</summary>

![서치바 컴포넌트](https://github.com/junesung1004/todolist-next/blob/main/public/readme/searchbar.png)

- 할 일 텍스트를 추가 후 마우스로 추가하기 버튼을 클릭하면 TO DO 목록으로 넘어간다
- 할 일 텍스트를 추가 후 키보드 "Enter"키를 누르면 TO DO 목록으로 넘어간다

</details>

<details><summary>3. 투두리스트 컴포넌트</summary>

![투두리스트 컴포넌트](https://github.com/junesung1004/todolist-next/blob/main/public/readme/todolist.png)

- 할 일 추가 하면 TO DO 리스트 목록에 추가된다
- 할 일 목록 아이템중 왼쪽 아이콘을 누르면 DONE 리스트로 이동되어 완료 상태로 변경한다
- 완료된 목록 아이템중 왼쪽 아이콘을 누르면 TO DO 리스트로 이동되어 진행중 상태로 변경한다

</details>

<details><summary>4. 메인 화면</summary>

![메인 페이지](https://github.com/junesung1004/todolist-next/blob/main/public/readme/main.png)

- do it 메인 화면 UI입니다다

</details>

<details><summary>5. 디테일 페이지</summary>

![디테일 페이지](https://github.com/junesung1004/todolist-next/blob/main/public/readme/detail.png)

- 디테일 페이지에서 이미지파일, 메모를 작성하여 정보를 업데이트 할 수 있다.
- 기존에 등록했던 정보가 있으면 수정하여 업데이트 할 수 있다.
- 삭제하기 누르면 해당 id로 조회하여 해당 아이템의 정보를 삭제 할 수 있다.

</details>

<br />

## 기술 스택

#### FE

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

#### INFRA

[![Vercel]][Vercel-url]

<br />

## 구성원 역할

| 담당자 | 업무                   | 비고                                   |
| ------ | ---------------------- | -------------------------------------- |
| 박준성 | UI화면 설계 및 API연동 | API 연동 후 테스트</br> 배포 담당 개발 |

<br />

</br>

## 협업 도구

- Notion : 과제 내용, 사용 기술 스택, 참고 문서
- GitHub : Code Repository
- Swagger API : API 테스트 진행

<br />

## 컨벤션

### 코드

| 코드   | 설명                                               |
| ------ | -------------------------------------------------- |
| 변수   | 카멜 케이스(camelCase)                             |
| 함수   | 파스칼 케이스(PascalCase)                          |
| 상수   | 대문자                                             |
| 파일   | 파스칼 케이스(PascalCase) & 카멜 케이스(camelCase) |
| 스타일 | 케밥 케이스(kebab-case)                            |

### 커밋

| 커밋     | 설명                                                        |
| -------- | ----------------------------------------------------------- |
| feat     | 새로운 기능 추가                                            |
| fix      | 오류 수정                                                   |
| style    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, css 작업 |
| refactor | 코드 로직 수정 (리팩토링)                                   |
| docs     | 문서 수정                                                   |
| test     | 테스트 코드 추가                                            |
| chore    | 빌드 업무 수정, 패키지 매니저 수정 (module 추가 시)         |

<br />

<p>무단 사용 및 도용, 복제 및 배포를 금합니다.</p>
<span>Copyright 2024 코드잇 심화 과제전형. All rights reserved.</span>
