import Link from "next/link";
import react from "react"

type Props = {
  title: String,
  description: String,
  requirements: String[],
  link: String
}

const JobDescription = ({title, description, requirements, link}:Props) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-xl middle">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {title}
      </h1>
      <div className="text-gray-700 mb-4">
        <p className="font-bold mb-2">Location:</p>
        <p>Remote</p>
      </div>
      <div className="text-gray-700 mb-4">
        <p className="font-bold mb-2">Job Description:</p>
        <p>{description}</p>
      </div>
      <div className="text-gray-700 mb-4">
        <p className="font-bold mb-2">Requirements:</p>
        <ul className="list-disc ml-3">
          {requirements &&
            requirements.map((e, i) => {
              return(
                <li key={i}>{e}</li>
              )
            })
          }
        </ul>
      </div>
      <Link href={`/careers/apply/${link}`} className="px-4 py-2 font-bold text-white bg-amber-500 rounded-full hover:bg-amber-700 focus:outline-none focus:shadow-outline-blue active:bg-amber-800">
        Apply Now
      </Link>
    </div>
  );
};

export default JobDescription;