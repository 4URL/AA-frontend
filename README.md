# AA-frontend
### clone후 프로젝트 시작하기
- git clone이 완성되면 aa-frontend 폴더로 이동 후 npm 설치
```
cd aa-frontend
npm install
```
- 설치가 완료되면 시작
```
npm start
```

### branch 생성 주의사항
- nickname/feature/"기능 혹은 페이지 이름으로 브랜치 이름 지정"

### git commit시 주의사항
#### commit전
- eslint와 prettier 적용 후 commit 할 것
```
npm run format // prettier 적용
npm run lint // eslint 적용
```

#### commit message
- 새로운 기능을 추가 했을 시 commit -m 'ADD 추가한 기능에 대한 간단한 설명'
- 이미 있는 기능을 수정 했을 시 commit -m 'FIX 수정한 기능에 대한 간단한 설명'
- 발생한 오류를 수정 했을 시 commit -m 'BUG 수정한 오류에 대한 간단한 설명'