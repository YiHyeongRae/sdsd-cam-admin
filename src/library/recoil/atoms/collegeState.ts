import { atom } from "recoil";

const initialState = {
  colleges: [
    {
      id: 1,
      collegeName: "한신대학교",
      emailDomain: "hs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 2,
      collegeName: "한세대학교",
      emailDomain: "hansei.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 3,
      collegeName: "성결대학교",
      emailDomain: "sungkyul.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 4,
      collegeName: "평택대학교",
      emailDomain: "ptu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 5,
      collegeName: "성공회대학교",
      emailDomain: "skhu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 6,
      collegeName: "태재대학교",
      emailDomain: "taejae.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 7,
      collegeName: "가야대학교(김해)",
      emailDomain: "kaya.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 8,
      collegeName: "가야대학교(고령)",
      emailDomain: "kaya.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 9,
      collegeName: "가천대학교",
      emailDomain: "gachon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 10,
      collegeName: "가톨릭꽃동네대학교",
      emailDomain: "kkot.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 11,
      collegeName: "가톨릭대학교",
      emailDomain: "catholic.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 12,
      collegeName: "가톨릭대학교",
      emailDomain: "catholic.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 13,
      collegeName: "가톨릭대학교",
      emailDomain: "catholic.ac.kr",
      campus: "제3캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 14,
      collegeName: "감리교신학대학교",
      emailDomain: "mtu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 15,
      collegeName: "강원대학교",
      emailDomain: "kangwon.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 16,
      collegeName: "건국대학교",
      emailDomain: "konkuk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 17,
      collegeName: "강원대학교",
      emailDomain: "kangwon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 18,
      collegeName: "건양대학교",
      emailDomain: "konyang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 19,
      collegeName: "건국대학교(글로컬)",
      emailDomain: "kku.ac.kr",
      campus: "분교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 20,
      collegeName: "강서대학교",
      emailDomain: "seo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 21,
      collegeName: "강남대학교",
      emailDomain: "kangnam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 22,
      collegeName: "건양대학교",
      emailDomain: "konyang.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 23,
      collegeName: "건양사이버대학교",
      emailDomain: "kycu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 24,
      collegeName: "가톨릭관동대학교",
      emailDomain: "cku.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 25,
      collegeName: "경기대학교",
      emailDomain: "kyonggi.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 26,
      collegeName: "경남과학기술대학교",
      emailDomain: "gntech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 27,
      collegeName: "경동대학교",
      emailDomain: "k1.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 28,
      collegeName: "경남대학교",
      emailDomain: "hanma.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 29,
      collegeName: "경동대학교",
      emailDomain: "k1.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 30,
      collegeName: "경동대학교",
      emailDomain: "k1.ac.kr",
      campus: "제3캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 31,
      collegeName: "경동대학교",
      emailDomain: "k1.ac.kr",
      campus: "제4캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 32,
      collegeName: "경상국립대학교",
      emailDomain: "gnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 33,
      collegeName: "경북대학교",
      emailDomain: "knu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 34,
      collegeName: "경성대학교",
      emailDomain: "ks.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 35,
      collegeName: "경운대학교",
      emailDomain: "ikw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 36,
      collegeName: "경운대학교(산업대)",
      emailDomain: "ikw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 37,
      collegeName: "경인교육대학교",
      emailDomain: "ginue.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 38,
      collegeName: "경일대학교",
      emailDomain: "kiu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 39,
      collegeName: "경인교육대학교",
      emailDomain: "ginue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 40,
      collegeName: "경기대학교",
      emailDomain: "kyonggi.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 41,
      collegeName: "경주대학교",
      emailDomain: "gju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 42,
      collegeName: "경희사이버대학교",
      emailDomain: "khcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 43,
      collegeName: "경희대학교",
      emailDomain: "khu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 44,
      collegeName: "계명대학교",
      emailDomain: "kmu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 45,
      collegeName: "고려대학교",
      emailDomain: "korea.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 46,
      collegeName: "고려대학교(세종)",
      emailDomain: "korea.ac.kr",
      campus: "분교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 47,
      collegeName: "고려사이버대학교",
      emailDomain: "cuk.edu",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 48,
      collegeName: "공주교육대학교",
      emailDomain: "gjue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 49,
      collegeName: "고신대학교",
      emailDomain: "kosin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 50,
      collegeName: "광신대학교",
      emailDomain: "kwangshin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 51,
      collegeName: "광운대학교",
      emailDomain: "kw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 52,
      collegeName: "광주가톨릭대학교",
      emailDomain: "gjcatholic.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 53,
      collegeName: "광주여자대학교",
      emailDomain: "kwu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 54,
      collegeName: "광주대학교",
      emailDomain: "gwangju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 55,
      collegeName: "광주과학기술원",
      emailDomain: "gist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 56,
      collegeName: "국립강릉원주대학교",
      emailDomain: "gwnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 57,
      collegeName: "광주교육대학교",
      emailDomain: "gnue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 58,
      collegeName: "국립군산대학교",
      emailDomain: "kunsan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 59,
      collegeName: "국립공주대학교",
      emailDomain: "smail.kongju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 60,
      collegeName: "국립부경대학교",
      emailDomain: "pknu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 61,
      collegeName: "국립순천대학교",
      emailDomain: "scnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 62,
      collegeName: "국립목포해양대학교",
      emailDomain: "mmu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 63,
      collegeName: "국립안동대학교",
      emailDomain: "anu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 64,
      collegeName: "국립한국교통대학교",
      emailDomain: "ut.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 65,
      collegeName: "국립창원대학교",
      emailDomain: "changwon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 66,
      collegeName: "국립한밭대학교",
      emailDomain: "hanbat.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 67,
      collegeName: "국립한국해양대학교",
      emailDomain: "kmou.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 68,
      collegeName: "국립금오공과대학교",
      emailDomain: "kumoh.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 69,
      collegeName: "국민대학교",
      emailDomain: "kookmin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 70,
      collegeName: "국립강릉원주대학교",
      emailDomain: "gwnu.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 71,
      collegeName: "국제사이버대학교",
      emailDomain: "gjcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 72,
      collegeName: "글로벌사이버대학교",
      emailDomain: "global.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 73,
      collegeName: "극동대학교",
      emailDomain: "kdu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 74,
      collegeName: "금강대학교",
      emailDomain: "ggu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 75,
      collegeName: "김천대학교",
      emailDomain: "gimcheon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 76,
      collegeName: "단국대학교",
      emailDomain: "dankook.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 77,
      collegeName: "남서울대학교(산업대)",
      emailDomain: "nsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 78,
      collegeName: "남부대학교",
      emailDomain: "nambu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 79,
      collegeName: "남서울대학교",
      emailDomain: "nsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 80,
      collegeName: "나사렛대학교",
      emailDomain: "kornu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 81,
      collegeName: "국립목포대학교",
      emailDomain: "mokpo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 82,
      collegeName: "대구가톨릭대학교",
      emailDomain: "cu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 83,
      collegeName: "대구예술대학교",
      emailDomain: "dgau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 84,
      collegeName: "대구외국어대학교",
      emailDomain: "dufs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 85,
      collegeName: "대신대학교",
      emailDomain: "daeshin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 86,
      collegeName: "대구사이버대학교",
      emailDomain: "dcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 87,
      collegeName: "대구한의대학교",
      emailDomain: "dhu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 88,
      collegeName: "대전신학대학교",
      emailDomain: "daejeon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 89,
      collegeName: "대진대학교",
      emailDomain: "daejin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 90,
      collegeName: "대전가톨릭대학교",
      emailDomain: "dcatholic.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 91,
      collegeName: "대전대학교",
      emailDomain: "edu.dju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 92,
      collegeName: "대구대학교",
      emailDomain: "daegu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 93,
      collegeName: "동국대학교",
      emailDomain: "dongguk.edu",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 94,
      collegeName: "대구교육대학교",
      emailDomain: "dnue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 95,
      collegeName: "대구경북과학기술원",
      emailDomain: "dgist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 96,
      collegeName: "덕성여자대학교",
      emailDomain: "duksung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 97,
      collegeName: "동명대학교",
      emailDomain: "tu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 98,
      collegeName: "동덕여자대학교",
      emailDomain: "dongduk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 99,
      collegeName: "동신대학교",
      emailDomain: "dsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 100,
      collegeName: "동서대학교",
      emailDomain: "dongseo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 101,
      collegeName: "동국대학교(WISE)",
      emailDomain: "dongguk.ac.kr",
      campus: "분교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 102,
      collegeName: "동양대학교",
      emailDomain: "dyu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 103,
      collegeName: "동아대학교",
      emailDomain: "donga.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 104,
      collegeName: "단국대학교",
      emailDomain: "dankook.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 105,
      collegeName: "명지대학교",
      emailDomain: "mju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 106,
      collegeName: "목포가톨릭대학교",
      emailDomain: "mcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 107,
      collegeName: "동의대학교",
      emailDomain: "deu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 108,
      collegeName: "명지대학교",
      emailDomain: "mju.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 109,
      collegeName: "부산교육대학교",
      emailDomain: "bnue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 110,
      collegeName: "루터대학교",
      emailDomain: "ltu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 111,
      collegeName: "백석대학교",
      emailDomain: "bu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 112,
      collegeName: "부산가톨릭대학교",
      emailDomain: "cup.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 113,
      collegeName: "목원대학교",
      emailDomain: "mokwon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 114,
      collegeName: "배재대학교",
      emailDomain: "pcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 115,
      collegeName: "사이버한국외국어대학교",
      emailDomain: "cufs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 116,
      collegeName: "부산장신대학교",
      emailDomain: "bpu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 117,
      collegeName: "디지털서울문화예술대학교",
      emailDomain: "scau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 118,
      collegeName: "부산외국어대학교",
      emailDomain: "bufs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 119,
      collegeName: "부산디지털대학교",
      emailDomain: "bdu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 120,
      collegeName: "상명대학교",
      emailDomain: "sangmyung.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 121,
      collegeName: "삼육대학교",
      emailDomain: "syuin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 122,
      collegeName: "서울과학기술대학교",
      emailDomain: "seoultech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 123,
      collegeName: "서울대학교",
      emailDomain: "snu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 124,
      collegeName: "서울교육대학교",
      emailDomain: "snue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 125,
      collegeName: "서경대학교",
      emailDomain: "skuniv.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 126,
      collegeName: "서강대학교",
      emailDomain: "sogang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 127,
      collegeName: "서남대학교",
      emailDomain: "seonam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 128,
      collegeName: "상지대학교",
      emailDomain: "sangji.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 129,
      collegeName: "서울시립대학교",
      emailDomain: "uos.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 130,
      collegeName: "상명대학교",
      emailDomain: "sangmyung.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 131,
      collegeName: "서울신학대학교",
      emailDomain: "stu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 132,
      collegeName: "서울디지털대학교",
      emailDomain: "sdu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 133,
      collegeName: "서울기독대학교",
      emailDomain: "scu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 134,
      collegeName: "서남대학교",
      emailDomain: "seonam.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 135,
      collegeName: "서울사이버대학교",
      emailDomain: "iscu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 136,
      collegeName: "세종대학교",
      emailDomain: "sju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 137,
      collegeName: "세명대학교",
      emailDomain: "semyung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 138,
      collegeName: "세한대학교",
      emailDomain: "sehan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 139,
      collegeName: "송원대학교",
      emailDomain: "songwon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 140,
      collegeName: "수원가톨릭대학교",
      emailDomain: "suwoncatholic.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 141,
      collegeName: "순복음총회신학교",
      emailDomain: "kcc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 142,
      collegeName: "수원대학교",
      emailDomain: "suwon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 143,
      collegeName: "숙명여자대학교",
      emailDomain: "sookmyung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 144,
      collegeName: "순천향대학교",
      emailDomain: "sch.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 145,
      collegeName: "숭실사이버대학교",
      emailDomain: "kcu.ac",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 146,
      collegeName: "신한대학교",
      emailDomain: "shinhan.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD.png",
      isActive: true,
    },
    {
      id: 147,
      collegeName: "숭실대학교",
      emailDomain: "soongsil.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 148,
      collegeName: "신라대학교",
      emailDomain: "silla.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 149,
      collegeName: "신한대학교",
      emailDomain: "shinhan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%92%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD.png",
      isActive: true,
    },
    {
      id: 150,
      collegeName: "아주대학교",
      emailDomain: "ajou.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 151,
      collegeName: "아신대학교",
      emailDomain: "acts.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 152,
      collegeName: "안양대학교",
      emailDomain: "ayum.anyang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 153,
      collegeName: "연세대학교(미래)",
      emailDomain: "yonsei.ac.kr",
      campus: "분교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 154,
      collegeName: "연세대학교",
      emailDomain: "yonsei.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 155,
      collegeName: "영남신학대학교",
      emailDomain: "ytus.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 156,
      collegeName: "영남대학교",
      emailDomain: "ynu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 157,
      collegeName: "서울장신대학교",
      emailDomain: "sjs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 158,
      collegeName: "서울한영대학교",
      emailDomain: "shyu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 159,
      collegeName: "영산대학교",
      emailDomain: "ysu.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 160,
      collegeName: "영산대학교",
      emailDomain: "ysu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 161,
      collegeName: "용인대학교",
      emailDomain: "yiu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 162,
      collegeName: "예원예술대학교",
      emailDomain: "yewon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 163,
      collegeName: "예수대학교",
      emailDomain: "jesus.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 164,
      collegeName: "서울여자대학교",
      emailDomain: "swu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 165,
      collegeName: "성균관대학교",
      emailDomain: "skku.edu",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 166,
      collegeName: "성신여자대학교",
      emailDomain: "sungshin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 167,
      collegeName: "영산선학대학교",
      emailDomain: "youngsan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 168,
      collegeName: "울산과학기술원",
      emailDomain: "unist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 169,
      collegeName: "원광디지털대학교",
      emailDomain: "wdu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 170,
      collegeName: "예원예술대학교",
      emailDomain: "yewon.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 171,
      collegeName: "우석대학교",
      emailDomain: "woosuk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 172,
      collegeName: "우송대학교",
      emailDomain: "wsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 173,
      collegeName: "안양대학교",
      emailDomain: "ayum.anyang.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 174,
      collegeName: "위덕대학교",
      emailDomain: "uu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 175,
      collegeName: "서원대학교",
      emailDomain: "seowon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 176,
      collegeName: "원광대학교",
      emailDomain: "wonkwang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 177,
      collegeName: "우송대학교(산업대)",
      emailDomain: "wsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 178,
      collegeName: "울산대학교",
      emailDomain: "ulsan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 179,
      collegeName: "유원대학교",
      emailDomain: "u1.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 180,
      collegeName: "인천가톨릭대학교",
      emailDomain: "iccu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 181,
      collegeName: "을지대학교",
      emailDomain: "eulji.ac.kr",
      campus: "제3캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 182,
      collegeName: "이화여자대학교",
      emailDomain: "ewhain.net",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 183,
      collegeName: "장로회신학대학교",
      emailDomain: "puts.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 184,
      collegeName: "인제대학교",
      emailDomain: "inje.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 185,
      collegeName: "을지대학교",
      emailDomain: "eulji.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 186,
      collegeName: "인천대학교",
      emailDomain: "inu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 187,
      collegeName: "인천가톨릭대학교",
      emailDomain: "iccu.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 188,
      collegeName: "인하대학교",
      emailDomain: "inha.edu",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 189,
      collegeName: "을지대학교",
      emailDomain: "eulji.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 190,
      collegeName: "전남대학교",
      emailDomain: "jnu.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 191,
      collegeName: "인제대학교",
      emailDomain: "inje.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 192,
      collegeName: "전남대학교",
      emailDomain: "jnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 193,
      collegeName: "제주국제대학교",
      emailDomain: "jeju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 194,
      collegeName: "전북대학교",
      emailDomain: "jbnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 195,
      collegeName: "정석대학",
      emailDomain: "jit.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 196,
      collegeName: "부산대학교",
      emailDomain: "pusan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 197,
      collegeName: "제주대학교",
      emailDomain: "jejunu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 198,
      collegeName: "중앙대학교",
      emailDomain: "cau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 199,
      collegeName: "전주교육대학교",
      emailDomain: "jnue.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 200,
      collegeName: "중부대학교",
      emailDomain: "jmail.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 201,
      collegeName: "조선대학교",
      emailDomain: "chosun.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 202,
      collegeName: "중원대학교",
      emailDomain: "jwu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 203,
      collegeName: "중앙대학교",
      emailDomain: "cau.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 204,
      collegeName: "차의과학대학교",
      emailDomain: "cha.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 205,
      collegeName: "전주대학교",
      emailDomain: "jj.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 206,
      collegeName: "진주교육대학교",
      emailDomain: "cue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 207,
      collegeName: "중앙승가대학교",
      emailDomain: "sangha.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 208,
      collegeName: "창신대학교",
      emailDomain: "cs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 209,
      collegeName: "청주대학교",
      emailDomain: "cju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 210,
      collegeName: "청주교육대학교",
      emailDomain: "cje.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 211,
      collegeName: "총신대학교",
      emailDomain: "chongshin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 212,
      collegeName: "추계예술대학교",
      emailDomain: "chugye.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 213,
      collegeName: "춘천교육대학교",
      emailDomain: "cnue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 214,
      collegeName: "선문대학교",
      emailDomain: "sunmoon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 215,
      collegeName: "진주산업대학교(산업대)",
      emailDomain: "gntech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 216,
      collegeName: "충남대학교",
      emailDomain: "cnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 217,
      collegeName: "탐라대학교",
      emailDomain: "tnu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 218,
      collegeName: "한국공학대학교",
      emailDomain: "tukorea.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 219,
      collegeName: "충북대학교",
      emailDomain: "chungbuk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 220,
      collegeName: "한국과학기술원",
      emailDomain: "kaist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 221,
      collegeName: "칼빈대학교",
      emailDomain: "calvin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 222,
      collegeName: "포항공과대학교",
      emailDomain: "postech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 223,
      collegeName: "한경국립대학교",
      emailDomain: "hknu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 224,
      collegeName: "청운대학교",
      emailDomain: "chungwoon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 225,
      collegeName: "한국산업기술대학교(산업대)",
      emailDomain: "kpu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 226,
      collegeName: "한국교원대학교",
      emailDomain: "knue.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 227,
      collegeName: "한국외국어대학교",
      emailDomain: "hufs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 228,
      collegeName: "한국전통문화대학교",
      emailDomain: "nuch.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 229,
      collegeName: "한국에너지공과대학교",
      emailDomain: "kentech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 230,
      collegeName: "한국열린사이버대학교",
      emailDomain: "ocu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 231,
      collegeName: "한남대학교",
      emailDomain: "hannam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 232,
      collegeName: "한국예술종합학교",
      emailDomain: "karts.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 233,
      collegeName: "한국항공대학교",
      emailDomain: "kau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 234,
      collegeName: "한림대학교",
      emailDomain: "hallym.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%92%E1%85%A1%E1%86%AB%E1%84%85%E1%85%B5%E1%86%B7%E1%84%83%E1%85%A2%E1%84%92%E1%85%A1%E1%86%A8%E1%84%80%E1%85%AD.png",
      isActive: true,
    },
    {
      id: 235,
      collegeName: "한국침례신학대학교",
      emailDomain: "kbtus.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 236,
      collegeName: "한국체육대학교",
      emailDomain: "knsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 237,
      collegeName: "한라대학교",
      emailDomain: "halla.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 238,
      collegeName: "한북대학교",
      emailDomain: "hanbuk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 239,
      collegeName: "한밭대학교(산업대)",
      emailDomain: "hanbat.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 240,
      collegeName: "한려대학교",
      emailDomain: "hanlyo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 241,
      collegeName: "한국기술교육대학교",
      emailDomain: "koreatech.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 242,
      collegeName: "한서대학교",
      emailDomain: "hanseo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 243,
      collegeName: "한성대학교",
      emailDomain: "hansung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 244,
      collegeName: "호남대학교",
      emailDomain: "honam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 245,
      collegeName: "협성대학교",
      emailDomain: "uhs.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 246,
      collegeName: "한동대학교",
      emailDomain: "handong.edu",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 247,
      collegeName: "한양대학교",
      emailDomain: "hanyang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 248,
      collegeName: "한양사이버대학교",
      emailDomain: "hycu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 249,
      collegeName: "세종사이버대학교",
      emailDomain: "sjcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 250,
      collegeName: "한양대학교(ERICA)",
      emailDomain: "hanyang.ac.kr",
      campus: "분교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 251,
      collegeName: "한일장신대학교",
      emailDomain: "hanil.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 252,
      collegeName: "호남신학대학교",
      emailDomain: "htus.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 253,
      collegeName: "한국성서대학교",
      emailDomain: "bible.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 254,
      collegeName: "강동대학교",
      emailDomain: "gangdong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 255,
      collegeName: "가톨릭상지대학교",
      emailDomain: "csj.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 256,
      collegeName: "호서대학교",
      emailDomain: "hoseo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 257,
      collegeName: "홍익대학교",
      emailDomain: "hongik.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 258,
      collegeName: "거제대학교",
      emailDomain: "koje.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 259,
      collegeName: "강원특별자치도립대학교",
      emailDomain: "gw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 260,
      collegeName: "호원대학교",
      emailDomain: "howon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 261,
      collegeName: "한중대학교",
      emailDomain: "hanzhong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 262,
      collegeName: "화신사이버대학교",
      emailDomain: "hscu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 263,
      collegeName: "화성의과학대학교",
      emailDomain: "hsmu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 264,
      collegeName: "강원관광대학교",
      emailDomain: "kt.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 265,
      collegeName: "홍익대학교",
      emailDomain: "hongik.ac.kr",
      campus: "제2캠퍼",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 266,
      collegeName: "ICT폴리텍대학",
      emailDomain: "ict.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 267,
      collegeName: "경기과학기술대학교",
      emailDomain: "gtec.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 268,
      collegeName: "경민대학교",
      emailDomain: "kyungmin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 269,
      collegeName: "경남정보대학교",
      emailDomain: "kit.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 270,
      collegeName: "경남도립남해대학",
      emailDomain: "namhae.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 271,
      collegeName: "한국방송통신대학교",
      emailDomain: "knou.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 272,
      collegeName: "강릉영동대학교",
      emailDomain: "gyc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 273,
      collegeName: "경북도립대학교",
      emailDomain: "gpc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 274,
      collegeName: "계원예술대학교",
      emailDomain: "kaywon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 275,
      collegeName: "계명문화대학교",
      emailDomain: "kmcu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 276,
      collegeName: "고구려대학교",
      emailDomain: "kgrc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 277,
      collegeName: "국제대학교",
      emailDomain: "kookje.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 278,
      collegeName: "경남도립거창대학",
      emailDomain: "gc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 279,
      collegeName: "광양보건대학교",
      emailDomain: "gy.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 280,
      collegeName: "군산간호대학교",
      emailDomain: "kcn.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 281,
      collegeName: "구미대학교",
      emailDomain: "gumi.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 282,
      collegeName: "군장대학교",
      emailDomain: "kunjang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 283,
      collegeName: "광주보건대학교",
      emailDomain: "ghu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 284,
      collegeName: "경인여자대학교",
      emailDomain: "kiwu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 285,
      collegeName: "경북전문대학교",
      emailDomain: "kbc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 286,
      collegeName: "초당대학교",
      emailDomain: "chodang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 287,
      collegeName: "경북과학대학교",
      emailDomain: "kbsc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 288,
      collegeName: "대구보건대학교",
      emailDomain: "dhc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 289,
      collegeName: "대경대학교",
      emailDomain: "tk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 290,
      collegeName: "경북보건대학교",
      emailDomain: "gch.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 291,
      collegeName: "김포대학교",
      emailDomain: "kimpo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 292,
      collegeName: "대구공업대학교",
      emailDomain: "ttc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 293,
      collegeName: "김해대학교",
      emailDomain: "gimhae.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 294,
      collegeName: "대구과학대학교",
      emailDomain: "tsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 295,
      collegeName: "대동대학교",
      emailDomain: "daedong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 296,
      collegeName: "대구미래대학교",
      emailDomain: "dfc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 297,
      collegeName: "농협대학교",
      emailDomain: "nonghyup.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 298,
      collegeName: "기독간호대학교",
      emailDomain: "ccn.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 299,
      collegeName: "대덕대학교",
      emailDomain: "ddu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 300,
      collegeName: "대전과학기술대학교",
      emailDomain: "dst.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 301,
      collegeName: "대전보건대학교",
      emailDomain: "hit.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 302,
      collegeName: "대림대학교",
      emailDomain: "daelim.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 303,
      collegeName: "동남보건대학교",
      emailDomain: "dongnam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 304,
      collegeName: "동서울대학교",
      emailDomain: "du.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 305,
      collegeName: "동부산대학교",
      emailDomain: "dpc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 306,
      collegeName: "대원대학교",
      emailDomain: "daewon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 307,
      collegeName: "동강대학교",
      emailDomain: "dkc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 308,
      collegeName: "동아방송예술대학교",
      emailDomain: "dima.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 309,
      collegeName: "동아보건대학교",
      emailDomain: "duh.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 310,
      collegeName: "동우대학",
      emailDomain: "duc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 311,
      collegeName: "동양미래대학교",
      emailDomain: "dongyang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 312,
      collegeName: "동원과학기술대학교",
      emailDomain: "dist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 313,
      collegeName: "동의과학대학교",
      emailDomain: "dit.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 314,
      collegeName: "경복대학교",
      emailDomain: "kbu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 315,
      collegeName: "동원대학교",
      emailDomain: "tw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 316,
      collegeName: "목포과학대학교",
      emailDomain: "msu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 317,
      collegeName: "문경대학교",
      emailDomain: "mkc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 318,
      collegeName: "마산대학교",
      emailDomain: "masan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 319,
      collegeName: "명지전문대학",
      emailDomain: "mjc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 320,
      collegeName: "백제예술대학교",
      emailDomain: "paekche.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 321,
      collegeName: "배화여자대학교",
      emailDomain: "baewha.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 322,
      collegeName: "두원공과대학교",
      emailDomain: "doowon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 323,
      collegeName: "부산과학기술대학교",
      emailDomain: "bist.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 324,
      collegeName: "구세군사관학교",
      emailDomain: "saotc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 325,
      collegeName: "부산경상대학교",
      emailDomain: "bsks.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 326,
      collegeName: "백석문화대학교",
      emailDomain: "bscu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 327,
      collegeName: "부산보건대학교",
      emailDomain: "bhu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 328,
      collegeName: "부산여자대학교",
      emailDomain: "bwc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 329,
      collegeName: "부산예술대학교",
      emailDomain: "busanarts.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 330,
      collegeName: "서울예술대학교",
      emailDomain: "seoularts.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 331,
      collegeName: "서울여자간호대학교",
      emailDomain: "snjc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 332,
      collegeName: "부천대학교",
      emailDomain: "bc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 333,
      collegeName: "서영대학교",
      emailDomain: "seoyeong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 334,
      collegeName: "삼육보건대학교",
      emailDomain: "shu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 335,
      collegeName: "서정대학교",
      emailDomain: "seojeong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 336,
      collegeName: "성심외국어대학",
      emailDomain: "sungsim.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 337,
      collegeName: "상지영서대학교",
      emailDomain: "sy.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 338,
      collegeName: "서일대학교",
      emailDomain: "seoil.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 339,
      collegeName: "서해대학",
      emailDomain: "sohae.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 340,
      collegeName: "송호대학교",
      emailDomain: "songho.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 341,
      collegeName: "수성대학교",
      emailDomain: "sc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 342,
      collegeName: "세경대학교",
      emailDomain: "saekyung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 343,
      collegeName: "서라벌대학교",
      emailDomain: "sorabol.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 344,
      collegeName: "선린대학교",
      emailDomain: "sunlin.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 345,
      collegeName: "성운대학교",
      emailDomain: "sw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 346,
      collegeName: "송곡대학교",
      emailDomain: "songgok.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 347,
      collegeName: "수원여자대학교",
      emailDomain: "swc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 348,
      collegeName: "수원과학대학교",
      emailDomain: "ssc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 349,
      collegeName: "숭의여자대학교",
      emailDomain: "sewu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 350,
      collegeName: "신성대학교",
      emailDomain: "shinsung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 351,
      collegeName: "신구대학교",
      emailDomain: "shingu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 352,
      collegeName: "순천제일대학교",
      emailDomain: "suncheon.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 353,
      collegeName: "신안산대학교",
      emailDomain: "sau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 354,
      collegeName: "안산대학교",
      emailDomain: "ansan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 355,
      collegeName: "신흥대학교",
      emailDomain: "shc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 356,
      collegeName: "연성대학교",
      emailDomain: "yeonsung.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 357,
      collegeName: "영남이공대학교",
      emailDomain: "ync.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 358,
      collegeName: "연암대학교",
      emailDomain: "yonam.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 359,
      collegeName: "연암공과대학교",
      emailDomain: "yc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 360,
      collegeName: "안동과학대학교",
      emailDomain: "asc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 361,
      collegeName: "영남외국어대학",
      emailDomain: "yflc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 362,
      collegeName: "아주자동차대학교",
      emailDomain: "motor.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 363,
      collegeName: "영진전문대학교",
      emailDomain: "yju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 364,
      collegeName: "영진사이버대학교",
      emailDomain: "ycc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 365,
      collegeName: "오산대학교",
      emailDomain: "osan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 366,
      collegeName: "여주대학교",
      emailDomain: "yit.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 367,
      collegeName: "인천전문대학",
      emailDomain: "icc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 368,
      collegeName: "원광보건대학교",
      emailDomain: "wkhc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 369,
      collegeName: "용인예술과학대학교",
      emailDomain: "ysc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 370,
      collegeName: "유한대학교",
      emailDomain: "yuhan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 371,
      collegeName: "웅지세무대학교",
      emailDomain: "wat.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 372,
      collegeName: "울산과학대학교",
      emailDomain: "uc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 373,
      collegeName: "적십자간호대학",
      emailDomain: "cau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 374,
      collegeName: "우송정보대학",
      emailDomain: "wsi.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 375,
      collegeName: "인천재능대학교",
      emailDomain: "jeiu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 376,
      collegeName: "인덕대학교",
      emailDomain: "induk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 377,
      collegeName: "인하공업전문대학",
      emailDomain: "itc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 378,
      collegeName: "전주기전대학",
      emailDomain: "jk.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 379,
      collegeName: "전남과학대학교",
      emailDomain: "chunnam-c.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 380,
      collegeName: "전남도립대학교",
      emailDomain: "dorip.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 381,
      collegeName: "전북과학대학교",
      emailDomain: "jbsc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 382,
      collegeName: "전주비전대학교",
      emailDomain: "jvision.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 383,
      collegeName: "장안대학교",
      emailDomain: "jangan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 384,
      collegeName: "제주관광대학교",
      emailDomain: "ctc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 385,
      collegeName: "제주산업정보대학",
      emailDomain: "jeju.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 386,
      collegeName: "진주보건대학교",
      emailDomain: "jhc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 387,
      collegeName: "창원문성대학교",
      emailDomain: "cmu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 388,
      collegeName: "청강문화산업대학교",
      emailDomain: "chungkang.academy",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 389,
      collegeName: "조선이공대학교",
      emailDomain: "cst.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 390,
      collegeName: "창신대학",
      emailDomain: "csc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 391,
      collegeName: "제주한라대학교",
      emailDomain: "chu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 392,
      collegeName: "충남도립대학교",
      emailDomain: "cnsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 393,
      collegeName: "청암대학교",
      emailDomain: "scjc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 394,
      collegeName: "조선간호대학교",
      emailDomain: "cnc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 395,
      collegeName: "충청대학교",
      emailDomain: "ok.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 396,
      collegeName: "춘해보건대학교",
      emailDomain: "ch.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 397,
      collegeName: "포항대학교",
      emailDomain: "pohang.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 398,
      collegeName: "충북도립대학교",
      emailDomain: "cpu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 399,
      collegeName: "한국골프대학교",
      emailDomain: "kg.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 400,
      collegeName: "한국관광대학교",
      emailDomain: "ktc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 401,
      collegeName: "충북보건과학대학교",
      emailDomain: "chsu.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 402,
      collegeName: "한국농수산대학교",
      emailDomain: "af.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 403,
      collegeName: "한국복지사이버대학",
      emailDomain: "corea.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 404,
      collegeName: "한국복지대학교",
      emailDomain: "knuw.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 405,
      collegeName: "한국승강기대학교",
      emailDomain: "klc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 406,
      collegeName: "한국폴리텍 I 대학 성남캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 407,
      collegeName: "한국폴리텍 I 대학 서울정수캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 408,
      collegeName: "한국영상대학교",
      emailDomain: "pro.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 409,
      collegeName: "한국폴리텍 I 대학 제주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 410,
      collegeName: "한국폴리텍 I 대학 서울강서캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 411,
      collegeName: "한국폴리텍 II 대학 화성캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 412,
      collegeName: "한국폴리텍 II 대학 남인천캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 413,
      collegeName: "한국폴리텍 III 대학 강릉캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 414,
      collegeName: "한국폴리텍 III 대학 원주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 415,
      collegeName: "한국폴리텍 II 대학 인천캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 416,
      collegeName: "한국폴리텍 III 대학 춘천캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 417,
      collegeName: "한국폴리텍 IV 대학 청주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 418,
      collegeName: "한국폴리텍 IV 대학 아산캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 419,
      collegeName: "한국폴리텍 IV 대학 대전캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 420,
      collegeName: "한국폴리텍 IV 대학 홍성캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 421,
      collegeName: "한국폴리텍 V 대학 순천캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 422,
      collegeName: "한국폴리텍 V 대학 익산캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 423,
      collegeName: "한국폴리텍 V 대학 전남캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 424,
      collegeName: "한국폴리텍 V 대학 전북캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 425,
      collegeName: "한국폴리텍 VI 대학 영남융합기술캠퍼",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 426,
      collegeName: "한영대학교",
      emailDomain: "hanyeong.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 427,
      collegeName: "한국폴리텍 VI 대학 대구캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 428,
      collegeName: "한국폴리텍 VI 대학 구미캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 429,
      collegeName: "한국폴리텍 V 대학 광주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 430,
      collegeName: "한국폴리텍 VI 대학 영주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 431,
      collegeName: "한국폴리텍 VII 대학 동부산캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 432,
      collegeName: "한국폴리텍 VII 대학 부산캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 433,
      collegeName: "한국폴리텍 VII 대학 진주캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 434,
      collegeName: "한국폴리텍 VII 대학 창원캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 435,
      collegeName: "한국폴리텍 특성화대학 로봇캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 436,
      collegeName: "한국폴리텍 특성화대학 항공캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 437,
      collegeName: "한국폴리텍 특성화대학 바이오캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 438,
      collegeName: "한국폴리텍 VII 대학 울산캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 439,
      collegeName: "한국폴리텍 특성화대학 반도체융합캠퍼스",
      emailDomain: "kopo.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 440,
      collegeName: "한양여자대학교",
      emailDomain: "hywoman.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 441,
      collegeName: "호산대학교",
      emailDomain: "hosan.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 442,
      collegeName: "혜전대학교",
      emailDomain: "hj.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 443,
      collegeName: "한림성심대학교",
      emailDomain: "hsc.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 444,
      collegeName: "백석예술대학교",
      emailDomain: "bau.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%87%E1%85%A2%E1%86%A8%E1%84%89%E1%85%A5%E1%86%A8%E1%84%8B%E1%85%A8%E1%84%89%E1%85%AE%E1%86%AF%E1%84%83%E1%85%A2.png",
      isActive: true,
    },
    {
      id: 445,
      collegeName: "국제예술대학교",
      emailDomain: "kua.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 446,
      collegeName: "정화예술대학교",
      emailDomain: "jb.ac.kr",
      campus: "본교",
      collegeImage:
        "https://ssokdak-campus-dev.s3.ap-northeast-2.amazonaws.com/images/college/%E1%84%83%E1%85%B5%E1%84%91%E1%85%A9%E1%86%AF%E1%84%90%E1%85%B3%E1%84%8B%E1%85%B5%E1%84%86%E1%85%B5%E1%84%8C%E1%85%B5.png",
      isActive: false,
    },
    {
      id: 448,
      collegeName: "하버드대학교",
      emailDomain: "co.kr",
      campus: "서울캠퍼스",
      collegeImage: null,
      isActive: false,
    },
  ],
};

export const collegeState = atom({
  key: "college",
  default: initialState,
});
