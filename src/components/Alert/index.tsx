import { AlertOpenerTypes, AlertTypes } from "../../data/types/components";

function Alert({
  id,
  title,
  text,
  buttons,
  open,
  className,
  closeFunc,
}: AlertTypes) {
  return (
    <dialog
      id={id}
      className={`modal ${className || ""}`}
      open={open}
      onKeyDown={(e) => {
        if (e.code === "Escape") {
          closeFunc && closeFunc();
        }
      }}
    >
      <div className="border border-base-300 modal-box">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="py-4">{text}</p>
        <div className="w-full modal-action">
          <form method="dialog" className="flex justify-end w-full gap-4">
            {buttons.map((item, index) => {
              return (
                <button
                  key={index}
                  disabled={item.disabled}
                  className={`rounded-none btn btn-primary btn-sm max-sm:btn-xs w-[25%] ${item.style}`}
                  onClick={() => item.func()}
                  onKeyDown={() => item.func()}
                >
                  {item.text}
                </button>
              );
            })}
          </form>
        </div>
      </div>
    </dialog>
  );
}

function AlertOpener({ id, text, style, func, children }: AlertOpenerTypes) {
  return (
    <div
      className={`${style} `}
      onClick={() => {
        (document.getElementById(id) as HTMLFormElement).showModal();
        func && func();
      }}
    >
      {text ? text : children}
    </div>
  );
}

export { Alert, AlertOpener };
