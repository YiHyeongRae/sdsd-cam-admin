import api from "#/library/axios/api";
import useConfirmState from "#/library/recoil/hook/useConfirmState";
import useLoadingState from "#/library/recoil/hook/useLoadingState";
import useMakeFreeze from "#/utils/useMakeFreeze";
import { openModal } from "#/utils/useModalHandler";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

function index({ id }: { id: number }) {
  const [videoData, setVideoData] = useState<{
    [key: string]: string | number;
  }>();

  const { setModalLoading } = useLoadingState();

  const { setConfirmFunc } = useConfirmState();
  const [freezeVideo, setFreezeVideo] = useState<{
    [key: string]: string | number;
  }>();

  const [addVideoLink, setAddVideoLink] = useState({
    active: false,
    videoLink: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const getVideo = () => {
    // setModalLoading(true);
    // api
    //   .get(`/admin/program/content/video`, {
    //     params: { programSequenceId: id },
    //   })
    //   .then((result) => {
    //     if (Object.keys(result.data).length === 0) {
    //       setAddVideoLink((prev) => {
    //         return { ...prev, active: true };
    //       });
    //     } else {
    //       setVideoData(result.data);
    //       const freeze = useMakeFreeze(result.data);
    //       setFreezeVideo(freeze);
    //     }

    //     setModalLoading(false);
    //   })
    //   .catch((error) => {
    //     setModalLoading(false);
    //   });

    const dummyResult = { id: 5, videoLink: "https://www.andreia.kr/" };

    if (Object.keys(dummyResult).length === 0) {
      setAddVideoLink((prev) => {
        return { ...prev, active: true };
      });
    } else {
      setVideoData(dummyResult);
      const freeze = useMakeFreeze(dummyResult);
      setFreezeVideo(freeze);
    }
  };

  const submitPutVideoLink = () => {
    setModalLoading(true);
    api
      .put(`/admin/program/content/video`, {
        id: videoData?.id,
        videoLink: videoData?.videoLink,
      })
      .then((result) => {
        console.log(result);
        getVideo();
        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitPostVideoLink = () => {
    setModalLoading(true);
    api
      .post(`/admin/program/content/video`, {
        programSequenceId: id,
        videoLink: addVideoLink.videoLink,
      })
      .then((result) => {
        console.log(result);
        getVideo();
        setAddVideoLink({ active: false, videoLink: "" });
        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };

  const submitDeleteVideoLink = () => {
    setModalLoading(true);
    api
      .delete(`/admin/program/content/video`, {
        params: {
          videoId: videoData?.id,
        },
      })
      .then((result) => {
        getVideo();
        setModalLoading(false);
      })
      .catch((error) => {
        setModalLoading(false);
      });
  };
  useEffect(() => {
    getVideo();
  }, [id]);

  return (
    <div className="grid grid-cols-2 gap-4 mt-10">
      <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
        미디어
      </div>
      <div className="grid items-center grid-cols-3 col-span-2 gap-2">
        <span className="col-span-1">첨부방식</span>
        <select
          className="rounded-none join-item select-sm select select-bordered max-xl:select-xs"
          value={"Url"}
          disabled={!addVideoLink.active && !isEdit}
          onChange={(e) => {}}
          //   setProgramDetail((prev) => {
          //     return { ...prev, isActive: e.target.value };
          //   })
          // }
        >
          <option value="Url">Url</option>
          {/* <option value="Embedded">임베디드</option>
          <option value="File">파일</option> */}
        </select>
      </div>
      <div className="grid items-center grid-cols-3 col-span-2 gap-2">
        <span className="col-span-1">Url</span>
        <input
          type="text"
          className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
          placeholder=""
          disabled={!addVideoLink.active && !isEdit}
          value={
            addVideoLink.active
              ? addVideoLink.videoLink
              : videoData?.videoLink || ""
          }
          onChange={(e) => {
            addVideoLink.active
              ? setAddVideoLink((prev) => {
                  return { ...prev, videoLink: e.target.value };
                })
              : setVideoData((prev) => {
                  return { ...prev, videoLink: e.target.value };
                });
          }}
          autoFocus={false}
        />
      </div>
      <div className="flex justify-end col-span-3 gap-2">
        {addVideoLink.active ? (
          <button
            className="btn btn-primary btn-sm"
            disabled={String(videoData?.videoLink).length === 0}
            // onClick={() => submitPostVideoLink()}
          >
            등록
          </button>
        ) : isEdit ? (
          <>
            <button
              className="btn btn-primary btn-outline btn-sm"
              onClick={() => setIsEdit(false)}
            >
              취소
            </button>{" "}
            <button
              className="btn btn-primary btn-sm"
              disabled={isEqual(videoData, freezeVideo)}
              // onClick={() => submitPutVideoLink()}
            >
              저장
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsEdit(true)}
            >
              수정
            </button>
            <button
              className="btn btn-error btn-sm"
              type="button"
              onClick={() => {
                // setConfirmFunc(() => submitDeleteVideoLink());
                openModal("confirm-delete");
              }}
            >
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default index;
