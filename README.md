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
5. `GET /place/major-region` : 따로 parameter가 없으며, 각 권역에 해당하는 시군구에 대한 정보를 확인할 수 있음, main 페이지의 8 권역 UI 를 보여준다. 해당 API를 통해 8권역에 대한 시군구의 정보를 알 수 있다. 이는 시군구의 요소마다의 id와 areaId 필드로 나뉜다. 여기에서 그냥 plain한 id가 추후에 쓰일 `sigunguIds`를 의미하고, `areaId`는 별개이다. 주의할 점은 areaId는 권역의 1 ~ 8과는 관련 없다.<br>
   해당 api는 장소 목록 페이지에서 권역에 해당하는 도시들을 죄다 가져오는 데에도 활용될 수 있다. 그냥 처음 api가 쓰일 때 전역 상태로 관리하여 추가적인 api 호출 없이 상태를 끌어다 쓰는 것이 퍼포먼스 측면에서도 더 좋을 것 같음
6. `GET /tour/places (고도화)` : main-area 만 쿼리 스트링으로 넘기면 권역만 설정된 top 장소 반환(**상세 목록 페이지에서 권역만 설정 됐을 때 활용**), area와 sigungu 쿼리 스트링을 넘기면 권역과 도시가 설정된 top 장소 반환(쉽게 말해 특정 시군구까지 선택했을 때에 활용됨)

## 상세 페이지로의 동작 설계

1. main 페이지를 통해 상세 페이지로 들어가기 : 8권역 중 하나를 눌러서 들어감 => `/tour/places?majorRegionId={majorRegionId}` api를 통해서 접근. 이땐 majorRegionId는 1 ~ 8에 해당함
2. 헤더의 "장소 목록"을 클릭하여 상세 페이지로 들어감 : 권역이 설정되지 않은 상태임. 전체 장소 중 top 20개를 보여줘야 함(`/tour/places?size=20`), 권역만 클릭하면 위의 `majorRegionId`를 이용한 api로 받아와야 함, 권역과 시군구가 선택되면 해당 시군구에 해당하는 `areaId`, `sigunguId`를 쿼리 스트링으로 넘겨 데이터를 받아와야 함

## 여행 계획 생성하기 페이지의 동작 설계

1. 처음 진입하면 기존의 생성 여행 계획 리스트들을 보여줌
2. `"새로 만들기"` 버튼을 누르면 모달 창이 생성됨. 모달 창 외부의 부분을 클릭하면 모달창은 사라지고, 여행 계획 생성 프로세스는 종료됨.
3. 모달 창에서 여행 계획의 이름을 입력 받을 수 있으며 날짜 선택 버튼을 통해 모달 UI 변경
4. 날짜는 최대 4박 5일이며 시작일과 종료일 둘중 하나라도 선택하지 않으면 완료하기 버튼은 **deactivate** 됨. 또한 시작일을 선택하면, 5일 이내의 날짜만 종료일로 선택할 수 있도록 만듦.
5. 완료하기 버튼을 누르면, 여행 계획 id를 가진 페이지로 넘겨짐

## 여행 계획 페이지의 동작 설계 -> `찬영님 작성 요망`

## 이슈 생성 사항

1. 현재 PlaceList 컴포넌트에서 장소 목록 페이지에 들어왔을 때 전체의 top 20개를 받아오고 있음. 하지만 이는 전역 상태와 연동되어야 함. 권역, 도시가 모두 선택되지 않았을 때에는 그렇게 진행되어야 하고 메인 페이지에서 특정 권역을 선택하여 들어온 경우, 장소 목록 페이지에서 권역과 도시를 선택했을 경우에는 이에 맞춰서 query string으로 조회를 하여 데이터를 받아와야 함
2. 현재 메인 페이지의 `MainRecommendedPlaceList` 컴포넌트에서 fetch하는 데이터 중 name이 모두 null 값으로 돌아와
