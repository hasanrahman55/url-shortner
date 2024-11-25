import { Link } from "react-router-dom";

function LinkCard({ url, fetchUrls }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url.qr}
        alt={url.title}
        className="h-32 object-contain ring ring-blue-500 slef-start"
      />
      <Link to={`/link/${url.id}`}>
        <span>{url.title}</span>
        <span>{url.title}</span>
      </Link>
    </div>
  );
}

export default LinkCard;
