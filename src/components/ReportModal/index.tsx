import { openModal } from "#/utils/useModalHandler";
import { Modal } from "../Modal";
import Table from "../Table";
import { ReportDetailTypes } from "#/data/types/components";
import { useState } from "react";
import { map } from "lodash";

function ReportModal({
  id,
  className,
  closeFunc,
  open,
  type,
  data,
  perPage,
}: {
  id: string;
  type: "board" | "comment";
  className?: string;
  closeFunc?: Function;
  open?: boolean;
  data: ReportDetailTypes;
  perPage: {
    page: number;
    perPage: number;
    pageLength: number;
    setPerPage: Function;
  };
}) {
  const [image, setImage] = useState("");

  return (
    <dialog
      id={id}
      className="modal"
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          closeFunc && closeFunc();
        }
      }}
      open={open}
    >
      <div
        className={`modal-box ${className}  max-w-screen-md text-sm max-sm:text-xs `}
      >
        <div className="flex flex-col gap-10 py-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              {type === "board" ? "게시글" : "댓글"}
            </div>
            {type === "board" ? (
              <div className="grid col-span-2 gap-2">
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">카테고리</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={data?.board?.category || ""}
                    disabled
                  />
                </div>
                <div className="grid items-center grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">제목</span>
                  <input
                    type="text"
                    className="col-span-2 rounded-none grow bg-base-100 input input-bordered input-sm max-sm:input-xs"
                    value={data?.board?.title || ""}
                    disabled
                  />
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>

                  <textarea
                    className="col-span-2 rounded-none resize-none min-h-60 textarea textarea-bordered"
                    value={data?.board?.content || ""}
                    disabled
                  ></textarea>
                </div>
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">첨부 이미지</span>

                  <div className="flex col-span-2 gap-2 overflow-x-auto">
                    {Array.isArray(data?.board?.images) ? (
                      map(data?.board?.images, (url: string, index: number) => {
                        return (
                          <img
                            key={`${url}-${index}`}
                            className="w-1/4"
                            src={url}
                            onClick={() => {
                              setImage(url);
                              openModal("image-modal");
                            }}
                          />
                        );
                      })
                    ) : (
                      <div className="flex justify-end w-full text-right">
                        이미지가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid col-span-2 gap-2">
                <div className="grid items-start grid-cols-3 col-span-2 gap-2">
                  <span className="col-span-1">내용</span>

                  <textarea
                    className="col-span-2 rounded-none resize-none min-h-60 textarea textarea-bordered"
                    value={String(data?.comment?.comment) || ""}
                    disabled
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 px-2 py-1 my-1 text-lg text-white bg-primary">
              신고내역
            </div>
            <div className="col-span-2">
              <Table
                divider={false}
                data={data?.reports || []}
                addedMap={[
                  ["id", "댓글 ID"],
                  ["userName", "이름"],
                  ["reason", "신고사유"],
                  ["createdAt", "신고일시"],
                ]}
                perPageOptions={{
                  page: perPage.page,
                  perPage: perPage.perPage,
                  pageLength: perPage.pageLength,
                  setPerPage: perPage.setPerPage,
                }}
              />
            </div>
          </div>
        </div>
        <form method="dialog">
          <button
            id={`${id}-close-btn`}
            className="absolute btn btn-sm max-sm:btn-xs btn-circle btn-ghost right-4 top-5"
            onClick={() => {
              closeFunc && closeFunc();
            }}
          >
            ✕
          </button>
        </form>
      </div>
      <Modal id="image-modal" className="max-w-screen-sm">
        <div className="py-10">
          <img src={image} alt={image} />
        </div>
      </Modal>
    </dialog>
  );
}

export default ReportModal;
