const Footer = () => {
  const imgUrl = import.meta.env.VITE_AVATAR_URL!;
  const username = import.meta.env.VITE_USERNAME!;

  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950/40 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-center px-4">
        <a
          href={`https://t.me/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 rounded-md px-3 py-1.5 text-sm text-neutral-400 transition hover:bg-neutral-900/60 hover:text-neutral-100"
        >
          {imgUrl && (
            <img src={imgUrl} width={24} height={24} alt="avatar" className="rounded-full border border-neutral-800" />
          )}
          <span className="font-medium">author</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
