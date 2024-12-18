import Table from "#/components/Table";
import { useEffect, useState } from "react";
import { Modal } from "#/components/Modal";
import { closeModal, openModal } from "#/utils/useModalHandler";
import { ContentTypes, GroupTypes, TdObjTypes } from "#/data/types/components";
import addComma from "#/utils/useNumComma";
import api from "#/library/axios/api";
import { useRecoilState } from "recoil";
import { loadingState } from "#/library/recoil/atoms/loadingState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import {
  chunk,
  find,
  groupBy,
  isEqual,
  isString,
  map,
  mapValues,
} from "lodash";
import { useSpliceLinkText } from "#/utils/useSpliceLinkText";
import { Alert } from "#/components/Alert";
import CommentsList from "#/components/CommentsList";

import useMakeFreeze from "#/utils/useMakeFreeze";
import { getChangedFileValues } from "#/utils/useGetChangeValues";
import useValidate from "#/utils/useValidate";

function index() {
  const { setLoading, setModalLoading } = useLoadingState();

  const [currentEdit, setCurrentEdit] = useState("");

  const contentInitialValue = {
    groupId: "",
    id: "",
    edit: false,
    mindCategory: "",
    title: "",
    subTitle: "",
    description: "",
    thumbnail: null,
    backgroundImage: null,
    backGroundTitle: "",
    backGround: null,
    soundEffect1: null,
    soundEffect2: null,
    soundEffect3: null,
    soundEffect1Title: "",
    soundEffect2Title: "",
    soundEffect3Title: "",
    isActive: false,
    isHome: false,
    voice1: null,
    voice1Title: "",
    voice1ActiveImage: null,
    voice1InactiveImage: null,
    voice1PanelImage: null,
    voice2: null,
    voice2Title: "",
    voice2ActiveImage: null,
    voice2InactiveImage: null,
    voice2PanelImage: null,
    playTime: 0,
    minutes: "",
    seconds: "",
  };

  const groupInitialValue = {
    id: "",
    mindCategory: "",
    groupName: "",
    introductionImage: null,
    textImage: null,
    characterImage: null,
    introduction: "",
    isActive: "false",
    mindfulness: [],
  };
  const [groupDetail, setGroupDetail] = useState<GroupTypes>(groupInitialValue);

  const [freezeGroup, setFreezeGroup] = useState<{
    mindfulness: [];
    asmr: [];
  }>({ mindfulness: [], asmr: [] });
  const [freezeContent, setFreezeContent] = useState<TdObjTypes[]>();

  const [freezeContentDetail, setFreezeContentDetail] =
    useState<ContentTypes>();
  const [groupSequence, setGroupSequence] = useState<TdObjTypes[]>([]);
  const [contentSequence, setContentSequence] = useState<TdObjTypes[]>([]);

  const [contentDetail, setContentDetail] =
    useState<ContentTypes>(contentInitialValue);

  const [tbodyTrdraggable, setTbodyTrDraggable] = useState<
    "명상그룹" | "ASMR그룹" | "Mindfulness" | "ASMR" | ""
  >("");
  const groupAddedMap = [
    ["sequence", "우선순위"],
    ["id", "그룹 ID"],
    ["groupName", "그룹명"],
    ["mindfulnessNum", "콘텐츠 수"],
    ["isActive", "사용"],
  ];

  const contentsAddedMap = [
    ["sequence", "우선순위"],
    ["id", "영상 ID"],
    ["title", "제목"],
    ["views", "조회수"],
    ["commentNum", "댓글"],
    ["thumbnail", "썸네일"],
    ["isActive", "사용"],
  ];

  const [groupData, setGroupData] = useState({
    mindfulness: [],
    asmr: [],
  });

  const submitMediaContent = () => {
    setModalLoading(true);
    const contentForm = new FormData();

    if (contentDetail.thumbnail !== null) {
      contentForm.append("thumbnail", contentDetail.thumbnail);
    }
    if (contentDetail.backgroundImage !== null) {
      contentForm.append("backgroundImage", contentDetail.backgroundImage);
    }
    if (contentDetail.backGround !== null) {
      contentForm.append("backGround", contentDetail.backGround);
    }
    if (contentDetail.voice1 !== null) {
      contentForm.append("voice1", contentDetail.voice1);
    }
    if (contentDetail.voice1ActiveImage !== null) {
      contentForm.append("voice1ActiveImage", contentDetail.voice1ActiveImage);
    }

    if (contentDetail.voice1InactiveImage !== null) {
      contentForm.append(
        "voice1InactiveImage",
        contentDetail.voice1InactiveImage
      );
    }
    if (contentDetail.voice1PanelImage !== null) {
      contentForm.append("voice1PanelImage", contentDetail.voice1PanelImage);
    }
    if (contentDetail.voice2 !== null) {
      contentForm.append("voice2", contentDetail.voice2);
    }

    if (contentDetail.voice2ActiveImage !== null) {
      contentForm.append("voice2ActiveImage", contentDetail.voice2ActiveImage);
    }

    if (contentDetail.voice2InactiveImage !== null) {
      contentForm.append(
        "voice2InactiveImage",
        contentDetail.voice2InactiveImage
      );
    }
    if (contentDetail.voice2PanelImage !== null) {
      contentForm.append("voice2PanelImage", contentDetail.voice2PanelImage);
    }

    if (contentDetail.soundEffect1 !== null) {
      contentForm.append("soundEffect1", contentDetail.soundEffect1);
    }
    if (contentDetail.soundEffect2 !== null) {
      contentForm.append("soundEffect2", contentDetail.soundEffect2);
    }
    if (contentDetail.soundEffect3 !== null) {
      contentForm.append("soundEffect3", contentDetail.soundEffect3);
    }

    contentForm.append("groupId", groupDetail.id);

    contentForm.append("title", contentDetail.title);
    contentForm.append("subTitle", contentDetail.subTitle);

    contentForm.append("description", contentDetail.description);

    contentForm.append("isActive", String(contentDetail.isActive));

    const playTime =
      !contentDetail.minutes && !contentDetail.seconds
        ? contentDetail.playTime
        : Number(contentDetail.minutes) * 60 + Number(contentDetail.seconds);
    contentForm.append("playTime", String(playTime));

    contentForm.append("voice1Title", contentDetail.voice1Title);
    contentForm.append("voice2Title", contentDetail.voice2Title);
    contentForm.append("backGroundTitle", contentDetail.backGroundTitle);

    contentForm.append("soundEffect1Title", contentDetail.soundEffect1Title);
    contentForm.append("soundEffect2Title", contentDetail.soundEffect2Title);
    contentForm.append("soundEffect3Title", contentDetail.soundEffect3Title);

    api
      .post("/admin/mindfulness", contentForm, {
        headers: {
          "Content-Type": "multipart/form-data",
          charset: "UTF-8",
        },
      })
      .then(() => {
        setModalLoading(false);

        submitSearchGroupDetail(Number(groupDetail.id));
        setContentDetail(contentInitialValue);
        closeModal("content-modal");
      })
      .catch((error) => {
        console.log(error);
        setContentDetail(contentInitialValue);
        closeModal("content-modal");

        setModalLoading(false);
      });
  };

  const submitSearchGroup = () => {
    // setLoading(true);
    // api
    //   .get("/admin/mindfulness/group")
    //   .then((result) => {
    //     setLoading(false);

    //     const copy = useMakeFreeze(result.data);
    //     setFreezeGroup(copy);
    //     setGroupData(result.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      mindfulness: [
        {
          id: 2,
          sequence: 2,
          mindCategory: "Mindfulness",
          groupName: "처음 시작하는 마음챙김",
          isActive: true,
          mindfulnessNum: 15,
        },
        {
          id: 1,
          sequence: 1,
          mindCategory: "Mindfulness",
          groupName: "처음 시작하는 마음챙김 연습 -명상",
          isActive: false,
          mindfulnessNum: 0,
        },
      ],
      asmr: [],
    };

    const copy = useMakeFreeze(dummyResult);
    setFreezeGroup(copy);
    setGroupData(dummyResult);
  };

  const [freezeGroupDetail, setFreezeGroupDetail] = useState<GroupTypes>();
  const submitSearchGroupDetail = (groupId: number) => {
    // setLoading(true);
    // api
    //   .get(`/admin/mindfulness/group/${groupId}`)
    //   .then((result) => {
    //     setLoading(false);

    //     const groupObj: GroupTypes = {
    //       id: String(result.data.id),
    //       mindCategory: result.data.mindCategory,
    //       groupName: result.data.groupName,
    //       introduction: result.data.introduction,
    //       isActive: result.data.isActive,
    //       introductionImage: result.data.introductionImage,
    //       textImage: result.data.textImage,
    //       characterImage: result.data.characterImage,
    //       mindfulness: result.data.mindfulness,
    //     };
    //     setGroupDetail(groupObj);
    //     const copyMindfulness = useMakeFreeze(result.data.mindfulness);

    //     const copyGroupDetail = useMakeFreeze(groupObj);

    //     setFreezeContent(copyMindfulness);
    //     setFreezeGroupDetail(copyGroupDetail);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      id: 2,
      mindCategory: "Mindfulness",
      groupName: "처음 시작하는 마음챙김",
      introduction:
        "행복해지기 위한 습관, 매일 7분으로 시작해 볼까요?\r\n스트레스로 지치고 무기력할 때, 함께 해요!\r\n스트레스를 줄이고, 마음을 안정시켜줘요.\r\n속마음 닥터 쏙닥쏙닥과 함께 몸과 마음을 편안하게 해볼까요?",
      isActive: true,
      introductionImage:
        "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729558431034_img_meditation_detail_01.png",
      textImage:
        "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729558431042_img_home_meditation_1_title.png",
      characterImage:
        "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729558431043_img_home_meditation_1_character.png",
      mindfulness: [
        {
          id: 1,
          sequence: 1,
          title: "처음 시작하는 마음챙김",
          views: 355,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729562147404_img_meditation_1_thumbnail_01.png",
          isActive: true,
          commentNum: 32,
        },
        {
          id: 2,
          sequence: 2,
          title: "호흡으로 편안해지는 마음챙김",
          views: 113,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729570163316_img_meditation_1_thumbnail_02.png",
          isActive: true,
          commentNum: 1,
        },
        {
          id: 3,
          sequence: 3,
          title: "하루 마무리하는 마음챙김",
          views: 102,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729572699637_img_meditation_1_thumbnail_03.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 4,
          sequence: 4,
          title: "누워서 마음챙김 연습하기",
          views: 73,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729576057008_img_meditation_1_thumbnail_04.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 5,
          sequence: 5,
          title: "저녁에 누워서 하는 마음챙김",
          views: 44,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729579397582_img_meditation_1_thumbnail_05.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 6,
          sequence: 6,
          title: "부정적 감정 내보내기",
          views: 34,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729580652871_img_meditation_1_thumbnail_06.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 7,
          sequence: 7,
          title: "나뭇잎에 근심 걱정 보내기",
          views: 43,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729585251905_img_meditation_1_thumbnail_07.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 8,
          sequence: 8,
          title: "구름위에 생각, 감정 보내기",
          views: 43,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729586392800_img_meditation_1_thumbnail_08.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 15,
          sequence: 9,
          title: "음식과 함께하는 마음챙김",
          views: 5,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729741473288_img_meditation_1_thumbnail_09.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 10,
          sequence: 10,
          title: "산책하며 마음을 챙기기",
          views: 44,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729588499300_img_meditation_1_thumbnail_10.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 11,
          sequence: 11,
          title: "나를 사랑하는 마음챙김",
          views: 43,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729589393032_img_meditation_1_thumbnail_11.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 12,
          sequence: 12,
          title: "타인을 위한 마음챙김 명상",
          views: 27,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729591840620_img_meditation_1_thumbnail_12.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 13,
          sequence: 13,
          title: "행복한 하루 시작 명상",
          views: 51,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729593583392_img_meditation_1_thumbnail_13.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 14,
          sequence: 14,
          title: "나에게 힘이 되는 명상",
          views: 61,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729594285160_img_meditation_1_thumbnail_14.png",
          isActive: true,
          commentNum: 0,
        },
        {
          id: 9,
          sequence: 15,
          title: "음식과 함께하는 마음챙김",
          views: 58,
          thumbnail:
            "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729587169806_img_meditation_1_thumbnail_09.png",
          isActive: true,
          commentNum: 0,
        },
      ],
    };
    const groupObj: GroupTypes = {
      id: String(dummyResult.id),
      mindCategory: dummyResult.mindCategory,
      groupName: dummyResult.groupName,
      introduction: dummyResult.introduction,
      isActive: dummyResult.isActive,
      introductionImage: dummyResult.introductionImage,
      textImage: dummyResult.textImage,
      characterImage: dummyResult.characterImage,
      mindfulness: dummyResult.mindfulness,
    };
    setGroupDetail(groupObj);
    const copyMindfulness = useMakeFreeze(dummyResult.mindfulness);

    const copyGroupDetail = useMakeFreeze(groupObj);

    setFreezeContent(copyMindfulness);
    setFreezeGroupDetail(copyGroupDetail);
  };

  const submitSearchContentDetail = (mindfullnessId: number) => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/mindfulness/${mindfullnessId}`)
    //   .then((result) => {
    //     setModalLoading(false);

    //     const keyWithDetails = mapValues(
    //       groupBy(result.data.details, "soundType"),
    //       (arr) => arr[0]
    //     );

    //     const min =
    //       Math.floor(result.data.playTime / 60) < 10
    //         ? "0" + String(Math.floor(result.data.playTime / 60))
    //         : String(Math.floor(result.data.playTime / 60));
    //     const sec =
    //       result.data.playTime % 60 < 10
    //         ? "0" + String(result.data.playTime % 60)
    //         : String(result.data.playTime % 60);
    //     const obj: ContentTypes = {
    //       groupId: result.data.groupId || "",
    //       id: result.data.id,
    //       title: result.data.title || "",
    //       subTitle: result.data.subTitle || "",
    //       description: result.data.description || "",
    //       thumbnail: result.data.thumbnail || null,
    //       isActive: result.data.isActive || false,
    //       playTime: result.data.playTime || 0,
    //       minutes: min || "",
    //       seconds: sec || "",
    //       voice1: keyWithDetails["Voice1"]?.soundLink || null,
    //       voice1Title: keyWithDetails["Voice1"]?.title || "",
    //       voice1ActiveImage: keyWithDetails["Voice1"]?.imageLink.active || null,
    //       voice1InactiveImage:
    //         keyWithDetails["Voice1"]?.imageLink.inactive || null,
    //       voice1PanelImage: keyWithDetails["Voice2"]?.imageLink.panel || null,
    //       voice2: keyWithDetails["Voice2"]?.soundLink || null,
    //       voice2Title: keyWithDetails["Voice2"]?.title || "",
    //       voice2ActiveImage: keyWithDetails["Voice2"]?.imageLink.active || null,
    //       voice2InactiveImage:
    //         keyWithDetails["Voice2"]?.imageLink.inactive || null,
    //       voice2PanelImage: keyWithDetails["Voice2"]?.imageLink.panel || null,
    //       backGround: keyWithDetails["BackGround"]?.soundLink || null,
    //       backGroundTitle: keyWithDetails["BackGround"]?.title || "",
    //       backgroundImage: result.data.backgroundImage || null,
    //       soundEffect1: keyWithDetails["SoundEffect1"]?.soundLink || null,
    //       soundEffect1Title: keyWithDetails["SoundEffect1"]?.title || "",
    //       soundEffect2: keyWithDetails["SoundEffect2"]?.soundLink || null,
    //       soundEffect2Title: keyWithDetails["SoundEffect2"]?.title || "",
    //       soundEffect3: keyWithDetails["SoundEffect3"]?.soundLink || null,
    //       soundEffect3Title: keyWithDetails["SoundEffect3"]?.title || "",
    //     };
    //     setContentDetail(obj);

    //     const copy = useMakeFreeze(obj);
    //     setFreezeContentDetail(copy);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setModalLoading(false);
    //   });

    const dummyResult: any = {
      id: 1,
      groupId: 2,
      title: "처음 시작하는 마음챙김",
      subTitle: "처음시작하는 마음챙김",
      description:
        "마음챙김 명상을 시작해 볼까요?\r\n들리는 소리에 맞춰 호흡을 통해 \r\n몸과 마음을 편안하게 해보아요.\r\n호흡은 몸을 이완시켜 \r\n몸과 마음을 편안하게 도와줘요\r\n함께 연습해 보아요!",
      thumbnail:
        "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729562147404_img_meditation_1_thumbnail_01.png",
      backgroundImage:
        "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729685953380_img_meditation_1_player_bg_01.png",
      isActive: true,
      views: 355,
      playTime: 398,
      commentNum: 32,
      details: [
        {
          detailId: 1,
          title: "숲속의 새 소리",
          soundType: "SoundEffect1",
          soundLink:
            "https://d3dn2ixx1o4rgk.cloudfront.net/mp3/stage/1729685953384_ëªì1-ì (1).mp3",
          imageLink: null,
        },
        {
          detailId: 2,
          title: "시냇물 소리",
          soundType: "SoundEffect2",
          soundLink:
            "https://d3dn2ixx1o4rgk.cloudfront.net/mp3/stage/1729685953516_ëªì1-ê° (1).mp3",
          imageLink: null,
        },
        {
          detailId: 3,
          title: "엘리",
          soundType: "Voice1",
          soundLink:
            "https://d3dn2ixx1o4rgk.cloudfront.net/mp3/stage/1729738511976_ëªì1-1024ì¬.mp3",
          imageLink: {
            panel:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729576912480_thumbnail_profile_1.png",
            active:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729685953095_%C3%AD%C2%99%C2%9C%C3%AC%C2%84%C2%B1%20%C3%AC%C2%97%C2%98%C3%AB%C2%A6%C2%AC.png",
            inactive:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729685953097_%C3%AB%C2%B9%C2%84%C3%AD%C2%99%C2%9C%C3%AC%C2%84%C2%B1%20%C3%AC%C2%97%C2%98%C3%AB%C2%A6%C2%AC.png",
          },
        },
        {
          detailId: 4,
          title: "앤디",
          soundType: "Voice2",
          soundLink:
            "https://d3dn2ixx1o4rgk.cloudfront.net/mp3/stage/1729738512019_ëªì1-1024ë¨.mp3",
          imageLink: {
            panel:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729576912637_thumbnail_profile_2.png",
            active:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729685953284_%C3%AD%C2%99%C2%9C%C3%AC%C2%84%C2%B1%20%C3%AC%C2%95%C2%A4%C3%AB%C2%94%C2%94.png",
            inactive:
              "https://ssokdak-campus-stage.s3.ap-northeast-2.amazonaws.com/mindfulness/1729685953293_%C3%AB%C2%B9%C2%84%C3%AD%C2%99%C2%9C%C3%AC%C2%84%C2%B1%20%C3%AC%C2%95%C2%A4%C3%AB%C2%94%C2%94.png",
          },
        },
        {
          detailId: 5,
          title: "편안함을 주는 피아노소리",
          soundType: "BackGround",
          soundLink:
            "https://d3dn2ixx1o4rgk.cloudfront.net/mp3/stage/1729685953295_ëªì-í¼ìë¸ 1 (1).mp3",
          imageLink: null,
        },
      ],
    };

    const keyWithDetails = mapValues(
      groupBy(dummyResult.details, "soundType"),
      (arr) => arr[0]
    );

    const min =
      Math.floor(dummyResult.playTime / 60) < 10
        ? "0" + String(Math.floor(dummyResult.playTime / 60))
        : String(Math.floor(dummyResult.playTime / 60));
    const sec =
      dummyResult.playTime % 60 < 10
        ? "0" + String(dummyResult.playTime % 60)
        : String(dummyResult.playTime % 60);
    const obj: ContentTypes = {
      groupId: dummyResult.groupId || "",
      id: dummyResult.id,
      title: dummyResult.title || "",
      subTitle: dummyResult.subTitle || "",
      description: dummyResult.description || "",
      thumbnail: dummyResult.thumbnail || null,
      isActive: dummyResult.isActive || false,
      playTime: dummyResult.playTime || 0,
      minutes: min || "",
      seconds: sec || "",
      voice1: keyWithDetails["Voice1"]?.soundLink || null,
      voice1Title: keyWithDetails["Voice1"]?.title || "",
      voice1ActiveImage: keyWithDetails["Voice1"]?.imageLink.active || null,
      voice1InactiveImage: keyWithDetails["Voice1"]?.imageLink.inactive || null,
      voice1PanelImage: keyWithDetails["Voice2"]?.imageLink.panel || null,
      voice2: keyWithDetails["Voice2"]?.soundLink || null,
      voice2Title: keyWithDetails["Voice2"]?.title || "",
      voice2ActiveImage: keyWithDetails["Voice2"]?.imageLink.active || null,
      voice2InactiveImage: keyWithDetails["Voice2"]?.imageLink.inactive || null,
      voice2PanelImage: keyWithDetails["Voice2"]?.imageLink.panel || null,
      backGround: keyWithDetails["BackGround"]?.soundLink || null,
      backGroundTitle: keyWithDetails["BackGround"]?.title || "",
      backgroundImage: dummyResult.backgroundImage || null,
      soundEffect1: keyWithDetails["SoundEffect1"]?.soundLink || null,
      soundEffect1Title: keyWithDetails["SoundEffect1"]?.title || "",
      soundEffect2: keyWithDetails["SoundEffect2"]?.soundLink || null,
      soundEffect2Title: keyWithDetails["SoundEffect2"]?.title || "",
      soundEffect3: keyWithDetails["SoundEffect3"]?.soundLink || null,
      soundEffect3Title: keyWithDetails["SoundEffect3"]?.title || "",
    };
    setContentDetail(obj);

    const copy = useMakeFreeze(obj);
    setFreezeContentDetail(copy);
  };
  const submitAddGroup = () => {
    setModalLoading(true);

    const groupForm = new FormData();

    if (groupDetail.introductionImage !== null) {
      groupForm.append("introductionImage", groupDetail.introductionImage);
    }

    if (groupDetail.textImage !== null) {
      groupForm.append("textImage", groupDetail.textImage);
    }

    if (groupDetail.characterImage !== null) {
      groupForm.append("characterImage", groupDetail.characterImage);
    }

    groupForm.append("groupName", groupDetail.groupName);
    groupForm.append("introduction", groupDetail.introduction);

    groupForm.append("mindCategory", groupDetail.mindCategory);
    groupForm.append("isActive", groupDetail.isActive);

    api
      .post("/admin/mindfulness/group", groupForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setModalLoading(false);

        submitSearchGroup();
        setGroupDetail(groupInitialValue);
        closeModal("group-modal");
      })
      .catch((error) => {
        console.log(error);

        setGroupDetail(groupInitialValue);
        closeModal("group-modal");
        setModalLoading(false);
      });
  };

  useEffect(() => {
    submitSearchGroup();
  }, []);

  const submitPutSequence = (type: string) => {
    const copy = type === "group" ? [...groupSequence] : [...contentSequence];

    const emptyArr: {}[] = [];

    map(copy, (item, index) => {
      const obj = {
        id: item.id,
        sequence: index + 1,
      };

      emptyArr.push(obj);
    });

    api
      .put(
        type === "group"
          ? `admin/mindfulness/group/sequence`
          : `admin/mindfulness/sequence`,
        { newSort: emptyArr }
      )
      .then((result) => {
        console.log(result, "put sequence success");
        if (type === "group") {
          submitSearchGroup();
        } else {
          submitSearchGroupDetail(Number(groupDetail.id));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitPutEditContent = (obj: { [key: string]: File | string }) => {
    setLoading(true);

    const keys = Object.keys(obj);

    const editContentForm = new FormData();
    editContentForm.append("groupId", contentDetail.groupId);
    editContentForm.append("mindfulnessId", contentDetail.id);

    map(keys, (item) => {
      editContentForm.append(item, obj[item]);
    });

    editContentForm.append("title", contentDetail.title);
    editContentForm.append("subTitle", contentDetail.subTitle);
    editContentForm.append("description", contentDetail.description);
    editContentForm.append("isActive", String(contentDetail.isActive));

    const playTime =
      !contentDetail.minutes && !contentDetail.seconds
        ? contentDetail.playTime
        : Number(contentDetail.minutes) * 60 + Number(contentDetail.seconds);

    editContentForm.append("playTime", String(playTime));

    if (groupDetail.mindCategory === "Mindfulness") {
      editContentForm.append("voice1Title", contentDetail.voice1Title);
      editContentForm.append("voice2Title", contentDetail.voice2Title);
    }

    editContentForm.append("backGroundTitle", contentDetail.backGroundTitle);

    editContentForm.append(
      "soundEffect1Title",
      contentDetail.soundEffect1Title
    );
    editContentForm.append(
      "soundEffect2Title",
      contentDetail.soundEffect2Title
    );

    if (groupDetail.mindCategory === "ASMR") {
      editContentForm.append(
        "soundEffect3Title",
        contentDetail.soundEffect3Title
      );
    }

    api
      .put("/admin/mindfulness", editContentForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);
        submitSearchGroupDetail(Number(groupDetail.id));

        setContentDetail(contentInitialValue);
        closeModal("content-modal");
      })
      .catch((error) => {
        console.log(error);
        setContentDetail(contentInitialValue);
        closeModal("content-modal");
        setLoading(false);
      });
  };

  const submitPutEditGroup = (obj: { [key: string]: File | string }) => {
    setLoading(true);

    const keys = Object.keys(obj);

    const editGroupForm = new FormData();
    editGroupForm.append("groupId", groupDetail.id);

    map(keys, (item) => {
      editGroupForm.append(item, obj[item]);
    });

    editGroupForm.append("groupName", groupDetail.groupName);
    editGroupForm.append("introduction", groupDetail.introduction);

    editGroupForm.append("mindCategory", groupDetail.mindCategory);
    editGroupForm.append("isActive", groupDetail.isActive);
    for (const [key, value] of editGroupForm.entries()) {
      console.log(`${key}: ${value}`);
    }

    api
      .put("/admin/mindfulness/group", editGroupForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);

        submitSearchGroup();
        closeModal("group-modal");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const chageActive = (type: string, item: TdObjTypes) => {
    setLoading(true);

    const activeChangeForm = new FormData();

    const url =
      type === "group" ? "/admin/mindfulness/group" : "/admin/mindfulness";
    if (type === "group") {
      activeChangeForm.append("groupId", item.id as string);
    }
    if (type === "mindfulness") {
      activeChangeForm.append("groupId", groupDetail.id);
      activeChangeForm.append("mindfulnessId", item.id as string);
    }
    activeChangeForm.append("isActive", String(!item.isActive));

    for (const [key, value] of activeChangeForm.entries()) {
      console.log(`${key}: ${value}`);
    }
    api
      .put(url, activeChangeForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setLoading(false);

        if (type === "group") {
          submitSearchGroup();
        } else {
          submitSearchGroupDetail(Number(groupDetail.id));
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const [commentPerPage, setCommentPerPage] = useState({
    page: 1,
    perPage: 100,
    pageLength: 1,
  });

  const [comments, setComments] = useState<any[][]>([[]]);
  const [searchComment, setSearchComment] = useState("");

  const submitGetComments = (id: string, searchWord?: string) => {
    // setLoading(true);
    // api
    //   .get(`/admin/mindfulness/comment`, {
    //     params: {
    //       mindfulnessId: Number(id),
    //       page: commentPerPage.page,
    //       searchWord: searchWord,
    //     },
    //   })
    //   .then((result) => {
    //     setLoading(false);

    //     const copyCommnets = [...(result.data.comments || [])];
    //     const chunked = chunk(copyCommnets, commentPerPage.perPage);
    //     setComments(chunked);

    //     setCommentPerPage((prev) => {
    //       return {
    //         ...prev,
    //         pageLength: Math.ceil(result.data.totalCount / prev.perPage),
    //       };
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });

    const dummyResult: any = {
      totalCount: 8,
      comments: [
        {
          id: 34,
          userName: "그시",
          userId: 62,
          createdAt: "2024-12-18 14:05:10",
          updatedAt: "2024-12-18 14:05:10",
          comment: "하이용",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 20,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 14:38:38",
          updatedAt: "2024-12-10 14:38:38",
          comment: "해피해킹",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 15,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 14:38:03",
          updatedAt: "2024-12-10 14:38:03",
          comment: "하이요",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 6,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 09:40:12",
          updatedAt: "2024-12-10 09:40:12",
          comment: "족발",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 5,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 09:37:12",
          updatedAt: "2024-12-10 09:37:12",
          comment: "치킨",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 4,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 09:35:50",
          updatedAt: "2024-12-10 09:35:50",
          comment: "햄버거",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 3,
          userName: "정주",
          userId: 57,
          createdAt: "2024-12-10 09:34:01",
          updatedAt: "2024-12-10 09:34:01",
          comment: "피자",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
        {
          id: 1,
          userName: "카고임",
          userId: 29,
          createdAt: "2024-11-07 14:05:36",
          updatedAt: "2024-11-07 14:05:36",
          comment: "ㅎㅇ",
          like: 0,
          isDeleted: false,
          mindfulnessCommentId: null,
          reportNum: 0,
        },
      ],
    };

    const copyCommnets = [...(dummyResult.comments || [])];
    const chunked = chunk(copyCommnets, commentPerPage.perPage);
    setComments(chunked);

    setCommentPerPage((prev) => {
      return {
        ...prev,
        pageLength: Math.ceil(dummyResult.totalCount / prev.perPage),
      };
    });
  };

  const submitDeleteComment = (id: string) => {
    api
      .delete(`/admin/mindfulness/comment/${id}`)
      .then((result) => {
        console.log("success delete", result);

        setLoading(false);

        submitGetComments(contentDetail.id);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const mindfulnessDisables = [
    {
      condition: (item: string) => item === "",
      keys: [
        "title",
        "minutes",
        "seconds",
        "voice1Title",
        "voice2Title",
        "backGroundTitle",
        "soundEffect1Title",
        "soundEffect2Title",
        "subTitle",
        "description",
      ],
    },
    {
      condition: (item: File | null) => item === null,
      keys: [
        "thumbnail",
        "voice1ActiveImage",
        "voice1InactiveImage",
        "voice1PanelImage",
        "voice1",
        "voice2ActiveImage",
        "voice2InactiveImage",
        "voice2PanelImage",
        "voice2",
        "backgroundImage",
        "backGround",
        "soundEffect1",
        "soundEffect2",
      ],
    },
  ];

  const asmrDisables = [
    {
      condition: (item: string) => item === "",
      keys: [
        "title",
        "minutes",
        "seconds",
        "backGroundTitle",
        "soundEffect1Title",
        "soundEffect2Title",
        "soundEffect3Title",
        "subTitle",
        "description",
      ],
    },
    {
      condition: (item: File | null) => item === null,
      keys: [
        "thumbnail",
        "backgroundImage",
        "backGround",
        "soundEffect1",
        "soundEffect2",
        "soundEffect3",
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full gap-10">
      <div>
        <Table
          tableTitle="명상 그룹"
          divider={false}
          data={groupData["mindfulness"] || []}
          addedMap={groupAddedMap}
          tdOptions={{
            isActive: {
              el: (isActive: boolean, _: number, item: TdObjTypes) => {
                return (
                  <div className={`flex justify-center `}>
                    <input
                      type="checkbox"
                      disabled={tbodyTrdraggable === "명상그룹"}
                      className="toggle toggle-primary max-xl:toggle-sm"
                      checked={isActive}
                      onChange={() => {
                        chageActive("group", item);
                      }}
                    />
                  </div>
                );
              },
            },
          }}
          trOptions={{
            thead: {
              isDraggable: () => tbodyTrdraggable !== "명상그룹",
            },
            tbody: {
              isDraggable: (item: TdObjTypes) => {
                return tbodyTrdraggable === "명상그룹";
              },
              dbClickFunc: (item: TdObjTypes) => {
                submitSearchGroupDetail(item.id as number);
                openModal("group-modal");
                setGroupDetail((prev) => {
                  return { ...prev, mindCategory: "Mindfulness" };
                });
                setCurrentEdit("group-detail");
              },
              dragEndFunc: (e: TdObjTypes[]) => {
                const sortedData = map(e, (order) =>
                  find(groupData.mindfulness, { id: order.id })
                );

                setGroupSequence(sortedData as []);
              },
            },
          }}
          buttons={
            <>
              {tbodyTrdraggable === "명상그룹" ? (
                <>
                  <button
                    className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setTbodyTrDraggable("");
                      setGroupSequence([]);
                      setGroupData(freezeGroup);
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      // submitPutSequence("group");
                      setTbodyTrDraggable("");
                      setGroupSequence([]);
                    }}
                    disabled={isEqual(freezeGroup?.mindfulness, groupSequence)}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setTbodyTrDraggable("명상그룹");
                      setGroupSequence(groupData.mindfulness);
                    }}
                    disabled={groupData["mindfulness"].length < 2}
                  >
                    우선순위 변경
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setGroupDetail((prev) => {
                        return {
                          ...prev,
                          mindCategory: "Mindfulness",
                        };
                      });
                      setCurrentEdit("");
                      openModal("group-modal");
                    }}
                  >
                    추가
                  </button>
                </>
              )}
            </>
          }
        />
      </div>

      <div>
        <Table
          tableTitle="ASMR 그룹"
          divider={false}
          data={groupData["asmr"] || []}
          addedMap={groupAddedMap}
          tdOptions={{
            isActive: {
              el: (isActive: boolean, _: number, item: TdObjTypes) => {
                return (
                  <div className={`flex justify-center `}>
                    <input
                      type="checkbox"
                      disabled={tbodyTrdraggable === "ASMR그룹"}
                      className="toggle toggle-primary max-xl:toggle-sm"
                      checked={isActive}
                      onChange={() => {
                        chageActive("group", item);
                      }}
                    />
                  </div>
                );
              },
            },
          }}
          trOptions={{
            thead: {
              isDraggable: (item: TdObjTypes) => {
                return item?.isActive && tbodyTrdraggable === "ASMR그룹";
              },
            },
            tbody: {
              isDraggable: (item: TdObjTypes) => {
                return item?.isActive && tbodyTrdraggable === "ASMR그룹";
              },
              dbClickFunc: (item: TdObjTypes, index: number) => {
                // submitSearchGroupDetail(item.id as number);
                openModal("group-modal");
                setGroupDetail((prev) => {
                  return { ...prev, mindCategory: "ASMR" };
                });
                setCurrentEdit("group-detail");
              },
              dragEndFunc: (e: TdObjTypes[]) => {
                const sortedData = map(e, (order) =>
                  find(groupData.asmr, { id: order.id })
                );

                setGroupSequence(sortedData as []);
              },
            },
          }}
          buttons={
            <>
              {tbodyTrdraggable === "ASMR그룹" ? (
                <>
                  <button
                    className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setTbodyTrDraggable("");
                      setGroupSequence([]);
                      setGroupData(freezeGroup);
                    }}
                  >
                    취소
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      // submitPutSequence("group");
                      setTbodyTrDraggable("");
                      setGroupSequence([]);
                    }}
                    disabled={isEqual(freezeGroup?.asmr, groupSequence)}
                  >
                    저장
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setTbodyTrDraggable("ASMR그룹");

                      setGroupSequence(groupData.asmr);
                    }}
                    disabled={groupData["asmr"].length < 2}
                  >
                    우선순위 변경
                  </button>
                  <button
                    className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                    onClick={() => {
                      setGroupDetail((prev) => {
                        return { ...prev, mindCategory: "ASMR" };
                      });
                      setCurrentEdit("");
                      openModal("group-modal");
                    }}
                  >
                    추가
                  </button>
                </>
              )}
            </>
          }
        />
      </div>

      {/* 그룹 모달 */}
      <Modal
        id="group-modal"
        className="h-full"
        closeFunc={() => {
          setGroupDetail(groupInitialValue);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              {groupDetail.mindCategory} 그룹{" "}
              {currentEdit === "group-detail" ? "수정" : "등록"}
            </div>

            <div className="flex flex-col gap-10 pb-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  그룹명
                </div>

                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">구분</span>
                  <input
                    disabled
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={groupDetail.mindCategory || ""}
                    onChange={(e) => {
                      setGroupDetail((prev) => {
                        return { ...prev, groupName: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>

                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">소개 이미지</span>

                  <label
                    htmlFor="group-introductionImage"
                    className={`${
                      groupDetail.introductionImage?.name ||
                      groupDetail.introductionImage
                        ? "col-span-1 btn-disabled"
                        : "col-span-2"
                    }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  {groupDetail.introductionImage && (
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip={
                        groupDetail.introductionImage?.name ||
                        useSpliceLinkText(String(groupDetail.introductionImage))
                      }
                    >
                      <div
                        className={`truncate text-left ${
                          groupDetail.introductionImage?.name ||
                          groupDetail.introductionImage
                            ? ""
                            : "hidden"
                        } `}
                      >
                        {groupDetail.introductionImage?.name ||
                          useSpliceLinkText(
                            String(groupDetail.introductionImage)
                          )}
                      </div>

                      <span
                        className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                        onClick={() => {
                          setGroupDetail((prev) => {
                            return {
                              ...prev,
                              introductionImage: null,
                            };
                          });
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}

                  <div className="col-span-3 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요
                    {/* (권장 해상도 444 X
                    444) */}
                  </div>
                  <input
                    id="group-introductionImage"
                    type="file"
                    className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setGroupDetail((prev) => {
                          return {
                            ...prev,
                            introductionImage: file,
                          };
                        });
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>

                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">텍스트 이미지</span>

                  <label
                    htmlFor="group-textImage"
                    className={`${
                      groupDetail.textImage?.name || groupDetail.textImage
                        ? "col-span-1 btn-disabled"
                        : "col-span-2"
                    }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  {groupDetail.textImage && (
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip={
                        groupDetail.textImage?.name ||
                        useSpliceLinkText(String(groupDetail.textImage))
                      }
                    >
                      <div
                        className={`truncate text-left ${
                          groupDetail.textImage?.name || groupDetail.textImage
                            ? ""
                            : "hidden"
                        } `}
                      >
                        {groupDetail.textImage?.name ||
                          useSpliceLinkText(String(groupDetail.textImage))}
                      </div>
                      <span
                        className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                        onClick={() => {
                          setGroupDetail((prev) => {
                            return {
                              ...prev,
                              textImage: null,
                            };
                          });
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}

                  <div className="col-span-3 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요
                    {/* (권장 해상도 444 X
                    444) */}
                  </div>
                  <input
                    id="group-textImage"
                    type="file"
                    className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setGroupDetail((prev) => {
                          return {
                            ...prev,
                            textImage: file,
                          };
                        });

                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">캐릭터 이미지</span>

                  <label
                    htmlFor="group-character"
                    className={`${
                      groupDetail.characterImage?.name ||
                      groupDetail.characterImage
                        ? "col-span-1 btn-disabled"
                        : "col-span-2"
                    }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  {groupDetail.characterImage && (
                    <div
                      className="tooltip tooltip-bottom"
                      data-tip={
                        groupDetail.characterImage?.name ||
                        useSpliceLinkText(String(groupDetail.characterImage))
                      }
                    >
                      <div
                        className={`truncate text-left ${
                          groupDetail.characterImage?.name ||
                          groupDetail.characterImage
                            ? ""
                            : "hidden"
                        } `}
                      >
                        {groupDetail.characterImage?.name ||
                          useSpliceLinkText(String(groupDetail.characterImage))}
                      </div>
                      <span
                        className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                        onClick={() => {
                          setGroupDetail((prev) => {
                            return {
                              ...prev,
                              characterImage: null,
                            };
                          });
                        }}
                      >
                        x
                      </span>
                    </div>
                  )}

                  <div className="col-span-3 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요
                  </div>
                  <input
                    id="group-character"
                    type="file"
                    className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setGroupDetail((prev) => {
                          return {
                            ...prev,
                            characterImage: file,
                          };
                        });

                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">그룹명</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="제목을 입력해주세요."
                    value={groupDetail.groupName || ""}
                    onChange={(e) => {
                      setGroupDetail((prev) => {
                        return { ...prev, groupName: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">소개</span>

                  <textarea
                    value={groupDetail.introduction || ""}
                    onChange={(e) =>
                      setGroupDetail((prev) => {
                        return { ...prev, introduction: e.target.value };
                      })
                    }
                    className="col-span-2 rounded-none resize-none textarea textarea-bordered min-h-48"
                  ></textarea>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  {/* 사용 */}
                  <span className="col-span-1">사용</span>
                  <div className="grid items-center grid-cols-2 col-span-2 gap-2">
                    <div className="grid items-center col-span-2 gap-2">
                      <select
                        className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                        value={
                          String(groupDetail.isActive) === "true"
                            ? "사용"
                            : "중지" || ""
                        }
                        onChange={(e) =>
                          setGroupDetail((prev) => {
                            return {
                              ...prev,
                              isActive:
                                e.target.value === "사용" ? "true" : "false",
                            };
                          })
                        }
                      >
                        <option value="중지">중지</option>
                        <option value="사용">사용</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid justify-end col-span-2">
                  {currentEdit === "group-detail" ? (
                    <div className="flex gap-2">
                      <label className="flex-auto">
                        <button
                          className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                          onClick={() => {
                            const compareObject = getChangedFileValues(
                              freezeGroupDetail as {},
                              groupDetail as {}
                            );
                            // submitPutEditGroup(compareObject as {});
                          }}
                          disabled={isEqual(freezeGroupDetail, groupDetail)}
                        >
                          수정
                        </button>
                      </label>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <label className="flex-auto">
                        <button
                          className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                          // onClick={() => submitAddGroup()}
                          disabled={
                            groupDetail.characterImage === null ||
                            groupDetail.textImage === null ||
                            groupDetail.introductionImage === null ||
                            groupDetail.groupName === "" ||
                            groupDetail.introduction === "" ||
                            groupDetail.mindCategory === ""
                          }
                        >
                          등록
                        </button>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {currentEdit === "group-detail" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                    {groupDetail.mindCategory} 리스트
                  </div>

                  <div className="col-span-2 pb-10">
                    <Table
                      divider={false}
                      data={groupDetail.mindfulness || []}
                      addedMap={contentsAddedMap}
                      tdOptions={{
                        view: {
                          el: (item: string) => {
                            return addComma(item);
                          },
                        },
                        commentNum: {
                          el: (
                            commentNum: string,
                            _: number,
                            item: ContentTypes
                          ) => {
                            return (
                              <span
                                className="cursor-pointer"
                                onClick={() => {
                                  // submitGetComments(Number(item.id));
                                  setContentDetail((prev) => {
                                    return {
                                      ...prev,
                                      id: item.id,
                                      title: item.title,
                                    };
                                  });
                                  openModal("comments");
                                }}
                              >
                                {addComma(commentNum)}
                              </span>
                            );
                          },
                        },

                        isActive: {
                          el: (
                            isActive: boolean,
                            _: number,
                            item: TdObjTypes
                          ) => {
                            return (
                              <div className="flex justify-center">
                                <input
                                  disabled={tbodyTrdraggable === "Mindfulness"}
                                  type="checkbox"
                                  className="toggle toggle-primary max-xl:toggle-sm"
                                  checked={isActive}
                                  onChange={() => {
                                    chageActive("mindfulness", item);
                                  }}
                                />
                              </div>
                            );
                          },
                        },
                        thumbnail: {
                          el: (
                            src: string,
                            __: undefined,
                            item: TdObjTypes
                          ) => {
                            return (
                              <div className="w-[144px]">
                                <img
                                  draggable={false}
                                  src={src}
                                  alt={item.title + `이미지`}
                                  className="object-cover"
                                />
                              </div>
                            );
                          },
                        },
                      }}
                      trOptions={{
                        tbody: {
                          isDraggable: (item: TdObjTypes) => {
                            return (
                              tbodyTrdraggable === groupDetail.mindCategory
                            );
                          },
                          dbClickFunc: (item: TdObjTypes, index: number) => {
                            openModal("content-modal");
                            // submitSearchContentDetail(item.id as number);

                            setCurrentEdit("content");
                          },
                          dragEndFunc: (e: TdObjTypes[]) => {
                            const sortedData = map(e, (order) =>
                              find(groupDetail.mindfulness, { id: order.id })
                            );

                            setContentSequence(sortedData as []);
                          },
                        },
                      }}
                      buttons={
                        <>
                          {tbodyTrdraggable === "Mindfulness" ? (
                            <>
                              <button
                                className="rounded-none btn btn-outline btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  setTbodyTrDraggable("");
                                  setGroupDetail((prev) => {
                                    return {
                                      ...prev,
                                      mindfulness:
                                        freezeGroupDetail?.mindfulness as [],
                                    };
                                  });
                                }}
                              >
                                취소
                              </button>
                              <button
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  // submitPutSequence("content");
                                  setTbodyTrDraggable("");
                                  setContentSequence([]);
                                }}
                                disabled={isEqual(
                                  freezeContent,
                                  contentSequence
                                )}
                              >
                                저장
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  setTbodyTrDraggable("Mindfulness");
                                  setContentSequence(groupDetail.mindfulness);
                                }}
                                disabled={groupDetail.mindfulness.length < 2}
                              >
                                우선순위 변경
                              </button>
                              <button
                                className="rounded-none btn btn-primary btn-sm max-xl:btn-xs"
                                onClick={() => {
                                  setContentDetail((prev) => {
                                    return {
                                      ...prev,
                                      mindCategory: "Mindfulness",
                                    };
                                  });
                                  openModal("content-modal");
                                }}
                              >
                                추가
                              </button>
                            </>
                          )}
                        </>
                      }
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* 콘첸츠 모달 */}
      <Modal
        id="content-modal"
        className="h-full max-w-screen-2xl"
        closeFunc={() => {
          setCurrentEdit("group-detail");
          setContentDetail(contentInitialValue);
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="mb-6 text-xl font-bold max-sm:text-base">
              명상 {currentEdit === "content" ? "수정" : "등록"}
            </div>
            <div className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  구분
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">구분</span>

                  <input
                    type="text"
                    disabled
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="."
                    value={groupDetail.mindCategory || ""}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">그룹명</span>
                  <input
                    type="text"
                    disabled
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={groupDetail.groupName || ""}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="제목을 입력해주세요."
                    value={contentDetail.title || ""}
                    onChange={(e) => {
                      setContentDetail((prev) => {
                        return { ...prev, title: e.target.value };
                      });
                    }}
                    maxLength={15}
                    autoFocus={false}
                  />
                </div>

                <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">썸네일 이미지</span>

                  <label
                    htmlFor="meditation-thumbnail"
                    className={`${
                      contentDetail.thumbnail?.name || contentDetail.thumbnail
                        ? "col-span-1 btn-disabled"
                        : "col-span-2"
                    }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                  >
                    첨부
                  </label>
                  <div
                    className="tooltip tooltip-bottom"
                    data-tip={
                      contentDetail.thumbnail?.name ||
                      useSpliceLinkText(String(contentDetail.thumbnail))
                    }
                  >
                    <div
                      className={`truncate text-left ${
                        contentDetail.thumbnail?.name || contentDetail.thumbnail
                          ? ""
                          : "hidden"
                      } `}
                    >
                      {contentDetail.thumbnail?.name ||
                        useSpliceLinkText(String(contentDetail.thumbnail))}
                    </div>
                    <span
                      className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                      onClick={() => {
                        setContentDetail((prev) => {
                          return {
                            ...prev,
                            thumbnail: null,
                          };
                        });
                      }}
                    >
                      x
                    </span>
                  </div>

                  <div className="col-span-3 label-text-alt text-error">
                    ※ 10MB 이하 이미지 파일을 업로드해주세요 (권장 해상도 444 X
                    444)
                  </div>
                  <input
                    id="meditation-thumbnail"
                    type="file"
                    className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0];
                      if (file) {
                        setContentDetail((prev) => {
                          return {
                            ...prev,
                            thumbnail: file,
                          };
                        });
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  첨부 소스
                </div>

                <div className="grid items-center grid-cols-1 col-span-2 gap-y-6 max-lg:grid-cols-1">
                  <div className="grid grid-cols-1 col-span-2 gap-2">
                    <div className="grid items-center grid-cols-3 gap-2">
                      <label className="rounded-none border-base-200">
                        플레이타임
                      </label>

                      <input
                        type="text"
                        className="col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        value={contentDetail.minutes || ""}
                        placeholder="MM"
                        onChange={(e) => {
                          let min = e.target.value.replace(/[^0-9]/g, "");
                          if (parseInt(min, 10) > 59) min = "59";

                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              minutes: min,
                            };
                          });
                        }}
                        maxLength={2}
                      />

                      <input
                        type="text"
                        className="col-span-1 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        value={contentDetail.seconds || ""}
                        placeholder="SS"
                        onChange={(e) => {
                          let sec = e.target.value.replace(/[^0-9]/g, "");
                          if (parseInt(sec, 10) > 59) sec = "59";

                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              seconds: sec,
                            };
                          });
                        }}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  {/* 성우 */}
                  {groupDetail.mindCategory === "Mindfulness" && (
                    <div className="grid grid-cols-1 col-span-1 gap-2">
                      <span className="col-span-1 text-lg font-bold">성우</span>
                      <div className="col-span-1 label-text-alt text-error">
                        ※ 이미지 : 10MB 이하 (권장 해상도 276 X 312) / 오디오 :
                        20MB 이하
                      </div>
                      <div className="grid items-center grid-cols-3 gap-2">
                        <label className="rounded-none border-base-200">
                          성우1 이름
                        </label>

                        <input
                          type="text"
                          className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                          value={contentDetail.voice1Title || ""}
                          onChange={(e) => {
                            setContentDetail((prev) => {
                              return { ...prev, voice1Title: e.target.value };
                            });
                          }}
                        />
                      </div>

                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우1 활성 이미지</span>

                        <label
                          htmlFor="voice1-active"
                          className={`${
                            contentDetail.voice1ActiveImage?.name ||
                            contentDetail.voice1ActiveImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice1ActiveImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice1ActiveImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice1ActiveImage?.name ||
                              contentDetail.voice1ActiveImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice1ActiveImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice1ActiveImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1ActiveImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice1-active"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1ActiveImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우1 비활성 이미지</span>

                        <label
                          htmlFor="voice1-inactive"
                          className={`${
                            contentDetail.voice1InactiveImage?.name ||
                            contentDetail.voice1InactiveImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice1InactiveImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice1InactiveImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice1InactiveImage?.name ||
                              contentDetail.voice1InactiveImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice1InactiveImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice1InactiveImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1InactiveImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice1-inactive"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1InactiveImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>

                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우1 판넬 이미지</span>

                        <label
                          htmlFor="voice1-panel"
                          className={`${
                            contentDetail.voice1PanelImage?.name ||
                            contentDetail.voice1PanelImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice1PanelImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice1PanelImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice1PanelImage?.name ||
                              contentDetail.voice1PanelImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice1PanelImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice1PanelImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1PanelImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice1-panel"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];
                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1PanelImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우1 오디오</span>

                        <label
                          htmlFor="voice1-audio"
                          className={`${
                            contentDetail.voice1?.name || contentDetail.voice1
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice1?.name ||
                            useSpliceLinkText(String(contentDetail.voice1))
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice1?.name || contentDetail.voice1
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice1?.name ||
                              useSpliceLinkText(String(contentDetail.voice1))}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice1-audio"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];

                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice1: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                      <span className="col-span-1"></span>
                      <div className="grid items-center grid-cols-3 gap-2">
                        <label className="rounded-none border-base-200">
                          성우2 이름
                        </label>
                        <input
                          type="text"
                          className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                          value={contentDetail.voice2Title || ""}
                          onChange={(e) => {
                            setContentDetail((prev) => {
                              return { ...prev, voice2Title: e.target.value };
                            });
                          }}
                        />
                      </div>
                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우2 활성 이미지</span>

                        <label
                          htmlFor="voice2-active"
                          className={`${
                            contentDetail.voice2ActiveImage?.name ||
                            contentDetail.voice2ActiveImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice2ActiveImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice2ActiveImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice2ActiveImage?.name ||
                              contentDetail.voice2ActiveImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice2ActiveImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice2ActiveImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2ActiveImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice2-active"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];

                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2ActiveImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우2 비활성 이미지</span>

                        <label
                          htmlFor="voice2-inactive"
                          className={`${
                            contentDetail.voice2InactiveImage?.name ||
                            contentDetail.voice2InactiveImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice2InactiveImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice2InactiveImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice2InactiveImage?.name ||
                              contentDetail.voice2InactiveImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice2InactiveImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice2InactiveImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2InactiveImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice2-inactive"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];

                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2InactiveImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>

                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우2 판넬 이미지</span>

                        <label
                          htmlFor="voice2-panel"
                          className={`${
                            contentDetail.voice2PanelImage?.name ||
                            contentDetail.voice2PanelImage
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice2PanelImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.voice2PanelImage)
                            )
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice2PanelImage?.name ||
                              contentDetail.voice2PanelImage
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice2PanelImage?.name ||
                              useSpliceLinkText(
                                String(contentDetail.voice2PanelImage)
                              )}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2PanelImage: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice2-panel"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];

                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2PanelImage: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                      <div className="relative grid items-center grid-cols-3 gap-2">
                        <span className="col-span-1">성우2 오디오</span>

                        <label
                          htmlFor="voice2-audio"
                          className={`${
                            contentDetail.voice2?.name || contentDetail.voice2
                              ? "col-span-1 btn-disabled"
                              : "col-span-2"
                          }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                        >
                          첨부
                        </label>
                        <div
                          className="tooltip tooltip-bottom"
                          data-tip={
                            contentDetail.voice2?.name ||
                            useSpliceLinkText(String(contentDetail.voice2))
                          }
                        >
                          <div
                            className={`truncate text-left ${
                              contentDetail.voice2?.name || contentDetail.voice2
                                ? ""
                                : "hidden"
                            } `}
                          >
                            {contentDetail.voice2?.name ||
                              useSpliceLinkText(String(contentDetail.voice2))}
                          </div>
                          <span
                            className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                            onClick={() => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2: null,
                                };
                              });
                            }}
                          >
                            x
                          </span>
                        </div>

                        <input
                          id="voice2-audio"
                          type="file"
                          className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                          onChange={(e) => {
                            const file = e.currentTarget.files?.[0];

                            if (file) {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  voice2: file,
                                };
                              });
                              e.currentTarget.value = "";
                            }
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* 배경음 */}

                  <div className="grid grid-cols-1 col-span-2 gap-2">
                    <span className="col-span-1 text-lg font-bold">배경음</span>
                    <div className="col-span-2 label-text-alt text-error">
                      ※ 이미지 : 10MB 이하 (권장 해상도 1080 X 2340) / 오디오 :
                      20MB 이하
                    </div>
                    <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <label className="rounded-none border-base-200">
                        배경음 제목
                      </label>
                      <input
                        type="text"
                        className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        value={contentDetail.backGroundTitle || ""}
                        onChange={(e) => {
                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              backGroundTitle: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="relative grid items-center grid-cols-3 col-span-2 gap-2 ">
                      <span className="col-span-1">배경음 이미지</span>

                      <label
                        htmlFor="background-image"
                        className={`${
                          contentDetail.backgroundImage?.name ||
                          contentDetail.backgroundImage
                            ? "col-span-1 btn-disabled"
                            : "col-span-2"
                        }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                      >
                        첨부
                      </label>
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip={
                          contentDetail.backgroundImage?.name ||
                          useSpliceLinkText(
                            String(contentDetail.backgroundImage)
                          )
                        }
                      >
                        <div
                          className={`truncate text-left ${
                            contentDetail.backgroundImage?.name ||
                            contentDetail.backgroundImage
                              ? ""
                              : "hidden"
                          } `}
                        >
                          {contentDetail.backgroundImage?.name ||
                            useSpliceLinkText(
                              String(contentDetail.backgroundImage)
                            )}
                        </div>
                        <span
                          className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                          onClick={() => {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                backgroundImage: null,
                              };
                            });
                          }}
                        >
                          x
                        </span>
                      </div>

                      <input
                        id="background-image"
                        type="file"
                        className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];

                          if (file) {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                backgroundImage: file,
                              };
                            });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <div className="relative grid items-center grid-cols-3 col-span-2 gap-2 ">
                      <span className="col-span-1">배경음 오디오</span>

                      <label
                        htmlFor="background-audio"
                        className={`${
                          contentDetail.backGround?.name ||
                          contentDetail.backGround
                            ? "col-span-1 btn-disabled"
                            : "col-span-2"
                        }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                      >
                        첨부
                      </label>
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip={
                          contentDetail.backGround?.name ||
                          useSpliceLinkText(String(contentDetail.backGround))
                        }
                      >
                        <div
                          className={`truncate text-left ${
                            contentDetail.backGround?.name ||
                            contentDetail.backGround
                              ? ""
                              : "hidden"
                          } `}
                        >
                          {contentDetail.backGround?.name ||
                            useSpliceLinkText(String(contentDetail.backGround))}
                        </div>
                        <span
                          className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                          onClick={() => {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                backGround: null,
                              };
                            });
                          }}
                        >
                          x
                        </span>
                      </div>

                      <input
                        id="background-audio"
                        type="file"
                        className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];

                          if (file) {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                backGround: file,
                              };
                            });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-2"></div>
                  </div>

                  {/* 효과음 */}
                  <div className="flex flex-col col-span-1 gap-2">
                    <span className="col-span-1 text-lg font-bold">효과음</span>
                    <div className="col-span-1 label-text-alt text-error">
                      ※ 오디오 : 20MB 이하
                    </div>
                    <div className="grid items-center grid-cols-3 col-span-2 gap-2 ">
                      <label className="rounded-none border-base-200">
                        효과음1 제목
                      </label>
                      <input
                        type="text"
                        className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        value={contentDetail.soundEffect1Title || ""}
                        onChange={(e) => {
                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              soundEffect1Title: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">효과음1 오디오</span>

                      <label
                        htmlFor="soundEffect1-audio"
                        className={`${
                          contentDetail.soundEffect1?.name ||
                          contentDetail.soundEffect1
                            ? "col-span-1 btn-disabled"
                            : "col-span-2"
                        }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                      >
                        첨부
                      </label>
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip={
                          contentDetail.soundEffect1?.name ||
                          useSpliceLinkText(String(contentDetail.soundEffect1))
                        }
                      >
                        <div
                          className={`truncate text-left ${
                            contentDetail.soundEffect1?.name ||
                            contentDetail.soundEffect1
                              ? ""
                              : "hidden"
                          } `}
                        >
                          {contentDetail.soundEffect1?.name ||
                            useSpliceLinkText(
                              String(contentDetail.soundEffect1)
                            )}
                        </div>
                        <span
                          className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                          onClick={() => {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                soundEffect1: null,
                              };
                            });
                          }}
                        >
                          x
                        </span>
                      </div>

                      <input
                        id="soundEffect1-audio"
                        type="file"
                        className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];

                          if (file) {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                soundEffect1: file,
                              };
                            });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-2"></div>

                    {/* 효과음 sub */}
                    <span className="col-span-1"></span>
                    <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                      <label className="rounded-none border-base-200">
                        효과음2 제목
                      </label>
                      <input
                        type="text"
                        className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                        value={contentDetail.soundEffect2Title || ""}
                        onChange={(e) => {
                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              soundEffect2Title: e.target.value,
                            };
                          });
                        }}
                      />
                    </div>
                    <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                      <span className="col-span-1">효과음2 오디오</span>

                      <label
                        htmlFor="soundEffect2-audio"
                        className={`${
                          contentDetail.soundEffect2?.name ||
                          contentDetail.soundEffect2
                            ? "col-span-1 btn-disabled"
                            : "col-span-2"
                        }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                      >
                        첨부
                      </label>
                      <div
                        className="tooltip tooltip-bottom"
                        data-tip={
                          contentDetail.soundEffect2?.name ||
                          useSpliceLinkText(String(contentDetail.soundEffect2))
                        }
                      >
                        <div
                          className={`truncate text-left ${
                            contentDetail.soundEffect2?.name ||
                            contentDetail.soundEffect2
                              ? ""
                              : "hidden"
                          } `}
                        >
                          {contentDetail.soundEffect2?.name ||
                            useSpliceLinkText(
                              String(contentDetail.soundEffect2)
                            )}
                        </div>
                        <span
                          className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                          onClick={() => {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                soundEffect2: null,
                              };
                            });
                          }}
                        >
                          x
                        </span>
                      </div>

                      <input
                        id="soundEffect2-audio"
                        type="file"
                        className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0];
                          if (file) {
                            setContentDetail((prev) => {
                              return {
                                ...prev,
                                soundEffect2: file,
                              };
                            });
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                    </div>
                    <div className="col-span-2"></div>
                    {/* 효과음 3 */}

                    {groupDetail.mindCategory === "ASMR" && (
                      <div className="grid grid-cols-1 gap-2">
                        <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                          <label className="rounded-none border-base-200">
                            효과음3 제목
                          </label>
                          <input
                            type="text"
                            className="col-span-2 rounded-none bg-base-100 input input-bordered input-sm max-sm:input-xs"
                            value={contentDetail.soundEffect3Title || ""}
                            onChange={(e) => {
                              setContentDetail((prev) => {
                                return {
                                  ...prev,
                                  soundEffect3Title: e.target.value,
                                };
                              });
                            }}
                          />
                        </div>
                        <div className="relative grid items-center grid-cols-3 col-span-2 gap-2">
                          <span className="col-span-1">효과음3 오디오</span>
                          <label
                            htmlFor="soundEffect3-audio"
                            className={`${
                              contentDetail.soundEffect3?.name ||
                              contentDetail.soundEffect3
                                ? "col-span-1 btn-disabled"
                                : "col-span-2"
                            }  rounded-none cursor-pointer btn btn-outline btn-ghost border-base-200 btn-sm max-sm:btn-xs`}
                          >
                            첨부
                          </label>
                          <div
                            className="tooltip tooltip-bottom"
                            data-tip={
                              contentDetail.soundEffect3?.name ||
                              useSpliceLinkText(
                                String(contentDetail.soundEffect3)
                              )
                            }
                          >
                            <div
                              className={`truncate text-left ${
                                contentDetail.soundEffect3?.name ||
                                contentDetail.soundEffect3
                                  ? ""
                                  : "hidden"
                              } `}
                            >
                              {contentDetail.soundEffect3?.name ||
                                useSpliceLinkText(
                                  String(contentDetail.soundEffect3)
                                )}
                            </div>
                            <span
                              className="absolute top-0 right-0 ml-2 cursor-pointer text-error"
                              onClick={() => {
                                setContentDetail((prev) => {
                                  return {
                                    ...prev,
                                    soundEffect3: null,
                                  };
                                });
                              }}
                            >
                              x
                            </span>
                          </div>

                          <input
                            id="soundEffect3-audio"
                            type="file"
                            className="hidden file-input-ghost bg-base-100 file-input input-bordered file-input-sm max-sm:input-xs"
                            onChange={(e) => {
                              const file = e.currentTarget.files?.[0];

                              if (file) {
                                setContentDetail((prev) => {
                                  return {
                                    ...prev,
                                    soundEffect3: file,
                                  };
                                });
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 스크립트 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
                  스크립트
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">부제</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    placeholder="부제를 입력해주세요."
                    value={contentDetail.subTitle || ""}
                    onChange={(e) => {
                      setContentDetail((prev) => {
                        return { ...prev, subTitle: e.target.value };
                      });
                    }}
                    autoFocus={false}
                  />
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>

                  <textarea
                    value={contentDetail.description || ""}
                    onChange={(e) =>
                      setContentDetail((prev) => {
                        return { ...prev, description: e.target.value };
                      })
                    }
                    className="col-span-2 rounded-none resize-none textarea textarea-bordered min-h-48"
                  ></textarea>
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  {/* 사용 */}
                  <span className="col-span-1">사용</span>
                  <div className="grid items-center grid-cols-2 col-span-2 gap-2">
                    <div className="grid items-center col-span-2 gap-2">
                      <select
                        className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
                        value={contentDetail.isActive ? "사용" : "중지"}
                        onChange={(e) =>
                          setContentDetail((prev) => {
                            return {
                              ...prev,
                              isActive:
                                e.target.value === "사용" ? true : false,
                            };
                          })
                        }
                      >
                        <option>중지</option>
                        <option>사용</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="grid justify-end col-span-2 py-2">
              {currentEdit === "content" ? (
                <div className="flex gap-2 mt-4">
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => {
                        const compareObject = getChangedFileValues(
                          freezeContentDetail as {},
                          contentDetail as {}
                        );

                        // submitPutEditContent(compareObject as {});
                      }}
                      disabled={isEqual(freezeContentDetail, contentDetail)}
                    >
                      저장
                    </button>
                  </label>
                </div>
              ) : (
                <div className="flex gap-2 mt-4">
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => {
                        openModal("mockup-preview");
                      }}
                    >
                      미리보기
                    </button>
                  </label>
                  <label className="flex-auto">
                    <button
                      className="rounded-none btn-block btn btn-sm max-sm:btn-xs btn-primary"
                      onClick={() => {
                        // submitMediaContent();
                      }}
                      disabled={
                        groupDetail.mindCategory === "Mindfulness"
                          ? useValidate(contentDetail, mindfulnessDisables)
                              .isValied
                          : useValidate(contentDetail, asmrDisables).isValied
                      }
                    >
                      {/* {t("common.send")} */}
                      등록
                    </button>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        id="mockup-preview"
        className="!max-w-md flex items-center justify-center"
      >
        <div className="mockup-phone">
          <div className="camera"></div>
          <div className="display">
            <div
              className="flex flex-col gap-4 p-8 bg-white artboard artboard-demo phone-1"
              style={{
                backgroundSize: "100% auto",
                backgroundPosition: "center center",
                backgroundImage: `url(${
                  isString(contentDetail.backgroundImage)
                    ? contentDetail.backgroundImage
                    : contentDetail.backgroundImage &&
                      URL.createObjectURL(contentDetail?.backgroundImage)
                })`,
              }}
            >
              <div className="text-xl font-bold text-white">
                {contentDetail.title}
              </div>
              <div className="text-white">{contentDetail.subTitle}</div>
              <div className="text-sm text-white whitespace-pre-wrap">{`${contentDetail.description}`}</div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal id="comments" closeFunc={() => setSearchComment("")}>
        <div className="flex flex-col gap-10 pt-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              콘텐츠 정보
            </div>

            <div className="grid items-center grid-cols-3 col-span-2 gap-2">
              <span className="col-span-1">제목</span>
              <input
                type="text"
                className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                value={contentDetail.title || ""}
                disabled
                onChange={() => {}}
              />
            </div>
          </div>

          <CommentsList
            targetId={contentDetail.id}
            commentsList={comments}
            type={groupDetail.mindCategory}
            // reloadComment={submitGetComments}
            // deleteComment={submitDeleteComment}
            reloadComment={() => {}}
            deleteComment={() => {}}
            perPageOptions={{
              page: commentPerPage.page,
              perPage: commentPerPage.perPage,
              pageLength: commentPerPage.pageLength,
              setPerPage: setCommentPerPage,
            }}
            search={{ text: searchComment, setText: setSearchComment }}
          />
        </div>
      </Modal>

      <Alert
        id="change-active"
        title="상태 변경"
        text="상태를 변경 하시겠습니까?"
        buttons={[
          { style: "", text: "취소", func: () => {}, disabled: false },
          {
            style: "",
            text: "확인",
            func: () => {},
            disabled: false,
          },
        ]}
      />
    </div>
  );
}

export default index;
