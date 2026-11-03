// Sổ tay LMS cho giảng viên - tìm kiếm không dấu, phóng to ảnh, lên đầu trang, chạy offline.
(() => {
  const boDau = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  const main = document.querySelector("main");
  const o = document.getElementById("tim");
  const kq = document.getElementById("tim-kq");
  const xoa = document.getElementById("tim-xoa");
  const sections = [...main.querySelectorAll(":scope > section")];
  // Đơn vị tìm: dòng liệt kê, đoạn văn, hỏi đáp, sự cố, dòng bảng, ảnh, khối lưu ý.
  const DON_VI = ":scope li, :scope > p, :scope details, :scope .issue, :scope tbody tr, :scope figure, :scope .callout, :scope .path, :scope .top5 > a";
  const khoi = sections.map((s) => ({ s, h: s.querySelector("h2"), dv: [...s.querySelectorAll(DON_VI)].filter((e) => !e.parentElement.closest("li, details, .issue, figure, .callout")) }));
  for (const k of khoi) for (const e of k.dv) e.dataset.chu = boDau(e.textContent);
  for (const k of khoi) k.chuH = boDau(k.h ? k.h.textContent : "");

  const loc = () => {
    const q = boDau(o.value.trim());
    xoa.hidden = !q;
    let dem = 0;
    for (const k of khoi) {
      const tuKhoa = q.split(/\s+/).filter(Boolean);
      const khopTieuDe = tuKhoa.length && tuKhoa.every((t) => k.chuH.includes(t));
      let co = 0;
      for (const e of k.dv) {
        const ok = !q || khopTieuDe || tuKhoa.every((t) => e.dataset.chu.includes(t));
        e.classList.toggle("an", !ok);
        if (ok) co++;
        if (e.tagName === "DETAILS") e.open = !!q && ok;
      }
      // Ẩn h3, khối ảnh, bảng rỗng khi đang lọc.
      k.s.querySelectorAll("h3, .figs, .tbl, ol, ul, dl").forEach((x) => {
        if (!q) { x.classList.remove("an"); return; }
        const con = x.querySelectorAll("li, figure, tbody tr, .issue");
        if (x.tagName === "H3") return;
        if (con.length) x.classList.toggle("an", [...con].every((c) => c.classList.contains("an")));
      });
      k.s.classList.toggle("an", !!q && co === 0);
      if (q && co) dem += co;
    }
    document.body.classList.toggle("dang-tim", !!q);
    kq.textContent = q ? (dem ? `${dem} mục khớp` : "Không thấy mục nào. Thử từ khác, vd \"điểm\", \"excel\", \"thảo luận\".") : "";
  };
  o.addEventListener("input", loc);
  xoa.addEventListener("click", () => { o.value = ""; loc(); o.focus(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== o) { e.preventDefault(); o.focus(); }
    if (e.key === "Escape" && document.activeElement === o) { o.value = ""; loc(); }
  });
  // Bấm mục lục khi đang tìm: xoá bộ lọc để thấy cả mục.
  document.querySelectorAll('nav.toc a, .top5 a, .issue a').forEach((a) => a.addEventListener("click", () => { if (o.value) { o.value = ""; loc(); } }));

  // Phóng to ảnh.
  const hop = document.getElementById("phong-to");
  const anhTo = hop.querySelector("img");
  const chuTo = hop.querySelector("p");
  main.addEventListener("click", (e) => {
    const img = e.target.closest("figure img");
    if (!img) return;
    anhTo.src = img.src; anhTo.alt = img.alt;
    chuTo.textContent = img.closest("figure").querySelector("figcaption")?.textContent || "";
    hop.showModal();
  });
  hop.addEventListener("click", () => hop.close());

  // Lên đầu trang.
  const len = document.getElementById("len-dau");
  const capNhat = () => { len.hidden = window.scrollY < 600; };
  window.addEventListener("scroll", capNhat, { passive: true });
  len.addEventListener("click", () => window.scrollTo({ top: 0 }));
  capNhat();

  if ("serviceWorker" in navigator && location.protocol === "https:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
