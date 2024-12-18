import { map } from "lodash";

function index({
  choices,
  selected,
}: {
  choices: string[];
  selected: string[];
}) {
  return (
    <div>
      <ul className="flex flex-wrap gap-2">
        {map(choices, (item, index) => {
          return (
            <li
              tabIndex={0}
              className={`
              pointer-events-none 
              ${selected.includes(item) && "bg-primary text-white"} ${
                !selected.includes(item) && "!text-gray-500"
              } cursor-pointer px-[16px] py-[8px] rounded-[18px] bg-gray-50  text-gray-300`}
              key={index}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default index;
