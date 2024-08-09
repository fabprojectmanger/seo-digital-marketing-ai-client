import Link from "next/link";
import React from "react";
import IconLike from '../../../public/icons/IconLike'
const BlogsComponent = ({ props }) => {
  return (
    <div className="mx-auto p-6">
      <div className="lg:max-h-[300px] h-full flex flex-col flex-col-reverse md:flex-row bg-white rounded-lg shadow-lg md:items-center justify-center">
      <div className="md:w-[80%] p-8">
          <div className="text-l font-semibold text-gray-600 uppercase mb-2">
            {props.title}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
           {props.head}
          </h2>
          <p className="text-gray-600 mb-6">
            {props.desc}
          </p>
          <Link href={`/blogs/${props.slug}`} className="text-blue-600 hover:underline font-bold">
            READ MORE
          </Link>
          <div className="flex items-center mt-6">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={props.img}
              alt="Author"
            />
            <div className="text-sm">
              {/* <p className="text-gray-900 leading-none">{props.author}</p> */}
              <p className="text-gray-600">{props.date}</p>
            </div>
            <div className="flex ml-3">
                <IconLike/>
            <p className="text-gray-600">{props.likeCount}</p>
            </div>
          </div>
        </div>
        <div className="md:w-[20%] md:p-4 md:h-[150px] lg:h-[200px] flex items-center justify-center">
          <img
            className="object-contian w-full h-full"
            src={props.icon}
            alt="City Street"
          />
        </div>
        
      </div>
    </div>
  );
};
export default BlogsComponent;
