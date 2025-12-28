import ShayariCard from "../common/ShayariCard";

const CardGrid = () => {
  const sampleShayaris = [
    {
      title: "दिल की बात",
      subtitle: "प्रेम की कहानी",
      content: "तेरे बिना जीना भी मुश्किल है,\nहर लम्हा याद आता है तेरा चेहरा।",
      footer: "❤️ 245 likes",
    },
    {
      title: "मोहब्बत की राह",
      subtitle: "रोमांटिक शायरी",
      content:
        "तुम्हारे प्यार में खो गया हूं,\nहर मोड़ पर तुम्हारी ही याद आती है।",
      footer: "💖 189 likes",
    },
    {
      title: "दर्द का अहसास",
      subtitle: "भावुक शायरी",
      content:
        "दिल टूटा है पर मुस्कान बनाए रखी है,\nआंखों में छुपा है दर्द का सागर।",
      footer: "😢 312 likes",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {sampleShayaris.map((shayari, index) => (
        <ShayariCard
          key={index}
          title={shayari.title}
          subtitle={shayari.subtitle}
          footer={shayari.footer}
        >
          <p className="text-base leading-relaxed whitespace-pre-line">
            {shayari.content}
          </p>
        </ShayariCard>
      ))}
    </div>
  );
};

export default CardGrid;
