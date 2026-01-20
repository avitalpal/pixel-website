type ContactProps = {
  title: string;
  subtitle: string;
  emailPrompt: string;
  emailAddress: string;
  githubPrompt: string;
  githubText: string;
  githubUrl: string;
  linkedinPrompt: string;
  linkedinText: string;
  linkedinUrl: string;
  closingRemark: string;
};

export default function Footer({ data }: { data: ContactProps }) {
  return (
    <footer className="bg-linear-to-br from-blue-50 to-blue-200 py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
            {data.title}
          </h2>
          <p className="text-stone-700 text-md leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        {/* Contact Links */}
        <div className="space-y-2 mb-8 text-center md:text-left">
          {/* Email */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 justify-center md:justify-start">
            <span className="text-2xl">📧</span>
            <p className="text-stone-700">
              {data.emailPrompt}
              <a
                href={`mailto:${data.emailAddress}`}
                className="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {data.emailAddress}
              </a>
            </p>
          </div>

          {/* GitHub */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 justify-center md:justify-start">
            <span className="text-2xl">💻</span>
            <p className="text-stone-700">
              {data.githubPrompt}
              <a
                href={data.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {data.githubText}
              </a>
            </p>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 justify-center md:justify-start">
            <span className="text-2xl">🔗</span>
            <p className="text-stone-700">
              {data.linkedinPrompt}
              <a
                href={data.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:text-blue-800 underline transition-colors"
              >
                {data.linkedinText}
              </a>
            </p>
          </div>
        </div>

        {/* Closing Remark */}
        <div className="text-center mt-6 pt-6 border-t-2 border-blue-200">
          <p className="hidden lg:block italic text-stone-600 text-md">
            {data.closingRemark}
          </p>
        </div>
        {/* Footer credit */}
        <div className="text-center mt-8 text-stone-500 text-sm">
          <p>Made with &lt;3 by Avital Palchik © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}