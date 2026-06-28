import Link from "next/link";

function Card({ title, description, image, id }) {
  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 hover:border-blue-500 hover:shadow-blue-900/20 transition-all duration-300 flex flex-col h-full">
      
      {/* Image Container */}
      <div className="w-full h-48 bg-slate-950 relative flex items-center justify-center border-b border-slate-800">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-slate-600 text-sm italic">No Image Available</span>
        )}
      </div>
      
      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <div>
        <Link href={`update/${id.toString()}`} className="text-xl ps-5">Update Content</Link>
        <Link href={`delete/${id.toString()}`} className="text-xl ps-5">Delete Game</Link>
      </div>
      
    </div>
  );
}

export default Card;