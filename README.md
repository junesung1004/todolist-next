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
- 디테일 페이지에는 간단한 메모와 사진을 올릴 수 있으며 수정 또 한 가능하다.

**◼️ 페르소나**

 <div align="center">
	  <img src="https://raw.githubusercontent.com/junesung1004/todolist-next/refs/heads/main/public/images/profile.webp" />
	 <p>💡박준성: "오늘 나의 할 일을 저장 후 계획적으로 움직여보자!"</p>
 </div>

## 기능 목록

**MBTI 유형별 분석, 통계, 담벼락 등 MBTI 포털 사이트의 핵심 기능을 구현합니다.**

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

<details><summary>4. 메인인</summary>

![메인 페이지](https://github.com/junesung1004/todolist-next/blob/main/public/readme/main.png)

- MBTI 유형 검사 페이지입니다.
- 16개 문항으로 이루어져 있으며, 1문항당 2개의 선택지가 있습니다.
- 선택지(TestCard)
- 프로그레스 바

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

[![Next.js]][React-url] [![TypeScript]][TypeScript-url] [![TailwindCSS]][TailwindCSS-url]

#### INFRA

[![Vercel]][Vercel-url]

<br />

## 구성원 역할

| 담당자 | 업무                   | 비고                                   |
| ------ | ---------------------- | -------------------------------------- |
| 박준성 | UI화면 설계 및 API연동 | API 연동 후 테스트</br> 배포 담당 개발 |

<br />

## 스키마 명세서

<details><summary>테스트 스키마</summary>

```js
// 어떤 테스트인지? 사실 테스트는 1개만 만들 것이지만, 나중에 확장성을 위해 만든다.
const TestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
```

</details>

<details><summary>문항 스키마</summary>

```js
// 어떤 테스트에 대한 문항인지. 사실 테스트는 1개만 만들 것이지만,
// 나중에 확장성을 위해 이렇게 정의한다.
const QuestionSchema = new Schema({
  // 문항 번호
  idx: {
    type: Number,
    required: true,
  },
  // 문항 질문(주제)
  subject: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  answer: {
		type: {
      E: { type: String, required: false },
      I: { type: String, required: false },
      N: { type: String, required: false },
      S: { type: String, required: false },
      T: { type: String, required: false },
      F: { type: String, required: false },
      J: { type: String, required: false },
      P: { type: String, required: false },
    },
    required: true,
  }
  // 어떤 mbti 판별에 대한 문항인지의 타입
  // E, I, N, S, F, T, P, J
  mbtiType: {
    type: String,
    required: true,
  },
  // mbtiType에 대한 답변
  typeAnswer: {
	  type: String,
    required: true
  },
  // 중요도
  proportion: {
		type: Number,
    required: true
  }
});
```

</details>

<details><summary>게시글 스키마 (MBTI 별로 데이터 저장)</summary>

```js
const BoardSchema = new Schema({
    // 사용자 uuid (일단 보류.)
    uuid: {
      type: String,
      required: false,
    },
    // mbti 카테고리 (16개의 mbti)
    category: {
      type: String,
      required: true,
    },
    // 게시글 제목
    title: {
      type: String,
      required: true
    },
    // 게시글 내용
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // 공감
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'boards',
    timestamps: { currentTime: () => new Date(new Date().getTime() + 1000 * 60 * 60 * 9) },
  }
});
```

</details>

<details><summary>통계 스키마 (MBTI 결과에 대해 선택 결과 저장)</summary>

```js
const StatisticSchema = new Schema({
  // 특정 mbti 유형
  mbtiType: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  totalResponse: {
    type: Number,
    required: true,
    default: 0,
  },
  mbtiData: [
    {
      idx: {
        type: Number,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      answer: {
        E: { type: String, required: false },
        I: { type: String, required: false },
        N: { type: String, required: false },
        S: { type: String, required: false },
        T: { type: String, required: false },
        F: { type: String, required: false },
        J: { type: String, required: false },
        P: { type: String, required: false },
      },
      selection: {
        E: { type: Number, required: false },
        I: { type: Number, required: false },
        N: { type: Number, required: false },
        S: { type: Number, required: false },
        T: { type: Number, required: false },
        F: { type: Number, required: false },
        J: { type: Number, required: false },
        P: { type: Number, required: false },
      },
    },
  ],
});
```

</details>

<details><summary>MBTI 스키마 (16개 MBTI에 대한 설명, 잘 맞는 MBTI 안 맞는 MBTI)</summary>

```js
const MBTISchema = new Schema({
	//
  // 16개 mbti 통계 데이터
  name: {
		  type: String,
      required: true
  },
  // 전체 mbti 비율 통계를 위한 데이터
  count: {
    type: Number,
    required: true,
    default: 0,
  },
  // 해당 mbti에 대한 특징 요약
  summary: {
    type: String,
    required: true,
  },
  // 해당 mbti에 대한 키워드
  tag: {
		type: Array,
    required: true
  },
	content: {
     // 해당 mbti에 대한 설명
     description: {
		     type: String,
         required: true
     }
     // 잘 맞는 mbti
	   good: {
       // 잘 맞는 mbti 유형 1개
		   name: {
					type: String,
          required: true
	     },
       // 이에 대한 설명 (왜 잘맞나요?)
	     description: {
			    type: String,
          required: true
	     }
	  },
	  bad : {
      // 잘 안맞는 mbti 유형 1개
			name: {
				type: String,
        required: true
	    },
      // 이에 대한 설명 (왜 잘 안맞나요?)
	    description: {
				type: String,
        required: true
	    }
	  },
	},
});
```

</details>

</br>

## 협업 도구

- Notion : 스터디 기간, 사용 기술 스택, 참고 문서, 업무 진행 사항, 회의록
- Discord : 음성 채팅방 활용 의견 제시및 문제 해결
- GitHub : Code Repository
- Postman Teams : API 테스트 진행

<br />

## 컨벤션

### 코드

| 코드         | 설명                      |
| ------------ | ------------------------- |
| 변수         | 카멜 케이스(camelCase)    |
| 변수(스키마) | 파스칼 케이스(PascalCase) |
| 함수         | 카멜 케이스(camelCase)    |
| 상수         | 대문자                    |
| 파일         | 파스칼 케이스(PascalCase) |
| 스타일       | 케밥 케이스(kebab-case)   |

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

## 브랜치 전략

    main - develop - feature/A

<br />

## 기여 방법

1. 프로젝트를 Fork합니다.
2. 새로운 기능 브랜치를 만듭니다. (`git checkout -b feature/AmazingFeature`)
3. 변경한 코드를 커밋합니다. (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치를 Push합니다. (`git push origin feature/AmazingFeature`)
5. 새로운 Pull Request를 생성합니다.

---

<br />

<p>무단 사용 및 도용, 복제 및 배포를 금합니다.</p>
<span>Copyright 2023 엘리스 2차 스터디 [너T야?]팀. All rights reserved.</span>

[contributors-shield]: https://img.shields.io/github/contributors/are-you-T/client.svg?style=for-the-badge
[contributors-url]: https://github.com/are-you-T/client/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/are-you-T/client.svg?style=for-the-badge
[forks-url]: https://github.com/are-you-T/client/network/members
[stars-shield]: https://img.shields.io/github/stars/are-you-T/client.svg?style=for-the-badge
[stars-url]: https://github.com/are-you-T/client/stargazers
[issues-shield]: https://img.shields.io/github/issues/are-you-T/client.svg?style=for-the-badge
[issues-url]: https://github.com/are-you-T/client/issues
[license-shield]: https://img.shields.io/github/license/are-you-T/client.svg?style=for-the-badge
[license-url]: https://github.com/are-you-T/client/blob/main/LICENSE.txt
[React.js]: https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=20232A
[React-url]: https://reactjs.org/
[TypeScript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org
[TailwindCSS]: https://img.shields.io/badge/tailwind%20css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com
[DaisyUI]: https://img.shields.io/badge/daisy%20ui-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white
[DaisyUI-url]: https://daisyui.com
[TSC]: https://img.shields.io/badge/tailwind%20styled%20component-06B6D4?style=for-the-badge
[TSC-url]: https://github.com/MathiasGilson/tailwind-styled-component
[ApexCharts]: https://img.shields.io/badge/apexcharts.js-008ffb?style=for-the-badge
[ApexCharts-url]: https://apexcharts.com
[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en
[Express.js]: https://img.shields.io/badge/express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com
[MongoDB]: https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/ko-kr
[Vercel]: https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com
[Cloudtype]: https://img.shields.io/badge/Cloudtype-000000?style=for-the-badge
[Cloudtype-url]: https://cloudtype.io
