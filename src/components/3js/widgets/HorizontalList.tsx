interface HorizontalListProps {
  items: { className?: string; text: string; id?: string }[];
  className?: string;
  elementGeneralClass?: string;
}

const HorizontalList: React.FC<HorizontalListProps> = ({ items, className, elementGeneralClass }) => {
  return (
      <div id="About" className={`w-full hidden md:grid grid-cols-3  sm:grid text-white ${className || ''}`}>
          {items.map((item, index) => {
              const [firstWord, ...restWords] = item.text.split(' ');
              return (
                  <div
                      className={`${elementGeneralClass || ''} ${item.className || ''} w-full text-center`}
                      key={item.id || `list-item-${index}`}
                  >
                      <span className="inline text-[color:--text-color]">{firstWord} </span>
                      <span className="inline">{restWords.join(' ')}</span>
                  </div>
              );
          })}
      </div>
  );
};

export default HorizontalList;
