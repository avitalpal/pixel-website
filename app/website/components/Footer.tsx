type ContactProps = {
  title: string;
  subtitle: string;
  emailPrompt: string;
  emailAddress: string;
  linkedinPrompt: string;
  linkedinText: string;
  linkedinUrl: string;
  closingRemark: string;
};

export default function Footer({ data }: { data: ContactProps }) {
  return (
    <footer className="bg-stone-300 p-8 mt-12 text-center">
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="mb-4">{data.subtitle}</p>
      <p className="mb-2">
        {data.emailPrompt}
        <a
          href={`mailto:${data.emailAddress}`}
          className="underline text-blue-400 hover:text-blue-200"
        >
          {data.emailAddress}
        </a>
      </p>
      <p className="mb-4">
        {data.linkedinPrompt}
        <a
          href={data.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-400 hover:text-blue-200"
        >
          {data.linkedinText}
        </a>
      </p>
      <p className="italic">{data.closingRemark}</p>
    </footer>
  );
}
