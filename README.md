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

## API usages

1. `GET /tour/places` : main 페이지의 RecommendPlace 컴포넌트를 8개를 보여주는 데에 사용됨

2. `GET /tour/places/{id}` : 특정 장소의 상세 페이지에 들어갔을 때 해당 장소의 이미지, 전화번호, 운영 시각들을 알 수 있음
3. websocket `/chat/place/{placeid}` : 특정 장소의 상세 페이지를 위한 websocket 연결
4. `GET /chat/chats?placeId=${placeId}&pageSize=30` : 처음 채팅방에 입장했을 때 30개의 chat history를 불러오기 위한 설정
5. `GET /place/main-area` :
6. `GET /tour/places (고도화)` : main-area 만 쿼리 스트링으로 넘기면 권역만 설정된 top 장소 반환, area와 sigungu 쿼리 스트링을 넘기면 권역과 도시가 설정된 top 장소 반환

## 이슈 생성 사항

1. 현재 PlaceList와 RecommendedPlace 컴포넌트에서 둘다 PlaceComponent라는 것을 import 하여 쓰고 있는데 이름이 중복되어서 코드를 보는 데에 다소 불편함. 네이밍 수정 필요할 것 같음
2. 현재 PlaceList 컴포넌트에서 장소 목록 페이지에 들어왔을 때 전체의 top 20개를 받아오고 있음. 하지만 이는 전역 상태와 연동되어야 함. 권역, 도시가 모두 선택되지 않았을 때에는 그렇게 진행되어야 하고 메인 페이지에서 특정 권역을 선택하여 들어온 경우, 장소 목록 페이지에서 권역과 도시를 선택했을 경우에는 이에 맞춰서 query string으로 조회를 하여 데이터를 받아와야 함
