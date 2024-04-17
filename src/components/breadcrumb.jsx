export default function Breadcrumb(props) {
  return (
    <div>
      <ol className="space-x-2 text-[11px] md:text-sm">
        {props.breadcrumbs.map((item, index) => (
          <li key={index} className="inline-flex items-center gap-2 group">
            <a
              href={item.href}
              className="group-first:text-greyscale-600 text-greyscale-900"
            >
              {item.label}
            </a>{" "}
            {index !== props.breadcrumbs.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.52925 3.52729C5.7896 3.26694 6.21171 3.26694 6.47206 3.52729L10.4721 7.52729C10.7324 7.78764 10.7324 8.20975 10.4721 8.4701L6.47206 12.4701C6.21171 12.7305 5.7896 12.7305 5.52925 12.4701C5.2689 12.2098 5.2689 11.7876 5.52925 11.5273L9.05784 7.9987L5.52925 4.4701C5.2689 4.20975 5.2689 3.78764 5.52925 3.52729Z"
                  fill="#111827"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
