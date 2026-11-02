"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { classes, site } from "@/content/site";
import { Arrow } from "./icons";

export function InquiryForm({
  type,
  program,
  enabled,
}: {
  type: "class" | "studio";
  program: string;
  enabled: boolean;
}) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState("");
  const [accepted, setAccepted] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || pending || accepted) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    setPending(true);
    setResult("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          program: type === "class" ? values.get("program") : "",
          name: values.get("name"),
          email: values.get("email"),
          message: values.get("message"),
          consent: values.get("consent") === "on",
          website: values.get("website") ?? "",
        }),
        signal: AbortSignal.timeout(20000),
      });
      const data = await response.json();
      if (response.status === 201 && data.accepted === true) {
        setAccepted(true);
        form.reset();
      }
      setResult(
        typeof data.message === "string"
          ? data.message
          : "전송 결과를 확인하지 못했습니다.",
      );
    } catch {
      setResult("전송 결과를 확인하지 못했습니다. 연결 상태를 확인해 주세요.");
    } finally {
      setPending(false);
    }
  }
  if (!enabled) return <section className="contact-form">
    <nav className="form-tabs" aria-label="문의 유형"><Link href="/apply?type=class" aria-current={type === "class" ? "page" : undefined}>클래스 문의</Link><Link href="/apply?type=studio" aria-current={type === "studio" ? "page" : undefined}>스튜디오 문의</Link></nav>
    <h2>이메일로 문의해 주세요</h2>
    <p>관심 있는 수업이나 의뢰 내용을 아래 주소로 보내주세요.</p>
    <p><a href={`mailto:${site.inquiryEmail}?subject=${encodeURIComponent(`[아더댄웍스] ${type === "class" ? "클래스" : "스튜디오"} 문의`)}`} className="button">메일 앱으로 문의하기 <Arrow diagonal /></a></p>
    <p>{site.inquiryEmail}</p>
    <p>메일 앱이 열리지 않으면 위 주소를 복사해 Gmail 등에서 보내주세요. 메일 작성창에서 ‘보내기’를 눌러야 전송됩니다.</p>
    <p>홈페이지에서 바로 접수하는 양식은 연결 중입니다.</p>
  </section>;
  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-describedby={!enabled ? "inquiry-unavailable" : undefined}
    >
      <nav className="form-tabs" aria-label="문의 유형">
        <Link
          href="/apply?type=class"
          aria-current={type === "class" ? "page" : undefined}
        >
          클래스 문의
        </Link>
        <Link
          href="/apply?type=studio"
          aria-current={type === "studio" ? "page" : undefined}
        >
          스튜디오 문의
        </Link>
      </nav>
      {!enabled && (
        <div className="notice" id="inquiry-unavailable">
          <strong>온라인 문의 접수를 준비 중입니다.</strong>수신처와 개인정보
          안내를 확정한 뒤 양식을 활성화합니다. 현재 이 양식으로 정보를
          수집하거나 전송하지 않습니다. 공식 Instagram에서 소식을 확인해 주세요.
        </div>
      )}
      <fieldset
        className="form-fields"
        disabled={!enabled || pending || accepted}
      >
        {type === "class" && (
          <label className="field">
            관심 있는 클래스 <span className="sr-only">(필수)</span>
            <select name="program" required defaultValue={program}>
              <option value="">클래스를 선택해 주세요</option>
              {classes.map((item) => (
                <option value={item.slug} key={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
        )}
        <div className="form-row">
          <label className="field">
            이름 (필수)
            <input name="name" autoComplete="name" required maxLength={80} />
          </label>
          <label className="field">
            이메일 (필수)
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label className="field">
          {type === "class" ? "궁금한 내용" : "함께 만들고 싶은 이야기"} (필수)
          <textarea name="message" required minLength={10} maxLength={4000} />
          <small>
            10~4,000자. 민감한 개인정보나 결제 정보는 작성하지 마세요.
          </small>
        </label>
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
        <label className="privacy-check">
          <input name="consent" type="checkbox" required />
          <span>
            문의 처리에 필요한 개인정보 수집·이용에 동의합니다. (필수)
            <br />
            <Link href="/legal">
              개인정보 처리방침{!enabled ? " 초안" : ""} 확인
            </Link>
          </span>
        </label>
      </fieldset>
      <button
        className="button"
        type="submit"
        disabled={!enabled || pending || accepted}
      >
        {!enabled
          ? "온라인 접수 준비 중"
          : pending
            ? "전송 확인 중…"
            : accepted
              ? "수신 서비스 전달 확인"
              : "문의 전송하기"}
        <Arrow diagonal />
      </button>
      <div aria-live="polite" aria-atomic="true">
        {result && (
          <p className="form-result" role="status">
            {result}
          </p>
        )}
      </div>
    </form>
  );
}
