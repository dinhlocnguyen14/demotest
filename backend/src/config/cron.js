import cron from "cron";
import https from "https";

const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;

// GIẢI THÍCH CRON JOB:

// Cron job là các tác vụ được lên lịch chạy tự động theo khoảng thời gian cố định
// Ở đây mục tiêu là gửi 1 request GET mỗi 14 phút để giữ cho API không bị "sleep" trên Render

// CẤU TRÚC CRON (5 trường):
// PHÚT - GIỜ - NGÀY TRONG THÁNG - THÁNG - NGÀY TRONG TUẦN

// VÍ DỤ:

// */14 * * * *  -> Chạy mỗi 14 phút
// 0 * * * *     -> Chạy mỗi giờ (phút thứ 0)
// 0 0 * * 0     -> Chạy vào 0h mỗi Chủ nhật
// 30 3 15 * *   -> Chạy lúc 3h30 sáng, ngày 15 hàng tháng
// 0 0 1 1 *     -> Chạy lúc 0h ngày 1 tháng 1
