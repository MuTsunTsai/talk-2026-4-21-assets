import axios from "axios";

// 所有 API 請求共用的 axios 實例；baseURL 指向 /api，
// 日後無論用 MSW、dev middleware 或 proxy 來 mock 都能透明接上
export const client = axios.create({
	baseURL: "/api",
	timeout: 10000,
});
