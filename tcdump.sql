--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    url_image text NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: countries; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.countries (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.countries OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.countries_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.countries_id_seq OWNER TO postgres;

--
-- Name: countries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.countries_id_seq OWNED BY public.countries.id;


--
-- Name: logged_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logged_users (
    id integer NOT NULL,
    token character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.logged_users OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logged_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logged_users_id_seq OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logged_users_id_seq OWNED BY public.logged_users.id;


--
-- Name: payment_method; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.payment_method (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.payment_method OWNER TO postgres;

--
-- Name: payment_method_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.payment_method_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payment_method_id_seq OWNER TO postgres;

--
-- Name: payment_method_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.payment_method_id_seq OWNED BY public.payment_method.id;


--
-- Name: product_sku; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_sku (
    id integer NOT NULL,
    sku character varying(255) NOT NULL,
    products_id integer NOT NULL,
    sale_date date,
    user_id integer,
    payment_id integer
);


ALTER TABLE public.product_sku OWNER TO postgres;

--
-- Name: product_sku_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_sku_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_sku_id_seq OWNER TO postgres;

--
-- Name: product_sku_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_sku_id_seq OWNED BY public.product_sku.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    url_image text NOT NULL,
    describe text NOT NULL,
    category_id integer NOT NULL,
    price numeric NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: shopping_basket; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_basket (
    id integer NOT NULL,
    user_id integer NOT NULL,
    items character varying(5000)
);


ALTER TABLE public.shopping_basket OWNER TO postgres;

--
-- Name: shopping_basket_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_basket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.shopping_basket_id_seq OWNER TO postgres;

--
-- Name: shopping_basket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_basket_id_seq OWNED BY public.shopping_basket.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    birth_date date NOT NULL,
    country_id integer NOT NULL,
    creditcard character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: countries id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries ALTER COLUMN id SET DEFAULT nextval('public.countries_id_seq'::regclass);


--
-- Name: logged_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users ALTER COLUMN id SET DEFAULT nextval('public.logged_users_id_seq'::regclass);


--
-- Name: payment_method id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method ALTER COLUMN id SET DEFAULT nextval('public.payment_method_id_seq'::regclass);


--
-- Name: product_sku id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku ALTER COLUMN id SET DEFAULT nextval('public.product_sku_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: shopping_basket id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_basket ALTER COLUMN id SET DEFAULT nextval('public.shopping_basket_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, url_image) FROM stdin;
1	Watch	https://s1.1zoom.me/big0/648/Apple_Clock_Watch_Apple_502952.jpg | https://wallpaperaccess.com/full/1568233.jpg
2	AirPods	https://s2.glbimg.com/5KBEl01R5_6occgjE0vTUTTwyRU=/0x0:1306x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/K/k/qVcT6nTRKDuibbd5wsng/apple-airpods-3rd-gen-hero-10182021.jpg | https://img.joomcdn.net/a47e3029d2e41376a9602673003d965c16a03db6_original.jpeg
3	MacBook	https://www.apple.com/v/mac/home/bj/images/meta/mac__bfa414svyuc2_og.png?202111031714 | https://mundoconectado.com.br/uploads/chamadas/macbook-air-arm-2020-lancamento-capa1.jpg
4	Ipad	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000 | https://geekupdated.com/wp-content/uploads/2021/09/Apple-iPad-mini-6-2021-release-specs.jpg
5	Iphone	https://360view.hum3d.com/zoom/Apple/Apple_iPhone_X_Space_Gray_1000_0002.jpg | https://www.vivo.com.br/content/dam/vivo-sites/vivo-com-br/homepage/imagens/destaques/mundo-apple-iphone-se-943x832.jpg
6	Acessories	https://photos5.appleinsider.com/archive/appleaccessories.jpg | https://www.getwox.com/wp-content/uploads/2020/09/MacBook-Accessories.png
\.


--
-- Data for Name: countries; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.countries (id, name) FROM stdin;
\.


--
-- Data for Name: logged_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logged_users (id, token, user_id) FROM stdin;
\.


--
-- Data for Name: payment_method; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.payment_method (id, name) FROM stdin;
1	bank_slip
2	credit_card
\.


--
-- Data for Name: product_sku; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_sku (id, sku, products_id, sale_date, user_id, payment_id) FROM stdin;
1	1f532b29-16d6-49ea-842f-f190e2b961c0	1	\N	\N	\N
2	579c726b-8b4b-41e8-992b-83eb26156cd1	1	\N	\N	\N
3	e4b1cc0e-02c1-4bdb-a1cb-4550b4a0be28	1	\N	\N	\N
4	97e067c6-4a6a-463e-91e3-5a68a9f3ed5f	1	\N	\N	\N
5	abf4f55a-ba03-4dc7-8675-87054883abc9	1	\N	\N	\N
6	2d2f4ded-4da8-4c86-af7e-73cfb2394d8b	2	\N	\N	\N
7	a867fe5a-7572-487f-8006-3346149884e7	2	\N	\N	\N
8	f0897247-6443-4a91-a4f9-1c6ccf3d6f29	2	\N	\N	\N
9	1156722e-7f02-48dc-a5f6-098bf6631f67	2	\N	\N	\N
10	2e63b732-564e-47d5-b7d5-844bccf60199	2	\N	\N	\N
11	9789ede8-8fa8-4857-995b-681ad2c26aeb	3	\N	\N	\N
12	c273d7c5-803e-4fa5-8351-2ca14b4ddfa6	3	\N	\N	\N
13	f9a7cd64-9907-447e-8dba-eb2aac4b5a3c	3	\N	\N	\N
14	2d0c011b-17bc-4d2f-98a4-a1d7440151f4	3	\N	\N	\N
15	4423d76a-9b58-45a7-acfb-a7903ff37234	3	\N	\N	\N
16	1ec5aabd-67a0-4757-b622-0720187227a4	4	\N	\N	\N
17	a8a68146-b85b-4bdf-85d0-80462d162702	4	\N	\N	\N
18	77db7b46-7bda-458c-8e04-cc2d3f4b7d36	4	\N	\N	\N
19	97943af3-0bc7-4242-966d-14e99dae2ee1	4	\N	\N	\N
20	52593d24-5480-4640-a485-3cdd232cc133	4	\N	\N	\N
21	67fecd96-8bfc-42b6-b937-7c0475eebbe0	5	\N	\N	\N
22	ba19245e-cc12-4aa4-b432-45e90d15a17d	5	\N	\N	\N
23	d084e298-532d-4b79-abec-e21d390c45e4	5	\N	\N	\N
24	ced80a66-2f59-4a22-91fb-eef96754fa92	5	\N	\N	\N
25	3037d72c-ca52-4ed3-bf8c-79e91d6b202d	5	\N	\N	\N
26	87ad3e37-d9a2-4240-9ea2-c3a35c911d9d	6	\N	\N	\N
27	4b160e95-f3c1-4bc1-aa8d-52a27a8f128c	6	\N	\N	\N
28	578cb2b7-759e-471f-b197-8044aca8011b	6	\N	\N	\N
29	d2109975-e406-450a-b562-7873066d52ab	6	\N	\N	\N
30	654dadc8-286d-4438-a020-812fd4d42fd6	6	\N	\N	\N
31	18405833-8c27-4dcd-b1f2-7dcd0f9a47c2	7	\N	\N	\N
32	e169c9b9-4b3c-4133-b788-bb58d897c30f	7	\N	\N	\N
33	4eb17be4-a21c-4ed6-9590-58005d27c018	7	\N	\N	\N
34	31021832-b3a2-43c1-b969-bc1d778257cb	7	\N	\N	\N
35	d6f22593-da7f-4978-8cb9-b95d1635eca3	7	\N	\N	\N
36	3c9e82dc-267c-4e8e-95c6-d330a4c3b766	8	\N	\N	\N
37	b95514ea-9fce-48fd-b1a7-a147cb8a852e	8	\N	\N	\N
38	ee0f6642-8f69-4e48-b02b-d2301f5f997f	8	\N	\N	\N
39	9edbd42f-57c5-46cf-bf4d-092ae96d94c2	8	\N	\N	\N
40	784f5f6a-cb51-40ed-b9d4-4b2818fd346e	8	\N	\N	\N
41	0121b9cd-1472-43d6-8579-7d0dfcd1b82e	9	\N	\N	\N
42	13ede49d-1a04-45f8-b8cb-58994f16e740	9	\N	\N	\N
43	15e951fd-ddd5-476d-a6a3-d941951e7475	9	\N	\N	\N
44	02ce5de7-9c65-49f1-8ee4-206607df1c07	9	\N	\N	\N
45	43ed9c2b-a827-45c1-ab01-763930c77c94	9	\N	\N	\N
46	46926ad5-c190-4980-be5e-a4db04f40577	10	\N	\N	\N
47	4340f74f-7aab-4143-a3c2-96c7e10c1ba9	10	\N	\N	\N
48	2de4940c-3403-4852-8a36-4c3ecb2808c8	10	\N	\N	\N
49	b9d94a18-2645-46f7-b92d-d75257e3d09c	10	\N	\N	\N
50	d187e2a2-6ec8-447d-933a-4f51be4230d6	10	\N	\N	\N
51	8b5b61d7-efe7-4f39-a33f-87db8e0b7b96	11	\N	\N	\N
52	99741e47-f195-4ec4-bdda-b4cdcfe7892b	11	\N	\N	\N
53	71dbc1de-dbc5-4bf0-985d-12c95b5be157	11	\N	\N	\N
54	3623261b-1fc7-440a-9a09-cab22730a701	11	\N	\N	\N
55	16fc9483-b4fd-475f-9e60-3af0b3dde2fc	11	\N	\N	\N
56	1454eb5e-5bd4-4b98-bfd6-2aa090a7d382	12	\N	\N	\N
57	36915db3-40e6-482a-9b3e-44273c1c89a1	12	\N	\N	\N
58	90dea034-1dbd-4302-990e-57f491b0d728	12	\N	\N	\N
59	18ffbc86-eccc-4fbb-9ba3-5509b72fabd5	12	\N	\N	\N
60	2c8bd562-dd00-421d-9d75-dcf47a66a394	12	\N	\N	\N
61	35feb5f2-2613-47b4-b5f9-32fba4d11318	13	\N	\N	\N
62	c9b099f3-48ef-45c2-bceb-1a6496d6eb40	13	\N	\N	\N
63	9f836f63-85ea-463c-a64c-9aa2b34b587b	13	\N	\N	\N
64	6bb66997-07b1-4570-81d8-20955461c5d0	13	\N	\N	\N
65	975fa752-e122-4305-b5cd-384abea2670a	13	\N	\N	\N
66	92533576-abaa-4622-a18b-06a9fc54e1e2	14	\N	\N	\N
67	7818e5f5-a43d-4ce6-b7bf-a1250a2dbb69	14	\N	\N	\N
68	ffbaa862-eb34-4174-87b2-aac28cdbb81d	14	\N	\N	\N
69	b9dbfaf5-952c-4afb-b7d7-98262cf2273c	14	\N	\N	\N
70	4026b291-ace5-4ed7-b177-9877a5718bb3	14	\N	\N	\N
71	463c054d-af48-45f9-9315-5b2664dd6fcc	15	\N	\N	\N
72	23109cda-217d-41b1-8a88-4a75fbb04f19	15	\N	\N	\N
73	bd8bd5fb-6b38-46be-ad50-882b045a5abd	15	\N	\N	\N
74	fed984f5-8fe4-436e-ba5d-ab93411e18aa	15	\N	\N	\N
75	a4d12b7f-3049-4227-812f-9893779a2e5a	15	\N	\N	\N
76	6b0c45a4-0cd2-4225-ab36-529da11dd15a	16	\N	\N	\N
77	621ff8a8-5607-432a-bc28-c9a2c1698757	16	\N	\N	\N
78	ae245955-26a5-4080-ad02-739056dc7d17	16	\N	\N	\N
79	5844cdaa-5fd9-4edd-9e56-6baeae122cdf	16	\N	\N	\N
80	0039cdd9-841d-4b1d-9bdf-a04e9924198d	16	\N	\N	\N
81	532c7c8d-667f-49a6-9cf5-c78aa50c6eed	17	\N	\N	\N
82	fe91e4a1-5af9-4f85-b195-c5c31f34dfc9	17	\N	\N	\N
83	96c2add3-0ae0-48bd-bd23-56b37f49c15c	17	\N	\N	\N
84	bf3877c5-35b6-43ba-acff-9eba141b0e2f	17	\N	\N	\N
85	22c6b60c-3043-416f-8ad0-124f42198147	17	\N	\N	\N
86	133576a7-8bcc-46bc-92c2-5198bf739fae	18	\N	\N	\N
87	6bbc08bb-b42a-47dc-836f-354ab9fc750c	18	\N	\N	\N
88	72e75c01-8478-4664-b07c-5a2f0e844362	18	\N	\N	\N
89	28ca3dfe-6de3-4491-aa35-db6b79b2d3cd	18	\N	\N	\N
90	58b656b0-0713-4643-997b-e58453b0d0f6	18	\N	\N	\N
91	8825a9ff-a5d7-4cf7-bd7f-15bc2e10d926	19	\N	\N	\N
92	e3af1dcd-7ba6-4e1a-9b02-d2d1788820a7	19	\N	\N	\N
93	d12469bc-025d-4b02-8f04-0f3199f2fe83	19	\N	\N	\N
94	3d8050b1-c173-473e-89a4-f0e54c1327c8	19	\N	\N	\N
95	c0e9a64f-6a4a-4443-a6f1-da60c8c99bfb	19	\N	\N	\N
96	b24da7c2-a095-41a2-869a-8a0a91d59844	20	\N	\N	\N
97	3ab93e94-013c-484f-8733-eb961b3a05d0	20	\N	\N	\N
98	1f2ca8cd-0d08-4ea4-a065-72d346473135	20	\N	\N	\N
99	18bb94b4-e2e8-4aae-b280-109853f2380a	20	\N	\N	\N
100	a31ec009-02d2-46e4-9d1b-2b21ddae6baa	20	\N	\N	\N
101	d040eaa5-4f57-48ba-87a1-0f4ad48ff955	21	\N	\N	\N
102	ba509dd8-9008-425c-8fce-926ec8ad646b	21	\N	\N	\N
103	6475c331-391f-41a3-a229-2922571bc1e6	21	\N	\N	\N
104	f9a12c4e-cc03-4769-8680-fda39485b214	21	\N	\N	\N
105	d70e28bb-7010-429f-94d7-8e3fcccbed5c	21	\N	\N	\N
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, url_image, describe, category_id, price) FROM stdin;
1	Apple WatchSE	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/40-cell-alum-gold-sport-starlight-se?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1630473753000	Heavy on features. | Light on price. | Family Setup. Your family joined at the wrist. | Locate devices when you leave your iPhone behind. | Maps. Get turn-by-turn directions from Maps right on your wrist.	1	279
2	Apple WatchS7	https://cdn.pocket-lint.com/r/s/660x/assets/images/158377-smartwatches-news-apple-watch-series-7-nike-image1-wy7stmha50.jpg	Full screen | Ccreen ahead. | The challenge was to create a bigger display while barely expanding the dimensions of the watch itself. | Measure your blood oxygen level with a revolutionary sensor and app. | Your blood oxygen level is a key indicator of your overall wellness. 	1	399
3	Apple WatchS3	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/38-alu-silver-sport-white-nc-s3-1up_GEO_BR?wid=940&hei=1112&fmt=png-alpha&.v=1594318695000	Good things. | Good vibes. | Keep an eye on your   with heart health notifications. | Unlock your Mac just by wearing your watch. | Ping your iPhone. Hear and see where it’s hiding.	1	199
4	AirPods 2ndG	https://media.4rgos.it/i/Argos/8814322_R_Z001A?w=750&h=440&qlt=70	Wireless and Effortless. |Magical. |Powered by the Apple H1 headphone chip, AirPods deliver a faster and more stable wireless connection to your devices . |AirPods deliver an industry-leading6 5 hours of listening time7 — and now up to 3 hours of talk time8 — all on one charge. |Two can play this song.\nWith Audio Sharing,12 you can easily share a song, podcast, or other audio stream between two sets of AirPods.	2	199
5	AirPods 3ndG	https://i.expansys.net/img/b/363181/apple-airpods-3-with-charging-case.jpg	All-new | Spatial Audio | Spatial audio with dynamic head tracking places sounds all around you to three-dimensional experience for music |Connect on FaceTime in crisp, HD quality with a new AAC-ELD speech codec.|Play music, make calls, get directions, or check your schedule simply by using your voice. 	2	219
6	AirPods Pro	https://m.media-amazon.com/images/I/71zny7BTRlL._AC_SL1500_.jpg	Noise Cancellation |immersive sound. |These internally tapered tips conform to your ear shape, keeping AirPods Pro secure.|With the MagSafe Charging Case, AirPods deliver more than 24 hours of battery life. | Automatic switching allows sound to move seamlessly between your iPhone and more	2	219
7	AirPods Max	https://s2.glbimg.com/NJA5_NnkvZf4JwRmGGAppvphWyc=/0x0:958x870/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/3/m/EweBupRMGeAf7nREaCdA/magic-smart-case-e1xikczc5eoi-large.jpg	Origial. | Computational audio. |a perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods. | AirPods Max inherit all of the wireless, effortless magic of the AirPods family. |hours of listening, movie watching, or talk time — with Active Noise Cancellation and spatial audio enabled.	2	599
8	MacBook Pro Supercharged for pros.	https://www.apple.com/v/macbook-pro-14-and-16/a/images/meta/macbook-pro-14-and-16_overview__fz0lron5xyuu_og.png?202110291551	Supercharged for pros | Pro to the Max. | The new MacBook Pro is available in 14- and 16-inch models. | Ferocious performance with that efficiency is the magic of Apple silicon. | Connect up to three Pro Display XDRs and a 4K TV with M1 Max. Or to two Pro Display XDRs with M1 Pro.	3	1999
9	MacBook Air	https://mundoconectado.com.br/uploads/chamadas/macbook-air-arm-2020-lancamento-capa1.jpg	Power. |It’s in the Air. | The M1 chip brings up to 16GB of superfast unified memory. This single pool of high‑bandwidth. | Realism on the brilliant 13.3‑inch, 2560‑by‑1600-resolution Retina display.| The next generation of Wi‑Fi isn’t just faster — it keeps MacBook Air.	3	1999
10	MacBook Pro 13	https://a-static.mlcdn.com.br/618x463/macbook-pro-133-apple-m1-8gb-512gb-ssd-cinza-espacial/magazineluiza/227626400/6fcc39e63efb154b0f12a094a70ac86b.jpg	Small chip. |Giant leap.| low‑latency memory allows apps to share data between the CPU, GPU, and Neural Engine efficiently | With the brilliant Retina display, images take on an incredible level of detail and realism. Text is sharp and clear.| The Touch Bar puts the commands you need most right where you need them, saving time and keystrokes. =	3	1199
11	iPad mini	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-cell-purple-202109_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1629840713000	Mega Power | Mini sized | With all-day battery life, iPad is ready to work or play for as long as you need it.| The 8MP Wide camera on the back of iPad captures sharp, vivid images and video.| With Gigabit‑class LTE, you can connect even when you can’t access Wi‑Fi.	4	499
12	iPad 10.2	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-2021-hero-space-wifi-select?wid=470&hei=556&fmt=png-alpha&.v=1631308881000	Delightfully capable. | Surprisingly affordable.| Folio is the tablet case with a semi-hard rear shell that protects the corners and a front cover made from faux leather to protect the display.|Easy to fold down, it becomes a handy stand with | writing, making calls, watching films and browsing the Internet. Compatible with the Sleep Mode function,	4	329
13	iPad Pro	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-11-select-wifi-spacegray-202104_GEO_BR?wid=470&hei=556&fmt=p-jpg&qlt=95&.v=1617927594000	The ultimate |\niPad experience. | The 8‑core CPU of M1 delivers up to 50 percent faster performance. |  Over 10,000 mini‑LEDs are grouped into more than 2500 local dimming zones. | iPad has always been uniquely portable with superfast Wi‑Fi and cellular options. 	4	429
14	iPad Air	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-202009_FMT_WHH?wid=2000&hei=2000&fmt=jpeg&qlt=80&.v=1599066778000	Powerful. Colorful. | Wonderful. | All-screen design with 10.9‑inch Liquid Retina display,6 True Tone, P3 wide color, and antireflective coating. | 12MP back camera with Focus Pixels and 7MP FaceTime HD camera for high‑quality video calls. | USB-C, which allows for fast connections to cameras, displays, and more.	4	599
15	iPhone13 Pro	https://a-static.mlcdn.com.br/618x463/apple-iphone-13-pro-256gb-grafite-tela-61-12mp-ios/magazineluiza/233010500/79bb725b2de9ff50d7c3bb4796451489.jpg	The ultimate iPhone. | Power. | With its redesigned lens and powerful autofocus system, the new Ultra Wide camera can focus at just 2 cm. | IPhone 13 Pro was made for low light. The Wide camera adds a wider aperture and our largest sensor yet. | The new Telephoto camera features a 77 mm focal length and 3x optical zoom	5	999
16	iPhone13 N	https://files.tecnoblog.net/wp-content/uploads/2021/09/iphone-13-produto-2-700x700.png	A total powerhouse. | Durability. | A lightning-fast chip that leaves the competition behind. | iPhone lets you do it with a few taps and swipes. Even pro movie cameras can’t do that. | iPhone 13 starts at 128GB for all your\nphotos and videos and Super Retina XDR display.	5	699
17	iPhone12 N	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000	As amazing as ever. | Love. | A superpowerful chip. 5G speed. An advanced dual‑camera system. |Privacy is built into iPhone from the ground up. Face ID data doesn’t leave your iPhone. | Superstrong materials and water resistance make iPhone incredibly durable.	5	599
18	iPhone SE	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-se-red-select-2020?wid=834&hei=1000&fmt=jpeg&qlt=95&.v=1586574260319	Lots to love. | Less to spend. | A simple slider lets you blur the background as much or as little as you like. | Touch ID lets you securely unlock your iPhone and sign in to apps instantly. | It’s not afraid of a little coffee, tea, or soda either. And dust? No worries.	5	599
19	MagSafe Battery	https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MJWY3_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=80&.v=1625613217000	Power. | Durability. | Wireless power bank that extends the life of the iPhone. | Charged individually via a lightning cable when connected to the iPhone 12 | When turned on, it powers iPhone and MagSafe battery at the same time.	6	99
20	ReformSport AirPods	https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/HPPL2_AV4?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1625779893000	Prevent. | Durable exterior. | Antimicrobial defense featured on the shell eliminates. | Defends from immediate impact while the soft, cushioning interior. | hybrid-design lanyard is also included to keep the case securely.	6	39
21	BraidedSolo Loop	https://uploads.ifdesign.de/award_img_346/oex_large/316358_01_watch_braided_loop_family.jpg	Expensive. | Unique. | It is expensive for what it is, but you will love how it feels. | comfortable as the Sport Loops while also being sweat and water-resistant | Customize the look and feel of your feelings.	6	99
\.


--
-- Data for Name: shopping_basket; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_basket (id, user_id, items) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, birth_date, country_id, creditcard) FROM stdin;
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: countries_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.countries_id_seq', 1, false);


--
-- Name: logged_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logged_users_id_seq', 1, false);


--
-- Name: payment_method_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.payment_method_id_seq', 2, true);


--
-- Name: product_sku_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_sku_id_seq', 105, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 21, true);


--
-- Name: shopping_basket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_basket_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);


--
-- Name: countries countries_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_name_key UNIQUE (name);


--
-- Name: countries countries_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.countries
    ADD CONSTRAINT countries_pk PRIMARY KEY (id);


--
-- Name: logged_users logged_users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_pk PRIMARY KEY (id);


--
-- Name: logged_users logged_users_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_token_key UNIQUE (token);


--
-- Name: payment_method payment_method_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_name_key UNIQUE (name);


--
-- Name: payment_method payment_method_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.payment_method
    ADD CONSTRAINT payment_method_pk PRIMARY KEY (id);


--
-- Name: product_sku product_sku_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_pk PRIMARY KEY (id);


--
-- Name: product_sku product_sku_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_sku_key UNIQUE (sku);


--
-- Name: products products_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_name_key UNIQUE (name);


--
-- Name: products products_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pk PRIMARY KEY (id);


--
-- Name: shopping_basket shopping_basket_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_basket
    ADD CONSTRAINT shopping_basket_pk PRIMARY KEY (id);


--
-- Name: users users_creditcard_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_creditcard_key UNIQUE (creditcard);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: logged_users logged_users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: product_sku product_sku_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_fk0 FOREIGN KEY (products_id) REFERENCES public.products(id) ON DELETE CASCADE;


--
-- Name: product_sku product_sku_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_fk1 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: product_sku product_sku_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_sku
    ADD CONSTRAINT product_sku_fk2 FOREIGN KEY (payment_id) REFERENCES public.payment_method(id);


--
-- Name: products products_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_fk0 FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: shopping_basket shopping_basket_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_basket
    ADD CONSTRAINT shopping_basket_fk0 FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_fk0 FOREIGN KEY (country_id) REFERENCES public.countries(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

