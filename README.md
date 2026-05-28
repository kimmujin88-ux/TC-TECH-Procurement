# TC TECH 구매품 발주·재고 관리 시스템

TEREX GENIE / HD건설기계 구매품 수급 운영 계획, 발주, 재고 관리를 위한 웹 시스템입니다.

## 기술 스택

- **Frontend**: HTML / CSS / Vanilla JS
- **Backend**: Node.js + Express
- **Database**: Supabase (PostgreSQL)

## 주요 기능

- 5~8월 수급 운영 계획 (모델별 제작대수 입력 → 필요수량·기말재고 자동 계산)
- 부족 발생 품목 자동 감지 및 발주 우선순위
- 발주서 생성 및 발주 이력 관리
- ERP vs 실사재고 불일치 분석
- ABC 분석 (연간 금액 기준 자동 분류)
- 엑셀 가져오기 / 내보내기

## 설치 방법

```bash
npm install
```

## 환경변수 설정

`.env` 파일을 루트에 생성 후 아래 내용 입력:

```
SUPABASE_URL=https://xxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
PORT=3000
```

## 서버 실행

```bash
npm start        # 운영
npm run dev      # 개발 (nodemon 자동 재시작)
```
