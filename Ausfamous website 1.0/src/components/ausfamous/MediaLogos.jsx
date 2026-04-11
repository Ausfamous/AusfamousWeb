const ROW1 = ['Forbes','ABC News','SBS News','The Australian','Sydney Morning Herald','7NEWS','9News','Sky News Australia','Business Insider','AFR','Indian Link','The Guardian','BBC News','CNN','Bloomberg','Reuters','The New York Times','The Washington Post','Wall Street Journal','Financial Times','TIME','CNBC'];
const ROW2 = ['SBS Hindi','SBS Punjabi','SBS Arabic','The Greek Herald','Australian Chinese Daily','Neos Kosmos','Desi Australia','Herald Sun','Daily Telegraph','The Age','SmartCompany','Startup Daily','Al Jazeera','The Economist','USA Today','AP News','The Independent','South China Morning Post','Nikkei Asia','Forbes Australia','The Advertiser','The West Australian'];

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden py-3">
      <div className={`flex flex-shrink-0 ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
        {doubled.map((name, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-6 md:px-10 text-sm font-semibold tracking-wider uppercase text-platinum/15 hover:text-gold transition-colors duration-300 whitespace-nowrap cursor-default"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MediaLogos() {
  return (
    <section className="py-16 bg-obsidian overflow-hidden border-y border-gold/5">
      <div className="text-center mb-10">
        <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-4">Global Recognition</p>
        <h2 className="font-display text-3xl md:text-4xl font-medium text-platinum">As Featured In</h2>
      </div>
      <MarqueeRow items={ROW1} />
      <MarqueeRow items={ROW2} reverse />
    </section>
  );
}