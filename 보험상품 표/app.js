// app.js
const clickSound = new Audio("./click.mp3");
clickSound.preload = "auto";
clickSound.volume = 0.35; // 0.25~0.45 추천

function playClick() {
  try {
    clickSound.currentTime = 0;
    return clickSound.play();
  } catch {
    return Promise.reject();
  }
}

document.addEventListener("click", async (e) => {
  const link = e.target.closest("a[href]");
  const btn = e.target.closest("button");

  // a 또는 button이 아니면 무시
  if (!link && !btn) return;

  // 클릭 눌림 효과(선택)
  const target = link || btn;
  target.classList.add("clicked");
  setTimeout(() => target.classList.remove("clicked"), 140);

  // 링크면: 이동을 잠깐 멈추고 소리 먼저
  if (link) {
    const href = link.getAttribute("href");
    // 새 탭/외부/해시 이동은 그대로 두고 싶으면 예외 처리
    if (!href || href.startsWith("#") || link.target === "_blank") return;

    e.preventDefault();

    await playClick().catch(() => {});
    setTimeout(() => {
      window.location.href = href;
    }, 120); // 100~160ms 사이 취향
    return;
  }

  // 버튼이면: 그냥 소리만
  playClick().catch(() => {});
});
