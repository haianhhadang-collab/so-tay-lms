# Sổ tay LMS cho giảng viên

Hướng dẫn thao tác hệ thống học trực tuyến **LMS VNU** dành cho giảng viên Trường ĐHKHXH&NV (HK1 2026-2027): từng bước gọi đúng tên
nút trên màn hình, có ảnh minh hoạ, kèm sự cố thường gặp, hỏi đáp và các nút cần cẩn thận.

Biên soạn: Đoàn Việt Hải (hỗ trợ LMS). Ảnh chụp ở chế độ chỉ xem trên một lớp thật, họ tên và mã sinh viên đã được che.

## Dùng

- Mở trang GitHub Pages của repo này (Settings → Pages).
- Gõ vào ô **Tìm trong sổ tay** (phím `/`), gõ không dấu cũng được: "nhap diem", "excel", "thao luan".
- Bấm vào ảnh để phóng to.
- Trên điện thoại: "Thêm vào màn hình chính" để mở như một ứng dụng; đã mở một lần thì xem được cả khi không có mạng.

## Cấu trúc

- `index.html` - nội dung sổ tay (một trang).
- `app.js` - tìm kiếm không dấu, phóng to ảnh, nút lên đầu trang, đăng ký chạy offline.
- `sw.js` - lưu trang và ảnh để xem offline. **Sửa nội dung thì đổi `PHIEN_BAN`** trong tệp này.
- `anh/` - 17 ảnh minh hoạ.

Không cần cài đặt hay build: là trang tĩnh, mở `index.html` hoặc chạy `python -m http.server` trong thư mục này.
