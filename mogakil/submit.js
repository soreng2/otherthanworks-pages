/*
  공용 제출 로직 — 어떤 페이지든 이 함수 하나로 구글 시트에 데이터를 쌓는다.
  새 페이지를 만들 때 이 파일은 그대로 재사용하고, 각 페이지에서
  submitToSheet(sheetName, dataObject)만 호출하면 된다.

  sheetName: 이 데이터가 쌓일 시트 탭 이름 (없으면 자동 생성됨)
             예: "AI파일럿_사전설문", "수업자료_피드백"
  dataObject: 그대로 컬럼이 되는 평범한 객체. 배열 값은 쉼표로 join되어 저장됨.
*/

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxHs1r8kOkORFSHBQlp9M_B0IKE4ff-GPDJLk-zfKraL0T4PL4kjInJOjj6xmkT-WOM/exec";

async function submitToSheet(sheetName, dataObject) {
  const payload = Object.assign({ _sheet: sheetName }, dataObject);

  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors", // Apps Script 응답을 읽지는 못하지만, 전송 자체는 정상 동작함
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });
  // no-cors 모드에서는 실제 성공 여부를 응답으로 확인할 수 없어,
  // 네트워크 요청 자체가 끝까지 간 것을 성공으로 간주한다.
}
