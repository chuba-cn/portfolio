import TagLine from "./TagLine";

type HeadingProps = {
  className?: string;
  title?: string;
  text?: string;
  tag?: string;
};

const Heading = ({ className, title, text, tag }: HeadingProps) => {
  return (
    <div className={`${className || ""} max-w-[50rem] mx-auto mb-12 lg:mb-20 md:text-center`}>
      {tag && <TagLine className="mb-4 md:justify-center">{tag}</TagLine>}
      {title && <h2 className="h2 text-text">{title}</h2>}
      {text && <p className="body-2 mt-4 text-text-muted">{text}</p>}
    </div>
  );
};

export default Heading;
