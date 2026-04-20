// 靜態假資料——僅用於演示 UI，不連接任何後端。

export type BeanLot = {
	id: string;
	name: string;
	originKey: string;
	originFlag: string;
	variety: string;
	processKey: "washed" | "natural" | "honey" | "anaerobic" | "wetHulled";
	altitudeMasl: number;
	harvestYear: number;
	stockKg: number;
	exportCountryKey: string;
	exportCountryFlag: string;
	importer: string;
	arrivalDate: string;
	flavorNotes: string[];
};

export const beanLots: BeanLot[] = [
	{
		id: "lot-001",
		name: "Yirgacheffe Kochere G1",
		originKey: "ethiopia",
		originFlag: "🇪🇹",
		variety: "Heirloom",
		processKey: "washed",
		altitudeMasl: 2000,
		harvestYear: 2025,
		stockKg: 42,
		exportCountryKey: "ethiopia",
		exportCountryFlag: "🇪🇹",
		importer: "Trabocca",
		arrivalDate: "2026-01-14",
		flavorNotes: ["floral", "fruity"],
	},
	{
		id: "lot-002",
		name: "Hacienda La Esmeralda Gesha",
		originKey: "panama",
		originFlag: "🇵🇦",
		variety: "Gesha",
		processKey: "natural",
		altitudeMasl: 1700,
		harvestYear: 2025,
		stockKg: 8,
		exportCountryKey: "panama",
		exportCountryFlag: "🇵🇦",
		importer: "Ninety Plus",
		arrivalDate: "2026-02-03",
		flavorNotes: ["floral", "fruity"],
	},
	{
		id: "lot-003",
		name: "Finca El Paraiso Double Anaerobic",
		originKey: "colombia",
		originFlag: "🇨🇴",
		variety: "Castillo",
		processKey: "anaerobic",
		altitudeMasl: 1900,
		harvestYear: 2025,
		stockKg: 15,
		exportCountryKey: "colombia",
		exportCountryFlag: "🇨🇴",
		importer: "Osito Coffee",
		arrivalDate: "2026-01-28",
		flavorNotes: ["fruity", "spicy"],
	},
	{
		id: "lot-004",
		name: "Kiambu AA",
		originKey: "kenya",
		originFlag: "🇰🇪",
		variety: "SL28",
		processKey: "washed",
		altitudeMasl: 1750,
		harvestYear: 2024,
		stockKg: 20,
		exportCountryKey: "kenya",
		exportCountryFlag: "🇰🇪",
		importer: "Royal Coffee",
		arrivalDate: "2025-12-10",
		flavorNotes: ["fruity"],
	},
	{
		id: "lot-005",
		name: "Sumatra Lintong",
		originKey: "indonesia",
		originFlag: "🇮🇩",
		variety: "Typica",
		processKey: "wetHulled",
		altitudeMasl: 1400,
		harvestYear: 2024,
		stockKg: 30,
		exportCountryKey: "indonesia",
		exportCountryFlag: "🇮🇩",
		importer: "Cafe Imports",
		arrivalDate: "2025-11-22",
		flavorNotes: ["earthy", "chocolate"],
	},
];

export type RoastEvent = {
	timeSec: number;
	labelKey: "turningPoint" | "firstCrack" | "secondCrack" | "drop";
	tempC: number;
};

export type RoastSession = {
	id: string;
	beanLotId: string;
	beanLotName: string;
	roastedOn: string;
	chargeTempC: number;
	dropTempC: number;
	totalTimeSec: number;
	developmentTimeSec: number;
	developmentRatio: number;
	rorCPerMin: number;
	events: RoastEvent[];
	timelineStages: { key: "charge" | "drying" | "maillard" | "development" | "finish"; fromSec: number; toSec: number }[];
};

export const roastSessions: RoastSession[] = [
	{
		id: "roast-001",
		beanLotId: "lot-001",
		beanLotName: "Yirgacheffe Kochere G1",
		roastedOn: "2026-04-18",
		chargeTempC: 195,
		dropTempC: 205,
		totalTimeSec: 630,
		developmentTimeSec: 120,
		developmentRatio: 0.19,
		rorCPerMin: 12.4,
		events: [
			{ timeSec: 95, labelKey: "turningPoint", tempC: 92 },
			{ timeSec: 510, labelKey: "firstCrack", tempC: 196 },
			{ timeSec: 630, labelKey: "drop", tempC: 205 },
		],
		timelineStages: [
			{ key: "charge", fromSec: 0, toSec: 5 },
			{ key: "drying", fromSec: 5, toSec: 290 },
			{ key: "maillard", fromSec: 290, toSec: 510 },
			{ key: "development", fromSec: 510, toSec: 630 },
			{ key: "finish", fromSec: 630, toSec: 640 },
		],
	},
	{
		id: "roast-002",
		beanLotId: "lot-002",
		beanLotName: "Hacienda La Esmeralda Gesha",
		roastedOn: "2026-04-17",
		chargeTempC: 190,
		dropTempC: 202,
		totalTimeSec: 600,
		developmentTimeSec: 105,
		developmentRatio: 0.175,
		rorCPerMin: 11.8,
		events: [
			{ timeSec: 100, labelKey: "turningPoint", tempC: 90 },
			{ timeSec: 495, labelKey: "firstCrack", tempC: 194 },
			{ timeSec: 600, labelKey: "drop", tempC: 202 },
		],
		timelineStages: [
			{ key: "charge", fromSec: 0, toSec: 5 },
			{ key: "drying", fromSec: 5, toSec: 280 },
			{ key: "maillard", fromSec: 280, toSec: 495 },
			{ key: "development", fromSec: 495, toSec: 600 },
			{ key: "finish", fromSec: 600, toSec: 610 },
		],
	},
	{
		id: "roast-003",
		beanLotId: "lot-003",
		beanLotName: "Finca El Paraiso Double Anaerobic",
		roastedOn: "2026-04-15",
		chargeTempC: 200,
		dropTempC: 212,
		totalTimeSec: 720,
		developmentTimeSec: 150,
		developmentRatio: 0.21,
		rorCPerMin: 13.2,
		events: [
			{ timeSec: 90, labelKey: "turningPoint", tempC: 95 },
			{ timeSec: 570, labelKey: "firstCrack", tempC: 198 },
			{ timeSec: 690, labelKey: "secondCrack", tempC: 210 },
			{ timeSec: 720, labelKey: "drop", tempC: 212 },
		],
		timelineStages: [
			{ key: "charge", fromSec: 0, toSec: 5 },
			{ key: "drying", fromSec: 5, toSec: 310 },
			{ key: "maillard", fromSec: 310, toSec: 570 },
			{ key: "development", fromSec: 570, toSec: 720 },
			{ key: "finish", fromSec: 720, toSec: 730 },
		],
	},
];

export type CuppingScore = {
	fragrance: number;
	aroma: number;
	flavor: number;
	aftertaste: number;
	acidity: number;
	body: number;
	balance: number;
	sweetness: number;
	cleanCup: number;
	uniformity: number;
	overall: number;
	finish: number;
};

export type CuppingSession = {
	id: string;
	beanLotId: string;
	beanLotName: string;
	cuppedOn: string;
	cupper: string;
	scores: CuppingScore;
	flavorTags: string[];
	notes: string;
};

export const cuppingSessions: CuppingSession[] = [
	{
		id: "cup-001",
		beanLotId: "lot-001",
		beanLotName: "Yirgacheffe Kochere G1",
		cuppedOn: "2026-04-19",
		cupper: "Donald",
		scores: {
			fragrance: 8.25,
			aroma: 8.5,
			flavor: 8.75,
			aftertaste: 8.5,
			acidity: 8.75,
			body: 7.75,
			balance: 8.25,
			sweetness: 8.5,
			cleanCup: 9.0,
			uniformity: 9.0,
			overall: 8.5,
			finish: 8.25,
		},
		flavorTags: ["floral", "fruity"],
		notes: "Jasmine, bergamot, white peach. Tea-like body with a clean lingering aftertaste.",
	},
	{
		id: "cup-002",
		beanLotId: "lot-002",
		beanLotName: "Hacienda La Esmeralda Gesha",
		cuppedOn: "2026-04-18",
		cupper: "Donald",
		scores: {
			fragrance: 9.0,
			aroma: 9.0,
			flavor: 9.25,
			aftertaste: 9.0,
			acidity: 8.75,
			body: 8.0,
			balance: 8.75,
			sweetness: 8.75,
			cleanCup: 9.0,
			uniformity: 9.0,
			overall: 9.25,
			finish: 9.0,
		},
		flavorTags: ["floral", "fruity", "natural"],
		notes: "Tropical fruit, honeysuckle, papaya, pink guava. Syrupy, long finish.",
	},
];

export type ActivityItem = {
	id: string;
	timestamp: string;
	text: string;
};

export const recentActivity: ActivityItem[] = [
	{ id: "act-1", timestamp: "2026-04-19 10:20", text: "Cupped Yirgacheffe Kochere G1 — 88.5 pts" },
	{ id: "act-2", timestamp: "2026-04-18 14:05", text: "Roasted Hacienda La Esmeralda Gesha — 10:00" },
	{ id: "act-3", timestamp: "2026-04-17 09:15", text: "Added new lot: Finca El Paraiso (15 kg)" },
	{ id: "act-4", timestamp: "2026-04-15 16:40", text: "Exported all data as JSON" },
];

export const upcomingFeatures = [
	"Roast curve overlay comparison",
	"Mobile companion app",
	"Shared cupping sessions with your team",
];
