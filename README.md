# Frontend Readme.md

본 문서는 한이음 hat 팀의 `Here and There` 프로젝트 프론트엔드의 이해를 돕기 위해 작성되었습니다.

## 디렉터리 구분

1. `assets` : 이미지, json 데이터 같은 에셋
2. `components` : 재사용할 수 있는 UI 컴포넌트
3. `context` : `redux`나 `contextAPI` 같은 방식을 통한 전역 상태관리, tanstack query 등을 이용한 비동기 상태 관리 설정 및 관련 데이터
4. `hooks` : 중복되는 상태 로직을 **custom hook**으로 분리
5. `pages` : **React router**를 통해 `App.tsx` 파일에서 라우팅 될 때 바로 바로 사용될 페이지 컴포넌트 => `app.tsx` 만을 보고도 페이지의 구성을 한눈에 파악할 수 있도록 하기 위함
6. `styles` : css 관련 설정 -> `tailwind.config.js`, `postcss.config.js`에서 진행할 가능성이 높음
7. `types` : **typescript**를 이용해 프로젝트를 진행하는데, 필요한 type alias나 interface 등이 위치해 재활용성을 높임
8. `utils` : 기타 유용한 함수 자원
