// Lưu sổ tay để mở được khi không có mạng. Đổi PHIEN_BAN mỗi lần cập nhật nội dung.
const PHIEN_BAN = "so-tay-lms-2026-11-03";
const TEP = ["./", "index.html", "app.js", "manifest.webmanifest", "icon.svg",
  "anh/lop-1-thong-tin.jpg", "anh/sv-1-them-moi.jpg", "anh/sv-2-nhap-excel.jpg", "anh/lop-2-sao-chep.jpg",
  "anh/nd-1-chon-loai.jpg", "anh/nd-2-tao-nhanh-tuan.jpg", "anh/bt-1-cai-dat.jpg", "anh/diem-1-he-so.jpg",
  "anh/diem-2-tong-hop.jpg", "anh/thao-luan-1-chu-de.jpg", "anh/thao-luan-2-dang-bai.jpg", "anh/thao-luan-3-bao-cao.jpg",
  "anh/cham-1-mo-bai-tap.jpg", "anh/cham-2-loc-bai-nop.jpg", "anh/cham-3-go-diem.jpg",
  "anh/tien-do-1-nhat-ky.jpg", "anh/tien-do-2-ket-qua.jpg"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(PHIEN_BAN).then((c) => c.addAll(TEP))); self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== PHIEN_BAN).map((k) => caches.delete(k)))));
  self.clients.claim();
});
// Mạng trước (luôn có bản mới nhất), mất mạng thì lấy bản đã lưu.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => {
    const sao = r.clone(); caches.open(PHIEN_BAN).then((c) => c.put(e.request, sao)); return r;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
